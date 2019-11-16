import * as plugins from './tapbundle.plugins';
import { TapTools } from './tapbundle.classes.taptools';


export interface IPreTaskFunction {
  (tapTools?: TapTools): Promise<any>;
}

export class PreTask {
  public preTaskFunction: IPreTaskFunction;

  constructor(preTaskFunctionArg: IPreTaskFunction) {
    this.preTaskFunction = preTaskFunctionArg;
  }

  public async run () {
    await this.preTaskFunction(new TapTools(null));
  }
}