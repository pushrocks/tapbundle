import * as plugins from './tapbundle.plugins';

export interface ITapWrapFunction {
  (): Promise<any>;
}

export class TapWrap {
  wrapFunction: ITapWrapFunction;

  /**
   * the constructor
   */
  constructor(wrapFunctionArg: ITapWrapFunction) {
    // nothing here
    this.wrapFunction = wrapFunctionArg;
  }

  /**
   * run the wrapFunction
   */
  async run() {
    // TODO: make sure it makes sense what we do here.
    await this.wrapFunction();
  }
}
