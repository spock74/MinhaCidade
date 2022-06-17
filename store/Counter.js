import { useSelector, useDispatch } from "react-redux"; // useSelector is a hook

import classes from "./Counter.module.css";
import { counterActions } from "./RedStore";

const Counter = () => {
  const dispatch = useDispatch();

  const counter = useSelector((state) => state.count);

  const incrementHandler = () => {
    dispatch( counterActions.increment() );
  }
  const decrementHandler = () => {
    dispatch( counterActions.decrement() );
  }

  const increaseHandler = () => {
    dispatch( counterActions.increase(5) ); 
  }

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
        <button onClick={increaseHandler}>Decrement 10</button>
      </div>
      <div className={classes.value}>{counter}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
