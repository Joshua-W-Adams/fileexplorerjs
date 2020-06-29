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
