 /*!
  * Gulp ES Modules Task Runner File
  * (c) 2020 Joshua Adams
  */

'use strict';

/* ============================== Import Modules ============================ */

const gulp = require('gulp');
const sass = require('gulp-sass');
const minCss = require('gulp-minify-css');
const concat = require('gulp-concat');
const webpack = require('webpack-stream');
const rename = require('gulp-rename');
const eslint = require('gulp-eslint');
const stylelint = require('gulp-stylelint');
const express = require('./test/express/express.js');

/* ============================= Configure Modules ========================== */

sass.compiler = require('node-sass');

/* ================================= Settings =============================== */

const pkg = require('./package.json');

const settings = {

	dependancies: {
		// list of dependancies to REMOVE from the compiled js files
    js: {
			// property names must match the x parameter in the following statement:
			// import * as something 'from' x
			// property descriptions define the name that will be exported to compiled
			// js code
			"some-module-1": "someModule1",
		 "./dist/some-module-2.js": "someModule2"
	  }
		// list of dependancies to ADD to the compiled css files
		, css: []   // 'dep1_location/dep1.css', 'etc.'
	}

}

const paths = {
	inputs: {
		index: "./src/js/module.js"
		, js: ["./src/js/**/*.js"]
		, sass: ["./src/sass/**/*.scss"]
	}
	, outputs: "dist/"
}

/* ================================== Methods =============================== */

function getWebpackCnf (name) {
	return {
	  entry: {
			[name]: paths.inputs.index
	  },
	  devtool: "source-map",
	  output: {
	    filename: "[name].js",
			libraryTarget: 'var',
      library: pkg.name.replace('-', ''),
	  },
		externals: {},
	  optimization: {
	    minimize: false
	  },
		mode: "production",
		module: {
		  rules: [
		    {
		      test: /\.m?js$/,
		      exclude: /(node_modules|bower_components)/,
		      use: {
		        loader: 'babel-loader',
		        options: {
		          presets: ['@babel/preset-env']
		        }
		      }
		    }
		  ]
		}
	}
}

/**
 * Compiles files into one, converts to ECMAScript 5 and minifies
 */
function compileJs (entry, cnf, done) {
  return gulp.src(entry)
    .pipe(webpack(cnf).on('error', function (err) { console.log(err); done(); }))
    .pipe(gulp.dest('dist/'));
}

function compileScss (arr, name) {
  return gulp.src(arr)

    // output non-minified CSS file
    .pipe(sass().on('error', sass.logError))
		.pipe(rename(name))
    .pipe(gulp.dest(paths.outputs))

    // output the minified version
    .pipe(minCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.outputs))
}

function appendCssDependacies (arr, name) {
  return gulp.src(arr)

    // output non-minified CSS file
    .pipe(concat(name))
    .pipe(gulp.dest(paths.outputs))

    // output the minified version
    .pipe(minCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.outputs))
}

function jsLint (arr) {
  return gulp.src(arr)
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
}

function sassLint (arr, done) {
  return gulp.src(arr)
    .pipe(stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    })).on('error', function (err) {
			console.log(err);
			// completes task but prevents gulp moving to next task until errors are
			// resolved
			done(-1);
		});
}

/* =================================== Tasks ================================ */

gulp.task('js-no-dep', function (done) {
  var entry = paths.inputs.index,
			cnf = getWebpackCnf(pkg.name);
	cnf.externals = settings.dependancies.js;
  return compileJs(entry, cnf, done);
})

gulp.task('js-min-no-dep', function (done) {
  var entry = paths.inputs.index,
			cnf = getWebpackCnf(pkg.name + ".min");
	cnf.externals = settings.dependancies.js;
	cnf.optimization = { minimize: true };
  return compileJs(entry, cnf, done);
})

gulp.task('js-with-dep', function (done) {
  var entry = paths.inputs.index,
			cnf = getWebpackCnf(pkg.name + ".full");
	cnf.externals = {
		"some-module-1": "someModule1",
		"./dist/some-module-2.js": "someModule2"
	};
  return compileJs(entry, cnf, done);
})

gulp.task('js-min-with-dep', function (done) {
  var entry = paths.inputs.index,
			cnf = getWebpackCnf(pkg.name + ".full.min");
	cnf.externals = {
		"some-module-1": "someModule1",
		"./dist/some-module-2.js": "someModule2"
	};
	cnf.optimization = { minimize: true };
  return compileJs(entry, cnf, done);
})

gulp.task('css-no-dep', function (done) {
  var arr = paths.inputs.sass,
			name = pkg.name + '.css';
  return compileScss(arr, name);
});

gulp.task('css-with-dep', function (done) {
  var name = pkg.name + '.full.css'
      , arr = [
        './dist/' + pkg.name + '.css'
      ];
  return appendCssDependacies(settings.dependancies.css.concat(arr), name);
});

gulp.task('jslint', function (done) {
  var arr = paths.inputs.js;
  return jsLint(arr);
});

gulp.task('sasslint', function (done) {
  var arr = paths.inputs.sass;
  return sassLint(arr, done);
});

/* ================================ Export Tasks ============================ */

/*
 * Define default task that can be called by just running `gulp` from cli
 */

 exports.default = function () {
	 express.init();
   gulp.watch(paths.inputs.sass, gulp.series('sasslint', 'css-no-dep', 'css-with-dep'));
   gulp.watch(paths.inputs.js, gulp.series('jslint', 'js-no-dep', 'js-min-no-dep', 'js-with-dep', 'js-min-with-dep'));
 };
