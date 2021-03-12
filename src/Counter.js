import React, { createContext, useReducer } from "react";

const CounterContext = createContext();

const INCREMENT = "increment";
const DECREMENT = "decrement";

// action creators
const incrementAction = () => ({
  type: INCREMENT,
});

const decrementAction = () => ({
  type: DECREMENT,
});

// reducer
const counterInitState = { count: 0 };
const reducer = (state = counterInitState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const withCounter = (
  mapStateToProps,
  mapDispatchToProps,
) => Component => props => (
  <CounterContext.Consumer>
    {({ state, dispatch }) => {
      const statesToAdd = mapStateToProps ? mapStateToProps(state) : {};
      const propsToAdd = mapDispatchToProps ? mapDispatchToProps(dispatch) : {};

      const combineStates = { ...props, ...statesToAdd, ...propsToAdd };

      return <Component {...combineStates}>{props.children}</Component>;
    }}
  </CounterContext.Consumer>
);

const mapStateToProps = state => ({
  count: state.count,
});

const Display = ({ count }) => {
  return <div>Count: {count}</div>;
};

const CounterDisplay = withCounter(mapStateToProps)(Display);

const IncrementButton = ({ increment }) => {
  return <button onClick={increment}>+1</button>;
};

const mapDispatchToPropsForIncrement = dispatch => {
  return {
    increment: () => dispatch(incrementAction()),
  };
};

const CounterIncrementButton = withCounter(
  null,
  mapDispatchToPropsForIncrement,
)(IncrementButton);

const DecrementButton = ({ decrement }) => {
  return <button onClick={decrement}>-1</button>;
};

const mapDispatchToPropsForDecrement = dispatch => {
  return {
    decrement: () => dispatch(decrementAction()),
  };
};

const CounterDecrementButton = withCounter(
  null,
  mapDispatchToPropsForDecrement,
)(DecrementButton);

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, counterInitState);
  return (
    <CounterContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <CounterDisplay />
      <CounterIncrementButton />
      <CounterDecrementButton />
    </CounterContext.Provider>
  );
};

export default Counter;