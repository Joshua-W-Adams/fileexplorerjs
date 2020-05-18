/*!
 * Fileexplorerjs
 * A JavaScript GUI module for exploring files
 * (c) 2020 Joshua Adams
 */

/* ============================== Import Modules ============================ */

import breadcrumb from '/node_modules/breadcrumbjs/src/js/module.js';
import inputator from '/node_modules/inputator/src/js/module.js';
import treeator from '/node_modules/treeator/src/js/module.js';
import tableator from '/node_modules/tableator/src/js/module.js';
import contextmenujs from '/node_modules/contextmenuator/src/js/module.js';

import modalator from '/node_modules/modalator/src/js/modalator.js';
import httpComms from '/src/js/http-comms.js';

import tests from '/src/js/tests.js';

/* ================================ Variables =============================== */

// Gloabl variable to store the file Explorer data
let fileExplorerData = [];

// Global variables to store the current navigation status of the file explorer
// module
let fileExplorerTable = {
  // location of the current data displayed in the tree data model
  treeIndex: null,
  // table data currently displayed
  data: null
};

let Modal;

/* ============================= Private Methods ============================ */

function _displaySelectedFiles(element, elementId) {
  // get list of files
  // const files = this.files;
  const files = element.files;
  // create list to load files into
  let fileNames = document.createElement('ol');
  fileNames.style.listStyleType = 'none';
  // convert files to comma separated values
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const li = document.createElement('li');
    li.innerHTML = file.name;
    li.style.padding = '10px 0px';
    fileNames.appendChild(li)
  }
  // get element to display file list in
  let e = document.getElementById(elementId);
  // remove previous items
  e.innerHTML = '';
  // assign file list to span
  e.appendChild(fileNames);
}

function _uploadButtonRenderer(displayElementId) {
  // Add custom label to override default input style
  const label = document.createElement('label');
  label.htmlFor = 'fileUpload';
  label.innerHTML = 'Select Files';
  label.style.display = 'inline-block';

  // add span to load list of selected documents
  // const span = document.createElement('span');
  // span.id = 'files-selected';
  // label.appendChild(span);

  // create input element for file selector
  const e = document.createElement('input');
  e.type = 'file';
  e.multiple = 'multiple';
  e.name = 'fileUploaded';
  e.id = 'fileUpload';
  e.style.display ='none';

  // add function for assigning list of files on change
  e.onchange = function () {
    _displaySelectedFiles(e, displayElementId);
  }

  // build element object modal
  label.appendChild(e);

  return label;
}

// tests.testApis();

function _findLastChild(data, elementPosition, depth) {
  // loop upwards (backwards) through table array
  for (let i = elementPosition; i < data.length; i++) {
    const row = data[i];
    const rowDepth = row.DATA_DEPTH;
    // sibling or parent sibling encountered
    if (i !== elementPosition && rowDepth <= depth) {
      let lastChildIndex = i - 1;
      // let lastChild = data[lastChildIndex];
      // handle case that parent has no children
      if (i !== 1) {
        return lastChildIndex;
      }
    // reached end of data set
    } else if (i === data.length - 1) {
      return i;
    }
  }
}

function _updateUserInterface(changes) {
  let records = [];
  let tableIndex = fileExplorerTable.treeIndex;
  let tableDepth = fileExplorerData[tableIndex].DATA_DEPTH;
  // loop through list of changes returned by server
  for (let i = 0; i < changes.length; i++) {
    let change = changes[i];
    // create record to insert into interface at appropriate locations
    let row = {
      // calculate depth of row to insert
      DATA_DEPTH: tableDepth + 1,
      NAME: change.NAME,
      ICON_TYPE: change.ICON_TYPE,
      SIZE: change.SIZE,
      LAST_EDIT_DATE: change.LAST_EDIT_DATE,
      FILE_PATH: change.FILE_PATH
    }
    // determine position to insert new record into tree
    let position = _findLastChild(fileExplorerData, tableIndex, tableDepth);
    // create change configuration for tree updates
    records.push({
      position: position + 1,
      data: row
    });
    // push to table data
    // push to second last position in table so it appears above the 
    // "add new row" placeholder
    fileExplorerTable.data.splice(fileExplorerTable.data.length - 1, 0, row);   
  }
  // rebbuild table
  _getTable(tableIndex, fileExplorerTable.data);
  // add elements to tree and push passed updates to tree data model.
  treeator.appendTreeRecords(records);
}

function _handleResponse(data) {
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
      _updateUserInterface(passed);
    }
    // TO DO - Inform user of failed operation
    if (failed.length > 0) {

    }
  } else {
    // unknown error in response from server
    // TO DO - Inform user of failed update
  }
}
  
