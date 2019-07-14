// Generated by BUCKLESCRIPT VERSION 6.0.3, PLEASE EDIT WITH CARE

import * as Block from "bs-platform/lib/es6/block.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Data$Coronate from "../Data.bs.js";
import * as Belt_MapString from "bs-platform/lib/es6/belt_MapString.js";
import * as Hooks$Coronate from "../Hooks.bs.js";
import * as Utils$Coronate from "../Utils.bs.js";
import * as Window$Coronate from "../Window.bs.js";
import * as TournamentDataReducers$Coronate from "./TournamentDataReducers.bs.js";

function getAllPlayerIdsFromMatches(matchList) {
  return matchList.reduce((function (acc, match_) {
                return acc.concat(/* array */[
                            match_[/* whiteId */1],
                            match_[/* blackId */2]
                          ]);
              }), /* array */[]);
}

function calcNumOfRounds(playerCount) {
  var roundCount = Math.ceil(Math.log2(playerCount));
  var match = Number.isFinite(roundCount);
  if (match) {
    return roundCount | 0;
  } else {
    return 0;
  }
}

var emptyTourney_000 = /* byeQueue : array */[];

var emptyTourney_001 = /* date */new Date(0.0);

var emptyTourney_002 = /* id */Utils$Coronate.nanoid(/* () */0);

var emptyTourney_004 = /* playerIds : array */[];

var emptyTourney_005 = /* roundList : array */[];

var emptyTourney_006 = /* tieBreaks : array */[1];

var emptyTourney = /* record */[
  emptyTourney_000,
  emptyTourney_001,
  emptyTourney_002,
  /* name */"",
  emptyTourney_004,
  emptyTourney_005,
  emptyTourney_006
];

