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

module.exports = http;

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
	"./tests.js": 11
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

var inputator = __webpack_require__(6);

var treeator = __webpack_require__(7);

var tableator = __webpack_require__(8);

var contextmenuator = __webpack_require__(9);

var modalator = __webpack_require__(10); // import local modules


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
      div: _fileExplorerConfig.ui.treeSearchDiv
    }
  };
  treeator.init(treeOptions);
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

      e.id = "".concat(_fileExplorerConfig.ui.treeSearchDiv, "_input");
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

    _getTreeSearch(treeOptions);

    _getFolderView(null, _addEmptyRow([], _fileExplorerDataModel[0].FILE_PATH));
  });
}
/* =========================== Export Public APIs =========================== */


module.exports = {
  init: init
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = breadcrumbjs;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = inputator;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = treeator;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = tableator;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = contextmenuator;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = modalator;

/***/ }),
/* 11 */
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
//# sourceMappingURL=fileexplorerjs.js.map