function _uploadFormOnClick(form) {
  return function() {
    // get form data model for submission to server
    const formData = new FormData(form);
    // define request config
    const options = {
      method: 'POST'
      , url: form.action
      , payload: formData
      , headers: {
        // content type automatically assigned by form data
        // 'Content-Type': null
        directory: 'client_root'
        , append: {
          // N/A all properties are assigned server side
          // or in response processing
        }
      }
    }
    // send ajax request to server
    httpComms.sendRequest(options).then(function(res) {
      let data = JSON.parse(res);
      _handleResponse(data);
    });
    return false; // To avoid actual submission of the form
  }
}

function _showUploadForm() {
  // destroy any existing modals
  if (Modal) {
    // TO DO - Add to modalator prototype
    // Element.prototype.remove = function() {
    //   // delete Dom element
    //   this.parentElement.removeChild(this);
    //   // delete object
    //   // object is automatically removed by the garbage collector
    //   // when there are no more references to the object
    //   // therefore not required
    // }
    // get top level DOM element
    let e =  Modal.finalConfig[0].element
    // remove from DOM
    e.parentElement.removeChild(e);
    // TO DO - Add remove to prototype and change close calls to "remove" calls
  }
  const config = [{
    name: 'modal',
    child: [{
      name: 'overlay',
      style: function () {
        let properties = {
          'background':'#ccc',
          'opacity':'0.7'
        }
        return properties;
      } 
    }, {
      name: 'dialog',
      child: [{
        name: 'dialog_header',
        // style: 'border-bottom: none;',
        child: [{
          name: 'dialog_header_title',
          element: {
            content: 'Upload Files'
          }
        }, {
          name: 'dialog_header_close_icon',
          style: 'color: rgb(255,0,0);'
        }]
      }, {
        name: 'dialog_body',
        style: function () {
          let properties = {
            // 'color': 'black',
            // 'display': 'none'
          }
          return properties;            
        } 
      }, {
        name: 'dialog_footer',
        element: {
          value: function () {
            const form = document.createElement('form');
            form.action = '/api/ftp/add/file'
            form.onsubmit = _uploadFormOnClick(form);
            return form;
          }
        },
        child: [{
          name: 'dialog_footer_child',
          child: [{
            name: 'dialog_footer_button_two',
            element: {
              value: function () {
                return _uploadButtonRenderer('dialog_body');
              }
            },
            style: function () {
              let properties = {
                'background-color': '#007bff'
              }
              return properties;
            },
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
              let properties = {       
                'background-color': '#5a6268'
              }
              return properties;
            }
          }]
        }]
      }]
    }]
  }];
  let modal = modalator.buildModal(config);
  modal.show();
  // store Modal in global object
  Modal = modal;
}

function _downloadFile() {
  // get state of tableator
  let state = tableator.getState();
  let onHoverRow = state.onHoverRow;
  let filePath = onHoverRow.data.FILE_PATH;
  let fileName = onHoverRow.data.NAME;
  if (fileName && filePath) {
    var link = document.createElement('a');
    link.download = fileName;
    link.href = `/test/express/assets/${filePath}`;
    link.click();
    link.remove();
  }
}

function _addFile() {
  _showUploadForm();
}

function _addFolder() {

}

function _delete() {

}

function _rename() {

}

function _move() {

}

function _copy() {

}

function _paste() {

}

function _getContextMenu() {
  const options = {
    // div to apply custom context menu to
    'div': 'fileexplorerjs-table',
    // renderer for applying css and styles to entire context menu
    'menuRenderer': null,
    // renderer for applying css and styles to each row in the context menu
    'itemRenderer': null,
    // menu items and sub items
    'items': {
      'Download': _downloadFile,
      'Add': {
        // 'Folder': _addFolder,
        'File': _addFile
      },
      // 'Delete' : _delete,
      // 'Rename' : _rename,
      // 'Move' : _move,
      // 'Copy' : _copy,
      // 'Paste' : _paste,
    }
  }
  contextmenujs.init(options);
}