function TournamentData(Props) {
  var children = Props.children;
  var tourneyId = Props.tourneyId;
  var match = React.useReducer(TournamentDataReducers$Coronate.tournamentReducer, emptyTourney);
  var tourneyDispatch = match[1];
  var tourney = match[0];
  var name = tourney[/* name */3];
  var playerIds = tourney[/* playerIds */4];
  var roundList = tourney[/* roundList */5];
  var match$1 = React.useReducer(TournamentDataReducers$Coronate.playersReducer, Belt_MapString.empty);
  var playersDispatch = match$1[1];
  var players = match$1[0];
  var match$2 = React.useState((function () {
          return false;
        }));
  var setIsTourneyLoaded = match$2[1];
  var isTourneyLoaded = match$2[0];
  var match$3 = React.useState((function () {
          return false;
        }));
  var setIsPlayersLoaded = match$3[1];
  var isPlayersLoaded = match$3[0];
  var match$4 = React.useState((function () {
          return false;
        }));
  var setIsDbError = match$4[1];
  Hooks$Coronate.useLoadingCursor(isPlayersLoaded && isTourneyLoaded);
  var match$5 = Window$Coronate.useWindowContext(/* () */0);
  var windowDispatch = match$5[1];
  React.useEffect((function () {
          Curry._1(windowDispatch, /* SetTitle */Block.__(5, [name]));
          return (function (param) {
                    return Curry._1(windowDispatch, /* SetTitle */Block.__(5, [""]));
                  });
        }), /* tuple */[
        name,
        windowDispatch
      ]);
  React.useEffect((function (param) {
          var didCancel = /* record */[/* contents */false];
          Hooks$Coronate.Db[/* tourneyStore */6].getItem(tourneyId).then((function (value) {
                  if (!didCancel[0]) {
                    if (value == null) {
                      Curry._1(setIsDbError, (function (param) {
                              return true;
                            }));
                    } else {
                      Curry._1(tourneyDispatch, /* SetTournament */Block.__(14, [Data$Coronate.Tournament[/* tFromJsDeep */3](value)]));
                      Curry._1(setIsTourneyLoaded, (function (param) {
                              return true;
                            }));
                    }
                  }
                  return Promise.resolve(/* () */0);
                }));
          return (function (param) {
                    didCancel[0] = true;
                    return /* () */0;
                  });
        }), /* tuple */[
        tourneyId,
        tourneyDispatch,
        setIsTourneyLoaded,
        setIsDbError
      ]);
  React.useEffect((function (param) {
          var didCancel = /* record */[/* contents */false];
          if (isTourneyLoaded) {
            var allTheIds = getAllPlayerIdsFromMatches(Data$Coronate.rounds2Matches(roundList, undefined, /* () */0)).concat(playerIds);
            var match = allTheIds.length;
            if (match !== 0) {
              Hooks$Coronate.Db[/* playerStore */4].getItems(allTheIds).then((function (values) {
                      var newIds = Object.keys(values);
                      var oldIds = Belt_MapString.keysToArray(players);
                      var changedPlayers = newIds.filter((function (x) {
                                return !oldIds.includes(x);
                              })).concat(oldIds.filter((function (x) {
                                  return !newIds.includes(x);
                                })));
                      console.log("changed players:");
                      console.log(changedPlayers.length);
                      if (changedPlayers.length !== 0 && !didCancel[0]) {
                        Curry._1(playersDispatch, /* SetPlayers */Block.__(4, [Hooks$Coronate.Db[/* jsDictToReMap */7](values, Data$Coronate.Player[/* tFromJs */1])]));
                        Curry._1(setIsPlayersLoaded, (function (param) {
                                return true;
                              }));
                      }
                      return Promise.resolve(values);
                    }));
            } else {
              if (Belt_MapString.keysToArray(players).length !== 0) {
                Curry._1(playersDispatch, /* SetPlayers */Block.__(4, [players]));
              }
              Curry._1(setIsPlayersLoaded, (function (param) {
                      return true;
                    }));
            }
          }
          return (function (param) {
                    didCancel[0] = false;
                    return /* () */0;
                  });
        }), /* tuple */[
        roundList,
        players,
        playerIds,
        isTourneyLoaded
      ]);
  React.useEffect((function (param) {
          if (isTourneyLoaded && tourneyId === tourney[/* id */2]) {
            Hooks$Coronate.Db[/* tourneyStore */6].getItem(tourneyId, Data$Coronate.Tournament[/* tToJsDeep */2](tourney));
          }
          return undefined;
        }), /* tuple */[
        isTourneyLoaded,
        tourneyId,
        tourney
      ]);
  React.useEffect((function () {
          if (isPlayersLoaded) {
            Hooks$Coronate.Db[/* playerStore */4].setItems(Hooks$Coronate.Db[/* reMapToJsDict */8](players, Data$Coronate.Player[/* tToJs */0]));
          }
          return undefined;
        }), /* tuple */[
        isPlayersLoaded,
        players
      ]);
  var partial_arg = Data$Coronate.Player[/* getPlayerMaybeMap */6];
  var getPlayer = function (param) {
    return partial_arg(players, param);
  };
  var activePlayers = Belt_MapString.reduce(players, Belt_MapString.empty, (function (acc, key, player) {
          if (tourney[/* playerIds */4].includes(key)) {
            return Belt_MapString.set(acc, key, player);
          } else {
            return acc;
          }
        }));
  var roundCount = calcNumOfRounds(Belt_MapString.keysToArray(activePlayers).length);
  var isItOver = roundList.length >= roundCount;
  var match$6 = roundList.length === 0;
  var isNewRoundReady = match$6 ? true : Data$Coronate.isRoundComplete(roundList, activePlayers, roundList.length - 1 | 0);
  if (match$4[0]) {
    return React.createElement("div", undefined, "Error: tournament not found.");
  } else if (!isTourneyLoaded || !isPlayersLoaded) {
    return React.createElement("div", undefined, "Loading...");
  } else {
    return Curry._1(children, /* record */[
                /* activePlayers */activePlayers,
                /* getPlayer */getPlayer,
                /* isItOver */isItOver,
                /* isNewRoundReady */isNewRoundReady,
                /* players */players,
                /* playersDispatch */playersDispatch,
                /* roundCount */roundCount,
                /* tourney */tourney,
                /* tourneyDispatch */tourneyDispatch
              ]);
  }
}

var LocalForage = 0;

var make = TournamentData;

export {
  LocalForage ,
  getAllPlayerIdsFromMatches ,
  calcNumOfRounds ,
  emptyTourney ,
  make ,
  
}
/* emptyTourney Not a pure module */
