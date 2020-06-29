/*!
 * File Transfer Protocol (FTP) API
 * Handles all server configuration to allow ftp operations
 * (c) 2020 Joshua Adams
 */

/* ============================== Import Modules ============================ */

const express = require('express');
const fs = require('fs');
const Path = require('path');

/* ================================= Settings =============================== */

// directory that will be managed by the FTP
const assetDirectory = `${__dirname}/assets`;

/* ================================ Variables =============================== */

// create instance of the express router for management of ftp api
const router = express.Router();

/* ============================= Private Methods ============================ */

function _msToDate(ms) {
  const d = new Date(ms);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function _getDateTime() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}_${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
}

function _checkFileExists(dir, file) {
  const fullFileName = `${dir}/${file}`;
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
    .replace(/\\/g, '&bsol');
}

function _copy(o) {
  return JSON.parse(JSON.stringify(o));
}

function _deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file) {
      const curPath = Path.join(path, file);
      if (fs.statSync(curPath).isDirectory()) { // recurse
        _deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

// walk folder synchronously and return directory listing
const walk = function (options, done) {
  const dir = options.dir;
  const dirName = options.dirName;
  let depth = options.depth || 0;
  const strip = options.path;
  let results = [];
  // push parent folder to data array
  if (depth === 0) {
    const dirStat = fs.statSync(Path.resolve(dir, ''));
    results.push({
      DATA_DEPTH: depth++,
      ICON_TYPE: 'folder',
      NAME: dirName,
      FILE_PATH: dir.replace(/\\/g, '/').replace(strip.replace(/\\/g, '/'), ''),
      SIZE: `${dirStat.size / 1000} kB`,
      LAST_EDIT_DATE: `${_msToDate(dirStat.mtimeMs)}`
    });
  }
  // commence reading directory listings
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    // sort files
    list = list.sort(function (a, b) {
      // a = first element
      // b = second element
      // determine if a file
      const statA = fs.statSync(Path.resolve(dir, a));
      const statB = fs.statSync(Path.resolve(dir, b));
      // case 1 - both directorys
      if (statA.isDirectory() && statB.isDirectory()) {
        // check for which is alphbetical order
        return a - b;
      // case 1 - first value is a folder
      } else if (statA.isDirectory()) {
        // -1 = first arguement less than second arguement
        return -1;
      // case 3 - second value is a folder
      } else if (statB.isDirectory()) {
        // 1 = second arguement less than first arguement
        return 1;
      // case 4 - neither a directory
      } else {
        return a - b;
      }
    });
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) return done(null, results);
      file = Path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          /* recurse into a subdirectory */
          walk({ dir: file, depth: depth + 1, path: strip }, function (err, res) {
            results.push({
              DATA_DEPTH: depth,
              ICON_TYPE: 'folder',
              NAME: list[i - 1],
              FILE_PATH: file.replace(/\\/g, '/').replace(strip.replace(/\\/g, '/'), ''),
              SIZE: `${stat.size / 1000} kB`,
              LAST_EDIT_DATE: `${_msToDate(stat.mtimeMs)}`
            });
            results = results.concat(res);
            next();
          });
        } else {
          /* is a file - move to next file */
          results.push({
            DATA_DEPTH: depth,
            ICON_TYPE: 'file',
            NAME: list[i - 1],
            FILE_PATH: file.replace(/\\/g, '/').replace(strip.replace(/\\/g, '/'), ''),
            SIZE: `${stat.size / 1000} kB`,
            LAST_EDIT_DATE: `${_msToDate(stat.mtimeMs)}`
          });
          next();
        }
      });
    })();
  });
};