function _getTable(treeIndex, data) {
  // update global tbale data tracking
  fileExplorerTable = {
    treeIndex: treeIndex,
    data: data
  };
  // destroy existing table
  let table = document.getElementById('fileexplorerjs-table');
  while (table.firstChild) {
    table.removeChild(table.lastChild);
  }
  // construct new table
  let options = {
    div: 'fileexplorerjs-table',
    data: data,
    renderer: null,
    headers: {
      displayNames: true,
      sourceNames: ['NAME', 'SIZE', 'LAST_EDIT_DATE'],
      names: ['Name', 'Size', 'Last Edit Date'],
      widths: ['50%', '25%', '25%'],
      alignment: ["left", "center", "center"],
      renderer: null
    },
    rows: {
      renderer: null,
      rowTypeIcons: 'filesystem'
    },
    cells: {
      onClick: null,
      onDblClick: function (tr, td, rowNo, rowData) {
        // find position of filePath in tree data
        let treePos = _findPositionInTree(rowData.FILE_PATH, fileExplorerData);
        // update tree single & double clicked row
        _updateTreeClickedItem(fileExplorerData, treePos);
        // update breadcrumb menu
        _reloadBreadCrumb(fileExplorerData[treePos], fileExplorerData);
        // update directory
        if (rowData.ICON_TYPE === 'folder') {
          // get all children of current row
          let children = _getChildren(fileExplorerData[treePos], treePos, fileExplorerData);
          _getTable(treePos, _addEmptyRow(children, fileExplorerData[treePos].FILE_PATH));
        } else {
          // TO DO - Display a drawer or information panel on clicked item
        }
      },
      onHover: null,
      renderer: null
    }
  }
  tableator.init(options);
  _getContextMenu();
  _addDragSelect();
}

function _getTree(data) {
  // destroy existing tree
  // TO DO - Move to treator init function
  // let e = document.getElementById('tree');
  // while (e.firstChild) {
  //   e.removeChild(e.lastChild);
  // }
  const treeOptions = {
    tree: {
      div: 'tree',
      data: data,
      renderer: null,
      columns: {
        sourceNames: ['NAME'],
        newNames: ['name'],
        widths: [250],
        alignment: ['left']
      },
      rows: {
        collapseIcon: null,
        expandIcon: null,
        rowTypeIcons: 'filesystem',
        renderer: null,
        onClick: null,
        onDblClick: function (tr, row, pos) {
          _reloadBreadCrumb(row, data);
          _reloadTable(row, pos, data, row);
        },
        onHover: null,
        onHoverOut: null
      },
      cells: {
        renderer: null
      }
    },
    search: {
      div: 'fileexplorerjs-tree__search'
    }
  }
  treeator.init(treeOptions);
  return treeOptions;
}

function _getBreadcrumb(items) {
  // destroy current breadcrumb
  let bc = document.getElementById('fileexplorerjs-toolbar__breadcrumb');
  while (bc.firstChild) {
    bc.removeChild(bc.lastChild);
  }
  // construct new breadcrumb
  const breadCrumbOptions = {
    'div': 'fileexplorerjs-toolbar__breadcrumb',
    'breadcrumbs': {
      'items': items
    }
  }
  breadcrumb.init(breadCrumbOptions);
}

function _reloadBreadCrumb(row, data) {
  // create breadcrumb
  const arr = row.FILE_PATH.split('\\');
  let items = [];
  for (let i = 0; i < arr.length; i++) {
    const row = {
      'item': arr[i],
      'onClick': function (li, items, position) {
        // get filePath to lookup in tree array
        let filePath = _getBreadCrumbFilePath(li, items, position);
        // find position of filePath in tree data
        let pos = _findPositionInTree(filePath, data);
        // Update tree
        _updateTreeClickedItem(data, pos);
        // Update table
        _reloadTable(data[pos], pos, data, row);
      }
    }
    items.push(row);
  }
  _getBreadcrumb(items);
}

