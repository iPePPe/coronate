module Map = Belt.Map.String;

type keyFunc('a) =
  | KeyString('a => string)
  | KeyInt('a => int)
  | KeyFloat('a => float)
  | KeyDate('a => Js.Date.t);

type tableState('a) = {
  isDescending: bool,
  key: keyFunc('a),
  table: Js.Array.t('a),
};

type actionTable('a) =
  | SetIsDescending(bool)
  | SetKey(keyFunc('a))
  | SetTable(Js.Array.t('a))
  | SortWithoutUpdating;

let sortedTableReducer = (state, action) => {
  let newState =
    switch (action) {
    | SetTable(table) => {...state, table}
    | SetIsDescending(isDescending) => {...state, isDescending}
    | SetKey(key) => {...state, key}
    | SortWithoutUpdating => state
    };
  let direction = newState.isDescending ? Utils.descend : Utils.ascend;
  let sortFunc =
    switch (newState.key) {
    | KeyString(func) =>
      (str => str |> func |> Js.String.toLowerCase) |> direction
    | KeyInt(func) => func |> direction
    | KeyFloat(func) => func |> direction
    | KeyDate(func) => func |> direction
    };
  let table = newState.table->Belt.SortArray.stableSortBy(sortFunc);
  {...newState, table};
};

let useSortedTable = (~table, ~key, ~isDescending) => {
  let initialState = {table, key, isDescending};
  let (state, dispatch) = React.useReducer(sortedTableReducer, initialState);
  React.useEffect1(
    () => {
      dispatch(SortWithoutUpdating);
      None;
    },
    [|dispatch|],
  );
  (state, dispatch);
};

module SortButton = {
  [@react.component]
  let make =
      (
        ~children,
        ~sortKey: keyFunc('a),
        ~data: tableState('a),
        ~dispatch: actionTable('a) => unit,
      ) => {
    /*
       These === comparisons *only* work if the `sortKey` values are definined
       outside a React component. If you try to define them inline, e.g.
       `<... sortKey=KeyString(nameGet)...>` then the comparisons will always
       return false. This is due to how Bucklescript compiles and how JS
       comparisons work. IDK if there's a more idiomatic ReasonML way to do this
       and ensure correct comparisons.
     */
    let setKeyOrToggleDir = () => {
      data.key === sortKey
        ? dispatch(SetIsDescending(!data.isDescending))
        : dispatch(SetKey(sortKey));
    };
    let chevronStyle =
      ReactDOMRe.Style.(
        data.key === sortKey
          ? make(~opacity="1", ()) : make(~opacity="0", ())
      );
    <button
      className="button-micro dont-hide button-text-ghost title-20"
      style={ReactDOMRe.Style.make(~width="100%", ())}
      onClick={_ => setKeyOrToggleDir()}>
      <Icons.chevronUp
        style={ReactDOMRe.Style.make(~opacity="0", ())}
        /*ariaHidden=true*/
      />
      children
      {data.isDescending
         ? <span style=chevronStyle>
             <Icons.chevronUp />
             <Utils.VisuallyHidden>
               {React.string("Sort ascending.")}
             </Utils.VisuallyHidden>
           </span>
         : <span style=chevronStyle>
             <Icons.chevronDown />
             <Utils.VisuallyHidden>
               {React.string("Sort descending.")}
             </Utils.VisuallyHidden>
           </span>}
    </button>;
  };
};

let useLoadingCursor = isLoaded => {
  React.useEffect1(
    () => {
      let _ =
        isLoaded
          ? [%bs.raw "document.body.style.cursor = \"auto\""]
          : [%bs.raw "document.body.style.cursor = \"wait\""];
      let reset = () => [%bs.raw "document.body.style.cursor = \"auto\""];
      Some(reset);
    },
    [|isLoaded|],
  );
};

module Db = {
  open Data;
  module LocalForage = Externals.LocalForage;
  type actionOption =
    | AddAvoidPair(Data.avoidPair)
    | DelAvoidPair(Data.avoidPair)
    | DelAvoidSingle(string)
    | SetAvoidPairs(array(avoidPair))
    | SetByeValue(float)
    | SetState(db_options)
    | SetLastBackup(Js.Date.t);

  /*******************************************************************************
   * Initialize the databases
   ******************************************************************************/
  /*
   BEGIN ADDING PLUGINS TO THE LOCALFORAGE MODULE.
   This has to be here instead of the `Externals` module because otherwise
   Webpack doesn't load it.
   */
  [@bs.module "localforage-getitems"]
  external getItemsPrototype: LocalForage.t('a) => unit =
    "extendPrototype";
  [@bs.module "localforage-removeitems"]
  external removeItemsPrototype: LocalForage.t('a) => unit =
    "extendPrototype";
  [@bs.module "localforage-setitems"]
  external setItemsPrototype: LocalForage.t('a) => unit =
    "extendPrototype";
  getItemsPrototype(LocalForage.localForage);
  setItemsPrototype(LocalForage.localForage);
  removeItemsPrototype(LocalForage.localForage);
  /*
   END ADDING PLUGINS TO THE LOCALFORAGE MODULE.
   */

  let database_name = "Coronate";
  let optionsStore =
    Externals.makeOptionsDb({"name": database_name, "storeName": "Options"});
  module Players = LocalForage.Instance(Player);
  let playerStore = Players.create(~name=database_name, ~storeName="Players");
  module Tournaments = LocalForage.Instance(Tournament);
  let tourneyStore =
    Tournaments.create(~name=database_name, ~storeName="Tournaments");

  let jsDictToReMap = (dict, transformer) =>
    dict
    |> Js.Dict.entries
    |> Js.Array.map(((key, value)) => (key, value |> transformer))
    |> Belt.Map.String.fromArray;
  let reMapToJsDict = (map, transformer) =>
    map->Belt.Map.String.toArray
    |> Js.Array.map(((key, value)) => (key, value |> transformer))
    |> Js.Dict.fromArray;

  type testType = {. byeValue: float};
  let loadDemoDB = _: unit => {
    let _: unit = [%bs.raw "document.body.style = \"wait\""];
    let _ =
      Js.Promise.(
        all3((
          optionsStore##setItems(DemoData.options |> Data.db_optionsToJs),
          playerStore->LocalForage.setItems(
            DemoData.players->Belt.Map.String.toArray
            |> Js.Array.map(((key, value)) =>
                 (key, value |> Data.Player.tToJs)
               )
            |> Js.Dict.fromArray,
          ),
          tourneyStore->LocalForage.setItems(
            DemoData.tournaments->Belt.Map.String.toArray
            |> Js.Array.map(((key, value)) =>
                 (key, value |> Data.Tournament.tToJsDeep)
               )
            |> Js.Dict.fromArray,
          ),
        ))
        |> then_(value => {
             Utils.alert("Demo data loaded!");
             let _: unit = [%bs.raw "document.body.style = \"auto\""];
             resolve(value);
           })
        |> catch(_ => {
             let _: unit = [%bs.raw "document.body.style = \"auto\""];
             resolve(((), (), ()));
           })
      );
    ();
  };
  /*******************************************************************************
   * Generic database hooks
   ******************************************************************************/
  type actionDb('a) =
    | DelItem(string)
    | SetItem(string, 'a)
    | SetState(Map.t('a));
  type genericReducer('a) = (Map.t('a), actionDb('a)) => Map.t('a);
  let genericDbReducer = (state, action) => {
    switch (action) {
    | SetItem(id, item) => state->Map.set(id, item)
    | DelItem(id) => state->Map.remove(id)
    | SetState(state) => state
    };
  };
  let useAllItemsFromDb =
      (
        ~store: LocalForage.t('js),
        ~reducer: genericReducer('re),
        ~fromJs: 'js => 're,
        ~toJs: 're => 'js,
      ) => {
    let (items, dispatch) = React.useReducer(reducer, Map.empty);
    let (isLoaded, setIsLoaded) = React.useState(() => false);
    useLoadingCursor(isLoaded);
    React.useEffect4(
      () => {
        let didCancel = ref(false);
        let _ =
          Js.Promise.(
            store->LocalForage.getItems(Js.Nullable.null)
            |> then_(results => {
                 if (! didCancel^) {
                   dispatch(SetState(results->jsDictToReMap(fromJs)));
                   setIsLoaded(_ => true);
                 };
                 resolve(results);
               })
          );
        Some(() => didCancel := false);
      },
      (store, dispatch, setIsLoaded, fromJs),
    );
    React.useEffect4(
      () =>
        switch (isLoaded) {
        | false => None
        | true =>
          let _ =
            Js.Promise.(
              store->LocalForage.setItems(items->reMapToJsDict(toJs))
              |> then_(() => {
                   let _ =
                     store->LocalForage.keys()
                     |> then_(keys => {
                          let stateKeys = items->Map.keysToArray;
                          let deleted =
                            Js.Array.(
                              keys |> filter(x => !(stateKeys |> includes(x)))
                            );
                          if (deleted |> Js.Array.length > 0) {
                            let _ = store->LocalForage.removeItems(deleted);
                            ();
                          };
                          resolve();
                        });
                   resolve();
                 })
            );
          None;
        },
      (store, items, isLoaded, toJs),
    );
    (items, dispatch);
  };
  let useAllPlayers = () =>
    useAllItemsFromDb(
      ~store=playerStore,
      ~reducer=genericDbReducer,
      ~fromJs=Data.Player.tFromJs,
      ~toJs=Data.Player.tToJs,
    );
  let useAllTournaments = () =>
    useAllItemsFromDb(
      ~store=tourneyStore,
      ~reducer=genericDbReducer,
      ~fromJs=Data.Tournament.tFromJsDeep,
      ~toJs=Data.Tournament.tToJsDeep,
    );
  let optionsReducer = (state, action) => {
    Js.Array.(
      switch (action) {
      | AddAvoidPair(pair) => {
          ...state,
          avoidPairs: state.avoidPairs |> concat([|pair|]),
        }
      | DelAvoidPair((user1, user2)) => {
          ...state,
          avoidPairs:
            state.avoidPairs
            |> filter(((p1, p2)) =>
                 !(
                   [|p1, p2|]
                   |> includes(user1)
                   && [|p1, p2|]
                   |> includes(user2)
                 )
               ),
        }
      | DelAvoidSingle(id) => {
          ...state,
          avoidPairs:
            state.avoidPairs
            |> filter(((p1, p2)) => !([|p1, p2|] |> includes(id))),
        }
      | SetAvoidPairs(avoidPairs) => {...state, avoidPairs}
      | SetByeValue(byeValue) => {...state, byeValue}
      | SetLastBackup(lastBackup) => {...state, lastBackup}
      | SetState(state) => state
      }
    );
  };
  let useOptions = () => {
    let (options, dispatch) =
      React.useReducer(optionsReducer, defaultOptions);
    let (isLoaded, setIsLoaded) = React.useState(() => false);
    React.useEffect2(
      () => {
        let didCancel = ref(false);
        let _ =
          Js.Promise.(
            optionsStore##getItems()
            |> then_(valuesJs => {
                 let values = Data.db_optionsFromJs(valuesJs);
                 if (! didCancel^) {
                   dispatch(SetAvoidPairs(values.avoidPairs));
                   dispatch(SetByeValue(values.byeValue));
                   dispatch(SetLastBackup(values.lastBackup));
                   setIsLoaded(_ => true);
                 };
                 resolve();
               })
          );
        Some(() => didCancel := true);
      },
      (setIsLoaded, dispatch),
    );
    React.useEffect2(
      () =>
        switch (isLoaded) {
        | false => None
        | true =>
          let _ = optionsStore##setItems(options |> Data.db_optionsToJs);
          None;
        },
      (options, isLoaded),
    );
    (options, dispatch);
  };
};