import * as plugins from './tapbundle.plugins';

export interface ITapWrapOptions {
  before: () => Promise<any>;
  after: () => {};
}

export class TapWrap {
  public options: ITapWrapOptions;
  constructor(optionsArg: ITapWrapOptions) {
    this.options = optionsArg;
  }
}
