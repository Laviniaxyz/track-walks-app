import React, { useReducer } from "react";

export default (reducer, actions, defaultState) => {
  const Context = React.createContext();

  //Provider = Helper React Comp
  const Provider = ({ children }) => {
    //we set up use reducer call inside of Provider
    const [state, dispatch] = useReducer(reducer, defaultState);
    //actions = functions we need to call with dispatch
    //dispatch = function we can call with some action object

    //boundActions = functions we use to change our state
    const boundActions = {};
    //for in loop
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    //<Context.Provider/> makes our data available to children components
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };
  //Context = object we use to get acces to info provided by the Provider Comp
  return { Context, Provider };
};
