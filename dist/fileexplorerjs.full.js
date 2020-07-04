var fileexplorerjs =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * HTTP Communications
 * Standardised HTTP communications functions
 * (c) 2020 Joshua Adams
 */

/* ============================== Import Modules ============================ */
// N/A

/* ================================ Variables =============================== */
// N/A

/* ============================= Private Methods ============================ */
function _appendRequestHeaders(xhr, headers) {
  for (var key in headers) {
    if (headers.hasOwnProperty(key)) {
      if (_typeof(headers[key]) === 'object') {
        xhr.setRequestHeader(key, JSON.stringify(headers[key]));
      } else {
        xhr.setRequestHeader(key, headers[key]);
      }
    }
  }
}
/* ============================== Public Methods ============================ */


function sendRequest(options) {
  // define AJAX request configuration
  var cnf = {
    method: options.method || 'GET',
    url: options.url,
    payload: options.payload,
    headers: options.headers
  }; // send request

  return new Promise(function (resolve) {
    var xhr = new XMLHttpRequest();
    xhr.open(cnf.method, cnf.url, true); // add additional headers to payload

    _appendRequestHeaders(xhr, cnf.headers); // send request


    xhr.send(cnf.payload); // handle request reponse

    xhr.onreadystatechange = function () {
      // 4 = done
      if (xhr.readyState === 4) {
        resolve(xhr.response);
      } else {// reject(xhr.response);
      }
    };
  });
}
/* =========================== Export Public APIs =========================== */


module.exports = {
  sendRequest: sendRequest
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * npm Entry File
 * (c) 2020 Joshua Adams
 */

/**
 * index.js is the default 'entry file' for npm.
 * This means that any require('package name') or import 'package name'
 * statements will refer to this file.
 */
var pkg = __webpack_require__(2); // export a file with the same name as the package by default


module.exports = __webpack_require__(3)("./".concat(pkg.name, ".js"));

/***/ }),
/* 2 */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"fileexplorerjs\",\"version\":\"1.0.2\",\"description\":\"Creates file explorer user interface component\",\"engines\":{\"node\":\"10.x\"},\"scripts\":{\"start\":\"node index.js\"},\"main\":\"index.js\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/Joshua-W-Adams/fileexplorerjs.git\"},\"author\":\"Joshua Adams\",\"license\":\"ISC\",\"bugs\":{\"url\":\"https://github.com/Joshua-W-Adams/fileexplorerjs/issues\"},\"homepage\":\"https://github.com/Joshua-W-Adams/fileexplorerjs#readme\",\"devDependencies\":{\"@babel/core\":\"^7.8.4\",\"@babel/preset-env\":\"^7.8.4\",\"babel-loader\":\"^8.0.6\",\"eslint-config-airbnb-base\":\"^14.0.0\",\"eslint-plugin-import\":\"^2.20.0\",\"gulp\":\"^4.0.2\",\"gulp-concat\":\"^2.6.1\",\"gulp-eslint\":\"^6.0.0\",\"gulp-minify-css\":\"^1.2.4\",\"gulp-rename\":\"^2.0.0\",\"gulp-sass\":\"^4.0.2\",\"gulp-stylelint\":\"^13.0.0\",\"stylelint\":\"^13.0.0\",\"stylelint-config-recommended\":\"^3.0.0\",\"webpack-stream\":\"^5.2.1\"},\"dependencies\":{\"breadcrumbjs\":\"^1.0.4\",\"connect-busboy\":\"0.0.2\",\"contextmenuator\":\"^1.0.1\",\"express\":\"^4.17.1\",\"gulp-nodemon\":\"^2.5.0\",\"inputator\":\"^1.0.1\",\"modalator\":\"^2.1.3\",\"nodemon\":\"^2.0.3\",\"tableator\":\"^1.3.1\",\"treeator\":\"^1.4.3\"}}");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./fileexplorerjs.js": 4,
	"./http.js": 0,
	"./tests.js": 33
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 3;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * Fileexplorerjs
 * A JavaScript GUI module for exploring file systems
 * (c) 2020 Joshua Adams
 */

/* ============================== Import Modules ============================ */
// import node modules
var breadcrumbjs = __webpack_require__(5);

var inputator = __webpack_require__(9);

var treeator = __webpack_require__(13);

var tableator = __webpack_require__(17);

var contextmenuator = __webpack_require__(21);

var modalator = __webpack_require__(25); // import local modules


var http = __webpack_require__(0);
/* ================================ Variables =============================== */
// *** private module variables ***
// stores the passed configuration object for the file explorer view


var _fileExplorerConfig; // master file explorer data model


var _fileExplorerDataModel = []; // store the state of the folder view

var _fileExplorerFolderView = {
  // location of the displayed folder in the data model
  dataModelIndex: null,
  // folder data currently displayed
  data: null
}; // store modal state

var _modal;
/* ============================= Private Methods ============================ */


function _applyRender(element, properties) {
  var arr = Object.keys(properties);

  for (var i = 0; i < arr.length; i++) {
    var prop = arr[i];

    if (_typeof(properties[prop]) === 'object' && properties[prop] !== null) {
      Object.assign(element[prop], properties[prop]);
    } else {
      element[prop] = properties[prop];
    }
  }

  return element;
}

function _findPositionInTree(filePath, data) {
  var pos;

  for (var i = 0; i < data.length; i++) {
    if (data[i].FILE_PATH === filePath) {
      pos = i;
      return pos;
    }
  }

  return pos;
}

function _findParent(pos, data) {
  for (var i = pos - 1; i > -1; i--) {
    if (data[i].ICON_TYPE === 'folder' && data[i].DATA_DEPTH === data[pos].DATA_DEPTH - 1) {
      return i;
    }
  }

  return -1;
}

function _getFileList(inputElement) {
  // get list of files
  var files = inputElement.files; // create list to load files into

  var fileList = document.createElement('ol'); // style list

  fileList.style.listStyleType = 'none'; // add list items to file list

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var li = document.createElement('li');
    li.innerHTML = file.name;
    li.style.padding = '10px 0px';
    fileList.appendChild(li);
  }

  return fileList;
}

function _addEmptyRow(arr, file_path) {
  // get empty row of data to always be displayed to user
  var row = {
    DATA_DEPTH: '',
    ICON_TYPE: '',
    NAME: 'add new item',
    SIZE: '',
    LAST_EDIT_DATE: '',
    FILE_PATH: file_path
  }; // push row to array

  arr.push(row);
  return arr;
}

function _getBreadCrumbFilePath(items, position) {
  var filePath = '';

  for (var i = 0; i <= position; i++) {
    if (i === position) {
      filePath = "".concat(filePath).concat(items[i].item);
    } else {
      filePath = "".concat(filePath).concat(items[i].item, "/");
    }
  }

  return filePath;
}

function _updateTreeClickedItem(pos) {
  // update tree single & double clicked rows
  var table = document.getElementById('treeator-tree');
  var tr = table.getElementsByTagName('tr');
  treeator.onClickDefault(tr[pos]);
  treeator.onDblClickDefault(tr[pos]);
}

function _getBreadcrumb(items) {
  // destroy current breadcrumb
  var bc = document.getElementById(_fileExplorerConfig.ui.breadcrumbDiv);

  while (bc.firstChild) {
    bc.removeChild(bc.lastChild);
  } // construct new breadcrumb


  var breadCrumbOptions = {
    div: _fileExplorerConfig.ui.breadcrumbDiv,
    breadcrumbs: {
      items: items
    }
  };
  breadcrumbjs.init(breadCrumbOptions);
}

function _reloadTable(matchedRow, pos, data) {
  if (matchedRow.ICON_TYPE === 'folder') {
    // get all children of current row
    var children = treeator.getChildren(pos, data);

    var folderData = _addEmptyRow(children, data[pos].FILE_PATH);

    _getFolderView(pos, folderData);
  } else {
    var parentPos = _findParent(pos, data); // get all children of current row


    var _children = treeator.getChildren(parentPos, data);

    var _folderData = _addEmptyRow(_children, data[parentPos].FILE_PATH);

    _getFolderView(parentPos, _folderData);
  }
}

function _reloadBreadCrumb(row, data) {
  // create breadcrumb
  var arr = row.FILE_PATH.split('/');
  var items = [];

  for (var i = 0; i < arr.length; i++) {
    var _row = {
      item: arr[i],
      onClick: function onClick(li, items, position) {
        // get filePath to lookup in tree array
        var filePath = _getBreadCrumbFilePath(items, position); // find position of filePath in tree data


        var pos = _findPositionInTree(filePath, data); // Update tree


        _updateTreeClickedItem(pos); // Update table


        _reloadTable(data[pos], pos, data);
      }
    };
    items.push(_row);
  }

  _getBreadcrumb(items);
}

function _handleResponse(data, changeType) {
  if (data) {
    var passed = [];
    var failed = [];

    for (var i = 0; i < data.length; i++) {
      var row = data[i]; // handle success and failure of file operations
      // pass of operation

      if (row.STATUS === 'pass') {
        // update data model with appropriate crud operation
        passed.push(row); // failure of operation
      } else {
        failed.push(row);
      }
    } // regenerate file explorer view after all operations have been processed


    if (passed.length > 0) {
      _updateUserInterface(passed, changeType);
    } // TO DO - Inform user of failed operation


    if (failed.length > 0) {}
  } else {// unknown error in response from server
    // TO DO - Inform user of failed update
  }
}

function _addFileFormOnClick(form, dir) {
  return function () {
    // get form data model for submission to server
    var formData = new FormData(form); // define http request

    var options = {
      method: 'POST',
      url: form.action,
      payload: formData,
      headers: {
        // content type automatically assigned by form data
        // 'Content-Type': null
        directory: dir
      }
    };
    var files = document.getElementById('selectFilesButton').files; // Only submit request to server when files have been selected by user

    if (files.length > 0) {
      // send ajax request to server
      http.sendRequest(options).then(function (res) {
        var data = JSON.parse(res);

        _handleResponse(data, 'add');
      });
    }

    return false; // To avoid actual submission of the form
  };
}

function _displaySelectedFiles(inputElement, displayElementId) {
  // generate file list element from user selected files
  var fileList = _getFileList(inputElement); // get element to display file list in


  var e = document.getElementById(displayElementId); // remove previous items

  e.innerHTML = ''; // assign file list to span

  e.appendChild(fileList);
}

function _selectFilesButtonRenderer() {
  // create input element for file selector
  var e = document.createElement('input');
  e.type = 'file';
  e.multiple = 'multiple';
  e.id = 'selectFilesButton'; // http request function requires a name for submission

  e.name = 'uploadFiles';
  e.style.display = 'none'; // custom label to override default input style

  var label = document.createElement('label');
  label.htmlFor = 'selectFilesButton';
  label.innerHTML = 'Select Files';
  label.style.display = 'inline-block'; // add function for assigning list of files on change

  e.onchange = function () {
    _displaySelectedFiles(e, 'dialog_body');
  }; // build element object model


  label.appendChild(e);
  return label;
}

function _getAddFileFormConfig(restApi, dir) {
  var config = [{
    name: 'modal',
    child: [{
      name: 'dialog',
      child: [{
        name: 'dialog_header',
        child: [{
          name: 'dialog_header_title',
          element: {
            content: 'Upload Files'
          }
        }]
      }, {
        name: 'dialog_footer',
        element: {
          value: function value() {
            var form = document.createElement('form');
            form.action = restApi;
            form.onsubmit = _addFileFormOnClick(form, dir);
            return form;
          }
        },
        child: [{
          name: 'dialog_footer_child',
          child: [{
            name: 'dialog_footer_button_two',
            element: {
              value: function value() {
                return _selectFilesButtonRenderer();
              }
            },
            // disable default onclick function to close form
            onclick: function onclick() {}
          }, {
            name: 'dialog_footer_button_one',
            element: {
              value: function value() {
                var e = document.createElement('input');
                e.type = 'submit';
                e.value = 'Upload Files';
                return e;
              }
            },
            style: function style() {
              var properties = {
                'background-color': '#5a6268',
                'font-family': 'Gotham SSm, Helvetica, Arial, sans-serif',
                'font-size': '16px'
              };
              return properties;
            }
          }]
        }]
      }]
    }]
  }];
  return config;
}

function _getInput() {
  var input = document.createElement('input');
  var render = {
    style: {
      'font-size': '16px',
      'font-family': 'roboto',
      padding: '10px',
      boxSizing: 'border-box',
      width: '100%',
      border: 'solid 1px rgba(0,0,0,.125)',
      borderRadius: '3px',
      backgroundColor: 'rgba(241,243,244,1)'
    }
  };

  _applyRender(input, render);

  return input;
}

function _getCurrentDirectory() {
  var dir = ''; // check if folder view has been loaded

  if (_fileExplorerFolderView.dataModelIndex || _fileExplorerFolderView.dataModelIndex === 0) {
    dir = _fileExplorerDataModel[_fileExplorerFolderView.dataModelIndex].FILE_PATH;
  }

  return dir;
}

function _addFolderOnClick(dir, folder) {
  // define request config
  var options = {
    method: 'POST',
    url: "".concat(_fileExplorerConfig.api.add, "/folder"),
    payload: JSON.stringify([{
      dir: dir,
      folder: folder
    }]),
    headers: {
      'Content-Type': 'application/json'
    }
  }; // send ajax request to server

  http.sendRequest(options).then(function (res) {
    var data = JSON.parse(res);

    _handleResponse(data, 'add');
  }); // close modal

  _modal.hide();
}

function _getAddFolderFormConfig() {
  var input = _getInput();

  var config = [{
    name: 'modal',
    child: [{
      name: 'dialog',
      child: [{
        name: 'dialog_header',
        child: [{
          name: 'dialog_header_title',
          element: {
            content: 'Add Folder'
          }
        }]
      }, {
        name: 'dialog_body',
        element: {
          value: function value() {
            var div = document.createElement('div');
            div.appendChild(input);
            return div;
          }
        },
        style: 'min-height:40px;'
      }, {
        name: 'dialog_footer',
        child: [{
          name: 'dialog_footer_child',
          child: [{
            name: 'dialog_footer_button_two',
            style: 'display:none;'
          }, {
            name: 'dialog_footer_button_one',
            element: {
              content: 'Add Folder'
            },
            style: 'background-color:#007bff;',
            onclick: function onclick() {
              var folder = input.value;

              var dir = _getCurrentDirectory();

              _addFolderOnClick(dir, folder);
            }
          }]
        }]
      }]
    }]
  }];
  return config;
}

function _stripLastItem(filePath) {
  var arr = filePath.split('/');
  var stripped = '';

  for (var i = 0; i < arr.length - 1; i++) {
    var row = arr[i];

    if (row && row !== '') {
      if (stripped !== '') {
        stripped += "/".concat(arr[i]);
      } else {
        stripped += "".concat(arr[i]);
      }
    }
  }

  return stripped;
}

function _deleteItemOnClick() {
  var state = tableator.getState();
  var onMouseDownRow = state.onMouseDownRow;
  var item = onMouseDownRow.data; // tableator must have had a hovered row assigned to attempt deletion

  if (item) {
    var type = item.ICON_TYPE;
    var payload;

    if (type === 'file') {
      payload = [{
        dir: _stripLastItem(item.FILE_PATH),
        file: item.NAME
      }];
    } else if (type === 'folder') {
      payload = [{
        dir: _stripLastItem(item.FILE_PATH),
        folder: item.NAME
      }];
    } // define request config


    var options = {
      method: 'POST',
      url: "".concat(_fileExplorerConfig.api["delete"], "/").concat(type),
      payload: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    }; // send ajax request to server

    http.sendRequest(options).then(function (res) {
      var data = JSON.parse(res);

      _handleResponse(data, 'delete');
    });
  } // close modal


  _modal.hide();
}

function _getDeleteFormConfig() {
  var tableState = tableator.getState();
  var deleteItem = tableState.onMouseDownRow.data;
  var config = [{
    name: 'modal',
    child: [{
      name: 'dialog',
      child: [{
        name: 'dialog_header',
        child: [{
          name: 'dialog_header_title',
          element: {
            content: 'Delete Item'
          }
        }]
      }, {
        name: 'dialog_body',
        element: {
          value: function value() {
            var div = document.createElement('div');
            div.innerHTML = "Are you sure you want to delete to following item?\n              <br></br><br>".concat(deleteItem.NAME, "</br><br></br>\n              This action is irreversible.");
            return div;
          }
        },
        style: 'min-height:40px;'
      }, {
        name: 'dialog_footer',
        child: [{
          name: 'dialog_footer_child',
          child: [{
            name: 'dialog_footer_button_two',
            style: 'display:none;'
          }, {
            name: 'dialog_footer_button_one',
            element: {
              content: 'Delete Item'
            },
            style: 'background-color: red;',
            onclick: _deleteItemOnClick
          }]
        }]
      }]
    }]
  }];
  return config;
}

