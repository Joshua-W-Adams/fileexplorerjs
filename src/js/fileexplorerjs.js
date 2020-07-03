/*!
 * Fileexplorerjs
 * A JavaScript GUI module for exploring file systems
 * (c) 2020 Joshua Adams
 */

/* ============================== Import Modules ============================ */

// import node modules
let breadcrumbjs = require('breadcrumbjs');
let inputator = require('inputator');
let treeator = require('treeator');
let tableator = require('tableator');
let contextmenuator = require('contextmenuator');
let modalator = require('modalator');

// import local modules
let http = require('./http.js');

/* ================================ Variables =============================== */

// *** private module variables ***
// stores the passed configuration object for the file explorer view
let _fileExplorerConfig;
// master file explorer data model
let _fileExplorerDataModel = [];
// store the state of the folder view
let _fileExplorerFolderView = {
  // location of the displayed folder in the data model
  dataModelIndex: null,
  // folder data currently displayed
  data: null
};
// store modal state
let _modal;

/* ============================= Private Methods ============================ */

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

function _findPositionInTree(filePath, data) {
  let pos;
  for (let i = 0; i < data.length; i++) {
    if (data[i].FILE_PATH === filePath) {
      pos = i;
      return pos;
    }
  }
  return pos;
}

function _findParent(pos, data) {
  for (let i = pos - 1; i > -1; i--) {
    if (data[i].ICON_TYPE === 'folder' && data[i].DATA_DEPTH === data[pos].DATA_DEPTH - 1) {
      return i;
    }
  }
  return -1;
}

function _getFileList(inputElement) {
  // get list of files
  const files = inputElement.files;
  // create list to load files into
  const fileList = document.createElement('ol');
  // style list
  fileList.style.listStyleType = 'none';
  // add list items to file list
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const li = document.createElement('li');
    li.innerHTML = file.name;
    li.style.padding = '10px 0px';
    fileList.appendChild(li);
  }
  return fileList;
}

function _addEmptyRow(arr, file_path) {
  // get empty row of data to always be displayed to user
  const row = {
    DATA_DEPTH: '',
    ICON_TYPE: '',
    NAME: 'add new item',
    SIZE: '',
    LAST_EDIT_DATE: '',
    FILE_PATH: file_path
  };
  // push row to array
  arr.push(row);
  return arr;
}

function _getBreadCrumbFilePath(items, position) {
  let filePath = '';
  for (let i = 0; i <= position; i++) {
    if (i === position) {
      filePath = `${filePath}${items[i].item}`;
    } else {
      filePath = `${filePath}${items[i].item}/`;
    }
  }
  return filePath;
}

function _updateTreeClickedItem(pos) {
  // update tree single & double clicked rows
  const table = document.getElementById('treeator-tree');
  const tr = table.getElementsByTagName('tr');
  treeator.onClickDefault(tr[pos]);
  treeator.onDblClickDefault(tr[pos]);
}

function _getBreadcrumb(items) {
  // destroy current breadcrumb
  const bc = document.getElementById(_fileExplorerConfig.ui.breadcrumbDiv);
  while (bc.firstChild) {
    bc.removeChild(bc.lastChild);
  }
  // construct new breadcrumb
  const breadCrumbOptions = {
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
    const children = treeator.getChildren(pos, data);
    const folderData = _addEmptyRow(children, data[pos].FILE_PATH);
    _getFolderView(pos, folderData);
  } else {
    const parentPos = _findParent(pos, data);
    // get all children of current row
    const children = treeator.getChildren(parentPos, data);
    const folderData = _addEmptyRow(children, data[parentPos].FILE_PATH);
    _getFolderView(parentPos, folderData);
  }
}

function _reloadBreadCrumb(row, data) {
  // create breadcrumb
  const arr = row.FILE_PATH.split('/');
  const items = [];
  for (let i = 0; i < arr.length; i++) {
    const row = {
      item: arr[i],
      onClick: function (li, items, position) {
        // get filePath to lookup in tree array
        const filePath = _getBreadCrumbFilePath(items, position);
        // find position of filePath in tree data
        const pos = _findPositionInTree(filePath, data);
        // Update tree
        _updateTreeClickedItem(pos);
        // Update table
        _reloadTable(data[pos], pos, data);
      }
    };
    items.push(row);
  }
  _getBreadcrumb(items);
}

