import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';

export interface SimpleErrorObject {
  statusCode: number;
  message: string;
}

export interface HintStateModel {
  errors: SimpleErrorObject[];
  successes: string[];
  hints: string[];
}


export class AddError {
  static readonly type = '[Status] AddError';

  constructor(public error: SimpleErrorObject) {}
}

export class RemoveLastError {
  static readonly type = '[Status] RemoveLastError';
}

export class AddSuccess {
  static readonly type = '[Status] AddSuccess';

  constructor(public success: string) {}
}

export class RemoveLastSuccess {
  static readonly type = '[Status] RemoveLastSuccess';
}


@State<HintStateModel>({
  name: 'status',
  defaults: {
    errors: [],
    successes: [],
    hints: []
  }
})
@Injectable()
export class HintState {

  // ---- ERRORS ----
  @Selector()
  static getErrors(state: HintStateModel) {
      return state.errors;
  }


  @Action(AddError)
  addError(ctx: StateContext<HintStateModel>, error: SimpleErrorObject) {
    const state = ctx.getState();
    const newErrors = state.errors;
    newErrors.push(error);
    ctx.setState({
      ...state,
      errors: newErrors,
    });
  }

  @Action(RemoveLastError)
  removeLastError(ctx: StateContext<HintStateModel>, error: SimpleErrorObject) {
    const state = ctx.getState();
    const newErrors = state.errors;
    newErrors.splice(newErrors.length - 1, 1);
    ctx.setState({
      ...state,
      errors: newErrors,
    });
  }

  @Action(AddSuccess)
  addsuccess(ctx: StateContext<HintStateModel>, success: string) {
    const state = ctx.getState();
    const newSuccesses = state.successes;
    newSuccesses.push(success);
    ctx.setState({
      ...state,
      successes: newSuccesses,
    });
  }

  @Action(RemoveLastSuccess)
  removeLastsuccess(ctx: StateContext<HintStateModel>, success: string) {
    const state = ctx.getState();
    const newSuccesses = state.successes;
    newSuccesses.splice(newSuccesses.length - 1, 1);
    ctx.setState({
      ...state,
      successes: newSuccesses,
    });
  }
}