function _renameItemOnClick(item, newName) {
  // tableator must have had a hovered row assigned to attempt rename
  if (item) {
    var type = item.ICON_TYPE;
    var payload;

    var filePath = _stripLastItem(item.FILE_PATH);

    if (type === 'file') {
      payload = [{
        OLD_DIR: filePath,
        OLD_FILE: item.NAME,
        NEW_DIR: filePath,
        NEW_FILE: newName,
        TYPE: 'file'
      }];
    } else if (type === 'folder') {
      payload = [{
        OLD_DIR: filePath,
        OLD_FOLDER: item.NAME,
        NEW_DIR: filePath,
        NEW_FOLDER: newName,
        TYPE: 'folder'
      }];
    } // define request config


    var options = {
      method: 'POST',
      url: "".concat(_fileExplorerConfig.api.update, "/").concat(type),
      payload: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    }; // send ajax request to server

    http.sendRequest(options).then(function (res) {
      var data = JSON.parse(res);

      _handleResponse(data, 'update');
    });
  } // close modal


  _modal.hide();
}

function _getRenameFormConfig() {
  var input = _getInput();

  var tableState = tableator.getState();
  var renameItem = tableState.onMouseDownRow.data;
  var config = [{
    name: 'modal',
    child: [{
      name: 'dialog',
      child: [{
        name: 'dialog_header',
        child: [{
          name: 'dialog_header_title',
          element: {
            content: 'Rename Item'
          }
        }]
      }, {
        name: 'dialog_body',
        element: {
          value: function value() {
            var div = document.createElement('div'); // add a warning that the current item is about to be renamed

            var renameWarningDiv = document.createElement('div');
            div.innerHTML = "Are you sure you want to rename the following item?\n              <br></br><br>".concat(renameItem.NAME, "</br><br></br>\n              This action is irreversible.<br></br>");
            div.appendChild(renameWarningDiv); // add input for user to place new name into

            div.appendChild(input);
            return div;
          }
        },
        style: 'min-height:40px;'
      }, {
        name: 'dialog_footer',
        child: [{
          name: 'dialog_footer_child',
          child: [{
            name: 'dialog_footer_button_two',
            style: 'display:none;'
          }, {
            name: 'dialog_footer_button_one',
            element: {
              content: 'Rename Item'
            },
            style: 'background-color:red;',
            onclick: function onclick() {
              var newName = input.value;

              _renameItemOnClick(renameItem, newName);
            }
          }]
        }]
      }]
    }]
  }];
  return config;
}

function _showForm(config) {
  if (_modal) {
    // remove any existing modal from DOM
    _modal.remove();
  } // create modal


  var modal = modalator.buildModal(config); // display modal

  modal.show(); // save modal in private variable for tracking state

  _modal = modal;
}

function _addFile() {
  var restApi = "".concat(_fileExplorerConfig.api.add, "/file"); // get directory for adding files to

  var dir = _getCurrentDirectory(); // define modal configuration


  var config = _getAddFileFormConfig(restApi, dir);

  _showForm(config);
}

function _addFolder() {
  var config = _getAddFolderFormConfig();

  _showForm(config);
}

function _delete() {
  var config = _getDeleteFormConfig();

  _showForm(config);
}

function _rename() {
  var config = _getRenameFormConfig();

  _showForm(config);
}

function _downloadFile() {
  // get state of tableator
  var state = tableator.getState();
  var onHoverRow = state.onHoverRow;
  var filePath = onHoverRow.data.FILE_PATH;
  var fileName = onHoverRow.data.NAME;
  var type = onHoverRow.data.ICON_TYPE;

  if (fileName && filePath && type === 'file') {
    var link = document.createElement('a');
    link.download = fileName;
    link.href = "".concat(_fileExplorerConfig.api.download).concat(filePath);
    link.click();
    link.remove();
  }
}

function _getContextMenu() {
  var options = {
    // div to apply custom context menu to
    div: _fileExplorerConfig.ui.tableDiv,
    // renderer for applying css and styles to entire context menu
    // 'menuRenderer': null,
    // renderer for applying css and styles to each row in the context menu
    // 'itemRenderer': null,
    // menu items and sub items
    items: {
      Download: _downloadFile,
      Add: {
        Folder: _addFolder,
        File: _addFile
      },
      Delete: _delete,
      Rename: _rename
    }
  };
  contextmenuator.init(options);
}

function _getFolderView(dataModelIndex, data) {
  // capture state of folder view
  _fileExplorerFolderView = {
    dataModelIndex: dataModelIndex,
    data: data
  }; // destroy existing table

  var table = document.getElementById(_fileExplorerConfig.ui.tableDiv);

  while (table.firstChild) {
    table.removeChild(table.lastChild);
  } // construct new table


  var options = {
    div: _fileExplorerConfig.ui.tableDiv,
    data: data,
    // renderer: null,
    headers: {
      displayNames: true,
      sourceNames: ['NAME', 'SIZE', 'LAST_EDIT_DATE'],
      names: ['Name', 'Size', 'Last Edit Date'],
      widths: ['50%', '25%', '25%'],
      alignment: ['left', 'center', 'center'] // renderer: null

    },
    rows: {
      // renderer: null,
      rowTypeIcons: 'filesystem'
    },
    cells: {
      // onClick: null,
      onDblClick: function onDblClick(tr, td, rowNo, rowData) {
        // find position of filePath in tree data
        var treePos = _findPositionInTree(rowData.FILE_PATH, _fileExplorerDataModel); // update tree single & double clicked row


        _updateTreeClickedItem(treePos); // update breadcrumb menu


        _reloadBreadCrumb(_fileExplorerDataModel[treePos], _fileExplorerDataModel); // update directory


        if (rowData.ICON_TYPE === 'folder') {
          // get all children of current row
          var children = treeator.getChildren(treePos, _fileExplorerDataModel);

          var folderData = _addEmptyRow(children, _fileExplorerDataModel[treePos].FILE_PATH);

          _getFolderView(treePos, folderData);
        } else {// TO DO - Display a drawer or information panel on clicked item
        }
      } // onHover: null,
      // renderer: null

    }
  };
  tableator.init(options);

  _getContextMenu();
}

function _getFileFolderDetails(change) {
  var o = {
    oldFilePath: '',
    newFilePath: '',
    newName: ''
  };

  if (change.TYPE === 'folder') {
    o.oldFilePath = "/".concat(change.OLD_DIR, "/").concat(change.OLD_FOLDER);
    o.newFilePath = "/".concat(change.NEW_DIR, "/").concat(change.NEW_FOLDER);
    o.newName = change.NEW_FOLDER;
  } else if (change.TYPE === 'file') {
    o.oldFilePath = "/".concat(change.OLD_DIR, "/").concat(change.OLD_FILE);
    o.newFilePath = "/".concat(change.NEW_DIR, "/").concat(change.NEW_FILE);
    o.newName = change.NEW_FILE;
  }

  return o;
}

function _getUpdateRecord(change) {
  var d = _getFileFolderDetails(change); // determine position of item to update


  var position = _findPositionInTree(d.oldFilePath, _fileExplorerDataModel); // create change configuration for tree updates


  return {
    position: position,
    // updates to data structure
    updates: [{
      property: 'NAME',
      value: d.newName
    }, {
      property: 'FILE_PATH',
      value: d.newFilePath
    }],
    childUpdates: [{
      property: 'FILE_PATH',
      findStartsWithString: d.oldFilePath,
      replaceString: d.newFilePath
    }],
    // updates to user interface
    htmlUpdates: [{
      column: 0,
      value: d.newName
    }]
  };
}

function _getAddRecord(change, tableDepth, tableIndex) {
  // create record to insert into interface at appropriate locations
  var row = {
    // calculate depth of row to insert
    DATA_DEPTH: tableDepth + 1,
    NAME: change.NAME,
    ICON_TYPE: change.ICON_TYPE,
    SIZE: change.SIZE,
    LAST_EDIT_DATE: change.LAST_EDIT_DATE,
    FILE_PATH: change.FILE_PATH
  }; // determine position to insert new record into tree

  var position = treeator.findLastChild(tableIndex || 0, _fileExplorerDataModel); // create change configuration for tree updates

  return {
    position: position + 1,
    data: row
  };
}

function _getDeleteRecord(change) {
  // determine position of item to delete
  var position = _findPositionInTree(change.FILE_PATH, _fileExplorerDataModel); // create change configuration for tree updates


  return {
    position: position
  };
}

function _updateTree(changeType, records) {
  if (changeType === 'add') {
    // add elements to tree and push passed updates to tree data model.
    treeator.appendTreeRecords(records);
  } else if (changeType === 'delete') {
    // add elements to tree and push passed updates to tree data model.
    treeator.removeTreeRecords(records);
  } else if (changeType === 'update') {
    // add elements to tree and push passed updates to tree data model.
    treeator.updateTreeRecords(records);
  }
}

function _updateUserInterface(changes, changeType) {
  var records = [];
  var tableIndex = _fileExplorerFolderView.dataModelIndex;
  var tableDepth = -1; // check if a folder has been loaded

  if (tableIndex || tableIndex === 0) {
    tableDepth = _fileExplorerDataModel[tableIndex].DATA_DEPTH;
  } // loop through list of changes returned by server


  for (var i = 0; i < changes.length; i++) {
    var change = changes[i];
    var record = void 0;

    if (changeType === 'add') {
      // prepare data for updating the file tree
      record = _getAddRecord(change, tableDepth, tableIndex);
      records.push(record); // update table data model so that table is refreshed with correct information on rebuild
      // push to second last position in table so it appears above the "add new row" placeholder

      _fileExplorerFolderView.data.splice(_fileExplorerFolderView.data.length - 1, 0, record.data);
    } else if (changeType === 'delete') {
      // prepare data for updating the file tree
      record = _getDeleteRecord(change);
      records.push(record); // find position of record in folder view

      var index = _findPositionInTree(change.FILE_PATH, _fileExplorerFolderView.data); // remove record from index in folder view


      _fileExplorerFolderView.data.splice(index, 1);
    } else if (changeType === 'update') {
      // prepare data for updating the file tree
      record = _getUpdateRecord(change);
      records.push(record); // update record details

      var d = _getFileFolderDetails(change);

      var oldFilePath = d.oldFilePath;
      var newFilePath = d.newFilePath;
      var newName = d.newName;

      var _index = _findPositionInTree(oldFilePath, _fileExplorerFolderView.data);

      var updateRecord = _fileExplorerFolderView.data[_index];
      updateRecord.NAME = newName;
      updateRecord.FILE_PATH = newFilePath;
    }
  } // total rebuild of table


  _getFolderView(tableIndex, _fileExplorerFolderView.data); // update existing tree


  _updateTree(changeType, records);
}

function _getTree(data) {
  var treeOptions = {
    tree: {
      div: _fileExplorerConfig.ui.treeDiv,
      data: data,
      // renderer: null,
      columns: {
        sourceNames: ['NAME'],
        newNames: ['name'],
        widths: [250],
        alignment: ['left']
      },
      rows: {
        // collapseIcon: null,
        // expandIcon: null,
        rowTypeIcons: 'filesystem',
        // renderer: null,
        // onClick: null,
        onDblClick: function onDblClick(tr, row, pos) {
          _reloadBreadCrumb(row, data);

          _reloadTable(row, pos, data);
        } // onHover: null,
        // onHoverOut: null

      },
      cells: {// renderer: null
      }
    },
    search: {
      div: "".concat(_fileExplorerConfig.ui.treeSearchDiv, "_input")
    }
  };
  return treeOptions;
}

function _getToolbarSearch() {
  var toolbarSearchOptions = {
    div: _fileExplorerConfig.ui.tableSearchDiv,
    // Custom renderer required to override default name of element so that the
    // treeator search has a unique element to target
    renderer: function inputRenderer() {
      var e = {};
      e.id = "".concat(_fileExplorerConfig.ui.tableSearchDiv, "_input");
      e.name = 'search';
      e.placeholder = 'Search Folder';
      e.style = {
        'font-size': '16px',
        'font-family': 'roboto',
        padding: '10px',
        boxSizing: 'border-box',
        width: '100%',
        border: 'solid 1px rgba(0,0,0,.125)',
        borderRadius: '3px',
        textIndent: '30px',
        backgroundColor: 'rgba(241,243,244,1)'
      };
      return e;
    },
    // onClick: null,
    // onFocusOut: null,
    // onHover: null,
    onKeyUp: function onKeyUp() {
      tableator.searchTable(_fileExplorerConfig.ui.tableDiv, "".concat(_fileExplorerConfig.ui.tableSearchDiv, "_input"));
    },
    icon: {// innerHTML: null,
      // renderer: null
    }
  };
  inputator.init(toolbarSearchOptions);
}

function _getTreeSearch(treeOptions) {
  var treeSearchOptions = {
    div: _fileExplorerConfig.ui.treeSearchDiv,
    renderer: function inputRenderer() {
      var e = {}; // give input a unique name to avoid conflicts with other search boxes

      e.id = "".concat(_fileExplorerConfig.ui.treeSearchDiv, "_input"); // set value of input so file tree loads with default filter

      e.value = _fileExplorerConfig.defaultTreeSearchValue || '';
      e.name = 'search';
      e.placeholder = 'Search Directory';
      e.style = {
        'font-size': '16px',
        'font-family': 'roboto',
        padding: '10px',
        boxSizing: 'border-box',
        width: '100%',
        border: 'solid 1px rgba(0,0,0,.125)',
        borderRadius: '3px',
        textIndent: '30px',
        backgroundColor: 'rgba(241,243,244,1)'
      };
      return e;
    },
    // onClick: null,
    // onFocusOut: null,
    // onHover: null,
    onKeyUp: function onKeyUp() {
      treeator.searchTable("".concat(_fileExplorerConfig.ui.treeSearchDiv, "_input"), 'treeator-tree', _fileExplorerConfig.ui.treeDiv, treeOptions);
    },
    icon: {// innerHTML: null,
      // renderer: null
    }
  };
  inputator.init(treeSearchOptions);
}

function _getFileSystemData() {
  // define request config
  var options = {
    method: 'GET',
    url: _fileExplorerConfig.api.directory,
    headers: {
      'Content-Type': 'application/json'
    }
  }; // send ajax request to server

  return http.sendRequest(options);
}
/* ============================== Public Methods ============================ */


function init(config) {
  // sets functions containing object property
  _fileExplorerConfig = config; // get file system data for navigating
  // store data in global object so it can be shared between all modules

  _getFileSystemData().then(function (res) {
    var data = JSON.parse(res);
    _fileExplorerDataModel = data[0].data; // construct tree view of data

    var treeOptions = _getTree(_fileExplorerDataModel);

    _getBreadcrumb([]);

    _getToolbarSearch();

    _getTreeSearch(treeOptions); // tree must be initialised after input so it pre loads with a filter if applicable


    treeator.init(treeOptions);

    _getFolderView(null, _addEmptyRow([], _fileExplorerDataModel[0].FILE_PATH));
  });
}
/* =========================== Export Public APIs =========================== */


