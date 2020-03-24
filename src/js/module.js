/*!
 * ECMA6 (ES Modules) Boilerplate
 * Based on the Revealing Module Design Pattern
 * (c) 2020 Joshua Adams
 */

/* ============================== Import Modules ============================ */

import * as module1 from 'some-module-1';
import { function1, function2 } from './dist/some-module-2.js';

/* ================================ Variables =============================== */

let someVariable = {};

/* ============================= Private Methods ============================ */

function _somePrivateMethod() {
  // Code goes here...
  return;
}

/* ============================== Public Methods ============================ */

function doSomething() {
  _somePrivateMethod();
  // Code goes here...
  return;
}

function init(options) {
  // Code goes here...
  return;
}

/* =========================== Export Public APIs =========================== */

export default {
  init
  , doSomething
};
