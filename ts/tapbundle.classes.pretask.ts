import * as plugins from './tapbundle.plugins';
import { TapTools } from './tapbundle.classes.taptools';


export interface IPreTaskFunction {
  (tapTools?: TapTools): Promise<any>;
}

export class PreTask {
  public description: string;
  public preTaskFunction: IPreTaskFunction;

  constructor(descriptionArg: string, preTaskFunctionArg: IPreTaskFunction) {
    this.description = descriptionArg;
    this.preTaskFunction = preTaskFunctionArg;
  }

  public async run () {
    console.log(`::__PRETASK: ${this.description}`);
    await this.preTaskFunction(new TapTools(null));
  }
}