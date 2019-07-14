// Generated by BUCKLESCRIPT VERSION 6.0.3, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as Caml_array from "bs-platform/lib/es6/caml_array.js";
import * as Data$Coronate from "../Data.bs.js";
import * as Belt_MapString from "bs-platform/lib/es6/belt_MapString.js";
import * as Utils$Coronate from "../Utils.bs.js";
import * as Pairing$Coronate from "../Pairing.bs.js";

function scoreByeMatch(byeValue, match_) {
  if (match_[/* whiteId */1] === Data$Coronate.dummy_id) {
    return /* record */[
            /* id */match_[/* id */0],
            /* whiteId */match_[/* whiteId */1],
            /* blackId */match_[/* blackId */2],
            /* whiteNewRating */match_[/* whiteNewRating */3],
            /* blackNewRating */match_[/* blackNewRating */4],
            /* whiteOrigRating */match_[/* whiteOrigRating */5],
            /* blackOrigRating */match_[/* blackOrigRating */6],
            /* whiteScore */0.0,
            /* blackScore */byeValue
          ];
  } else if (match_[/* blackId */2] === Data$Coronate.dummy_id) {
    return /* record */[
            /* id */match_[/* id */0],
            /* whiteId */match_[/* whiteId */1],
            /* blackId */match_[/* blackId */2],
            /* whiteNewRating */match_[/* whiteNewRating */3],
            /* blackNewRating */match_[/* blackNewRating */4],
            /* whiteOrigRating */match_[/* whiteOrigRating */5],
            /* blackOrigRating */match_[/* blackOrigRating */6],
            /* whiteScore */byeValue,
            /* blackScore */0.0
          ];
  } else {
    return match_;
  }
}

function autoPair(pairData, byeValue, playerDict, tourney) {
  var playerIds = Object.keys(playerDict);
  var filteredData = { };
  Js_dict.values(pairData).forEach((function (datum) {
          if (playerIds.includes(datum[/* id */0])) {
            filteredData[datum[/* id */0]] = datum;
            return /* () */0;
          } else {
            return 0;
          }
        }));
  var match = Pairing$Coronate.setByePlayer(tourney[/* byeQueue */0], Data$Coronate.dummy_id, filteredData);
  var byePlayerData = match[1];
  var pairs = Pairing$Coronate.pairPlayers(match[0]);
  var pairsWithBye = byePlayerData !== undefined ? pairs.concat(/* array */[/* tuple */[
            byePlayerData[/* id */0],
            Data$Coronate.dummy_id
          ]]) : pairs;
  var partial_arg = Data$Coronate.Player[/* getPlayerMaybe */5];
  var getPlayer = function (param) {
    return partial_arg(playerDict, param);
  };
  var newMatchList = pairsWithBye.map((function (param) {
          var blackId = param[1];
          var whiteId = param[0];
          return /* record */[
                  /* id */Utils$Coronate.nanoid(/* () */0),
                  /* whiteId */whiteId,
                  /* blackId */blackId,
                  /* whiteNewRating */Curry._1(getPlayer, whiteId)[/* rating */4],
                  /* blackNewRating */Curry._1(getPlayer, blackId)[/* rating */4],
                  /* whiteOrigRating */Curry._1(getPlayer, whiteId)[/* rating */4],
                  /* blackOrigRating */Curry._1(getPlayer, blackId)[/* rating */4],
                  /* whiteScore */0.0,
                  /* blackScore */0.0
                ];
        }));
  return newMatchList.map((function (param) {
                return scoreByeMatch(byeValue, param);
              }));
}

function manualPair(param, byeValue) {
  var black = param[1];
  var white = param[0];
  return scoreByeMatch(byeValue, /* record */[
              /* id */Utils$Coronate.nanoid(/* () */0),
              /* whiteId */white[/* id */1],
              /* blackId */black[/* id */1],
              /* whiteNewRating */white[/* rating */4],
              /* blackNewRating */black[/* rating */4],
              /* whiteOrigRating */white[/* rating */4],
              /* blackOrigRating */black[/* rating */4],
              /* whiteScore */0.0,
              /* blackScore */0.0
            ]);
}

