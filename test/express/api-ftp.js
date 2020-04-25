/*!
 * File Transfer Protocol (FTP) API
 * Handles all server configuration to allow ftp operations
 * (c) 2020 Joshua Adams
 */

/* ============================== Import Modules ============================ */

const express = require('express');
const fs = require('fs');
const Path = require('path');

/* ================================ Variables =============================== */

// create instance of the express router for management of ftp api
const router = express.Router();

/* ============================= Private Methods ============================ */

// function _msToDate (ms) {
//  const d = new Date(ms);
//  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
// }

function _getDateTime() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}_${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
}

function _checkFileExists(dir, file) {
  const fullFileName = `${__dirname}/${dir}/${file}`;
  const exists = fs.existsSync(fullFileName);
  let newName;
  if (exists) {
    newName = `${_getDateTime()}_${file}`;
  } else {
    newName = file;
  }
  return newName;
}

function _escapeFilePath(unsafe) {
  return unsafe
    .replace(/\.\./g, '&period&period')
    .replace(/\\/g, '&bsol')
    .replace(/\//g, '&sol');
}

function _copy(o) {
  return JSON.parse(JSON.stringify(o));
}

function _deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      const curPath = Path.join(path, file);
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        _deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

/* ============================== Public Methods ============================ */

router.post('/add/file', function (req, res, next) {
  // error handling
  if (req.busboy && req.get('directory')) {
    // get parameters passed from user
    const dir = _escapeFilePath(req.get('directory'));
    const append = req.get('appendToResponse') || {};
    let response = [];
    // handle appended response property case
    if (typeof response === 'string') {
      response = JSON.parse(response);
    }
    // process binary file streams
    req.busboy.on('file', function (fieldname, file, filename) {
      // check if file already exists on server
      const newFilename = _checkFileExists(dir, filename);
      const fullFilePath = `${__dirname}/${dir}/${newFilename}`;
      // define response
      const row = _copy(append);
      row.STATUS = 'pass';
      row.NAME = newFilename;
      // row['SIZE'] = `${stats.size / 1000} kB`;
      // row['LAST_EDIT_DATE'] = `${_msToDate(stats.mtimeMs)} kB`;
      // row['FILE_PATH'] = `${dir}\\${newFilename}`;
      response.push(row);
      // create file stream
      const fstream = fs.createWriteStream(fullFilePath);
      file.pipe(fstream);
      // on completion of stream
      fstream.on('close', function () {
        // get file statistics for returning to user
        // fs.stat(fullFilePath, function (err, stats) {
        // })
      });
    });
    req.busboy.on('finish', function () {
      // send response
      res.end(JSON.stringify(response));
    });
    // pipe request into busboy for processing
    req.pipe(req.busboy);
  } else {
    // return bad request code
    res.status(400).send();
  }
});

router.post('/add/folder', function (req, res, next) {
  // get application/json payload
  const payload = req.body;
  // error handling
  if (payload && payload.length > 0) {
    // loop through all folders for creation
    for (let i = 0; i < payload.length; i++) {
      // escape user parameters
      const row = payload[i];
      const dir = _escapeFilePath(row.dir || '');
      const folder = _escapeFilePath(row.folder || '');
      const fullFolderName = `${__dirname}\\${dir}\\${folder}`;
      // check if folder already exists
      const exists = fs.existsSync(fullFolderName);
      if (!exists) {
        // create directory
        fs.mkdirSync(fullFolderName, { recursive: true });
        row.status = 'pass';
      } else {
        // do nothing
        row.status = 'fail';
      }
    }
    // Return response to user.
    res.end(JSON.stringify(payload));
  } else {
    // return bad request code
    res.status(400).send();
  }
});

// [{
//   dir: 'assets'
//   , file: '2020-4-24@10-9-40_AX-DROID7000-WellMonitoring.pdf'
// }]
router.post('/delete/file', function (req, res, next) {
  // get application/json payload
  const payload = req.body;
  // error handling
  if (payload && payload.length > 0) {
    // loop through all folders for creation
    for (let i = 0; i < payload.length; i++) {
      // escape user parameters
      const row = payload[i];
      const dir = _escapeFilePath(row.dir || '');
      const file = _escapeFilePath(row.file || '');
      const fullFileName = `${__dirname}\\${dir}\\${file}`;
      // check if folder already exists
      const exists = fs.existsSync(fullFileName);
      if (exists) {
        // delete file
        fs.unlinkSync(fullFileName);
        row.status = 'pass';
      } else {
        // do nothing
        row.status = 'fail';
      }
    }
    // Return response to user.
    res.end(JSON.stringify(payload));
  } else {
    // return bad request code
    res.status(400).send();
  }
});

// [{
//   dir: 'assets'
//   , folder: 'test_dir'
// }]
router.post('/delete/folder', function (req, res, next) {
  // get application/json payload
  const payload = req.body;
  // error handling
  if (payload && payload.length > 0) {
    // loop through all folders for creation
    for (let i = 0; i < payload.length; i++) {
      // escape user parameters
      const row = payload[i];
      const dir = _escapeFilePath(row.dir || '');
      const folder = _escapeFilePath(row.folder || '');
      const fullFolderName = `${__dirname}\\${dir}\\${folder}`;
      // check if folder already exists
      const exists = fs.existsSync(fullFolderName);
      if (exists) {
        // delete folder
        _deleteFolderRecursive(fullFolderName);
        row.status = 'pass';
      } else {
        // do nothing
        row.status = 'fail';
      }
    }
    // Return response to user.
    res.end(JSON.stringify(payload));
  } else {
    // return bad request code
    res.status(400).send();
  }
});

// [{
//   old_dir: 'assets'
//   , old_file: 'SCADA Well Monitoring System.pdf'
//   , new_dir: 'assets'
//   , new_file: 'test.pdf'
// }]
router.post('/update/file', function (req, res, next) {
  // get application/json payload
  const payload = req.body;
  // error handling
  if (payload && payload.length > 0) {
    // loop through all folders for creation
    for (let i = 0; i < payload.length; i++) {
      // escape user parameters
      const row = payload[i];
      const old_dir = _escapeFilePath(row.old_dir || '');
      const old_file = _escapeFilePath(row.old_file || '');
      const new_dir = _escapeFilePath(row.new_dir || '');
      let new_file = _escapeFilePath(row.new_file || '');
      const oldFullFileName = `${__dirname}\\${old_dir}\\${old_file}`;
      // check if folder already exists
      const exists = fs.existsSync(oldFullFileName);
      if (exists) {
        // commence renaming file
        new_file = _checkFileExists(new_dir, new_file);
        const newFullFileName = `${__dirname}\\${new_dir}\\${new_file}`;
        fs.renameSync(oldFullFileName, newFullFileName);
        row.status = 'pass';
      } else {
        // do nothing
        row.status = 'fail';
      }
    }
    // Return response to user.
    res.end(JSON.stringify(payload));
  } else {
    // return bad request code
    res.status(400).send();
  }
});

// [{
//   old_dir: 'assets'
//   , old_folder: 'SCADA Well Monitoring System.pdf'
//   , new_dir: 'assets'
//   , new_folder: 'test.pdf'
// }]
router.post('/update/folder', function (req, res, next) {
  // get application/json payload
  const payload = req.body;
  // error handling
  if (payload && payload.length > 0) {
    // loop through all folders for creation
    for (let i = 0; i < payload.length; i++) {
      // escape user parameters
      const row = payload[i];
      const old_dir = _escapeFilePath(row.old_dir || '');
      const old_folder = _escapeFilePath(row.old_folder || '');
      const new_dir = _escapeFilePath(row.new_dir || '');
      let new_folder = _escapeFilePath(row.new_folder || '');
      const oldFullFolderName = `${__dirname}\\${old_dir}\\${old_folder}`;
      // check if folder already exists
      const exists = fs.existsSync(oldFullFolderName);
      if (exists) {
        // commence renaming file
        new_folder = _checkFileExists(new_dir, new_folder);
        const newFullFolderName = `${__dirname}\\${new_dir}\\${new_folder}`;
        fs.renameSync(oldFullFolderName, newFullFolderName);
        row.status = 'pass';
      } else {
        // do nothing
        row.status = 'fail';
      }
    }
    // Return response to user.
    res.end(JSON.stringify(payload));
  } else {
    // return bad request code
    res.status(400).send();
  }
});

/* =========================== Export Public APIs =========================== */

module.exports = {
  router
};