module.exports = {
  init: init
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * npm Entry File
 * (c) 2020 Joshua Adams
 */

/**
 * index.js is the default 'entry file' for npm.
 * This means that any require('package name') or import 'package name'
 * statements will refer to this file.
 */
const pkg = __webpack_require__(6);
// export a file with the same name as the package by default
module.exports = __webpack_require__(7)(`./${pkg.name}.js`);

/***/ }),
/* 6 */
/***/ (function(module) {

module.exports = JSON.parse("{\"_from\":\"breadcrumbjs@^1.0.3\",\"_id\":\"breadcrumbjs@1.0.4\",\"_inBundle\":false,\"_integrity\":\"sha512-yWk+1gP7Q/jule42a+McQ5X7wG2WP5VxMiHUzA4dE2iQUCVxDO2t3g3ALwu+hqwaOHLlZn5BUYvHQqLRCeZdnw==\",\"_location\":\"/breadcrumbjs\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"range\",\"registry\":true,\"raw\":\"breadcrumbjs@^1.0.3\",\"name\":\"breadcrumbjs\",\"escapedName\":\"breadcrumbjs\",\"rawSpec\":\"^1.0.3\",\"saveSpec\":null,\"fetchSpec\":\"^1.0.3\"},\"_requiredBy\":[\"#USER\",\"/\"],\"_resolved\":\"https://registry.npmjs.org/breadcrumbjs/-/breadcrumbjs-1.0.4.tgz\",\"_shasum\":\"58e70dd6c9268be81f9d939696a9857706b30463\",\"_spec\":\"breadcrumbjs@^1.0.3\",\"_where\":\"C:\\\\repos\\\\fileexplorerjs\",\"author\":{\"name\":\"Joshua Adams\"},\"bugs\":{\"url\":\"https://github.com/Joshua-W-Adams/breadcrumb.js/issues\"},\"bundleDependencies\":false,\"dependencies\":{\"gulp-nodemon\":\"^2.5.0\"},\"deprecated\":false,\"description\":\"JavaScript component for creating breadcrumb menus\",\"devDependencies\":{\"@babel/core\":\"^7.8.4\",\"@babel/preset-env\":\"^7.8.4\",\"babel-loader\":\"^8.0.6\",\"eslint-config-airbnb-base\":\"^14.0.0\",\"eslint-plugin-import\":\"^2.20.0\",\"express\":\"^4.17.1\",\"gulp\":\"^4.0.2\",\"gulp-concat\":\"^2.6.1\",\"gulp-eslint\":\"^6.0.0\",\"gulp-minify-css\":\"^1.2.4\",\"gulp-rename\":\"^2.0.0\",\"gulp-sass\":\"^4.0.2\",\"gulp-stylelint\":\"^13.0.0\",\"stylelint\":\"^13.0.0\",\"stylelint-config-recommended\":\"^3.0.0\",\"webpack-stream\":\"^5.2.1\"},\"homepage\":\"https://github.com/Joshua-W-Adams/breadcrumb.js#readme\",\"license\":\"ISC\",\"main\":\"index.js\",\"name\":\"breadcrumbjs\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/Joshua-W-Adams/breadcrumb.js.git\"},\"version\":\"1.0.4\"}");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./breadcrumbjs.js": 8
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 7;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*!
 * Breadcrumb.js
 * JavaScript component for creating breadcrumb menus
 * (c) 2020 Joshua Adams
 */

/* ============================== Import Modules ============================ */

// N/A

/* ================================ Variables =============================== */

let onHoverRow = {
  style: {}
};

/* ============================= Private Methods ============================ */

function _addElement(parent, type) {
  const element = document.createElement(type);
  parent.appendChild(element);
  return element;
}

function _onHoverDefault(li) {
  if (onHoverRow !== li) {
    // clear current styling
    onHoverRow.style.textDecoration = '';
    onHoverRow.style.color = '#007bff';
    // set new row
    onHoverRow = li;
    // set default styling
    li.style.textDecoration = 'underline';
    li.style.color = '#333';
  }
}

function _onClickDefault() {

}

function _onDblClickDefault() {

}

function _containerRenderer() {
  const container = {};
  container.className = 'breadcrumb-menu';
  container.style = {
    // generic styling for all modules
    'font-size': '16px',
    'font-family': 'roboto',
    'margin': '0px',
    padding: '10px',
    // specific module styling
    display: 'flex',
    'flex-wrap': 'wrap',
    'list-style': 'none',
  };
  return container;
}

function _liRenderer() {
  const li = {};
  li.className = 'breadcrumb-menu__li';
  li.style = {
    display: 'inline-block',
    color: '#007bff'
  };
  return li;
}

function _separatorRenderer() {
  const sep = {};
  sep.className = 'breadcrumb-menu__separator';
  sep.style = {
    display: 'inline-block',
    padding: '0 0.5rem 0 0.5rem',
    color: '#6c757d'
  };
  return sep;
}

function _applyRender(element, properties) {
  const arr = Object.keys(properties);
  for (let i = 0; i < arr.length; i++) {
    const prop = arr[i];
    if (typeof properties[prop] === 'object' && properties[prop] !== null) {
      Object.assign(element[prop], properties[prop]);
    } else {
      element[prop] = properties[prop];
    }
  }
  return element;
}

function _addSeparator(ol) {
  const separator = _addElement(ol, 'span');
  separator.innerHTML = '/';
  const render = _separatorRenderer();
  _applyRender(separator, render);
  return separator;
}

function _addBreadcrumbs(ol, options) {
  const arr = options.breadcrumbs.items;
  // loop through all breadcrumb menu items and add to menu
  for (let i = 0; i < arr.length; i++) {
    const breadcrumb = arr[i];
    // Get user configuration for each item
    const cnf = {
      onClick: breadcrumb.onClick || options.breadcrumbs.onClick || _onClickDefault,
      onDblClick: breadcrumb.onDblClick || options.breadcrumbs.onDblClick || _onDblClickDefault,
      onHover: breadcrumb.onHover || options.breadcrumbs.onHover || _onHoverDefault,
      renderer: breadcrumb.renderer || options.breadcrumbs.renderer || _liRenderer
    };
    // add breadcrumb elements
    const li = _addElement(ol, 'li');
    const a = _addElement(li, 'a');
    // Add value
    a.innerHTML = arr[i].item;
    // calculate element css styling with supplied or default renderer
    const render = cnf.renderer(breadcrumb);
    // configure element
    _applyRender(li, render);
    // add separator
    if (i < arr.length - 1) {
      _addSeparator(ol);
    }
    // apply menu item functionality
    li.onclick = function onclick() {
      return cnf.onClick(li, arr, i);
    };
    li.ondblclick = function ondblclick() {
      return cnf.onDblClick(li, arr, i);
    };
    li.onmouseover = function onmouseover() {
      return cnf.onHover(li, arr, i);
    };
    li.onmouseout = function onmouseout() {
      return cnf.onHover(li, arr, i);
    };
  }
}

function _addContainer(frag, options) {
  const cnf = {
    renderer: options.render || _containerRenderer
  };
  // add basic breacrumb structure
  const nav = _addElement(frag, 'nav');
  const ol = _addElement(nav, 'ol');
  // calculate element css styling with supplied or default renderer
  const render = cnf.renderer(ol);
  // configure element
  _applyRender(ol, render);
  return ol;
}

/* ============================== Public Methods ============================ */

/**
 * init - constructor for generating  breadcrumb menu. Accepts the following
 * configuration options.
   const options = {
     'div': 'container',
     'renderer': null,
     'breadcrumbs': {
       'renderer': null,
       'onClick': null,
       'onDblClick': null,
       'onHover': null,
       'items': [{
         'item': 'Photos',
         'renderer': null,
         'onClick': null,
         'onDblClick': null,
         'onHover': null
       }]
     }
   }
 */
function init(options) {
  // Create DOM fragment
  const frag = document.createDocumentFragment();
  // Add container elements
  const ol = _addContainer(frag, options);
  // Add breadcrumb menu items
  _addBreadcrumbs(ol, options);
  // Append fragment to DOM
  const div = document.getElementById(options.div);
  div.appendChild(frag);
}

/* =========================== Export Public APIs =========================== */

module.exports = {
  init
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * npm Entry File
 * (c) 2020 Joshua Adams
 */

/**
 * index.js is the default 'entry file' for npm.
 * This means that any require('package name') or import 'package name'
 * statements will refer to this file.
 */
const pkg = __webpack_require__(10);
// export a file with the same name as the package by default
module.exports = __webpack_require__(11)(`./${pkg.name}.js`);

/***/ }),
/* 10 */
/***/ (function(module) {

module.exports = JSON.parse("{\"_from\":\"inputator@^1.0.0\",\"_id\":\"inputator@1.0.1\",\"_inBundle\":false,\"_integrity\":\"sha512-woi+PnIYRU1RceP/zhaVe3BUfp9lVZHYe6P2IUxUdhYfFSDfrxpO5pnQ9ptHih12P4LQIXkCRl2tZ1dYIRr7/w==\",\"_location\":\"/inputator\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"range\",\"registry\":true,\"raw\":\"inputator@^1.0.0\",\"name\":\"inputator\",\"escapedName\":\"inputator\",\"rawSpec\":\"^1.0.0\",\"saveSpec\":null,\"fetchSpec\":\"^1.0.0\"},\"_requiredBy\":[\"#USER\",\"/\"],\"_resolved\":\"https://registry.npmjs.org/inputator/-/inputator-1.0.1.tgz\",\"_shasum\":\"80db1e496cf6efcc9fdfcbfe5d922192716c2e33\",\"_spec\":\"inputator@^1.0.0\",\"_where\":\"C:\\\\repos\\\\fileexplorerjs\",\"author\":{\"name\":\"Joshua Adams\"},\"bugs\":{\"url\":\"https://github.com/Joshua-W-Adams/input.js/issues\"},\"bundleDependencies\":false,\"dependencies\":{\"gulp-nodemon\":\"^2.5.0\"},\"deprecated\":false,\"description\":\"A JavaScript component for generating html input elements\",\"devDependencies\":{\"@babel/core\":\"^7.8.4\",\"@babel/preset-env\":\"^7.8.4\",\"babel-loader\":\"^8.0.6\",\"eslint-config-airbnb-base\":\"^14.0.0\",\"eslint-plugin-import\":\"^2.20.0\",\"express\":\"^4.17.1\",\"gulp\":\"^4.0.2\",\"gulp-concat\":\"^2.6.1\",\"gulp-eslint\":\"^6.0.0\",\"gulp-minify-css\":\"^1.2.4\",\"gulp-rename\":\"^2.0.0\",\"gulp-sass\":\"^4.0.2\",\"gulp-stylelint\":\"^13.0.0\",\"stylelint\":\"^13.0.0\",\"stylelint-config-recommended\":\"^3.0.0\",\"webpack-stream\":\"^5.2.1\"},\"homepage\":\"https://github.com/Joshua-W-Adams/input.js#readme\",\"license\":\"ISC\",\"main\":\"index.js\",\"name\":\"inputator\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/Joshua-W-Adams/input.js.git\"},\"version\":\"1.0.1\"}");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./inputator.js": 12
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 11;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

/*!
 * Input.js
 * JavaScript component for generating input UI elements
 * (c) 2020 Joshua Adams
 */

/* ============================== Import Modules ============================ */

// N/A

/* ================================ Variables =============================== */

// clears input on key up (typing) operations from the stack que
let timeoutVariable;

/* ============================= Private Methods ============================ */

function _addElement(parent, type) {
  const element = document.createElement(type);
  parent.appendChild(element);
  return element;
}

function _onHoverDefault() {

}

function _onClickDefault(element) {
  // set default styling
  element.style.backgroundColor = 'rgba(206,230,253,1)';
  element.style.outline = 'none';
}

function _onFocusOutDefault(element) {
  // set default styling
  element.style.backgroundColor = 'rgba(241,243,244,1)';
}

function _onKeyUpDefault() {

}

function _containerRenderer() {
  const e = {};
  e.id = 'inputjs-container';
  e.className = 'inputjs-container';
  e.style = {
    position: 'relative',
    boxSizing: 'border-box',
  };
  return e;
}

function _iconRenderer() {
  const e = {};
  e.id = 'inputjs-container__icon';
  e.className = 'inputjs-container__icon';
  e.style = {
    'font-size': '30px',
    boxSizing: 'border-box',
    opacity: '0.5'
  };
  return e;
}

function _inputRenderer() {
  const e = {};
  e.id = 'inputjs-container__input';
  e.className = 'inputjs-container__input';
  e.name = 'search';
  e.placeholder = 'Input Search Value';
  e.style = {
    'font-size': '16px',
    'font-family': 'roboto',
    padding: '10px',
    boxSizing: 'border-box',
    width: '100%',
    border: 'solid 1px rgba(0,0,0,.125)',
    borderRadius: '3px',
    textIndent: '30px',
    backgroundColor: 'rgba(241,243,244,1)'
  };
  return e;
}

function _applyRender(element, properties) {
  const arr = Object.keys(properties);
  for (let i = 0; i < arr.length; i++) {
    const prop = arr[i];
    if (typeof properties[prop] === 'object' && properties[prop] !== null) {
      Object.assign(element[prop], properties[prop]);
    } else {
      element[prop] = properties[prop];
    }
  }
  return element;
}

function _addInput(container, options) {
  const cnf = {
    renderer: options.renderer || _inputRenderer,
    onClick: options.onClick || _onClickDefault,
    onFocusOut: options.onFocusOut || _onFocusOutDefault,
    onHover: options.onHover || _onHoverDefault,
    onKeyUp: options.onKeyUp || _onKeyUpDefault
  };
  const e = _addElement(container, 'input');
  const render = cnf.renderer(e);
  _applyRender(e, render);
  // add events
  e.onclick = function onclick() {
    return cnf.onClick(e, _onClickDefault);
  };
  e.addEventListener('focusout', function onfocusout() {
    return cnf.onFocusOut(e, _onFocusOutDefault);
  });
  e.onmouseover = function onmouseover() {
    return cnf.onHover(e, _onHoverDefault);
  };
  e.onkeyup = function onkeyup() {
    clearTimeout(timeoutVariable);
    // add to javascript function que to prevent blocking of front end of
    // application
    timeoutVariable = setTimeout(function cb() {
      cnf.onKeyUp(e, _onKeyUpDefault);
    }, 500);
  };
  return e;
}

function _addInputIcon(container, options) {
  const cnf = {
    renderer: options.icon.renderer || _iconRenderer,
    innerHTML: options.icon.innerHTML || '&#8981;'
  };
  const eContainer = _addElement(container, 'div');
  eContainer.style.display = 'inline-block';
  eContainer.style.boxSizing = 'border-box';
  eContainer.style.position = 'absolute';
  eContainer.style.top = '1.5px';
  eContainer.style.left = '15px';
  const e = _addElement(eContainer, 'div');
  e.innerHTML = cnf.innerHTML;
  const render = cnf.renderer(e);
  _applyRender(e, render);
  return e;
}

function _addInputContainer(frag) {
  const e = _addElement(frag, 'div');
  const render = _containerRenderer();
  _applyRender(e, render);
  return e;
}

/* ============================== Public Methods ============================ */

function init(options) {
  // Create DOM fragment
  const frag = document.createDocumentFragment();
  // add input container
  const container = _addInputContainer(frag, options);
  // add input icon
  _addInputIcon(container, options);
  // add input
  _addInput(container, options);
  // Append fragment to DOM
  const div = document.getElementById(options.div);
  div.appendChild(frag);
}

/* =========================== Export Public APIs =========================== */

module.exports = {
  init
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * npm Entry File
 * (c) 2020 Joshua Adams
 */

/**
 * index.js is the default 'entry file' for npm.
 * This means that any require('package name') or import 'package name'
 * statements will refer to this file.
 */
const pkg = __webpack_require__(14);
// export a file with the same name as the package by default
module.exports = __webpack_require__(15)(`./${pkg.name}.js`);

/***/ }),
/* 14 */
/***/ (function(module) {

module.exports = JSON.parse("{\"_from\":\"treeator@^1.4.2\",\"_id\":\"treeator@1.4.3\",\"_inBundle\":false,\"_integrity\":\"sha512-9eOAURgdWDreC2BFbCavHw9wZ26+Ump6RBHYKb+LWkPPi8wA7skRymjpy/MqkctwGQM60B99MyNRU9tq0ZzM0A==\",\"_location\":\"/treeator\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"range\",\"registry\":true,\"raw\":\"treeator@^1.4.2\",\"name\":\"treeator\",\"escapedName\":\"treeator\",\"rawSpec\":\"^1.4.2\",\"saveSpec\":null,\"fetchSpec\":\"^1.4.2\"},\"_requiredBy\":[\"#USER\",\"/\"],\"_resolved\":\"https://registry.npmjs.org/treeator/-/treeator-1.4.3.tgz\",\"_shasum\":\"9400e6e733b6409041611116fdf54bdb94c10028\",\"_spec\":\"treeator@^1.4.2\",\"_where\":\"C:\\\\repos\\\\fileexplorerjs\",\"author\":{\"name\":\"Joshua Adams\"},\"bugs\":{\"url\":\"https://github.com/Joshua-W-Adams/treeator/issues\"},\"bundleDependencies\":false,\"dependencies\":{\"gulp-nodemon\":\"^2.5.0\"},\"deprecated\":false,\"description\":\"A JavaScript component to create views of tree data structures\",\"devDependencies\":{\"@babel/core\":\"^7.8.4\",\"@babel/preset-env\":\"^7.8.4\",\"babel-loader\":\"^8.0.6\",\"eslint-config-airbnb-base\":\"^14.0.0\",\"eslint-plugin-import\":\"^2.20.0\",\"express\":\"^4.17.1\",\"gulp\":\"^4.0.2\",\"gulp-concat\":\"^2.6.1\",\"gulp-eslint\":\"^6.0.0\",\"gulp-minify-css\":\"^1.2.4\",\"gulp-rename\":\"^2.0.0\",\"gulp-sass\":\"^4.0.2\",\"gulp-stylelint\":\"^13.0.0\",\"inputator\":\"^1.0.1\",\"stylelint\":\"^13.0.0\",\"stylelint-config-recommended\":\"^3.0.0\",\"webpack-stream\":\"^5.2.1\"},\"homepage\":\"https://github.com/Joshua-W-Adams/treeator#readme\",\"license\":\"ISC\",\"main\":\"index.js\",\"name\":\"treeator\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/Joshua-W-Adams/treeator.git\"},\"version\":\"1.4.3\"}");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./treeator.js": 16
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 15;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

/*!
 * Treeator
 * JavaScript component for generating views of tree data structures
 * (c) 2020 Joshua Adams
 */

/* ============================== Import Modules ============================ */

// N/A

/* ================================ Variables =============================== */

// variable to store tree fragment to enable searching operations with
// minimised repaints and reflows
let inMemTree;
// stores the current tree element display so that its state can be tracked
let currentTree;
// store globalOptions for use in calls to treeator after initial construction
let globalOptions;
// track user interaction with tree
let onHoverRow = { style: {} };
let singleClickedRow = { style: {} };
let dblClickedRow = { style: {} };

/* ============================= Private Methods ============================ */

function _handleUndefined(value, returnValue) {
  if (typeof value === 'undefined') {
    return returnValue;
  }
  return value;
}

function _toTitleCase(str) {
  return str.replace(/\w\S*/g,
    function tc(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function _addElement(parent, type) {
  const element = document.createElement(type);
  parent.appendChild(element);
  return element;
}

function _deleteElement(id) {
  const e = document.getElementById(id);
  if (e) {
    e.parentNode.removeChild(e);
  }
}

function onHoverDefault(tr) {
  if (onHoverRow !== tr) {
    // clear current styling
    if (onHoverRow !== singleClickedRow) {
      onHoverRow.style.backgroundColor = '';
    }
    // set new row
    onHoverRow = tr;
    if (tr !== singleClickedRow) {
      // set default styling
      tr.style.backgroundColor = 'rgba(206,230,253,1)';
    }
  }
}

function onClickDefault(tr) {
  if (singleClickedRow !== tr) {
    // clear current styling
    singleClickedRow.style.backgroundColor = '';
    // set new row
    singleClickedRow = tr;
    // set default styling
    tr.style.backgroundColor = 'rgba(28,144,243,1)';
  }
}

function onDblClickDefault(tr) {
  if (dblClickedRow !== tr) {
    // set new row
    dblClickedRow = tr;
  }
}

function _containerRenderer() {
  const container = {};
  container.className = 'treeator-tree';
  container.style = {
    'font-family': 'roboto',
    margin: '0px',
    fontFamily: 'roboto',
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '13px',
    overflow: 'scroll'
  };
  return container;
}

function _rowRenderer() {
  const row = {};
  row.className = '';
  row.style = {
    wordBreak: 'break-all',
    'font-size': '14px'
  };
  return row;
}

function _cellRenderer() {
  const cell = {};
  cell.className = '';
  cell.style = {
    padding: '5px'
  };
  return cell;
}

function _applyRender(element, properties) {
  const arr = Object.keys(properties);
  for (let i = 0; i < arr.length; i++) {
    const prop = arr[i];
    if (typeof properties[prop] === 'object' && properties[prop] !== null) {
      Object.assign(element[prop], properties[prop]);
    } else {
      element[prop] = properties[prop];
    }
  }
  return element;
}

function _addHighlight(tdElement, filter) {
  let t = (tdElement.innerText || tdElement.textContent);
  // flags... ig
  // i = case insensitive
  // g = global. Search for ALL matches in string
  let outerHtml = '';
  // case 1 - one child element to persist (chevron)
  if (tdElement.firstChild && tdElement.firstChild.outerHTML) {
    // persist html
    outerHtml = tdElement.firstChild.outerHTML;
    // remove child text
    t = t.replace(tdElement.firstChild.innerText, '');
    // case 2 - two child elements to persist
    if (tdElement.childNodes[1] && tdElement.childNodes[1].outerHTML) {
      // persist html
      outerHtml = outerHtml + tdElement.childNodes[1].outerHTML;
      // remove child text
      t = t.replace(tdElement.childNodes[1].innerText, '');
    }
  }
  // case 1 - filter passed
  if (filter !== '') {
    tdElement.innerHTML = outerHtml + t.replace(new RegExp(`(${filter})`, 'ig'), '<span style="background-color: yellow;">$1</span>');
  // case 2 - empty filter therefore remove highlight
  } else {
    tdElement.innerHTML = outerHtml + t;
  }
}

function _getParentsToDisplay(parents, depth, previousDepth, tr) {
  // add level to array
  if (!parents[depth]) {
    parents[depth] = [];
  }
  // case 1 - minimum depth reached - reset parents array
  if (depth === 0) {
    parents = [];
    parents[0] = [];
    parents[0].push(tr);
    // case 2 - depth remains the same
  } else if (depth === previousDepth) {
    // reset current depth level
    parents[depth] = [];
    parents[depth].push(tr);
    // case 3 - depth increased
  } else if (depth > previousDepth) {
    parents[depth].push(tr);
    // case 4 - depth decreased
  } else {
    // clear current depth and lower depths
    for (let i = depth; i < parents.length; i++) {
      parents[i] = [];
    }
    parents[depth].push(tr);
  }
  return parents;
}

function _displayParents(parents) {
  if (parents) {
    for (let x = 0; x < parents.length; x++) {
      const depthParents = parents[x];
      if (depthParents) {
        for (let y = 0; y < depthParents.length; y++) {
          depthParents[y].style.display = '';
        }
      }
    }
  }
}

// get all sibling elements until an element with a particular selector is
// encountered. In this case data-depth = current value.
// elem = element to start search with
// selector = css selector pattern to stop at. e.g. class, div, attribute etc.
function _nextUntil(elem, selector, filter, callback) {
  // matches() polyfill
  // normalise behaviour of matches function in older browsers
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector
      || Element.prototype.webkitMatchesSelector;
  }
  // Setup siblings array
  const siblings = [];
  // Get the next sibling element. Sibling immediately after starting element.
  elem = elem.nextElementSibling;
  // Loop through all sibling elements until no sibling is encountered
  while (elem) {
    // If we've reached our match, bail
    if (elem.matches(selector)) break;
    // If filtering by a selector, check if the sibling matches
    if (filter && !elem.matches(filter)) {
      // move to next element
      elem = elem.nextElementSibling;
      // restart loop
      continue;
    }
    // custom callback selector
    if (callback && !callback(elem)) {
      break;
    }
    // Otherwise, push it to the siblings array
    siblings.push(elem);
    // Get the next sibling element
    elem = elem.nextElementSibling;
  }
  return siblings;
}

function _getChildren(parent, depth) {
  return _nextUntil(parent, null, null, function cb(sibling) {
    // get sibling attribute
    const siblingDepth = sibling.getAttribute('data-depth');
    // confirm within allowable depth
    if (depth < siblingDepth) {
      return true;
    }
    return false;
  });
}

function _getParentIndex(elementPosition, data, depth) {
  // loop upwards (backwards) through table array
  // need to start at element position - 1 as element position is
  // the position that the new element is to be inserted into
  for (let i = elementPosition - 1; i > -1; i--) {
    const row = data[i];
    let rowDepth;
    // handle case where user attempts to insert row at end of table
    if (row) {
      rowDepth = row.DATA_DEPTH;
    }
    // parent encountered
    if (rowDepth < depth) {
      return i;
    }
  }
}

function _hide(ele) {
  ele.style.display = 'none';
}

function _show(ele) {
  ele.style.display = '';
}

function _toggleTreeView(options, tableElement) {
  const cnf = {
    collapseIcon: options.tree.rows.collapseIcon || '▾',
    expandIcon: options.tree.rows.expandIcon || '▸'
  };
  // get currently clicked element in table
  const target = tableElement.target; // eslint-disable-line prefer-destructuring
  // get parent table row
  const parent = target.parentNode.parentNode;
  // get data depth value
  const depth = parent.getAttribute('data-depth');
  // only attempt to filter elements if a data depth is detected
  if (depth && depth >= 0) {
    // get all siblings until the next sibling with the same depth is
    // reached
    const children = _getChildren(parent, depth);
    // Remove already collapsed nodes from children so that we don't
    // make them visible.
    // (Confused? Remove this code and close Item 2, close Item 1
    // then open Item 1 again, then you will understand)
    // get all children with expand
    const expandnodes = children.filter(function cb(item) {
      return item.classList.contains('treeator-tree--expand');
    });
    let childrenCopy = children;
    // loop through all collapsed rows
    expandnodes.map(function cb(subnode) { // eslint-disable-line array-callback-return
      // get all children of expand items
      const subnodeDepth = subnode.getAttribute('data-depth');
      const subnodeChildren = _getChildren(subnode, subnodeDepth);
      // remove expand items from display list
      childrenCopy = childrenCopy.filter(function cb(child) {
        for (let i = 0; i < subnodeChildren.length; i++) {
          if (subnodeChildren[i] === child) {
            return false;
          }
        }
        return true;
      });
    });
    // Change icon and hide/show children
    if (target.innerHTML === cnf.collapseIcon) {
      parent.classList.remove('treeator-tree--collapse');
      parent.classList.add('treeator-tree--expand');
      target.innerHTML = cnf.expandIcon;
      // hide all children
      children.map(function cb(e) {
        return _hide(e);
      });
    } else if (target.innerHTML === cnf.expandIcon) {
      // prevents adding chevrons to rows with no children
      parent.classList.remove('treeator-tree--expand');
      parent.classList.add('treeator-tree--collapse');
      target.innerHTML = cnf.collapseIcon;
      // show on specific children
      childrenCopy.map(function cb(e) {
        return _show(e);
      });
    }
  }
}

function _addTreeToDom(treeElement, divId, tableDivId) {
  // remove old tree
  const oldTree = document.getElementById(tableDivId);
  if (oldTree) {
    oldTree.parentNode.removeChild(oldTree);
  }
  // add new filtered tree
  const parent = document.getElementById(divId);
  parent.appendChild(treeElement);
  // set currentTree in state
  currentTree = treeElement;
}

function _displayTree(treeRoot, divId, searchDivId, options) {
  const div = document.getElementById(divId);
  const input = document.getElementById(searchDivId);
  // add filtered tree if applicable
  if (input && input.value) {
    searchTable(searchDivId, 'treeator-tree', divId, options); // eslint-disable-line no-use-before-define
  } else {
    // add tree to DOM
    div.appendChild(treeRoot);
  }
}

function _addHeaders(options, treeRoot) {
  const columnNames = options.tree.columns.sourceNames;
  const newColumnNames = options.tree.columns.newNames;
  const widths = options.tree.columns.widths;
  const display = options.tree.columns.displayNames || false;
  // add tree view header
  const treeHeader = _addElement(treeRoot, 'thead');
  // add headers to header element
  for (let i = 0; i < columnNames.length; i++) {
    // add header
    const th = _addElement(treeHeader, 'th');
    // calculate values
    const header = _toTitleCase(newColumnNames[i]);
    let width;
    if (widths) {
      width = `${widths[i]}px`;
    }
    // apply header styles
    th.width = width;
    // apply header values
    if (display) {
      th.innerHTML = header;
    }
  }
}

function _fileSystemIconLookup() {
  return {
    file: '&#128459;',
    folder: '&#128447;'
  };
}

function _iconLookup(rowTypeIcons) {
  let lookup = {};
  if (rowTypeIcons === 'filesystem') {
    lookup = _fileSystemIconLookup();
  }
  return lookup;
}

function _addRowIcons(row, tableCell, rowTypeIcons) {
  const icon = _addElement(tableCell, 'span');
  const lookup = _iconLookup(rowTypeIcons);
  icon.innerHTML = lookup[row.ICON_TYPE] || '';
  icon.style.padding = '0px 5px 0px 5px';
  icon.style.color = 'rgba(95,99,104,1)';
}

function _addCells(options, row, columns, tableRow, expand) {
  const cnf = {
    expandIcon: options.tree.rows.expandIcon || '▸',
    rowTypeIcons: options.tree.rows.rowTypeIcons || '',
    renderer: options.tree.cells.renderer || _cellRenderer
  };
  for (let n = 0; n < columns.length; n++) {
    const tableCell = _addElement(tableRow, 'td');
    // add indent or chevron into cell
    if (n === 0) {
      const tableCellSpan = _addElement(tableCell, 'span');
      tableCellSpan.style.height = '18px';
      tableCellSpan.style.width = '18px';
      tableCellSpan.style.display = 'inline-block';
      if (expand === 'treeator-tree--expand') {
        tableCellSpan.style.cursor = 'pointer';
        tableCellSpan.style.textAlign = 'center';
        tableCellSpan.innerHTML = cnf.expandIcon;
      }
      // set tablecell indent
      tableCellSpan.style.paddingLeft = `${row.DATA_DEPTH * 15}px`;
      // add row type icons
      _addRowIcons(row, tableCell, cnf.rowTypeIcons);
      // add toggle function to tree elements
      tableCell.onclick = function cb(e) {
        _toggleTreeView(options, e);
      };
    }
    // determine cell alignments
    const alignments = options.tree.columns.alignment;
    const cellValue = _handleUndefined(row[columns[n]], '');
    // add cell content
    tableCell.innerHTML = tableCell.innerHTML + cellValue;
    tableCell.style.textAlign = alignments[n];
    tableCell.style.whiteSpace = 'nowrap';
    tableCell.style.overflow = 'hidden';
    // apply cell renderer
    const render = cnf.renderer();
    _applyRender(tableCell, render);
  }
}

function _addRowEvents(tr, row, pos, options) {
  const cnf = {
    onClick: options.tree.rows.onClick || onClickDefault,
    onDblClick: options.tree.rows.onDblClick || onDblClickDefault,
    onHover: options.tree.rows.onHover || onHoverDefault,
    onHoverOut: options.tree.rows.onHoverOut || function cb() { }
  };
  tr.onclick = function onclick() {
    return cnf.onClick(tr, row, pos);
  };
  tr.ondblclick = function ondblclick() {
    return cnf.onDblClick(tr, row, pos);
  };
  tr.onmouseover = function onmouseover() {
    return cnf.onHover(tr, row, pos);
  };
  tr.onmouseout = function onmouseout() {
    return cnf.onHoverOut(tr, row, pos);
  };
}

function _insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function _addRow(options, tree, row, i, data) {
  const cnf = {
    renderer: options.tree.rows.renderer || _rowRenderer
  };
  let expand = '';
  let display = 'none';
  let colourCode = '';
  // confirm if row element has children
  if (i < data.length - 1) {
    if (row.DATA_DEPTH < (data[i + 1]).DATA_DEPTH) {
      expand = 'treeator-tree--expand';
    }
  }
  // confirm if row should be displayed
  // case 1 - initial construction of tree view
  if (row.DATA_DEPTH === 0) {
    display = '';
    // case 2 - tree already constructed - check parent display status
  } else if (currentTree && i !== 0) {
    // get parent of current element
    const parentRowIndex = _getParentIndex(i, data, row.DATA_DEPTH);
    // check display status of parent
    if (tree.rows[parentRowIndex].className !== 'treeator-tree--expand') {
      display = '';
    }
  }
  // confirm if row should be coloured
  if (row.COLOUR_CODE) {
    colourCode = `rgba(${row.COLOUR_CODE})`;
  }
  // create table row
  const tableRow = document.createElement('tr');
  // apply styling to row
  tableRow.setAttribute('data-depth', row.DATA_DEPTH);
  tableRow.style.display = display;
  tableRow.style.backgroundColor = colourCode;
  const render = cnf.renderer();
  _applyRender(tableRow, render);
  // must occur after the renderer to prevent the class name being overwritten
  tableRow.className = expand;
  // apply row functionality
  _addRowEvents(tableRow, row, i, options);
  // add cells to row
  _addCells(options, row, options.tree.columns.sourceNames, tableRow, expand);
  // append table row to tree body
  const rows = tree.rows;
  const treeBody = tree.tBodies[0];
  // get row at desired insert position
  const insertRow = rows.item(i - 1);
  // case 1 - new table being constructed
  if (!insertRow) {
    // prepend puts element at first position in children array
    treeBody.prepend(tableRow);
    // case 2 - table already exists
  } else {
    // insert new row at specified location
    _insertAfter(tableRow, insertRow);
    // insertRow.parentNode.insertAfter(tableRow, insertRow);
  }
}

function _addRows(options, tree) {
  const data = options.tree.data;
  // add rows to table
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    _addRow(options, tree, row, i, data);
  }
}

/**
 * createTreeView - generate a view of a tree datastructure based on config
 * options passed
 */
function _createTreeView(options, frag) {
  // delete dynamic tree element if it already exists
  _deleteElement('treeator-tree');
  // create new dynamic tree element
  // cellspacing 0 to support IE6 and IE7 - Removes unwanted whitespace between
  // table cells
  const treeRoot = _addElement(frag, 'table');
  treeRoot.id = 'treeator-tree';
  treeRoot.cellSpacing = '0';
  treeRoot.style.tableLayout = 'fixed';
  // add headers to tree
  _addHeaders(options, treeRoot);
  // add table body
  _addElement(treeRoot, 'tbody');
  // add table rows
  _addRows(options, treeRoot);
  // copy tree root to global variable
  inMemTree = treeRoot.cloneNode(true);
  // apply styling to tree view container
  const cnf = { renderer: options.tree.renderer || _containerRenderer };
  const container = document.getElementById(options.tree.div);
  const render = cnf.renderer();
  _applyRender(container, render);
  return treeRoot;
}

/* ============================== Public Methods ============================ */

function searchTable(searchDivId, tableDivId, divId, options) {
  // Declare variables
  const input = document.getElementById(searchDivId);
  const filter = input.value.toUpperCase();
  // create copy of tree to filter and reload into dom
  const table = inMemTree.cloneNode(true);
  const tr = table.getElementsByTagName('tr');
  let parents = [];
  let previousDepth = -1;
  // Only search through table if a input value is provided
  if (filter) {
    // Loop through all table rows, and hide those who don't match the search query
    for (let i = 0; i < tr.length; i++) {
      // track parent elements of current row
      const depth = tr[i].getAttribute('data-depth');
      parents = _getParentsToDisplay(parents, depth, previousDepth, tr[i]);
      // get all table cells
      const td = tr[i].getElementsByTagName('td');
      // loop through all table cells
      let found = false;
      for (let n = 0; n < td.length; n++) {
        const text = (td[n].innerText || td[n].textContent);
        if (text.toUpperCase().indexOf(filter) > -1) {
          found = true;
          _addHighlight(td[n], filter);
        }
      }
      // set display of table row
      if (found) {
        tr[i].style.display = '';
        // fix chevron status to allow drilling down
        tr[i].classList.remove('treeator-tree--collapse');
        tr[i].classList.add('treeator-tree--expand');
        // display parent elements
        _displayParents(parents);
      } else {
        tr[i].style.display = 'none';
      }
      // re-add double click to newly cloned tree
      _addRowEvents(tr[i], options.tree.data[i], i, options);
      previousDepth = depth;
    }
  } else {
    // No input value therefore dont attempt to filter
    // add row events and objects to table
    for (let i = 0; i < tr.length; i++) {
      _addRowEvents(tr[i], options.tree.data[i], i, options);
    }
  }
  // add toggle function to tree elements
  table.onclick = function toggle(e) {
    _toggleTreeView(options, e);
  };
  // replace existing tree view with filtered tree view
  _addTreeToDom(table, divId, tableDivId);
}

function _addRowToDataModel(data, row) {
  const position = row.position;
  const rowData = row.data;
  data.splice(position, 0, rowData);
}

function _getChildrenLength(data, index) {
  let childCount = 0;
  const indexDepth = data[index].DATA_DEPTH;
  // loop through data from from index child to end of data set
  for (let i = index + 1; i < data.length; i++) {
    const rowDepth = data[i].DATA_DEPTH;
    // confirm if row is a child
    if (rowDepth > indexDepth) {
      childCount++;
    } else {
      // exit for loop
      break;
    }
  }
  return childCount;
}

function _removeRowFromDataModel(data, row) {
  const position = row.position;
  const length = _getChildrenLength(data, position);
  data.splice(position, length + 1);
}

function _removeRow(tableElement, data, row) {
  const position = row.position;
  const length = _getChildrenLength(data, position);
  // remove elements and children from dom
  for (let i = 0; i < length + 1; i++) {
    // need to delete from bottom to top to ensure refrernce remain correct
    tableElement.deleteRow(position + length - i);
  }
}

// records = [{
//   position: position in tree to insert
//   data: row of data to insert at position
// }]
function appendTreeRecords(records) {
  // loop through all records
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    // append elements to in memory dom
    _addRow(globalOptions, inMemTree, record.data, record.position, globalOptions.tree.data);
    // append elements to displayed dom
    _addRow(globalOptions, currentTree, record.data, record.position, globalOptions.tree.data);
    // append records to in memory dom model
    _addRowToDataModel(globalOptions.tree.data, record);
  }
}

// records are expected in top to bottom order
// records = [{
//   position: position in tree to remove
// }]
function removeTreeRecords(records) {
  // loop through all records
  for (let i = records.length - 1; i > -1; i--) {
    const record = records[i];
    // remove elements from in memory dom
    _removeRow(inMemTree, globalOptions.tree.data, record);
    // remove elements from displayed dom
    _removeRow(currentTree, globalOptions.tree.data, record);
    // remove records from in memory dom model
    _removeRowFromDataModel(globalOptions.tree.data, record);
  }
}

function _updateChildrenProperties(data, index, childUpdates) {
  const indexDepth = data[index].DATA_DEPTH;
  const start = parseInt(index);
  // loop through data from from index child to end of data set
  for (let i = start + 1; i < data.length; i++) {
    const row = data[i];
    const rowDepth = row.DATA_DEPTH;
    // confirm if row is a child
    if (rowDepth > indexDepth) {
      // loop through all updates for each child
      for (let n = 0; n < childUpdates.length; n++) {
        // get current update
        const update = childUpdates[n];
        const property = update.property;
        const findStartsWithString = update.findStartsWithString;
        const replaceString = update.replaceString;
        if (row[property].startsWith(findStartsWithString)) {
          // update directory
          row[property] = (row[property]).replace(findStartsWithString, replaceString);
        }
      }
    } else {
      // exit for loop
      break;
    }
  }
}

function _updateRowToDataModel(data, row) {
  const rowUpdates = row.updates;
  const position = row.position;
  const childUpdates = row.childUpdates;
  // update record in tree
  if (rowUpdates) {
    for (let i = 0; i < rowUpdates.length; i++) {
      const property = rowUpdates[i].property;
      const value = rowUpdates[i].value;
      data[position][property] = value;
    }
  }
  // update record children in tree
  if (childUpdates) {
    _updateChildrenProperties(data, position, childUpdates);
  }
}

function _setRowDefaultDisplay(check, tr, position) {
  if (check === true) {
    const data = globalOptions.tree.data[position];
    if (data.DATA_DEPTH !== 0) {
      tr.style.display = 'none';
    }
  }
}

function _updateRow(tableElement, row, check) {
  const updates = row.htmlUpdates;
  if (updates) {
    const position = row.position;
    const tr = tableElement.rows[position];
    // update default display status of row
    _setRowDefaultDisplay(check, tr, position);
    for (let i = 0; i < updates.length; i++) {
      const update = updates[i];
      const column = update.column;
      const value = update.value;
      const childNodes = tr.cells[column].childNodes;
      // last node always contains text value
      const lastNode = childNodes[childNodes.length - 1];
      lastNode.data = value;
    }
  }
}

// records = [{
//   position: position of item to update,
//   updates: [{property: "propertyName", value: "value"}, ...],
//   childUpdates: [{property: "FILE_PATH", findStartsWithString: "old_dir",
//                 replaceString: "new_dir"}],
//   htmlUpdates: [{property: "propertyName", value: "value"}, ...]
// }]
function updateTreeRecords(records) {
  // loop through all records
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    // append elements to in memory dom
    _updateRow(inMemTree, record, true);
    // append elements to displayed dom
    _updateRow(currentTree, record, false);
    // append records to in memory dom model
    _updateRowToDataModel(globalOptions.tree.data, record);
  }
}

function findLastChild(parentPos, data) {
  if (!data) {
    data = globalOptions.tree.data;
  }
  const parent = data[parentPos];
  const parentDepth = parent.DATA_DEPTH;
  const startPos = parentPos + 1;
  let childCount = 0;
  for (let i = startPos; i < data.length; i++) {
    const row = data[i];
    const rowDepth = row.DATA_DEPTH;
    if (parentDepth < rowDepth) {
      // case 1 - child record
      childCount++;
    } else if (rowDepth <= parentDepth) {
      // case 2 - sibling or parent encountered - end of children
      if (childCount !== 0) {
        return i - 1;
      } else {
        // handle case that parent has no children
        return null;
      }
    }
  }
  // case 3 - end of dataset
  return data.length - 1;
}

function getChildren(parentPos, data) {
  if (!data) {
    data = globalOptions.tree.data;
  }
  const parent = data[parentPos];
  const parentDepth = parent.DATA_DEPTH;
  const children = [];
  for (let i = parentPos + 1; i < data.length; i++) {
    const row = data[i];
    const rowDepth = row.DATA_DEPTH;
    // case 1 - child found
    if (rowDepth === parentDepth + 1) {
      children.push(data[i]);
    // case 2 - no more children to be found
    } else if (rowDepth <= parentDepth) {
      break;
    }
  }
  return children;
}

function init(options) {
  // create in-memory fragment to store tree DOM elements - limits DOM to one repaint
  const frag = document.createDocumentFragment();
  // add tree container element
  const tree = _createTreeView(options, frag);
  // save tree to memory
  currentTree = tree;
  // save options to memory
  globalOptions = options;
  // display to user
  _displayTree(tree, options.tree.div, options.search.div, options);
}

/* =========================== Export Public APIs =========================== */

module.exports = {
  init,
  searchTable,
  appendTreeRecords,
  onHoverDefault,
  onClickDefault,
  onDblClickDefault,
  removeTreeRecords,
  updateTreeRecords,
  findLastChild,
  getChildren
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * npm Entry File
 * (c) 2020 Joshua Adams
 */

/**
 * index.js is the default 'entry file' for npm.
 * This means that any require('package name') or import 'package name'
 * statements will refer to this file.
 */
const pkg = __webpack_require__(18);
// export a file with the same name as the package by default
module.exports = __webpack_require__(19)(`./${pkg.name}.js`);

/***/ }),
/* 18 */
/***/ (function(module) {

module.exports = JSON.parse("{\"_from\":\"tableator@^1.3.0\",\"_id\":\"tableator@1.3.1\",\"_inBundle\":false,\"_integrity\":\"sha512-bwL1195zBPJzD4YCbCutIac35lQwJjKU86FH/oxth5ViHB1hjrFU+3jBh/f4i1386Xq5atznE9Q2Z72GA9nUoA==\",\"_location\":\"/tableator\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"range\",\"registry\":true,\"raw\":\"tableator@^1.3.0\",\"name\":\"tableator\",\"escapedName\":\"tableator\",\"rawSpec\":\"^1.3.0\",\"saveSpec\":null,\"fetchSpec\":\"^1.3.0\"},\"_requiredBy\":[\"#USER\",\"/\"],\"_resolved\":\"https://registry.npmjs.org/tableator/-/tableator-1.3.1.tgz\",\"_shasum\":\"d2d298f2711afa30ab5e673c8cf31ae0821dd87d\",\"_spec\":\"tableator@^1.3.0\",\"_where\":\"C:\\\\repos\\\\fileexplorerjs\",\"author\":{\"name\":\"Joshua Adams\"},\"bugs\":{\"url\":\"https://github.com/Joshua-W-Adams/table.js/issues\"},\"bundleDependencies\":false,\"dependencies\":{\"gulp-nodemon\":\"^2.5.0\"},\"deprecated\":false,\"description\":\"A simple JavaScript table component\",\"devDependencies\":{\"@babel/core\":\"^7.8.4\",\"@babel/preset-env\":\"^7.8.4\",\"babel-loader\":\"^8.0.6\",\"eslint-config-airbnb-base\":\"^14.0.0\",\"eslint-plugin-import\":\"^2.20.0\",\"express\":\"^4.17.1\",\"gulp\":\"^4.0.2\",\"gulp-concat\":\"^2.6.1\",\"gulp-eslint\":\"^6.0.0\",\"gulp-minify-css\":\"^1.2.4\",\"gulp-rename\":\"^2.0.0\",\"gulp-sass\":\"^4.0.2\",\"gulp-stylelint\":\"^13.0.0\",\"stylelint\":\"^13.0.0\",\"stylelint-config-recommended\":\"^3.0.0\",\"webpack-stream\":\"^5.2.1\"},\"homepage\":\"https://github.com/Joshua-W-Adams/table.js#readme\",\"license\":\"ISC\",\"main\":\"index.js\",\"name\":\"tableator\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/Joshua-W-Adams/table.js.git\"},\"version\":\"1.3.1\"}");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./tableator.js": 20
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 19;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

/*!
 * Table.js
 * Javascript table component
 * (c) 2020 Joshua Adams
 */

/* ============================== Import Modules ============================ */

// N/A

/* ================================ Variables =============================== */

const state = {
  singleClickedRow: {
    visualIndex: null,
    data: {},
    element: {
      style: {}
    }
  },
  dblClickedRow: {
    visualIndex: null,
    data: {},
    element: {
      style: {}
    }
  },
  onHoverRow: {
    visualIndex: null,
    data: {},
    element: {
      style: {}
    }
  },
  onMouseDownRow: {
    visualIndex: null,
    data: {},
    element: {
      style: {}
    }
  }
};

/* ============================= Private Methods ============================ */

function _addElement(parent, type) {
  const element = document.createElement(type);
  parent.appendChild(element);
  return element;
}

function _onHoverDefault(tr, td, rowno, data) {
  if (state.onHoverRow.element !== tr) {
    // clear current styling
    state.onHoverRow.element.style.color = '';
    state.onHoverRow.element.style.backgroundColor = '';
    // set new row
    state.onHoverRow.element = tr;
    // set default styling
    tr.style.backgroundColor = 'rgba(232,240,254)';
    // update data
    state.onHoverRow.data = data;
    // update visual index
    state.onHoverRow.visualIndex = rowno;
  }
}

function _onMouseDownDefault(tr, td, rowno, data) {
  if (state.onMouseDownRow.element !== tr) {
    // clear current styling
    // N/A
    // set new row
    state.onMouseDownRow.element = tr;
    // set default styling
    // N/A
    // update data
    state.onMouseDownRow.data = data;
    // update visual index
    state.onMouseDownRow.visualIndex = rowno;
  }
}

function _onClickDefault(tr, td, rowno, data) {
  if (state.singleClickedRow.element !== tr) {
    // clear current styling
    state.singleClickedRow.element.style.color = '';
    // set new row
    state.singleClickedRow.element = tr;
    // set default styling
    tr.style.color = 'rgba(25,103,210)';
    // update data
    state.singleClickedRow.data = data;
    // update visual index
    state.singleClickedRow.visualIndex = rowno;
  }
}

function _onDblClickDefault(tr, td, rowno, data) {
  if (state.dblClickedRow.element !== tr) {
    // clear current styling
    state.dblClickedRow.element.style.fontWeight = null;
    // set new row
    state.dblClickedRow.element = tr;
    // set default styling
    tr.style.fontWeight = '600';
    // update data
    state.dblClickedRow.data = data;
    // update visual index
    state.dblClickedRow.visualIndex = rowno;
  }
}

function _tableRenderer() {
  const table = {};
  table.className = 'table-table';
  table.style = {};
  table.style.fontFamily = 'roboto';
  table.style.fontSize = '14px';
  table.style.overflow = 'scroll';
  table.style.width = '100%';
  table.cellSpacing = '0';
  return table;
}

function _columnRenderer() {
  const col = {};
  col.className = 'table-table__column';
  col.style = {};
  col.style.height = '48px';
  col.style.textAlign = 'center';
  col.style.borderBottom = 'solid 1px rgba(218,220,224)';
  col.style.borderTop = 'solid 1px rgba(218,220,224)';
  return col;
}

function _rowRenderer() {
  const row = {};
  row.className = 'table-table__row';
  row.style = {};
  row.style.height = '48px';
  return row;
}

function _cellRenderer() {
  const cell = {};
  cell.className = 'table-table__cell';
  cell.style = {};
  cell.style.borderBottom = 'solid 1px #dadce0';
  return cell;
}

function _applyRender(element, properties) {
  const arr = Object.keys(properties);
  for (let i = 0; i < arr.length; i++) {
    const prop = arr[i];
    if (typeof properties[prop] === 'object' && properties[prop] !== null) {
      Object.assign(element[prop], properties[prop]);
    } else {
      element[prop] = properties[prop];
    }
  }
  return element;
}

function _fileSystemIconLookup() {
  return {
    file: '&#128459;',
    folder: '&#128447;'
  };
}

function _iconLookup(rowTypeIcons) {
  let lookup = {};
  if (rowTypeIcons === 'filesystem') {
    lookup = _fileSystemIconLookup();
  }
  return lookup;
}

function _addRowIcons(row, tableCell, rowTypeIcons) {
  const icon = _addElement(tableCell, 'span');
  const lookup = _iconLookup(rowTypeIcons);
  icon.innerHTML = lookup[row.ICON_TYPE] || '';
  icon.style.padding = '0px 5px 0px 5px';
  icon.style.color = 'rgba(95,99,104,1)';
}

function _addCells(tr, data, rowno, options) {
  const cnf = {
    onClick: options.cells.onClick || _onClickDefault,
    onDblClick: options.cells.onDblClick || _onDblClickDefault,
    onHover: options.cells.onHover || _onHoverDefault,
    onMouseDown: options.cells.onMouseDown || _onMouseDownDefault,
    renderer: options.cells.renderer || _cellRenderer,
    rowTypeIcons: options.rows.rowTypeIcons || ''
  };
  const arr = options.headers.sourceNames || Object.keys(data);
  for (let i = 0; i < arr.length; i++) {
    const prop = arr[i];
    const value = data[prop];
    // add dom element
    const td = _addElement(tr, 'td');
    if (i === 0) {
      // add row type icons
      _addRowIcons(data, td, cnf.rowTypeIcons);
    }
    // determine cell alignments
    const alignments = options.headers.alignment;
    td.style.textAlign = alignments[i];
    // calculate element css styling with supplied or default renderer
    const render = cnf.renderer(value, rowno, prop);
    // configure element
    td.innerHTML = td.innerHTML + value;
    _applyRender(td, render);
    // apply cell functionality
    td.onclick = function onclick() {
      return cnf.onClick(tr, td, rowno, data);
    };
    td.ondblclick = function ondblclick() {
      return cnf.onDblClick(tr, td, rowno, data);
    };
    td.onmouseover = function onmouseover() {
      return cnf.onHover(tr, td, rowno, data);
    };
    td.onmousedown = function onmousedown() {
      return cnf.onMouseDown(tr, td, rowno, data);
    };
  }
  return tr;
}

function _addRows(table, options) {
  const cnf = { renderer: options.rows.renderer || _rowRenderer };
  const tbody = _addElement(table, 'tbody');
  // Add table rows
  for (let i = 0; i < options.data.length; i++) {
    // add dom element
    const tr = _addElement(tbody, 'tr');
    // calculate element css styling with supplied or default renderer
    const render = cnf.renderer(i);
    _applyRender(tr, render);
    // add table cells
    const row = options.data[i];
    _addCells(tr, row, i, options);
  }
  return tbody;
}

function _addHeaders(table, options) {
  const cnf = {
    names: options.headers.names || Object.keys(options.data[0]),
    renderer: options.headers.renderer || _columnRenderer,
    widths: options.headers.widths,
    display: options.headers.displayNames || false
  };
  const thead = _addElement(table, 'thead');
  for (let i = 0; i < cnf.names.length; i++) {
    // add element to header
    const th = _addElement(thead, 'th');
    let width;
    if (cnf.widths) {
      width = cnf.widths[i];
    }
    // apply header styles
    th.width = width;
    // calculate element css styling with supplied or default renderer
    const render = cnf.renderer(i);
    // configure element
    if (cnf.display) {
      th.innerHTML = cnf.names[i];
    }
    _applyRender(th, render);
  }
  return thead;
}

function _addTable(frag, options) {
  const cnf = { renderer: options.renderer || _tableRenderer };
  const table = _addElement(frag, 'table');
  const render = cnf.renderer();
  _applyRender(table, render);
  return table;
}

function _addHighlight(tdElement, filter) {
  let t = (tdElement.innerText || tdElement.textContent);
  // flags... ig
  // i = case insensitive
  // g = global. Search for ALL matches in string
  let outerHtml = '';
  if (tdElement.firstChild && tdElement.firstChild.outerHTML) {
    outerHtml = tdElement.firstChild.outerHTML;
    // remove chevron from text
    t = t.replace(tdElement.firstChild.innerText, '');
  }
  if (filter !== '') {
    tdElement.innerHTML = outerHtml + t.replace(new RegExp(`(${filter})`, 'ig'), '<span style="background-color: yellow;">$1</span>');
  } else {
    tdElement.innerHTML = outerHtml + t;
  }
}

/* ============================== Public Methods ============================ */

function getState() {
  return state;
}

function searchTable(tableDivId, searchDivId) {
  // get filter data
  const input = document.getElementById(searchDivId);
  const filter = input.value.toUpperCase();
  // get table rows to search
  const table = document.getElementById(tableDivId);
  const trs = table.getElementsByTagName('tr');
  // Loop through all table rows, and hide those who don't match the search query
  for (let i = 0; i < trs.length; i++) {
    let found = false;
    // get all table cells
    const tds = trs[i].getElementsByTagName('td');
    // loop through all table cells
    for (let n = 0; n < tds.length; n++) {
      const text = (tds[n].innerText || tds[n].textContent);
      if (text.toUpperCase().indexOf(filter) > -1) {
        found = true;
        _addHighlight(tds[n], filter);
      } else {
        // strip out highlighting from cells where no match was found
        // tds[n].innerHTML = text;
      }
    }
    // hide / display row
    if (found) {
      trs[i].style.display = '';
    } else {
      trs[i].style.display = 'none';
    }
  }
}

/**
  * init - constructor for generic table component
  *
  * @param  {type} options {
  *   'div': 'DOM element that table is to be loaded in',
  *   'data': dirData,
  *   'renderer': null,
  *   'headers': {
  *     'names': ['Data Depth', 'Item', 'Description'],
  *     'renderer': null
  *   },
  *   'rows': {
  *     'renderer': null
  *   }
  *   'cells': {
  *     'onClick': null,
  *     'onDblClick': null,
  *     'onHover': null,
  *     'renderer': null
  *   }
  * }
  * @return {}
  */
function init(options) {
  // Create DOM fragment
  const frag = document.createDocumentFragment();
  // Create table
  const table = _addTable(frag, options);
  // Add table headers
  _addHeaders(table, options);
  // Add table data
  _addRows(table, options);
  // Append fragment to DOM
  const div = document.getElementById(options.div);
  div.appendChild(table);
}

/* =========================== Export Public APIs =========================== */

module.exports = {
  init,
  getState,
  searchTable
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * npm Entry File
 * (c) 2020 Joshua Adams
 */

/**
 * index.js is the default 'entry file' for npm.
 * This means that any require('package name') or import 'package name'
 * statements will refer to this file.
 */
const pkg = __webpack_require__(22);
// export a file with the same name as the package by default
module.exports = __webpack_require__(23)(`./${pkg.name}.js`);

/***/ }),
/* 22 */
/***/ (function(module) {

module.exports = JSON.parse("{\"_from\":\"contextmenuator@^1.0.0\",\"_id\":\"contextmenuator@1.0.1\",\"_inBundle\":false,\"_integrity\":\"sha512-n+uGYoU9BEr6znDEDH948Y1mprXLLenwRh0oCj4IuMjAmAD318jVH672KmVV9oxnY0gSMrRUMF2NZmWHlnmI9A==\",\"_location\":\"/contextmenuator\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"range\",\"registry\":true,\"raw\":\"contextmenuator@^1.0.0\",\"name\":\"contextmenuator\",\"escapedName\":\"contextmenuator\",\"rawSpec\":\"^1.0.0\",\"saveSpec\":null,\"fetchSpec\":\"^1.0.0\"},\"_requiredBy\":[\"#USER\",\"/\"],\"_resolved\":\"https://registry.npmjs.org/contextmenuator/-/contextmenuator-1.0.1.tgz\",\"_shasum\":\"ab6fc0f3c9fec3d348b1094deba2ee5d05a4d723\",\"_spec\":\"contextmenuator@^1.0.0\",\"_where\":\"C:\\\\repos\\\\fileexplorerjs\",\"author\":{\"name\":\"Joshua Adams\"},\"bugs\":{\"url\":\"https://github.com/Joshua-W-Adams/context-menu.js/issues\"},\"bundleDependencies\":false,\"dependencies\":{\"gulp-nodemon\":\"^2.5.0\"},\"deprecated\":false,\"description\":\"A JavaScript component for creating custom context menus\",\"devDependencies\":{\"@babel/core\":\"^7.8.4\",\"@babel/preset-env\":\"^7.8.4\",\"babel-loader\":\"^8.0.6\",\"eslint-config-airbnb-base\":\"^14.0.0\",\"eslint-plugin-import\":\"^2.20.0\",\"express\":\"^4.17.1\",\"gulp\":\"^4.0.2\",\"gulp-concat\":\"^2.6.1\",\"gulp-eslint\":\"^6.0.0\",\"gulp-minify-css\":\"^1.2.4\",\"gulp-rename\":\"^2.0.0\",\"gulp-sass\":\"^4.0.2\",\"gulp-stylelint\":\"^13.0.0\",\"stylelint\":\"^13.0.0\",\"stylelint-config-recommended\":\"^3.0.0\",\"webpack-stream\":\"^5.2.1\"},\"homepage\":\"https://github.com/Joshua-W-Adams/context-menu.js#readme\",\"license\":\"ISC\",\"main\":\"index.js\",\"name\":\"contextmenuator\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/Joshua-W-Adams/context-menu.js.git\"},\"version\":\"1.0.1\"}");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./contextmenuator.js": 24
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 23;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

/*!
 * Context Menu
 * UI custom context menu component
 * (c) 2020 Joshua Adams
 */

/* ============================== Import Modules ============================ */

// N/A

/* ================================ Variables =============================== */

// N/A

/* ============================= Private Methods ============================ */

function _addElement(parent, type) {
  const element = document.createElement(type);
  parent.appendChild(element);
  return element;
}

function _removeHoverEffect(menu) {
  const menuitems = menu.children;
  for (let i = 0; i < menuitems.length; i++) {
    const menuitem = menuitems[i];
    menuitem.style.borderLeft = '4px solid transparent';
    menuitem.style.backgroundColor = '';
    if (menuitem.tagName.toLowerCase() === 'menu') {
      menuitem.style.backgroundColor = 'rgba(255,255,255,1)';
      _removeHoverEffect(menuitem);
    }
  }
}

function _addHoverEffect(menuitem) {
  menuitem.style.borderLeft = '4px solid rgba(28,144,243,1)';
  menuitem.style.backgroundColor = 'rgba(232,240,254,1)';
}

function _displaySubMenu(menu, menuitem, submenu) {
  const dims = menuitem.getBoundingClientRect();
  submenu.style.display = 'block';
  submenu.style.left = `${dims.right + parseFloat(menu.style.borderWidth) + 1}px`;
  submenu.style.top = `${dims.top - dims.height / 2}px`;
}

function _displayMenu(event, menu) {
  const tagName = event.target.tagName.toLowerCase();
  if (tagName !== 'menu' && tagName !== 'menuitem') {
    menu.style.display = 'block';
    menu.style.left = `${event.pageX - 10}px`;
    menu.style.top = `${event.pageY - 10}px`;
  }
}

function _hideSubMenus(menu) {
  const menuitems = menu.children;
  for (let i = 0; i < menuitems.length; i++) {
    const menuitem = menuitems[i];
    if (menuitem.tagName.toLowerCase() === 'menu') {
      menuitem.style.display = 'none';
      menuitem.style.left = '';
      menuitem.style.top = '';
      _hideSubMenus(menuitem);
    }
  }
}

function _hideMenu(menu) {
  menu.style.display = 'none';
  menu.style.left = '';
  menu.style.top = '';
  _hideSubMenus(menu);
}

function _addListener(element, menu) {
  if (element.addEventListener) {
    // context menu event listener
    element.addEventListener('contextmenu', function listener(e) {
      _hideMenu(menu);
      _removeHoverEffect(menu);
      _displayMenu(e, menu);
      e.preventDefault();
    }, false);
    // single click event listener - added to entire html document so menu always
    // hiddden no matter where user clicks
    document.addEventListener('click', function listener() {
      _hideMenu(menu);
    }, false);
  } else {
    element.attachEvent('oncontextmenu', function listener() {
      window.event.returnValue = false;
    });
  }
}

function _applyRender(element, properties) {
  const arr = Object.keys(properties);
  for (let i = 0; i < arr.length; i++) {
    const prop = arr[i];
    if (typeof properties[prop] === 'object' && properties[prop] !== null) {
      _applyRender(element[prop], properties[prop]);
    } else {
      element[prop] = properties[prop];
    }
  }
  return element;
}

function _menuRenderer() {
  const menu = {};
  menu.class = 'context-menu-menu';
  menu.style = {};
  menu.style.fontFamily = 'Arial';
  menu.style.fontSize = '13px';
  menu.style.width = '175px';
  menu.style.padding = '0px';
  menu.style.border = '1px solid rgba(255,255,255,1)';
  menu.style.backgroundColor = 'rgba(255,255,255,1)';
  menu.style.whiteSpace = 'nowrap';
  menu.style.boxShadow = '2px 2px 4px 0 #ccc';
  menu.style.cursor = 'pointer';
  return menu;
}

function _menuItemRenderer() {
  const menuitem = {};
  menuitem.class = 'context-menu-menu__menuitem';
  menuitem.style = {};
  menuitem.style.padding = '5px';
  menuitem.style.borderLeft = '4px solid transparent';
  menuitem.style.borderBottom = 'solid 1px rgba(218,220,224,1)';
  return menuitem;
}

function _addMenu(frag, options) {
  const cnf = { renderer: options.menuRenderer || _menuRenderer };
  const menu = _addElement(frag, 'menu');
  menu.style.display = 'none';
  menu.style.position = 'fixed';
  menu.style.zIndex = 100;
  const render = cnf.renderer();
  _applyRender(menu, render);
  return menu;
}

function _addSubMenuIndicator(menuitem) {
  const indicator = _addElement(menuitem, 'table');
  indicator.innerHTML = '&#9658';
  indicator.style.float = 'right';
  indicator.style.fontSize = '10px';
}

function _addMenuItemsRecursive(menu, menuitems, renderer, options) {
  // add all items to context menu
  const props = Object.keys(menuitems);
  for (let i = 0; i < props.length; i++) {
    const menuitem = _addElement(menu, 'menuitem');
    const render = renderer();
    const prop = props[i];
    menuitem.innerHTML = prop;
    menuitem.style.display = 'block';
    _applyRender(menuitem, render);
    // add menu item functionality
    menuitem.onmouseover = function onmouseover() {
      _removeHoverEffect(menuitem.parentNode);
      _addHoverEffect(menuitem);
      _hideSubMenus(menu);
    };
    // rescursively call function if a submenu is found
    if (typeof menuitems[prop] === 'object' && menuitems[prop] !== null) {
      _addSubMenuIndicator(menuitem);
      const submenu = _addMenu(menu, options);
      menuitem.onmouseover = function onmouseover() {
        _removeHoverEffect(menuitem.parentNode);
        _addHoverEffect(menuitem);
        _hideSubMenus(menu);
        return _displaySubMenu(menu, menuitem, submenu);
      };
      _addMenuItemsRecursive(submenu, menuitems[prop], renderer, options);
    } else {
      menuitem.onclick = menuitems[prop];
    }
  }
  return menu;
}

function _addMenuItems(menu, options) {
  const cnf = {
    items: options.items,
    renderer: options.itemRenderer || _menuItemRenderer
  };
  _addMenuItemsRecursive(menu, cnf.items, cnf.renderer, options);
}

/* ============================== Public Methods ============================ */

/**
 * Example inputs for public API of module
 */
// const exampleOptions = {
//   // div to apply custom context menu to
//   'div': 'container',
//   // renderer for applying css and styles to entire context menu
//   'menuRenderer': function () {},
//   // renderer for applying css and styles to each row in the context menu
//   'itemRenderer': function () {},
//   // menu items and sub items
//   'items': {
//       // parent menu item example with on click function
//       'context-menu-item-1' : function() {},
//       'context-menu-item-2' : {
//         // child menu item example with onclick function
//         'context-menu-item-2.1': function() {},
//         'context-menu-item-2.2': {
//           "context-menu-item-2.2.1" : function() {},
//           "context-menu-item-2.2.2" : function() {}
//         }
//       }
//   }
// }

function init(options) {
  // Create DOM fragment
  const frag = document.createDocumentFragment();
  // Create context menu
  const menu = _addMenu(frag, options);
  // Add context menu items
  _addMenuItems(menu, options);
  // Override default context menu
  const div = document.getElementById(options.div);
  _addListener(div, menu);
  // Append fragment to DOM
  div.appendChild(menu);
}

/* =========================== Export Public APIs =========================== */

module.exports = {
  init
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * npm Entry File
 * (c) 2020 Joshua Adams
 */

/**
 * index.js is the default 'entry file' for npm.
 * This means that any require('package name') or import 'package name'
 * statements will refer to this file.
 */
const pkg = __webpack_require__(26);
// export a file with the same name as the package by default
module.exports = __webpack_require__(27)(`./${pkg.name}.js`);

/***/ }),
/* 26 */
/***/ (function(module) {

module.exports = JSON.parse("{\"_from\":\"modalator@^2.1.2\",\"_id\":\"modalator@2.1.3\",\"_inBundle\":false,\"_integrity\":\"sha512-MzJxa9BwHxvz3GtwQKfIzGc8xEGs2XSNzML/RcGGCJbv/1mVEIb03MiyTxRbNGJX7cvGCiQXAFSF1sVZ3p5Ayw==\",\"_location\":\"/modalator\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"range\",\"registry\":true,\"raw\":\"modalator@^2.1.2\",\"name\":\"modalator\",\"escapedName\":\"modalator\",\"rawSpec\":\"^2.1.2\",\"saveSpec\":null,\"fetchSpec\":\"^2.1.2\"},\"_requiredBy\":[\"#USER\",\"/\"],\"_resolved\":\"https://registry.npmjs.org/modalator/-/modalator-2.1.3.tgz\",\"_shasum\":\"8296b6f50ee5b2c01d1758245513b1b84396434a\",\"_spec\":\"modalator@^2.1.2\",\"_where\":\"C:\\\\repos\\\\fileexplorerjs\",\"author\":{\"name\":\"Joshua Adams\"},\"bugs\":{\"url\":\"https://github.com/Joshua-W-Adams/modalator/issues\"},\"bundleDependencies\":false,\"dependencies\":{\"componator\":\"^2.0.1\"},\"deprecated\":false,\"description\":\"A pure JavaScript component for generating modals\",\"devDependencies\":{\"@babel/core\":\"^7.8.4\",\"@babel/preset-env\":\"^7.8.4\",\"babel-loader\":\"^8.0.6\",\"eslint-config-airbnb-base\":\"^14.0.0\",\"eslint-plugin-import\":\"^2.20.0\",\"express\":\"^4.17.1\",\"gulp\":\"^4.0.2\",\"gulp-concat\":\"^2.6.1\",\"gulp-eslint\":\"^6.0.0\",\"gulp-minify-css\":\"^1.2.4\",\"gulp-nodemon\":\"^2.5.0\",\"gulp-rename\":\"^2.0.0\",\"gulp-sass\":\"^4.0.2\",\"gulp-stylelint\":\"^13.0.0\",\"stylelint\":\"^13.0.0\",\"stylelint-config-recommended\":\"^3.0.0\",\"webpack-stream\":\"^5.2.1\"},\"homepage\":\"https://github.com/Joshua-W-Adams/modalator#readme\",\"license\":\"ISC\",\"main\":\"index.js\",\"name\":\"modalator\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/Joshua-W-Adams/modalator.git\"},\"version\":\"2.1.3\"}");

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./modalator.js": 28
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 27;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Modalator
 * JavaScript component to generate modals
 * (c) 2020 Joshua Adams
 */

/* ============================== Import Modules ============================ */

// module that handles generating gui components from passed data structure
// webpack will look for the componator package in the nodemodules directory
// must have index.js file in node package for this to work correctly.
let componator = __webpack_require__(29);

/* ================================ Variables =============================== */

// N/A

/* ============================= Private Methods ============================ */

function _preventDefault(event) {
  event.preventDefault();
}

// default data structure to generate a modal
function _getDefaultConfig(_this) {
  const config = [{
    name: 'modal',
    element: {
      value: 'div'
    },
    child: [{
      name: 'overlay',
      element: {
        value: 'div'
      },
      style: {
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        display: 'none',
        background: '#000',
        opacity: '0.7',
        'z-index': '999'
      }
    }, {
      name: 'dialog',
      element: {
        value: 'div'
      },
      style: {
        position: 'absolute',
        top: '-1000px',
        'min-width': '500px',
        'max-width': '700px',
        'overflow-y': 'auto',
        'border-radius': '4px',
        'font-family': 'Gotham SSm,Helvetica,Arial,sans-serif',
        background: '#fff',
        display: 'block',
        'z-index': '9999'
      },
      child: [{
        name: 'dialog_header',
        element: {
          value: 'div'
        },
        style: {
          padding: '20px',
          'border-bottom': '1px solid #e9ecef'
        },
        child: [{
          name: 'dialog_header_title',
          element: {
            value: 'div'
          },
          style: {
            'font-weight': '500',
            color: '#212529',
            'font-size': '20px',
            display: 'inline-block'
          }
        }, {
          name: 'dialog_header_close_icon',
          element: {
            value: 'span',
            content: 'X'
          },
          // https://stackoverflow.com/questions/4011793/this-is-undefined-in-javascript-class-methods
          onclick: hide.bind(_this),
          onmouseover: componator.defaultOnMouseOverColor,
          onmouseout: componator.defaultOnMouseOutColor,
          style: {
            padding: '0px 5px',
            color: 'red',
            'font-size': '20px',
            'font-weight': '700',
            cursor: 'pointer',
            float: 'right'
          }
        }]
      }, {
        name: 'dialog_body',
        element: {
          value: 'div'
        },
        style: {
          padding: '30px 20px',
          'min-height': '300px'
        }
      }, {
        name: 'dialog_footer',
        element: {
          Value: 'form'
        },
        eventlistener: {
          event: 'submit',
          callback: _preventDefault
        },
        style: {
          'border-top': '1px solid #e9ecef',
          padding: '20px'
        },
        child: [{
          name: 'dialog_footer_child',
          element: {
            value: 'div'
          },
          style: {
            height: '45px'
          },
          child: [{
            name: 'dialog_footer_button_two',
            element: {
              value: 'button'
            },
            onclick: hide.bind(_this),
            onmouseover: componator.defaultOnMouseOverBackground,
            onmouseout: componator.defaultOnMouseOutBackground,
            style: {
              'border-radius': '3px',
              padding: '15px 20px',
              background: '#007bff',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              'margin-right': '15px'
            }
          }, {
            name: 'dialog_footer_button_one',
            element: {
              value: 'button'
            },
            onclick: hide.bind(_this),
            onmouseover: componator.defaultOnMouseOverBackground,
            onmouseout: componator.defaultOnMouseOutBackground,
            style: {
              'border-radius': '3px',
              padding: '15px 30px',
              background: 'red',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              float: 'right'
            }
          }]
        }],
      }]
    }]
  }];
  return config;
}

function _userConfigTemplate(title, body, button) {
  const userConfig = [{
    name: 'modal',
    child: [{
      name: 'overlay',
    }, {
      name: 'dialog',
      child: [{
        name: 'dialog_header',
        child: [{
          name: 'dialog_header_title',
          element: {
            content: title || 'My Modal'
          },
        }]
      }, {
        name: 'dialog_body',
        element: {
          content: body || 'Content'
        },
      }, {
        name: 'dialog_footer',
        child: [{
          name: 'dialog_footer_child',
          child: [{
            name: 'dialog_footer_button_two',
            style: {
              display: 'none'
            }
          }, {
            name: 'dialog_footer_button_one',
            element: {
              content: button || 'Close'
            }
          }]
        }]
      }]
    }]
  }];
  return userConfig;
}

function _getUserConfig(userConfig, dialog_body, dialog_button) {
  // case 1 - user passes config object or empty value
  if (typeof userConfig === 'object') {
    return userConfig;
  // case 2 - user passes non object
  } else {
    // create config object to store string values
    let config;
    // case 1 - one parameter passed - modal body
    if (typeof dialog_body === 'undefined' && typeof dialog_button === 'undefined') {
      config = _userConfigTemplate(null, userConfig, null);
    // case 2 - two parameters passed - modal header and body
    } else if (typeof dialog_button === 'undefined') {
      config = _userConfigTemplate(userConfig, dialog_body, null);
    // case 3 - three parameters passed - modal header, body and button name
    } else {
      config = _userConfigTemplate(userConfig, dialog_body, dialog_button);
    }
    // set config object of modal as created object
    return config;
  }
}

function _addFunctions(component, functions) {
  if (functions) {
    for (let i = 0; i < functions.length; i++) {
      const f = functions[i];
      component.__proto__[f.name] = f;
    }
  }
}

/* ============================== Public Methods ============================ */

function show() {
  // refer to object that contains the _show function as prototype
  const _this = this;
  // get parent element
  const modal = componator.findElement(_this.finalConfig, 'name', 'modal').element;
  // get remaining elements
  const dialog = componator.findChildElement(_this.finalConfig, 'name', 'dialog').element;
  const overlay = componator.findChildElement(_this.finalConfig, 'name', 'overlay').element;
  // append parent to DOM
  document.body.append(modal);
  // calculate position of modal
  let top_position = (screen.availHeight - dialog.offsetHeight) / 2;
  top_position = top_position > 50 ? top_position : '50px';
  dialog.style.left = ((window.innerWidth - dialog.offsetWidth) / 2).toString() + 'px';
  dialog.style.top = top_position.toString() + 'px';
  // display modal
  overlay.style.display = 'block';
  dialog.style.transition = 'all 0.5s';
}

// hide the modal window
function hide() {
  // refer to object that contains the _hide function as prototype
  const _this = this;
  // get elements
  const dialog = componator.findChildElement(_this.finalConfig, 'name', 'dialog').element;
  const overlay = componator.findChildElement(_this.finalConfig, 'name', 'overlay').element;
  // hide modal
  overlay.style.display = 'none';
  dialog.style.top = '-1000px';
}

// remove the modal from the dom and release the config object
function remove() {
  // refer to object that contains the _remove function as prototype
  const _this = this;
  // hide element so animations work correctly
  _this.hide();
  // remove DOM object
  const e = _this.finalConfig[0].element;
  e.parentElement.removeChild(e);
  // clear modal from memory
  // object is automatically removed by the garbage collector
  // when there are no more references to the object
  // therefore not required
  // _this = null;
}

function buildModal(userConfig, dialog_body, dialog_button) {
  // create component
  const component = {};
  // get prototype functions to assign to component
  const functions = [hide, show, remove];
  // assign prototype functions so they can be reference in default config
  _addFunctions(component, functions);
  // default configuration modal of modal
  // component passed so that prototype functions can be referenced
  const defaultConfig = _getDefaultConfig(component);
  // get user configuation based on 4 input cases
  // user configuration overrides to default configuration modal
  userConfig = _getUserConfig(userConfig, dialog_body, dialog_button);
  // construct default component and append / override with user details
  const modal = componator.buildComponent(defaultConfig, userConfig, component);
  return modal;
}

/* =========================== Export Public APIs =========================== */

module.exports = {
  buildModal
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * npm Entry File
 * (c) 2020 Joshua Adams
 */

/**
 * index.js is the default 'entry file' for npm.
 * This means that any require('package name') or import 'package name'
 * statements will refer to this file.
 */
const pkg = __webpack_require__(30);
// export a file with the same name as the package by default
module.exports = __webpack_require__(31)(`./${pkg.name}.js`);

/***/ }),
/* 30 */
/***/ (function(module) {

module.exports = JSON.parse("{\"_from\":\"componator@^2.0.1\",\"_id\":\"componator@2.0.1\",\"_inBundle\":false,\"_integrity\":\"sha512-zJYx10gjbPw+7NzbIcKslQpVwANU6fRB4Xc1nx0ezSLsRpPr912+wLR4FLRhgRuKVPamLVlrmI8YmswiL9lrgA==\",\"_location\":\"/componator\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"range\",\"registry\":true,\"raw\":\"componator@^2.0.1\",\"name\":\"componator\",\"escapedName\":\"componator\",\"rawSpec\":\"^2.0.1\",\"saveSpec\":null,\"fetchSpec\":\"^2.0.1\"},\"_requiredBy\":[\"/modalator\"],\"_resolved\":\"https://registry.npmjs.org/componator/-/componator-2.0.1.tgz\",\"_shasum\":\"cb2755a9f37797294fa9886c6605e70a10da1e14\",\"_spec\":\"componator@^2.0.1\",\"_where\":\"C:\\\\repos\\\\fileexplorerjs\\\\node_modules\\\\modalator\",\"author\":{\"name\":\"Joshua Adams\"},\"bugs\":{\"url\":\"https://github.com/Joshua-W-Adams/componator/issues\"},\"bundleDependencies\":false,\"deprecated\":false,\"description\":\"module to construct gui components based on a passed parent child data structure\",\"devDependencies\":{\"@babel/core\":\"^7.8.4\",\"@babel/preset-env\":\"^7.8.4\",\"babel-loader\":\"^8.0.6\",\"eslint-config-airbnb-base\":\"^14.0.0\",\"eslint-plugin-import\":\"^2.20.0\",\"express\":\"^4.17.1\",\"gulp\":\"^4.0.2\",\"gulp-concat\":\"^2.6.1\",\"gulp-eslint\":\"^6.0.0\",\"gulp-minify-css\":\"^1.2.4\",\"gulp-nodemon\":\"^2.5.0\",\"gulp-rename\":\"^2.0.0\",\"gulp-sass\":\"^4.0.2\",\"gulp-stylelint\":\"^13.0.0\",\"nodemon\":\"^2.0.3\",\"stylelint\":\"^13.0.0\",\"stylelint-config-recommended\":\"^3.0.0\",\"webpack-stream\":\"^5.2.1\"},\"homepage\":\"https://github.com/Joshua-W-Adams/componator#readme\",\"license\":\"ISC\",\"main\":\"index.js\",\"name\":\"componator\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/Joshua-W-Adams/componator.git\"},\"scripts\":{\"test\":\"echo \\\"Error: no test specified\\\" && exit 0\"},\"version\":\"2.0.1\"}");

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./componator.js": 32
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 31;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

/*!
 * Componator
 * Generates gui components based on a standard parent child input data structure
 * (c) 2020 Joshua Adams
 */

/* ============================== Import Modules ============================ */

// N/A

/* ================================ Variables =============================== */

// N/A

/* ============================= Private Methods ============================ */

function _applyStyles(elementStyle, styles) {
  if (styles) {
    // get keys to avoid looping through entire prototype chain
    const arr = Object.keys(styles);
    for (let i = 0; i < arr.length; i++) {
      const style = arr[i];
      elementStyle.cssText = elementStyle.cssText.concat(`${style} : ${styles[style]};`);
    }
  }
}

function _checkForFunction(prop) {
  if (typeof prop === 'function') {
    return true;
  } else {
    return false;
  }
}

function _isElement(element) {
  return element instanceof Element || element instanceof HTMLDocument;
}

// get object property if it exists else return a null value
// handles cases where any level of the property chain does not exist
function _getDescendantProp(obj, desc) {
  if (obj && desc) {
    const arr = desc.split('.');
    for (let i = 0; i < arr.length; i++) {
      // set current object as child property
      if (obj[arr[i]]) {
        obj = obj[arr[i]];
      } else {
        obj = null;
        break;
      }
    }
    return obj;
  } else {
    return null;
  }
}

function _handleElementContent(content) {
  // case 1 - user passes string
  if (typeof content === 'string') {
    return content;
  // case 2 - user passes function that returns string
  } else if (_checkForFunction(content) && typeof content() === 'string') {
    return content();
  // case 3 - user pases nothing or unsupported type
  } else {
    return '';
  }
}

function _handleElementValue(element, content) {
  // case 1 - user passes function that returns html element
  if (element !== null && _checkForFunction(element) && _isElement(element())) {
    return element();
  // case 2 - user passes a string value
  } else if (typeof element === 'string') {
    const e = document.createElement(element);
    const str = _handleElementContent(content);
    e.innerHTML = str;
    return e;
  // case 3 - user passes function that returns a string
  } else if (element !== null && _checkForFunction(element) && typeof element() === 'string') {
    const e = document.createElement(element());
    const str = _handleElementContent(content);
    e.innerHTML = str;
    return e;
  // case 4 - user passes nothing or unsupported type
  } else {
    // default element
    const e = document.createElement('div');
    const str = _handleElementContent(content);
    e.innerHTML = str;
    return e;
  }
}

function _cssStringToObject(cssText) {
  const regex = /([\w-]*)\s*:\s*([^;]*)/g;
  let match;
  const properties = {};
  while (match = regex.exec(cssText)) properties[match[1]] = match[2].trim();
  return properties;
}

function _handleElementStyle(style) {
  // case 1 - user passes function that returns an object with keys
  if (style !== null && _checkForFunction(style) && typeof style() === 'object' && style() !== null && Object.keys(style()).length > 0) {
    return style();
  // case 2 - user passes style string
  } else if (typeof style === 'string') {
    // convert string to style object
    const o = _cssStringToObject(style);
    return o;
  // case 3 - user passes a style object
  } else if (typeof style === 'object' && style !== null && Object.keys(style.length > 0)) {
    return style;
  }
  // case 4 - nothing or unsupported type
  // undefined returned
}

function _handleElementFunction(onclick) {
  // case 1 - user passes function
  if (onclick !== null && _checkForFunction(onclick)) {
    return onclick;
  }
  // case 2 - user passes string, nothing or unsupported type
  // undefined returned
}

function _handleElementEvent(event) {
  // case 1 - user passes string
  if (typeof event === 'string') {
    return event;
  }
  // undefined returned
}

function _addOnMouseOver(element, cb, _this) {
  if (cb) {
    element.onmouseover = function (event) {
      cb(event, _this, element);
    };
  }
}

function _addOnMouseOut(element, cb, _this) {
  if (cb) {
    element.onmouseout = function (event) {
      cb(event, _this, element);
    };
  }
}

function _addOnClick(element, cb, _this) {
  if (cb) {
    element.onclick = function (event) {
      cb(event, _this, element);
    };
  }
}

function _addEventListener(element, event, cb) {
  if (cb) {
    element.addEventListener(event, cb);
  }
}

function _findUserConfig(name, userConfig) {
  if (userConfig) {
    for (let i = 0; i < userConfig.length; i++) {
      const row = userConfig[i];
      if (row && name && row.name === name) {
        return row;
      }
    }
  }
  // return undefined otherwise
}

// Main function to build the gui component by recursively looping though the parent child data structure
function _buildComponent(component, defaultConfig, userConfig, finalConfig, parentElement) {
  // loop through current parent level in data heirarchy
  for (let i = 0; i < defaultConfig.length; i++) {
    // get current element configuration
    const defaultElementConfig = defaultConfig[i];
    const name = _getDescendantProp(defaultElementConfig, 'name');
    // get any user overrides of current element
    const userElementConfig = _findUserConfig(name, userConfig);
    // get all element configuration values
    const element = _handleElementValue(_getDescendantProp(userElementConfig, 'element.value') || _getDescendantProp(defaultElementConfig, 'element.value'),
      _getDescendantProp(userElementConfig, 'element.content') || _getDescendantProp(defaultElementConfig, 'element.content'));
    const onclick = _handleElementFunction(_getDescendantProp(userElementConfig, 'onclick') || _getDescendantProp(defaultElementConfig, 'onclick'));
    const onmouseover = _handleElementFunction(_getDescendantProp(userElementConfig, 'onmouseover') || _getDescendantProp(defaultElementConfig, 'onmouseover'));
    const onmouseout = _handleElementFunction(_getDescendantProp(userElementConfig, 'onmouseout') || _getDescendantProp(defaultElementConfig, 'onmouseout'));
    const eventlistener = _handleElementFunction(_getDescendantProp(userElementConfig, 'eventlistener.callback') || _getDescendantProp(defaultElementConfig, 'eventlistener.callback'));
    const event = _handleElementEvent(_getDescendantProp(userElementConfig, 'eventlistener.event') || _getDescendantProp(defaultElementConfig, 'eventlistener.event'));
    const elementStyle = element.style;
    const defaultStyle = _handleElementStyle(_getDescendantProp(defaultElementConfig, 'style'));
    const userStyle = _handleElementStyle(_getDescendantProp(userElementConfig, 'style'));
    // commence building element
    // apply default styles
    _applyStyles(elementStyle, defaultStyle);
    // apply user specified style renderer
    _applyStyles(elementStyle, userStyle);
    // add onclick / run functions to all elements
    _addOnClick(element, onclick, component);
    // add onHover functions to all elements
    _addOnMouseOver(element, onmouseover, component);
    _addOnMouseOut(element, onmouseout, component);
    // addEventListeners
    _addEventListener(element, event, eventlistener);
    // set element id
    element.id = name;
    // update data modal with configured details
    const finalElementConfig = {
      name: name,
      element: element,
      onclick: onclick,
      onmouseover: onmouseover,
      onmouseout: onmouseout,
      eventlistener: {
        event: event,
        callback: eventlistener
      },
      style: elementStyle,
      child: []
    };
    // build object model
    if (parentElement) {
      parentElement.append(element);
    }
    // push element to parent config item
    finalConfig.push(finalElementConfig);
    // recursively call for child elements
    if (defaultElementConfig.child) {
      let userElementConfigChild;
      if (userElementConfig) {
        userElementConfigChild = userElementConfig.child;
      }
      _buildComponent(component, defaultConfig[i].child, userElementConfigChild, finalConfig[i].child, element);
    }
  }
}

function _getRGBCode(rgb_code, _this) {
  if (rgb_code.includes('#')) {
    return rgb_code;
  } else if (rgb_code.includes('rgb')) {
    rgb_code = rgb_code.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return '#' + _this.getHex(rgb_code[1], _this) + _this.getHex(rgb_code[2]) + _this.getHex(rgb_code[3]);
  } else {
    return _this.getHexCodeFromColor(rgb_code);
  }
}

function _getHex(x) {
  const hexDigits = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');
  return isNaN(x) ? '00' : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

function _adjust_brightness(hex_code, percent) {
  const r = parseInt(hex_code.substr(1, 2), 16);
  const g = parseInt(hex_code.substr(3, 2), 16);
  const b = parseInt(hex_code.substr(5, 2), 16);
  return '#' + ((0|(1<<8) + r * (100 - percent) / 100).toString(16)).substr(1) + ((0|(1<<8) + g * (100 - percent) / 100).toString(16)).substr(1) + ((0|(1<<8) + b * (100 - percent) / 100).toString(16)).substr(1);
}

function _getHexCodeFromColor(color_name) {
  const colours = {
    'aliceblue': '#f0f8ff',
    'antiquewhite': '#faebd7',
    'aqua': '#00ffff',
    'aquamarine': '#7fffd4',
    'azure': '#f0ffff',
    'beige': '#f5f5dc',
    'bisque': '#ffe4c4',
    'black': '#000000',
    'blanchedalmond': '#ffebcd',
    'blue': '#0000ff',
    'blueviolet': '#8a2be2',
    'brown': '#a52a2a',
    'burlywood': '#deb887',
    'cadetblue': '#5f9ea0',
    'chartreuse': '#7fff00',
    'chocolate': '#d2691e',
    'coral': '#ff7f50',
    'cornflowerblue': '#6495ed',
    'cornsilk': '#fff8dc',
    'crimson': '#dc143c',
    'cyan': '#00ffff',
    'darkblue': '#00008b',
    'darkcyan': '#008b8b',
    'darkgoldenrod': '#b8860b',
    'darkgray': '#a9a9a9',
    'darkgreen': '#006400',
    'darkkhaki': '#bdb76b',
    'darkmagenta': '#8b008b',
    'darkolivegreen': '#556b2f',
    'darkorange': '#ff8c00',
    'darkorchid': '#9932cc',
    'darkred': '#8b0000',
    'darksalmon': '#e9967a',
    'darkseagreen': '#8fbc8f',
    'darkslateblue': '#483d8b',
    'darkslategray': '#2f4f4f',
    'darkturquoise': '#00ced1',
    'darkviolet': '#9400d3',
    'deeppink': '#ff1493',
    'deepskyblue': '#00bfff',
    'dimgray': '#696969',
    'dodgerblue': '#1e90ff',
    'firebrick': '#b22222',
    'floralwhite': '#fffaf0',
    'forestgreen': '#228b22',
    'fuchsia': '#ff00ff',
    'gainsboro': '#dcdcdc',
    'ghostwhite': '#f8f8ff',
    'gold': '#ffd700',
    'goldenrod': '#daa520',
    'gray': '#808080',
    'green': '#008000',
    'greenyellow': '#adff2f',
    'honeydew': '#f0fff0',
    'hotpink': '#ff69b4',
    'indianred ': '#cd5c5c',
    'indigo': '#4b0082',
    'ivory': '#fffff0',
    'khaki': '#f0e68c',
    'lavender': '#e6e6fa',
    'lavenderblush': '#fff0f5',
    'lawngreen': '#7cfc00',
    'lemonchiffon': '#fffacd',
    'lightblue': '#add8e6',
    'lightcoral': '#f08080',
    'lightcyan': '#e0ffff',
    'lightgoldenrodyellow': '#fafad2',
    'lightgrey': '#d3d3d3',
    'lightgreen': '#90ee90',
    'lightpink': '#ffb6c1',
    'lightsalmon': '#ffa07a',
    'lightseagreen': '#20b2aa',
    'lightskyblue': '#87cefa',
    'lightslategray': '#778899',
    'lightsteelblue': '#b0c4de',
    'lightyellow': '#ffffe0',
    'lime': '#00ff00',
    'limegreen': '#32cd32',
    'linen': '#faf0e6',
    'magenta': '#ff00ff',
    'maroon': '#800000',
    'mediumaquamarine': '#66cdaa',
    'mediumblue': '#0000cd',
    'mediumorchid': '#ba55d3',
    'mediumpurple': '#9370d8',
    'mediumseagreen': '#3cb371',
    'mediumslateblue': '#7b68ee',
    'mediumspringgreen': '#00fa9a',
    'mediumturquoise': '#48d1cc',
    'mediumvioletred': '#c71585',
    'midnightblue': '#191970',
    'mintcream': '#f5fffa',
    'mistyrose': '#ffe4e1',
    'moccasin': '#ffe4b5',
    'navajowhite': '#ffdead',
    'navy': '#000080',
    'oldlace': '#fdf5e6',
    'olive': '#808000',
    'olivedrab': '#6b8e23',
    'orange': '#ffa500',
    'orangered': '#ff4500',
    'orchid': '#da70d6',
    'palegoldenrod': '#eee8aa',
    'palegreen': '#98fb98',
    'paleturquoise': '#afeeee',
    'palevioletred': '#d87093',
    'papayawhip': '#ffefd5',
    'peachpuff': '#ffdab9',
    'peru': '#cd853f',
    'pink': '#ffc0cb',
    'plum': '#dda0dd',
    'powderblue': '#b0e0e6',
    'purple': '#800080',
    'rebeccapurple': '#663399',
    'red': '#ff0000',
    'rosybrown': '#bc8f8f',
    'royalblue': '#4169e1',
    'saddlebrown': '#8b4513',
    'salmon': '#fa8072',
    'sandybrown': '#f4a460',
    'seagreen': '#2e8b57',
    'seashell': '#fff5ee',
    'sienna': '#a0522d',
    'silver': '#c0c0c0',
    'skyblue': '#87ceeb',
    'slateblue': '#6a5acd',
    'slategray': '#708090',
    'snow': '#fffafa',
    'springgreen': '#00ff7f',
    'steelblue': '#4682b4',
    'tan': '#d2b48c',
    'teal': '#008080',
    'thistle': '#d8bfd8',
    'tomato': '#ff6347',
    'turquoise': '#40e0d0',
    'violet': '#ee82ee',
    'wheat': '#f5deb3',
    'white': '#ffffff',
    'whitesmoke': '#f5f5f5',
    'yellow': '#ffff00',
    'yellowgreen': '#9acd32'
  };
  if (typeof colours[color_name.toLowerCase()] !== 'undefined') return colours[color_name.toLowerCase()];
  return false;
}

function _addUserFunctions(component, functions) {
  if (functions) {
    for (let i = 0; i < functions.length; i++) {
      const f = functions[i];
      component.__proto__[f.name] = f;
    }
  }
}

/* ============================== Public Methods ============================ */

function buildComponent(defaultConfig, userConfig, userComponent, functions) {
  // create component
  const component = userComponent || {};
  // create array to store final configuration details
  const finalConfig = [];
  // add generic functions to component prototype
  // must use __proto__ as object has already been created
  component.__proto__.getRGBCode = _getRGBCode;
  component.__proto__.getHex = _getHex;
  component.__proto__.adjust_brightness = _adjust_brightness;
  component.__proto__.getHexCodeFromColor = _getHexCodeFromColor;
  // add user defined prototype functions to component
  _addUserFunctions(component, functions);
  // apply styles and onclick functionality to all elements
  _buildComponent(component, defaultConfig, userConfig, finalConfig);
  // append data model
  component.defaultConfig = defaultConfig;
  component.userConfig = userConfig;
  component.finalConfig = finalConfig; // = defaultConfig updated with userConfig
  // return constructed component to user
  return component;
}

function createDescendantProp(obj, desc, value) {
  const arr = desc.split('.');
  let currentProp;
  let currentObj = obj;
  for (let i = 0; i < arr.length; i++) {
    currentProp = arr[i];
    // create property
    if (i === arr.length - 1) {
      currentObj[currentProp] = value;
    } else if (!currentObj[currentProp]) {
      currentObj[currentProp] = {};
    }
    // set current object in loop
    currentObj = currentObj[currentProp];
  }
  return obj;
}

function defaultOnMouseOverColor(event, _this, element) {
  const color = element.style.color;
  element.setAttribute('data-color', element.style.color);
  element.style.color = _this.adjust_brightness(_this.getRGBCode(color, _this), 16);
}

function defaultOnMouseOutColor(event, _this, element) {
  element.style.color = element.getAttribute('data-color');
}

function defaultOnMouseOverBackground(event, _this, element) {
  const color = element.style.background;
  element.setAttribute('data-color', color);
  element.style.background = _this.adjust_brightness(_this.getRGBCode(color, _this), 16);
}

function defaultOnMouseOutBackground(event, _this, element) {
  element.style.background = element.getAttribute('data-color');
}

function findElement(arr, propName, propValue) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][propName] === propValue) {
      return arr[i];
    }
  }
  // will return undefined if not found; you could return a default instead
}

function findChildElement(arr, propName, propValue) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][propName] === propValue) {
      return arr[i];
    } else if (arr[i].child) {
      const child = findChildElement(arr[i].child, propName, propValue);
      if (child) {
        return child;
      }
    }
  }
}