function _handleResponse(data, changeType) {
  if (data) {
    const passed = [];
    const failed = [];
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      // handle success and failure of file operations
      // pass of operation
      if (row.STATUS === 'pass') {
        // update data model with appropriate crud operation
        passed.push(row);
      // failure of operation
      } else {
        failed.push(row);
      }
    }
    // regenerate file explorer view after all operations have been processed
    if (passed.length > 0) {
      _updateUserInterface(passed, changeType);
    }
    // TO DO - Inform user of failed operation
    if (failed.length > 0) {

    }
  } else {
    // unknown error in response from server
    // TO DO - Inform user of failed update
  }
}

function _addFileFormOnClick(form, dir) {
  return function () {
    // get form data model for submission to server
    const formData = new FormData(form);
    // define http request
    const options = {
      method: 'POST',
      url: form.action,
      payload: formData,
      headers: {
        // content type automatically assigned by form data
        // 'Content-Type': null
        directory: dir
      }
    };
    const files = document.getElementById('selectFilesButton').files;
    // Only submit request to server when files have been selected by user
    if (files.length > 0) {
      // send ajax request to server
      http.sendRequest(options).then(function (res) {
        const data = JSON.parse(res);
        _handleResponse(data, 'add');
      });
    }
    return false; // To avoid actual submission of the form
  };
}

function _displaySelectedFiles(inputElement, displayElementId) {
  // generate file list element from user selected files
  const fileList = _getFileList(inputElement);
  // get element to display file list in
  const e = document.getElementById(displayElementId);
  // remove previous items
  e.innerHTML = '';
  // assign file list to span
  e.appendChild(fileList);
}

function _selectFilesButtonRenderer() {
  // create input element for file selector
  const e = document.createElement('input');
  e.type = 'file';
  e.multiple = 'multiple';
  e.id = 'selectFilesButton';
  // http request function requires a name for submission
  e.name = 'uploadFiles';
  e.style.display = 'none';
  // custom label to override default input style
  const label = document.createElement('label');
  label.htmlFor = 'selectFilesButton';
  label.innerHTML = 'Select Files';
  label.style.display = 'inline-block';
  // add function for assigning list of files on change
  e.onchange = function () {
    _displaySelectedFiles(e, 'dialog_body');
  };
  // build element object model
  label.appendChild(e);
  return label;
}

