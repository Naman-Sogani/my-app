import {
    CallEffect,
    delay,
    put,
    PutEffect,
    takeLatest
} from "redux-saga/effects";
import {
    DOWN,
    ISnakeCoord,
    LEFT,
    MOVE_DOWN,
    MOVE_LEFT,
    MOVE_RIGHT,
    MOVE_UP, RIGHT,
    setDisDirection, UP,
    STOP_GAME,
    RESET
} from "../actions/action";
  
  export function* moveSaga(params: {
    type: string;
    payload: ISnakeCoord;
  }): Generator<
    | PutEffect<{ type: string; payload: ISnakeCoord }>
    | PutEffect<{ type: string; payload: string }>
    | CallEffect<true>
  > {
    while (params.type !== RESET && params.type !== STOP_GAME) {
      yield put({
        type: params.type.split("_")[1],
        payload: params.payload,
      });
      switch (params.type.split("_")[1]) {
        case RIGHT:
          yield put(setDisDirection(LEFT));
          break;
  
        case LEFT:
          yield put(setDisDirection(RIGHT));
          break;
  
        case UP:
          yield put(setDisDirection(DOWN));
          break;
  
        case DOWN:
          yield put(setDisDirection(UP));
          break;
      }
      yield delay(100);
    }
  }
  
  function* watcherSagas() {
    /* This function will call the worker saga and cancel 
     any previous saga calls if any of the actions mentioned 
     in the first argument are dispatched.
     
     takeLatest(pattern, saga, ...args)
      Forks a saga on each action dispatched to the Store that 
      matches pattern. And automatically cancels any previous saga 
      task started previously if it's still running.
     */
    yield takeLatest(
      [MOVE_RIGHT, MOVE_LEFT, MOVE_UP, MOVE_DOWN, RESET],
      moveSaga
    );
  }
  
  export default watcherSagas;