function _getToolbarSearch() {
  const toolbarSearchOptions = {
    div: 'fileexplorerjs-toolbar__search',
    // Custom renderer required to override default name of element so that the
    // treeator search has a unique element to target
    renderer: function inputRenderer() {
      const e = {};
      e.id = 'fileexplorerjs-toolbar__searchinput';
      // e.className = 'inputator-container__input';
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
    onClick: null,
    onFocusOut: null,
    onHover: null,
    onKeyUp: function () {
      _searchDirectory();
    },
    icon: {
      innerHTML: null,
      renderer: null
    }
  }
  inputator.init(toolbarSearchOptions);
}

function _getTreeSearch(treeOptions) {
  const treeSearchOptions = {
    div: 'fileexplorerjs-tree__search',
    renderer: function inputRenderer() {
      const e = {};
      e.id = 'fileexplorerjs-tree__searchinput';
      // e.className = 'inputator-container__input';
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
    onClick: null,
    onFocusOut: null,
    onHover: null,
    onKeyUp: function () {
      treeator.searchTable('fileexplorerjs-tree__searchinput', 'treeator-tree', 'tree', treeOptions)
    },
    icon: {
      innerHTML: null,
      renderer: null
    }
  }
  inputator.init(treeSearchOptions);
}

function _getBreadCrumbFilePath(li, items, position) {
  let filePath = '';
  for (let i = 0; i <= position; i++) {
    if (i === position) {
      filePath = filePath + items[i].item;
    } else {
      filePath = filePath + items[i].item + '\\';
    }
  }
  return filePath;
}

function _updateTreeClickedItem(data, pos) {
  // update tree single & double clicked rows
  const table = document.getElementById('treeator-tree');
  const tr = table.getElementsByTagName('tr');
  treeator.onClickDefault(tr[pos]);
  treeator.onDblClickDefault(tr[pos]);
}

function _reloadTable(matchedRow, pos, data, row) {
  if (matchedRow.ICON_TYPE === 'folder') {
    // get all children of current row
    let children = _getChildren(data[pos], pos, data);
    _getTable(pos, _addEmptyRow(children, data[pos].FILE_PATH));
  } else {
    let parentPos = _findParent(row, pos, data);
    // get all children of current row
    let children = _getChildren(data[parentPos], parentPos, data);
    _getTable(pos, _addEmptyRow(children, data[parentPos].FILE_PATH));
  }
}

function _findPositionInTree(filePath, data) {
  let pos;
  for (let i = 0; i < data.length; i++) {
    if (data[i].FILE_PATH === filePath) {
      pos = i;
    }
  }
  return pos;
}

function _getChildren(row, pos, data) {
  let depth = row.DATA_DEPTH;
  let children = [];
  for (let i = pos + 1; i < data.length; i++) {
    // end loop - no more direct children found
    if (data[i].DATA_DEPTH <= depth) {
      break;
    } else if (data[i].DATA_DEPTH === depth + 1) {
      children.push(data[i]);
    }
  }
  return children;
}

function _findParent(row, pos, data) {
  for (let i = pos - 1; i > -1; i--) {
    if (data[i].ICON_TYPE === 'folder' && data[i].DATA_DEPTH === row.DATA_DEPTH - 1) {
      return i
    }
  }
  return -1;
}

function _addHighlight(tdElement, filter) {
  let t = (tdElement.innerText || tdElement.textContent);
  // flags... ig
  // i = case insensitive
  // g = global. Search for ALL matches in string
  tdElement.innerHTML = t.replace(new RegExp(`(${filter})`, 'ig'), '<span style="background-color: yellow;">$1</span>');
}

function _searchDirectory() {
  const div = document.getElementById('fileexplorerjs-table');
  const trs = div.getElementsByTagName('tr');
  const input = document.getElementById('fileexplorerjs-toolbar__searchinput');
  const filter = input.value.toUpperCase();
  // Loop through all table rows, and hide those who don't match the search query
  for (let i = 0; i < trs.length; i++) {
    let rowMatch = false;
    // get all table cells
    const tds = trs[i].getElementsByTagName('td');
    // loop through all table cells
    for (let n = 0; n < tds.length; n++) {
      const text = (tds[n].innerText || tds[n].textContent);
      if (text.toUpperCase().indexOf(filter) > -1) {
        rowMatch = true;
        _addHighlight(tds[n], filter);
      } else {
        // strip out highlighting from cells where no match was found
        tds[n].innerHTML = text;
      }
    }
    // hide / display row
    if (rowMatch) {
      trs[i].style.display = '';
    } else {
      trs[i].style.display = 'none';
    }
  }
}

function _addDragSelect() {
  const ds = new DragSelect({ // eslint-disable-line no-undef
    selectables: document.getElementsByClassName('table-table__row'),
    area: document.getElementById('fileexplorerjs-table'),
    callback: function cb(elements) { // eslint-disable-line no-unused-vars
      // do something
    }
  });
  return ds;
}

function _getFileSystemData() {
  // define request config
  const options = {
    method: 'POST'
    , url: '/api/ftp/read/folder'
    , headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    , payload: JSON.stringify([{
      folder: 'client_root'
    }])
  }
  // send ajax request to server
  return httpComms.sendRequest(options);
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
/* ============================== Public Methods ============================ */

function init(options) {
  // get file system data for navigating
  // store data in global object so it can be shared between all modules
  _getFileSystemData().then(function (res) {
    let data = JSON.parse(res);
    fileExplorerData = data[0].data;
    // construct tree view of data
    let treeOptions = _getTree(fileExplorerData);
    _getBreadcrumb([]);
    _getToolbarSearch();
    _getTreeSearch(treeOptions);
    _getTable(null, _addEmptyRow([], fileExplorerData[0].FILE_PATH));
  });
}

/* =========================== Export Public APIs =========================== */

export default {
  init
};
