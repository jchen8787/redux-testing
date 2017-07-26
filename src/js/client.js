import { applyMiddleware, createStore } from "redux";

const reducer = (state = 0, action) => {
  switch (action.type) {
    case "DEC":
      return state - 1;
    case "INC":
      return state + 1;
    case "E":
      throw new Error("ahh");
  }
  return state;
}

const logger = (store) => (next) => (action) => {
  console.log("action fired", action);
  next(action);
}

const error = (store) => (next) => (action) => {
  try {
    next(action);
  } catch(e) {
    console.log("oh noes", e);
  }
}

const middleware = applyMiddleware(logger);

const store = createStore(reducer, 1, middleware);

store.subscribe(() => {
  console.log("store changed", store.getState())
})

store.dispatch({type: "INC"});
store.dispatch({type: "INC"});
store.dispatch({type: "INC"});
store.dispatch({type: "DEC"});
store.dispatch({type: "INC"});
store.dispatch({type: "DEC"});
store.dispatch({type: "E"});