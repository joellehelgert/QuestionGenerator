import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';

export interface SimpleErrorObject {
  statusCode: number;
  message: string;
}

export interface HintStateModel {
  errors: SimpleErrorObject[];
  successes: string[];
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
  addError(ctx: StateContext<HintStateModel>, action: AddError) {
    const state = ctx.getState();
    const newErrors = state.errors;
    newErrors.push(action.error);
    ctx.setState({
      ...state,
      errors: newErrors,
    });
  }

  @Action(RemoveLastError)
  removeLastError(ctx: StateContext<HintStateModel>, action: RemoveLastError) {
    const state = ctx.getState();
    const newErrors = state.errors;
    newErrors.splice(newErrors.length - 1, 1);
    ctx.setState({
      ...state,
      errors: newErrors,
    });
  }

  // ----- Successes ------
  @Selector()
  static getSuccesses(state: HintStateModel) {
      return state.successes;
  }

  @Action(AddSuccess)
  addsuccess(ctx: StateContext<HintStateModel>, action: AddSuccess) {
    const state = ctx.getState();
    const newSuccesses = state.successes;
    newSuccesses.push(action.success);
    ctx.setState({
      ...state,
      successes: newSuccesses,
    });
  }

  @Action(RemoveLastSuccess)
  removeLastsuccess(ctx: StateContext<HintStateModel>, action: RemoveLastSuccess) {
    const state = ctx.getState();
    const newSuccesses = state.successes;
    newSuccesses.splice(newSuccesses.length - 1, 1);
    ctx.setState({
      ...state,
      successes: newSuccesses,
    });
  }
}
