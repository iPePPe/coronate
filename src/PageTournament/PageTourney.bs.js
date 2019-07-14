// Generated by BUCKLESCRIPT VERSION 6.0.3, PLEASE EDIT WITH CARE

import * as Cn from "re-classnames/src/Cn.bs.js";
import * as Block from "bs-platform/lib/es6/block.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_format from "bs-platform/lib/es6/caml_format.js";
import * as Data$Coronate from "../Data.bs.js";
import * as ReactFeather from "react-feather";
import * as Pages$Coronate from "../Pages.bs.js";
import * as Utils$Coronate from "../Utils.bs.js";
import * as Window$Coronate from "../Window.bs.js";
import * as ReasonReactRouter from "reason-react/src/ReasonReactRouter.js";
import * as PageRound$Coronate from "./PageRound.bs.js";
import * as TournamentData$Coronate from "./TournamentData.bs.js";
import * as PageTourneySetup$Coronate from "./PageTourneySetup.bs.js";
import * as PageTourneyScores$Coronate from "./PageTourneyScores.bs.js";
import * as PageTourneyPlayers$Coronate from "./PageTourneyPlayers.bs.js";
import * as PageTournamentStatus$Coronate from "./PageTournamentStatus.bs.js";
import * as PageTourneyCrossTable$Coronate from "./PageTourneyCrossTable.bs.js";

function PageTourney$Footer(Props) {
  var tournament = Props.tournament;
  var roundList = tournament[/* tourney */7][/* roundList */5];
  var match = tournament[/* isNewRoundReady */3] ? (
      tournament[/* isItOver */2] ? /* tuple */[
          Utils$Coronate.Entities[/* nbsp */0] + " All rounds have completed.",
          /* Warning */1
        ] : /* tuple */[
          Utils$Coronate.Entities[/* nbsp */0] + " Ready to begin a new round.",
          /* Success */0
        ]
    ) : /* tuple */[
      Utils$Coronate.Entities[/* nbsp */0] + "Round in progress.",
      /* Generic */3
    ];
  var tooltipText = match[0];
  return React.createElement(React.Fragment, undefined, React.createElement("label", {
                  className: "win__footer-block",
                  style: {
                    display: "inline-block"
                  }
                }, "Rounds: ", String(roundList.length), React.createElement("small", undefined, " out of "), String(tournament[/* roundCount */6])), React.createElement("hr", {
                  className: "win__footer-divider"
                }), React.createElement(Utils$Coronate.$$Notification[/* make */0], {
                  children: tooltipText,
                  kind: match[1],
                  tooltip: tooltipText,
                  className: "win__footer-block",
                  style: {
                    backgroundColor: "transparent",
                    color: "initial",
                    display: "inline-flex",
                    margin: "0",
                    minHeight: "initial"
                  }
                }));
}

var Footer = /* module */[/* make */PageTourney$Footer];

function footerFunc(tournament, param) {
  return React.createElement(PageTourney$Footer, {
              tournament: tournament
            });
}

function noDraggy(e) {
  e.preventDefault();
  return /* () */0;
}

