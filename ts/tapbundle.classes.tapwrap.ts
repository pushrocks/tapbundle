import * as plugins from './tapbundle.plugins'

export interface ITapWrapFunction {
  (): Promise<any>
}

export class TapWrap {
  asyncFunction: ITapWrapFunction
  constructor(functionArg: ITapWrapFunction) {
    // nothing here
    
  
  }
}