function tournamentReducer(state, action) {
  if (typeof action === "number") {
    if (action === 0) {
      return /* record */[
              /* byeQueue */state[/* byeQueue */0],
              /* date */state[/* date */1],
              /* id */state[/* id */2],
              /* name */state[/* name */3],
              /* playerIds */state[/* playerIds */4],
              /* roundList */state[/* roundList */5].concat(/* array */[/* array */[]]),
              /* tieBreaks */state[/* tieBreaks */6]
            ];
    } else {
      return /* record */[
              /* byeQueue */state[/* byeQueue */0],
              /* date */state[/* date */1],
              /* id */state[/* id */2],
              /* name */state[/* name */3],
              /* playerIds */state[/* playerIds */4],
              /* roundList */state[/* roundList */5].slice(0, -1),
              /* tieBreaks */state[/* tieBreaks */6]
            ];
    }
  } else {
    switch (action.tag | 0) {
      case 0 : 
          return /* record */[
                  /* byeQueue */state[/* byeQueue */0],
                  /* date */state[/* date */1],
                  /* id */state[/* id */2],
                  /* name */state[/* name */3],
                  /* playerIds */state[/* playerIds */4],
                  /* roundList */state[/* roundList */5],
                  /* tieBreaks */state[/* tieBreaks */6].concat(/* array */[action[0]])
                ];
      case 1 : 
          var idToDel = action[0];
          return /* record */[
                  /* byeQueue */state[/* byeQueue */0],
                  /* date */state[/* date */1],
                  /* id */state[/* id */2],
                  /* name */state[/* name */3],
                  /* playerIds */state[/* playerIds */4],
                  /* roundList */state[/* roundList */5],
                  /* tieBreaks */state[/* tieBreaks */6].filter((function (tbId) {
                          return idToDel !== tbId;
                        }))
                ];
      case 2 : 
          return /* record */[
                  /* byeQueue */state[/* byeQueue */0],
                  /* date */state[/* date */1],
                  /* id */state[/* id */2],
                  /* name */state[/* name */3],
                  /* playerIds */state[/* playerIds */4],
                  /* roundList */state[/* roundList */5],
                  /* tieBreaks */Utils$Coronate.move(action[0], action[1], state[/* tieBreaks */6])
                ];
      case 3 : 
          return /* record */[
                  /* byeQueue */state[/* byeQueue */0],
                  /* date */state[/* date */1],
                  /* id */state[/* id */2],
                  /* name */state[/* name */3],
                  /* playerIds */action[0],
                  /* roundList */state[/* roundList */5],
                  /* tieBreaks */state[/* tieBreaks */6]
                ];
      case 4 : 
          return /* record */[
                  /* byeQueue */action[0],
                  /* date */state[/* date */1],
                  /* id */state[/* id */2],
                  /* name */state[/* name */3],
                  /* playerIds */state[/* playerIds */4],
                  /* roundList */state[/* roundList */5],
                  /* tieBreaks */state[/* tieBreaks */6]
                ];
      case 5 : 
          return /* record */[
                  /* byeQueue */state[/* byeQueue */0],
                  /* date */state[/* date */1],
                  /* id */state[/* id */2],
                  /* name */action[0],
                  /* playerIds */state[/* playerIds */4],
                  /* roundList */state[/* roundList */5],
                  /* tieBreaks */state[/* tieBreaks */6]
                ];
      case 6 : 
          var roundId = action[1];
          var roundList = state[/* roundList */5].slice();
          roundList[roundId] = roundList[roundId].concat(autoPair(action[2], action[0], action[3], action[4]));
          return /* record */[
                  /* byeQueue */state[/* byeQueue */0],
                  /* date */state[/* date */1],
                  /* id */state[/* id */2],
                  /* name */state[/* name */3],
                  /* playerIds */state[/* playerIds */4],
                  /* roundList */roundList,
                  /* tieBreaks */state[/* tieBreaks */6]
                ];
      case 7 : 
          var roundId$1 = action[2];
          var match = action[1];
          var roundList$1 = state[/* roundList */5].slice();
          roundList$1[roundId$1] = roundList$1[roundId$1].concat(/* array */[manualPair(/* tuple */[
                      match[0],
                      match[1]
                    ], action[0])]);
          return /* record */[
                  /* byeQueue */state[/* byeQueue */0],
                  /* date */state[/* date */1],
                  /* id */state[/* id */2],
                  /* name */state[/* name */3],
                  /* playerIds */state[/* playerIds */4],
                  /* roundList */roundList$1,
                  /* tieBreaks */state[/* tieBreaks */6]
                ];
      case 8 : 
          return /* record */[
                  /* byeQueue */state[/* byeQueue */0],
                  /* date */action[0],
                  /* id */state[/* id */2],
                  /* name */state[/* name */3],
                  /* playerIds */state[/* playerIds */4],
                  /* roundList */state[/* roundList */5],
                  /* tieBreaks */state[/* tieBreaks */6]
                ];
      case 9 : 
          var roundId$2 = action[3];
          var match$1 = action[2];
          var match$2 = action[1];
          var matchId = action[0];
          var roundList$2 = state[/* roundList */5].slice();
          roundList$2[roundId$2] = roundList$2[roundId$2].slice();
          var matchIndex = roundList$2[roundId$2].findIndex((function (match_) {
                  return match_[/* id */0] === matchId;
                }));
          var match_ = Caml_array.caml_array_get(Caml_array.caml_array_get(roundList$2, roundId$2), matchIndex);
          Caml_array.caml_array_set(Caml_array.caml_array_get(roundList$2, roundId$2), matchIndex, /* record */[
                /* id */match_[/* id */0],
                /* whiteId */match_[/* whiteId */1],
                /* blackId */match_[/* blackId */2],
                /* whiteNewRating */match$2[0],
                /* blackNewRating */match$2[1],
                /* whiteOrigRating */match_[/* whiteOrigRating */5],
                /* blackOrigRating */match_[/* blackOrigRating */6],
                /* whiteScore */match$1[0],
                /* blackScore */match$1[1]
              ]);
          return /* record */[
                  /* byeQueue */state[/* byeQueue */0],
                  /* date */state[/* date */1],
                  /* id */state[/* id */2],
                  /* name */state[/* name */3],
                  /* playerIds */state[/* playerIds */4],
                  /* roundList */roundList$2,
                  /* tieBreaks */state[/* tieBreaks */6]
                ];
      case 10 : 
          var roundId$3 = action[1];
          var matchId$1 = action[0];
          var roundList$3 = state[/* roundList */5].slice();
          Caml_array.caml_array_set(roundList$3, roundId$3, Caml_array.caml_array_get(roundList$3, roundId$3).filter((function (match_) {
                      return match_[/* id */0] !== matchId$1;
                    })));
          return /* record */[
                  /* byeQueue */state[/* byeQueue */0],
                  /* date */state[/* date */1],
                  /* id */state[/* id */2],
                  /* name */state[/* name */3],
                  /* playerIds */state[/* playerIds */4],
                  /* roundList */roundList$3,
                  /* tieBreaks */state[/* tieBreaks */6]
                ];
      case 11 : 
          var roundId$4 = action[1];
          var matchId$2 = action[0];
          var roundList$4 = state[/* roundList */5].slice();
          roundList$4[roundId$4] = roundList$4[roundId$4].slice();
          var matchIndex$1 = roundList$4[roundId$4].findIndex((function (match_) {
                  return match_[/* id */0] === matchId$2;
                }));
          var oldMatch = roundList$4[roundId$4][matchIndex$1];
          Caml_array.caml_array_set(Caml_array.caml_array_get(roundList$4, roundId$4), matchIndex$1, /* record */[
                /* id */oldMatch[/* id */0],
                /* whiteId */oldMatch[/* blackId */2],
                /* blackId */oldMatch[/* whiteId */1],
                /* whiteNewRating */oldMatch[/* blackNewRating */4],
                /* blackNewRating */oldMatch[/* whiteNewRating */3],
                /* whiteOrigRating */oldMatch[/* blackOrigRating */6],
                /* blackOrigRating */oldMatch[/* whiteOrigRating */5],
                /* whiteScore */oldMatch[/* blackScore */8],
                /* blackScore */oldMatch[/* whiteScore */7]
              ]);
          return /* record */[
                  /* byeQueue */state[/* byeQueue */0],
                  /* date */state[/* date */1],
                  /* id */state[/* id */2],
                  /* name */state[/* name */3],
                  /* playerIds */state[/* playerIds */4],
                  /* roundList */roundList$4,
                  /* tieBreaks */state[/* tieBreaks */6]
                ];
      case 12 : 
          var roundId$5 = action[2];
          var roundList$5 = state[/* roundList */5].slice();
          Caml_array.caml_array_set(roundList$5, roundId$5, Utils$Coronate.move(action[0], action[1], Caml_array.caml_array_get(roundList$5, roundId$5)));
          return /* record */[
                  /* byeQueue */state[/* byeQueue */0],
                  /* date */state[/* date */1],
                  /* id */state[/* id */2],
                  /* name */state[/* name */3],
                  /* playerIds */state[/* playerIds */4],
                  /* roundList */roundList$5,
                  /* tieBreaks */state[/* tieBreaks */6]
                ];
      case 13 : 
          var newValue = action[0];
          var roundList$6 = state[/* roundList */5].map((function (round) {
                  return round.map((function (match_) {
                                return scoreByeMatch(newValue, match_);
                              }));
                }));
          return /* record */[
                  /* byeQueue */state[/* byeQueue */0],
                  /* date */state[/* date */1],
                  /* id */state[/* id */2],
                  /* name */state[/* name */3],
                  /* playerIds */state[/* playerIds */4],
                  /* roundList */roundList$6,
                  /* tieBreaks */state[/* tieBreaks */6]
                ];
      case 14 : 
          return action[0];
      
    }
  }
}

