import * as plugins from './tapbundle.plugins'
import { TapTest } from './tapbundle.classes.taptest'

export class TapTools {

  /**
   * the referenced TapTest
   */
  private _tapTest: TapTest

  constructor (TapTestArg) {
    this._tapTest = TapTestArg
  }

  /**
   * allow failure
   */
  allowFailure () {
    this._tapTest.failureAllowed = true
  }

  /**
   * async/await delay method
   */
  async delayFor (timeMilliArg) {
    await plugins.smartdelay.delayFor(timeMilliArg)
  }

  async timeout (timeMilliArg: number) {
    let timeout = new plugins.smartdelay.Timeout(timeMilliArg)
    timeout.makeUnrefed()
    await timeout.promise
    if (this._tapTest.status === 'pending') {
      this._tapTest.status = 'timeout'
    }
  }

}