function PageTourney$Sidebar(Props) {
  var tournament = Props.tournament;
  var tourneyDispatch = tournament[/* tourneyDispatch */8];
  var tourney = tournament[/* tourney */7];
  var playersDispatch = tournament[/* playersDispatch */5];
  var isItOver = tournament[/* isItOver */2];
  var getPlayer = tournament[/* getPlayer */1];
  var activePlayers = tournament[/* activePlayers */0];
  var roundList = tourney[/* roundList */5];
  var basePath = "#/tourneys/" + tourney[/* id */2];
  var newRound = function ($$event) {
    $$event.preventDefault();
    if (isItOver && !Utils$Coronate.confirm("All rounds have completed. Are you sure you want to begin a new one?")) {
      return 0;
    } else {
      return Curry._1(tourneyDispatch, /* AddRound */0);
    }
  };
  var delLastRound = function ($$event) {
    $$event.preventDefault();
    if (Utils$Coronate.confirm("Are you sure you want to delete the last round?")) {
      ReasonReactRouter.push("#/tourneys/" + tourney[/* id */2]);
      Utils$Coronate.last(roundList).forEach((function (match_) {
              var whiteScore = match_[/* whiteScore */7];
              var blackScore = match_[/* blackScore */8];
              var whiteId = match_[/* whiteId */1];
              var blackId = match_[/* blackId */2];
              var whiteOrigRating = match_[/* whiteOrigRating */5];
              var blackOrigRating = match_[/* blackOrigRating */6];
              if (whiteScore + blackScore !== 0.0) {
                /* array */[
                    /* tuple */[
                      whiteId,
                      whiteOrigRating
                    ],
                    /* tuple */[
                      blackId,
                      blackOrigRating
                    ]
                  ].forEach((function (param) {
                        var id = param[0];
                        if (id !== Data$Coronate.dummy_id) {
                          var matchCount = Curry._1(getPlayer, id)[/* matchCount */3];
                          Curry._1(playersDispatch, /* SetMatchCount */Block.__(2, [
                                  id,
                                  matchCount - 1 | 0
                                ]));
                          return Curry._1(playersDispatch, /* SetRating */Block.__(3, [
                                        id,
                                        param[1]
                                      ]));
                        } else {
                          return 0;
                        }
                      }));
                return /* () */0;
              } else {
                return 0;
              }
            }));
      Curry._1(tourneyDispatch, /* DelLastRound */1);
      if (roundList.length === 1) {
        return Curry._1(tourneyDispatch, /* AddRound */0);
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };
  return React.createElement("div", undefined, React.createElement("nav", undefined, React.createElement("ul", {
                      style: {
                        marginTop: "0"
                      }
                    }, React.createElement("li", undefined, React.createElement("a", {
                              href: "#/tourneys",
                              onDragStart: noDraggy
                            }, React.createElement(ReactFeather.ChevronLeft, { }), React.createElement("span", {
                                  className: "sidebar__hide-on-close"
                                }, " Back")))), React.createElement("hr", undefined), React.createElement("ul", undefined, React.createElement("li", undefined, React.createElement("a", {
                              href: basePath + "/setup",
                              onDragStart: noDraggy
                            }, React.createElement(ReactFeather.Settings, { }), React.createElement("span", {
                                  className: "sidebar__hide-on-close"
                                }, " Setup"))), React.createElement("li", undefined, React.createElement("a", {
                              href: basePath,
                              onDragStart: noDraggy
                            }, React.createElement(ReactFeather.Users, { }), React.createElement("span", {
                                  className: "sidebar__hide-on-close"
                                }, " Players"))), React.createElement("li", undefined, React.createElement("a", {
                              href: basePath + "/status",
                              onDragStart: noDraggy
                            }, React.createElement(ReactFeather.Activity, { }), React.createElement("span", {
                                  className: "sidebar__hide-on-close"
                                }, " Status"))), React.createElement("li", undefined, React.createElement("a", {
                              href: basePath + "/crosstable",
                              onDragStart: noDraggy
                            }, React.createElement(ReactFeather.Layers, { }), React.createElement("span", {
                                  className: "sidebar__hide-on-close"
                                }, " Crosstable"))), React.createElement("li", undefined, React.createElement("a", {
                              href: basePath + "/scores",
                              onDragStart: noDraggy
                            }, React.createElement(ReactFeather.List, { }), React.createElement("span", {
                                  className: "sidebar__hide-on-close"
                                }, " Score detail")))), React.createElement("hr", undefined), React.createElement("h5", {
                      className: "sidebar__hide-on-close sidebar__header"
                    }, "Rounds"), React.createElement("ul", {
                      className: "center-on-close"
                    }, roundList.map((function (param, id) {
                            var match = Data$Coronate.isRoundComplete(roundList, activePlayers, id);
                            return React.createElement("li", {
                                        key: String(id)
                                      }, React.createElement("a", {
                                            href: basePath + ("/round/" + String(id)),
                                            onDragStart: noDraggy
                                          }, String(id + 1 | 0), match ? React.createElement("span", {
                                                  className: Cn.make(/* :: */[
                                                        "sidebar__hide-on-close",
                                                        /* :: */[
                                                          "caption-20",
                                                          /* [] */0
                                                        ]
                                                      ])
                                                }, " Complete ", React.createElement(ReactFeather.Check, { })) : React.createElement("span", {
                                                  className: Cn.make(/* :: */[
                                                        "sidebar__hide-on-close",
                                                        /* :: */[
                                                          "caption-20",
                                                          /* [] */0
                                                        ]
                                                      ])
                                                }, " Not complete ", React.createElement(ReactFeather.AlertTriangle, { }))));
                          })))), React.createElement("hr", undefined), React.createElement("ul", undefined, React.createElement("li", undefined, React.createElement("button", {
                          className: "sidebar-button",
                          style: {
                            width: "100%"
                          },
                          disabled: !tournament[/* isNewRoundReady */3],
                          onClick: newRound
                        }, React.createElement(ReactFeather.Plus, { }), React.createElement("span", {
                              className: "sidebar__hide-on-close"
                            }, " New round"))), React.createElement("li", {
                      style: {
                        textAlign: "center"
                      }
                    }, React.createElement("button", {
                          className: "button-micro sidebar-button",
                          style: {
                            marginTop: "8px"
                          },
                          disabled: roundList.length === 0,
                          onClick: delLastRound
                        }, React.createElement(ReactFeather.Trash2, { }), React.createElement("span", {
                              className: "sidebar__hide-on-close"
                            }, " Remove last round")))));
}

var Sidebar = /* module */[/* make */PageTourney$Sidebar];

function sidebarFunc(tournament, param) {
  return React.createElement(PageTourney$Sidebar, {
              tournament: tournament
            });
}

function PageTourney(Props) {
  var tourneyId = Props.tourneyId;
  var hashPath = Props.hashPath;
  return React.createElement(TournamentData$Coronate.make, {
              children: (function (tournament) {
                  var tmp;
                  var exit = 0;
                  if (hashPath) {
                    switch (hashPath[0]) {
                      case "" : 
                          if (hashPath[1]) {
                            exit = 1;
                          } else {
                            tmp = React.createElement(PageTourneyPlayers$Coronate.make, {
                                  tournament: tournament
                                });
                          }
                          break;
                      case "crosstable" : 
                          if (hashPath[1]) {
                            exit = 1;
                          } else {
                            tmp = React.createElement(PageTourneyCrossTable$Coronate.make, {
                                  tournament: tournament
                                });
                          }
                          break;
                      case "round" : 
                          var match = hashPath[1];
                          if (match && !match[1]) {
                            tmp = React.createElement(PageRound$Coronate.make, {
                                  roundId: Caml_format.caml_int_of_string(match[0]),
                                  tournament: tournament
                                });
                          } else {
                            exit = 1;
                          }
                          break;
                      case "scores" : 
                          if (hashPath[1]) {
                            exit = 1;
                          } else {
                            tmp = React.createElement(PageTourneyScores$Coronate.make, {
                                  tournament: tournament
                                });
                          }
                          break;
                      case "setup" : 
                          if (hashPath[1]) {
                            exit = 1;
                          } else {
                            tmp = React.createElement(PageTourneySetup$Coronate.make, {
                                  tournament: tournament
                                });
                          }
                          break;
                      case "status" : 
                          if (hashPath[1]) {
                            exit = 1;
                          } else {
                            tmp = React.createElement(PageTournamentStatus$Coronate.make, {
                                  tournament: tournament
                                });
                          }
                          break;
                      default:
                        exit = 1;
                    }
                  } else {
                    exit = 1;
                  }
                  if (exit === 1) {
                    tmp = React.createElement(Pages$Coronate.NotFound[/* make */0], { });
                  }
                  return React.createElement(Window$Coronate.WindowBody[/* make */0], {
                              children: tmp,
                              footerFunc: (function (param) {
                                  return footerFunc(tournament, param);
                                }),
                              sidebarFunc: (function (param) {
                                  return sidebarFunc(tournament, param);
                                })
                            });
                }),
              tourneyId: tourneyId
            });
}

var make = PageTourney;

export {
  Footer ,
  footerFunc ,
  noDraggy ,
  Sidebar ,
  sidebarFunc ,
  make ,
  
}
/* react Not a pure module */