// walk folder synchronously and return directory listing
function walkPromise(options) {
  return new Promise(function (resolve, reject) {
    // walk file path asynchronously
    walk(options, function (err, results) {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}

function _createFileWritePromise(config) {
  const file = config.file;
  const fullFilePath = config.fullFilePath;
  return new Promise(function (resolve) {
    const fstream = fs.createWriteStream(fullFilePath);
    file.pipe(fstream);
    // on completion of stream
    fstream.on('close', function () {
      // get file statistics for returning to user
      fs.stat(fullFilePath, function (err, stats) {
        config.stats = stats;
        resolve(config);
      });
    });
  });
}

/* ============================== Public Methods ============================ */

// rescursively read a file system directory(s) and return formatted results to client
router.get('/read/folder', function (req, res, next) {
  // define standard payload format
  const payload = [];
  const row = {};
  payload.push(row);
  // folder access can be assigned specific to user in the future
  const folders = ['facilities'];
  // create list of read promises
  const promises = [];
  // loop through folders to read
  for (let i = 0; i < folders.length; i++) {
    const folder = folders[i];
    const fullFolderName = `${assetDirectory}/${folder}`;
    // check if folder already exists
    const exists = fs.existsSync(fullFolderName);
    if (!exists) {
      // no directory exists
      row.STATUS = 'fail';
      // Return response to user.
      res.end(JSON.stringify(payload));
      // end loop
      break;
    } else {
      // promise to read directory info & convert to correct format
      const p = walkPromise({ dirName: folder, dir: fullFolderName, path: assetDirectory });
      promises.push(p);
    }
  }
  // execute array of promises
  Promise.all(promises).then(function (results) {
    // compile list of results
    let data = [];
    for (let i = 0; i < results.length; i++) {
      data = data.concat(results[i]);
    }
    // save to response
    row.data = data;
    // inform user of success
    row.STATUS = 'pass';
    // Return response to user.
    res.end(JSON.stringify(payload));
  }).catch(function () {
    // return bad request code
    res.status(400).send();
  });
});

router.post('/add/file', function (req, res, next) {
  // error handling
  if (req.busboy) {
    // define standard payload format
    const response = [];
    // get parameters passed from user
    const dir = _escapeFilePath(req.get('directory'));
    let append = req.get('append');
    // append values are in header as text, therefore they must be parsed
    if (append) {
      append = JSON.parse(append);
    } else {
      append = {};
    }
    // define array of promises to store write requests
    const promises = [];
    // process binary file streams
    req.busboy.on('file', function (fieldname, file, filename) {
      // check if file already exists on server
      const newFilename = _checkFileExists(`${assetDirectory}/${dir}`, filename);
      const relativeFilePath = `${dir}/${newFilename}`;
      const fullFilePath = `${assetDirectory}/${dir}/${newFilename}`;
      const config = {
        file: file,
        newFilename: newFilename,
        fullFilePath: fullFilePath,
        relativeFilePath: relativeFilePath
      };
      // create array of promises to write all files to file system
      promises.push(_createFileWritePromise(config));
    });
    req.busboy.on('finish', function () {
      // execute all file system write operations
      Promise.all(promises).then(function (writeDetails) {
        // loop through all write operations
        for (let i = 0; i < writeDetails.length; i++) {
          const fileDetails = writeDetails[i];
          // append details to response object
          const row = _copy(append);
          row.STATUS = 'pass';
          row.NAME = fileDetails.newFilename;
          row.ICON_TYPE = 'file';
          row.SIZE = `${fileDetails.stats.size / 1000} kB`;
          row.LAST_EDIT_DATE = `${_msToDate(fileDetails.stats.mtimeMs)}`;
          row.FILE_PATH = fileDetails.relativeFilePath;
          response.push(row);
        }
        // send response
        res.end(JSON.stringify(response));
      }).catch(function () {
        // return bad request code
        res.status(400).send();
      });
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
      const fullFolderName = `${assetDirectory}/${dir}/${folder}`;
      // check if folder already exists
      const exists = fs.existsSync(fullFolderName);
      if (!exists) {
        // create directory
        fs.mkdirSync(fullFolderName, { recursive: true });
        // get directory stats
        const stats = fs.statSync(fullFolderName);
        // let strip = assetDirectory;
        // format response correctly
        row.STATUS = 'pass';
        row.NAME = folder;
        row.ICON_TYPE = 'folder';
        row.SIZE = `${stats.size / 1000} kB`;
        row.LAST_EDIT_DATE = `${_msToDate(stats.mtimeMs)}`;
        row.FILE_PATH = `${dir}/${folder}`;
      } else {
        // do nothing
        row.STATUS = 'fail';
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
      const fullFileName = `${assetDirectory}/${dir}/${file}`;
      // check if folder already exists
      const exists = fs.existsSync(fullFileName);
      if (exists) {
        // delete file
        fs.unlinkSync(fullFileName);
        row.STATUS = 'pass';
        row.FILE_PATH = fullFileName.replace(/\\/g, '/').replace(assetDirectory.replace(/\\/g, '/'), '');
      } else {
        // do nothing
        row.STATUS = 'fail';
        row.FILE_PATH = fullFileName.replace(/\\/g, '/').replace(assetDirectory.replace(/\\/g, '/'), '');
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
      const fullFolderName = `${assetDirectory}/${dir}/${folder}`;
      // check if folder already exists
      const exists = fs.existsSync(fullFolderName);
      if (exists) {
        // delete folder
        _deleteFolderRecursive(fullFolderName);
        row.STATUS = 'pass';
        row.FILE_PATH = fullFolderName.replace(/\\/g, '/').replace(assetDirectory.replace(/\\/g, '/'), '');
      } else {
        // do nothing
        row.STATUS = 'fail';
        row.FILE_PATH = fullFolderName.replace(/\\/g, '/').replace(assetDirectory.replace(/\\/g, '/'), '');
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
    // loop through all items for rename
    for (let i = 0; i < payload.length; i++) {
      // escape user parameters
      const row = payload[i];
      const old_dir = _escapeFilePath(row.OLD_DIR || '');
      const old_file = _escapeFilePath(row.OLD_FILE || '');
      const new_dir = _escapeFilePath(row.NEW_DIR || '');
      let new_file = _escapeFilePath(row.NEW_FILE || '');
      const oldFullFileName = `${assetDirectory}/${old_dir}/${old_file}`;
      // check if folder already exists
      const exists = fs.existsSync(oldFullFileName);
      if (exists && new_file) {
        // commence renaming file
        new_file = _checkFileExists(`${assetDirectory}/${new_dir}`, new_file);
        const newFullFileName = `${assetDirectory}/${new_dir}/${new_file}`;
        fs.renameSync(oldFullFileName, newFullFileName);
        row.STATUS = 'pass';
      } else {
        // do nothing
        row.STATUS = 'fail';
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
    // loop through all items for update
    for (let i = 0; i < payload.length; i++) {
      // escape user parameters
      const row = payload[i];
      const old_dir = _escapeFilePath(row.OLD_DIR || '');
      const old_folder = _escapeFilePath(row.OLD_FOLDER || '');
      const new_dir = _escapeFilePath(row.NEW_DIR || '');
      let new_folder = _escapeFilePath(row.NEW_FOLDER || '');
      const oldFullFolderName = `${assetDirectory}/${old_dir}/${old_folder}`;
      // check if folder already exists
      const exists = fs.existsSync(oldFullFolderName);
      if (exists && new_folder) {
        // commence renaming file
        new_folder = _checkFileExists(`${assetDirectory}/${new_dir}`, new_folder);
        const newFullFolderName = `${assetDirectory}/${new_dir}/${new_folder}`;
        fs.renameSync(oldFullFolderName, newFullFolderName);
        row.STATUS = 'pass';
      } else {
        // do nothing
        row.STATUS = 'fail';
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