function playersReducer(state, action) {
  switch (action.tag | 0) {
    case 0 : 
        var player = action[0];
        return Belt_MapString.set(state, player[/* id */1], player);
    case 1 : 
        return Belt_MapString.remove(state, action[0]);
    case 2 : 
        var id = action[0];
        var player$1 = Belt_MapString.getExn(state, id);
        return Belt_MapString.set(state, id, /* record */[
                    /* firstName */player$1[/* firstName */0],
                    /* id */player$1[/* id */1],
                    /* lastName */player$1[/* lastName */2],
                    /* matchCount */action[1],
                    /* rating */player$1[/* rating */4],
                    /* type_ */player$1[/* type_ */5]
                  ]);
    case 3 : 
        var id$1 = action[0];
        var player$2 = Belt_MapString.getExn(state, id$1);
        return Belt_MapString.set(state, id$1, /* record */[
                    /* firstName */player$2[/* firstName */0],
                    /* id */player$2[/* id */1],
                    /* lastName */player$2[/* lastName */2],
                    /* matchCount */player$2[/* matchCount */3],
                    /* rating */action[1],
                    /* type_ */player$2[/* type_ */5]
                  ]);
    case 4 : 
        return action[0];
    
  }
}

export {
  scoreByeMatch ,
  autoPair ,
  manualPair ,
  tournamentReducer ,
  playersReducer ,
  
}
/* Data-Coronate Not a pure module */