function _getAddFileFormConfig(restApi, dir) {
  const config = [{
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
          value: function () {
            const form = document.createElement('form');
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
              value: function () {
                return _selectFilesButtonRenderer();
              }
            },
            // disable default onclick function to close form
            onclick: function () {},
          }, {
            name: 'dialog_footer_button_one',
            element: {
              value: function () {
                const e = document.createElement('input');
                e.type = 'submit';
                e.value = 'Upload Files';
                return e;
              }
            },
            style: function () {
              const properties = {
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
  const input = document.createElement('input');
  const render = {
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
  let dir = '';
  // check if folder view has been loaded
  if (_fileExplorerFolderView.dataModelIndex || _fileExplorerFolderView.dataModelIndex === 0) {
    dir = _fileExplorerDataModel[_fileExplorerFolderView.dataModelIndex].FILE_PATH;
  }
  return dir;
}

function _addFolderOnClick(dir, folder) {
  // define request config
  const options = {
    method: 'POST',
    url: `${_fileExplorerConfig.api.add}/folder`,
    payload: JSON.stringify([{
      dir: dir,
      folder: folder
    }]),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // send ajax request to server
  http.sendRequest(options).then(function (res) {
    const data = JSON.parse(res);
    _handleResponse(data, 'add');
  });
  // close modal
  _modal.hide();
}

function _getAddFolderFormConfig() {
  const input = _getInput();
  const config = [{
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
          value: function () {
            const div = document.createElement('div');
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
            onclick: function () {
              const folder = input.value;
              const dir = _getCurrentDirectory();
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
  const arr = filePath.split('/');
  let stripped = '';
  for (let i = 0; i < arr.length - 1; i++) {
    const row = arr[i];
    if (row && row !== '') {
      if (stripped !== '') {
        stripped += `/${arr[i]}`;
      } else {
        stripped += `${arr[i]}`;
      }
    }
  }
  return stripped;
}

function _deleteItemOnClick() {
  const state = tableator.getState();
  const onMouseDownRow = state.onMouseDownRow;
  const item = onMouseDownRow.data;
  // tableator must have had a hovered row assigned to attempt deletion
  if (item) {
    const type = item.ICON_TYPE;
    let payload;
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
    }
    // define request config
    const options = {
      method: 'POST',
      url: `${_fileExplorerConfig.api.delete}/${type}`,
      payload: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    // send ajax request to server
    http.sendRequest(options).then(function (res) {
      const data = JSON.parse(res);
      _handleResponse(data, 'delete');
    });
  }
  // close modal
  _modal.hide();
}

function _getDeleteFormConfig() {
  const tableState = tableator.getState();
  const deleteItem = tableState.onMouseDownRow.data;
  const config = [{
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
          value: function () {
            const div = document.createElement('div');
            div.innerHTML = `Are you sure you want to delete to following item?
              <br></br><br>${deleteItem.NAME}</br><br></br>
              This action is irreversible.`;
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
    const type = item.ICON_TYPE;
    let payload;
    const filePath = _stripLastItem(item.FILE_PATH);
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
    }
    // define request config
    const options = {
      method: 'POST',
      url: `${_fileExplorerConfig.api.update}/${type}`,
      payload: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    // send ajax request to server
    http.sendRequest(options).then(function (res) {
      const data = JSON.parse(res);
      _handleResponse(data, 'update');
    });
  }
  // close modal
  _modal.hide();
}

function _getRenameFormConfig() {
  const input = _getInput();
  const tableState = tableator.getState();
  const renameItem = tableState.onMouseDownRow.data;
  const config = [{
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
          value: function () {
            const div = document.createElement('div');
            // add a warning that the current item is about to be renamed
            const renameWarningDiv = document.createElement('div');
            div.innerHTML = `Are you sure you want to rename the following item?
              <br></br><br>${renameItem.NAME}</br><br></br>
              This action is irreversible.<br></br>`;
            div.appendChild(renameWarningDiv);
            // add input for user to place new name into
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
            onclick: function () {
              const newName = input.value;
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
  }
  // create modal
  const modal = modalator.buildModal(config);
  // display modal
  modal.show();
  // save modal in private variable for tracking state
  _modal = modal;
}

function _addFile() {
  const restApi = `${_fileExplorerConfig.api.add}/file`;
  // get directory for adding files to
  const dir = _getCurrentDirectory();
  // define modal configuration
  const config = _getAddFileFormConfig(restApi, dir);
  _showForm(config);
}

function _addFolder() {
  const config = _getAddFolderFormConfig();
  _showForm(config);
}

function _delete() {
  const config = _getDeleteFormConfig();
  _showForm(config);
}

function _rename() {
  const config = _getRenameFormConfig();
  _showForm(config);
}

function _downloadFile() {
  // get state of tableator
  const state = tableator.getState();
  const onHoverRow = state.onHoverRow;
  const filePath = onHoverRow.data.FILE_PATH;
  const fileName = onHoverRow.data.NAME;
  const type = onHoverRow.data.ICON_TYPE;
  if (fileName && filePath && type === 'file') {
    const link = document.createElement('a');
    link.download = fileName;
    link.href = `${_fileExplorerConfig.api.download}${filePath}`;
    link.click();
    link.remove();
  }
}

function _getContextMenu() {
  const options = {
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
      Rename: _rename,
    }
  };
  contextmenuator.init(options);
}

function _getFolderView(dataModelIndex, data) {
  // capture state of folder view
  _fileExplorerFolderView = {
    dataModelIndex: dataModelIndex,
    data: data
  };
  // destroy existing table
  const table = document.getElementById(_fileExplorerConfig.ui.tableDiv);
  while (table.firstChild) {
    table.removeChild(table.lastChild);
  }
  // construct new table
  const options = {
    div: _fileExplorerConfig.ui.tableDiv,
    data: data,
    // renderer: null,
    headers: {
      displayNames: true,
      sourceNames: ['NAME', 'SIZE', 'LAST_EDIT_DATE'],
      names: ['Name', 'Size', 'Last Edit Date'],
      widths: ['50%', '25%', '25%'],
      alignment: ['left', 'center', 'center'],
      // renderer: null
    },
    rows: {
      // renderer: null,
      rowTypeIcons: 'filesystem'
    },
    cells: {
      // onClick: null,
      onDblClick: function (tr, td, rowNo, rowData) {
        // find position of filePath in tree data
        const treePos = _findPositionInTree(rowData.FILE_PATH, _fileExplorerDataModel);
        // update tree single & double clicked row
        _updateTreeClickedItem(treePos);
        // update breadcrumb menu
        _reloadBreadCrumb(_fileExplorerDataModel[treePos], _fileExplorerDataModel);
        // update directory
        if (rowData.ICON_TYPE === 'folder') {
          // get all children of current row
          const children = treeator.getChildren(treePos, _fileExplorerDataModel);
          const folderData = _addEmptyRow(children, _fileExplorerDataModel[treePos].FILE_PATH);
          _getFolderView(treePos, folderData);
        } else {
          // TO DO - Display a drawer or information panel on clicked item
        }
      },
      // onHover: null,
      // renderer: null
    }
  };
  tableator.init(options);
  _getContextMenu();
}

function _getFileFolderDetails(change) {
  const o = {
    oldFilePath: '',
    newFilePath: '',
    newName: '',
  };
  if (change.TYPE === 'folder') {
    o.oldFilePath = `/${change.OLD_DIR}/${change.OLD_FOLDER}`;
    o.newFilePath = `/${change.NEW_DIR}/${change.NEW_FOLDER}`;
    o.newName = change.NEW_FOLDER;
  } else if (change.TYPE === 'file') {
    o.oldFilePath = `/${change.OLD_DIR}/${change.OLD_FILE}`;
    o.newFilePath = `/${change.NEW_DIR}/${change.NEW_FILE}`;
    o.newName = change.NEW_FILE;
  }
  return o;
}

function _getUpdateRecord(change) {
  const d = _getFileFolderDetails(change);
  // determine position of item to update
  const position = _findPositionInTree(d.oldFilePath, _fileExplorerDataModel);
  // create change configuration for tree updates
  return {
    position: position,
    // updates to data structure
    updates: [
      {
        property: 'NAME',
        value: d.newName
      }, {
        property: 'FILE_PATH',
        value: d.newFilePath
      }
    ],
    childUpdates: [
      {
        property: 'FILE_PATH',
        findStartsWithString: d.oldFilePath,
        replaceString: d.newFilePath
      }
    ],
    // updates to user interface
    htmlUpdates: [
      {
        column: 0,
        value: d.newName
      }
    ]
  };
}

function _getAddRecord(change, tableDepth, tableIndex) {
  // create record to insert into interface at appropriate locations
  const row = {
    // calculate depth of row to insert
    DATA_DEPTH: tableDepth + 1,
    NAME: change.NAME,
    ICON_TYPE: change.ICON_TYPE,
    SIZE: change.SIZE,
    LAST_EDIT_DATE: change.LAST_EDIT_DATE,
    FILE_PATH: change.FILE_PATH
  };
  // determine position to insert new record into tree
  const position = treeator.findLastChild(tableIndex || 0, _fileExplorerDataModel);
  // create change configuration for tree updates
  return {
    position: position + 1,
    data: row
  };
}

function _getDeleteRecord(change) {
  // determine position of item to delete
  const position = _findPositionInTree(change.FILE_PATH, _fileExplorerDataModel);
  // create change configuration for tree updates
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
  const records = [];
  const tableIndex = _fileExplorerFolderView.dataModelIndex;
  let tableDepth = -1;
  // check if a folder has been loaded
  if (tableIndex || tableIndex === 0) {
    tableDepth = _fileExplorerDataModel[tableIndex].DATA_DEPTH;
  }
  // loop through list of changes returned by server
  for (let i = 0; i < changes.length; i++) {
    const change = changes[i];
    let record;
    if (changeType === 'add') {
      // prepare data for updating the file tree
      record = _getAddRecord(change, tableDepth, tableIndex);
      records.push(record);
      // update table data model so that table is refreshed with correct information on rebuild
      // push to second last position in table so it appears above the "add new row" placeholder
      _fileExplorerFolderView.data.splice(_fileExplorerFolderView.data.length - 1, 0, record.data);
    } else if (changeType === 'delete') {
      // prepare data for updating the file tree
      record = _getDeleteRecord(change);
      records.push(record);
      // find position of record in folder view
      const index = _findPositionInTree(change.FILE_PATH, _fileExplorerFolderView.data);
      // remove record from index in folder view
      _fileExplorerFolderView.data.splice(index, 1);
    } else if (changeType === 'update') {
      // prepare data for updating the file tree
      record = _getUpdateRecord(change);
      records.push(record);
      // update record details
      const d = _getFileFolderDetails(change);
      const oldFilePath = d.oldFilePath;
      const newFilePath = d.newFilePath;
      const newName = d.newName;
      const index = _findPositionInTree(oldFilePath, _fileExplorerFolderView.data);
      const updateRecord = _fileExplorerFolderView.data[index];
      updateRecord.NAME = newName;
      updateRecord.FILE_PATH = newFilePath;
    }
  }
  // total rebuild of table
  _getFolderView(tableIndex, _fileExplorerFolderView.data);
  // update existing tree
  _updateTree(changeType, records);
}

function _getTree(data) {
  const treeOptions = {
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
        onDblClick: function (tr, row, pos) {
          _reloadBreadCrumb(row, data);
          _reloadTable(row, pos, data);
        },
        // onHover: null,
        // onHoverOut: null
      },
      cells: {
        // renderer: null
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
  const toolbarSearchOptions = {
    div: _fileExplorerConfig.ui.tableSearchDiv,
    // Custom renderer required to override default name of element so that the
    // treeator search has a unique element to target
    renderer: function inputRenderer() {
      const e = {};
      e.id = `${_fileExplorerConfig.ui.tableSearchDiv}_input`;
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
    onKeyUp: function () {
      tableator.searchTable(_fileExplorerConfig.ui.tableDiv, `${_fileExplorerConfig.ui.tableSearchDiv}_input`);
    },
    icon: {
      // innerHTML: null,
      // renderer: null
    }
  };
  inputator.init(toolbarSearchOptions);
}

function _getTreeSearch(treeOptions) {
  const treeSearchOptions = {
    div: _fileExplorerConfig.ui.treeSearchDiv,
    renderer: function inputRenderer() {
      const e = {};
      // give input a unique name to avoid conflicts with other search boxes
      e.id = `${_fileExplorerConfig.ui.treeSearchDiv}_input`;
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
    onKeyUp: function () {
      treeator.searchTable(`${_fileExplorerConfig.ui.treeSearchDiv}_input`, 'treeator-tree', _fileExplorerConfig.ui.treeDiv, treeOptions);
    },
    icon: {
      // innerHTML: null,
      // renderer: null
    }
  };
  inputator.init(treeSearchOptions);
}

function _getFileSystemData() {
  // define request config
  const options = {
    method: 'GET',
    url: _fileExplorerConfig.api.directory,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // send ajax request to server
  return http.sendRequest(options);
}

/* ============================== Public Methods ============================ */

function init(config) {
  // sets functions containing object property
  _fileExplorerConfig = config;
  // get file system data for navigating
  // store data in global object so it can be shared between all modules
  _getFileSystemData().then(function (res) {
    const data = JSON.parse(res);
    _fileExplorerDataModel = data[0].data;
    // construct tree view of data
    const treeOptions = _getTree(_fileExplorerDataModel);
    _getBreadcrumb([]);
    _getToolbarSearch();
    _getTreeSearch(treeOptions);
    _getFolderView(null, _addEmptyRow([], _fileExplorerDataModel[0].FILE_PATH));
  });
}

/* =========================== Export Public APIs =========================== */

module.exports = {
  init
};