/* =========================== Export Public APIs =========================== */

// ECMA6 syntax
// functions will be compilied under the 'default' name space in the compiled 
// ecma5 dist files.
// export default {
//   buildComponent,
//   createDescendantProp,
//   defaultOnMouseOverColor,
//   defaultOnMouseOutColor,
//   defaultOnMouseOverBackground,
//   defaultOnMouseOutBackground,
//   findElement,
//   findChildElement
// };

// ES Modules syntax
module.exports = {
  buildComponent,
  createDescendantProp,
  defaultOnMouseOverColor,
  defaultOnMouseOutColor,
  defaultOnMouseOverBackground,
  defaultOnMouseOutBackground,
  findElement,
  findChildElement
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

// /*!
//  * ECMA6 (ES Modules) Boilerplate
//  * Based on the Revealing Module Design Pattern
//  * (c) 2020 Joshua Adams
//  */
// /* ============================== Import Modules ============================ */
// // N/A
// /* ================================ Variables =============================== */
// import httpComms from '/src/js/http-comms.js';
// /* ============================= Private Methods ============================ */
// function _testAddFolderApi() {
//   const payload = [{
//     dir: 'assets',
//     folder: 'test_dir3'
//   }, {
//     dir: 'assets',
//     folder: 'test_dir4'
//   }];
//   const options = {
//     method: 'POST'
//     , url: 'api/ftp/add/folder'
//     , payload: payload
//     , headers: {
//       // content type automatically assigned by form data
//       'Content-Type': 'application/json'
//     }
//   }
//   httpComms.sendRequest(options).then(function (res) {
//     console.log(res);
//   });
// }
// function _testDeleteFileApi() {
//   let payload = [{
//     dir: 'assets',
//     file: 'test.txt'
//   }, {
//     dir: 'assets',
//     file: 'test - Copy.txt'
//   }];
//   const options = {
//     method: 'POST'
//     , url: 'api/ftp/delete/file'
//     , payload: payload
//     , headers: {
//       // content type automatically assigned by form data
//       'Content-Type': 'application/json'
//     }
//   }
//   httpComms.sendRequest(options).then(function (res) {
//     console.log(res);
//   });
// }
// function _testDeleteFolderApi() {
//   let payload = [{
//     dir: 'assets',
//     folder: 'test_dir1'
//   }, {
//     dir: 'assets',
//     folder: 'test_dir2'
//   }];
//   const options = {
//     method: 'POST'
//     , url: 'api/ftp/delete/folder'
//     , payload: payload
//     , headers: {
//       // content type automatically assigned by form data
//       'Content-Type': 'application/json'
//     }
//   }
//   httpComms.sendRequest(options).then(function (res) {
//     console.log(res);
//   });
// }
// function _testUpdateFileApi() {
//   let payload = [{
//     old_dir: 'assets',
//     old_file: 'rename_me.txt',
//     new_dir: 'assets',
//     new_file: 'i_am_renamed.txt'
//   }, {
//     old_dir: 'assets',
//     old_file: 'rename_me2.txt',
//     new_dir: 'assets',
//     new_file: 'i_am_renamed_2.txt'
//   }];
//   const options = {
//     method: 'POST'
//     , url: 'api/ftp/update/file'
//     , payload: payload
//     , headers: {
//       // content type automatically assigned by form data
//       'Content-Type': 'application/json'
//     }
//   }
//   httpComms.sendRequest(options).then(function (res) {
//     console.log(res);
//   });
// }
// function _testUpdateFolderApi() {
//   let payload = [{
//     old_dir: 'assets',
//     old_folder: 'test_dir',
//     new_dir: 'assets',
//     new_folder: 'test_dir_renamed'
//   }, {
//     old_dir: 'assets',
//     old_folder: 'test_dir - Copy',
//     new_dir: 'assets',
//     new_folder: 'test_dir - Copy_renamed'
//   }];
//   const options = {
//     method: 'POST'
//     , url: 'api/ftp/update/folder'
//     , payload: payload
//     , headers: {
//       // content type automatically assigned by form data
//       'Content-Type': 'application/json'
//     }
//   }
//   httpComms.sendRequest(options).then(function (res) {
//     console.log(res);
//   });
// }
// /* ============================== Public Methods ============================ */
// function testApis() {
//   _testAddFolderApi();
//   _testDeleteFileApi();
//   _testDeleteFolderApi();
//   _testUpdateFileApi();
//   _testUpdateFolderApi();
// }
// /* =========================== Export Public APIs =========================== */
// export default {
//   testApis
// };

/***/ })
/******/ ]);
//# sourceMappingURL=fileexplorerjs.full.js.map