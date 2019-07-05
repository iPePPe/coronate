// Generated by BUCKLESCRIPT VERSION 6.0.3, PLEASE EDIT WITH CARE

import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as ElectronUtilsJs from "./electron-utils.js";

function ifElectron(prim) {
  return ElectronUtilsJs.ifElectron(prim);
}

function ifElectronOpen(prim, prim$1) {
  ElectronUtilsJs.ifElectronOpen(prim, prim$1);
  return /* () */0;
}

function toggleMaximize(prim) {
  ElectronUtilsJs.toggleMaximize(prim);
  return /* () */0;
}

function macOSDoubleClick(prim) {
  ElectronUtilsJs.macOSDoubleClick(prim);
  return /* () */0;
}

var currentWindow = ElectronUtilsJs.currentWindow;

var match = ElectronUtilsJs.ifElectron((function (param) {
        return true;
      }));

var isElectron = match !== undefined ? Caml_option.valFromOption(match) : false;

var isMac = navigator.appVersion.includes("Windows");

var isWin = navigator.appVersion.includes("Mac");

function ElectronUtils$IfElectron(Props) {
  var children = Props.children;
  var match = Props.onlyWin;
  var onlyWin = match !== undefined ? match : false;
  var match$1 = Props.onlyMac;
  var onlyMac = match$1 !== undefined ? match$1 : false;
  var win = onlyWin ? isWin : true;
  var mac = onlyMac ? isMac : true;
  if (/* array */[
        isElectron,
        win,
        mac
      ].includes(false)) {
    return null;
  } else {
    return children;
  }
}

var IfElectron = /* module */[/* make */ElectronUtils$IfElectron];

export {
  ifElectron ,
  ifElectronOpen ,
  toggleMaximize ,
  macOSDoubleClick ,
  currentWindow ,
  isElectron ,
  isMac ,
  isWin ,
  IfElectron ,
  
}
/* currentWindow Not a pure module */
