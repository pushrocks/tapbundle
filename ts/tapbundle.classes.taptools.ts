import * as plugins from './tapbundle.plugins';
import { TapTest } from './tapbundle.classes.taptest';

export interface IPromiseFunc {
  (): Promise<any>;
}

export class TapTools {
  /**
   * the referenced TapTest
   */
  private _tapTest: TapTest;

  constructor(TapTestArg) {
    this._tapTest = TapTestArg;
  }

  /**
   * allow failure
   */
  public allowFailure() {
    this._tapTest.failureAllowed = true;
  }

  /**
   * async/await delay method
   */
  public async delayFor(timeMilliArg) {
    await plugins.smartdelay.delayFor(timeMilliArg);
  }

  public async delayForRandom(timeMilliMinArg, timeMilliMaxArg) {
    await plugins.smartdelay.delayForRandom(timeMilliMinArg, timeMilliMaxArg);
  }

  public async timeout(timeMilliArg: number) {
    const timeout = new plugins.smartdelay.Timeout(timeMilliArg);
    timeout.makeUnrefed();
    await timeout.promise;
    if (this._tapTest.status === 'pending') {
      this._tapTest.status = 'timeout';
    }
  }

  public async checkIterationLeak(iterationfuncArg: IPromiseFunc) {
    if (process.version.startsWith('v11')) {
      console.log('iteration leakage checks disabled for now on version 11 due to low performance');
    } else {
      await plugins.leakage.iterate.async(iterationfuncArg);
    }
  }

  public async returnError(throwingFuncArg: IPromiseFunc) {
    let funcErr: Error;
    try {
      await throwingFuncArg();
    } catch (err) {
      funcErr = err;
    }
    return funcErr;
  }

  public defer() {
    return plugins.smartpromise.defer();
  }
}
