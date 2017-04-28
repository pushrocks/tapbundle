import * as plugins from './tapbundle.plugins'

import { TapTest, ITestFunction } from './tapbundle.classes.taptest'

export class Tap {
  private _tests: TapTest[] = []

  /**
   * Normal test function, will run one by one
   * @param testDescription - A description of what the test does
   * @param testFunction - A Function that returns a Promise and resolves or rejects
   */
  async test (testDescription: string, testFunction: ITestFunction) {
    let localTest = new TapTest({
      description: testDescription,
      testFunction: testFunction,
      parallel: false
    })
    this._tests.push(localTest)
    return localTest
  }

  /**
   * A parallel test that will not be waited for before the next starts.
   * @param testDescription - A description of what the test does
   * @param testFunction - A Function that returns a Promise and resolves or rejects
   */
  testParallel (testDescription: string, testFunction: ITestFunction) {
    this._tests.push(new TapTest({
      description: testDescription,
      testFunction: testFunction,
      parallel: true
    }))
  }

  /**
   * tests leakage
   * @param testDescription - A description of what the test does
   * @param testFunction - A Function that returns a Promise and resolves or rejects
   */
  testLeakage (testDescription: string, testFunction: ITestFunction) {

  }

  /**
   * starts the test evaluation
   */
  async start () {
    let promiseArray: Promise<any>[] = []

    // safeguard against empty test array
    if (this._tests.length === 0) {
      console.log('no tests specified. Ending here!')
      return
    }

    console.log(`1..${this._tests.length}`)
    for (let testKey = 0; testKey < this._tests.length; testKey++) {
      let currentTest = this._tests[testKey]
      let testPromise = currentTest.run(testKey)
      if (currentTest.parallel) {
        promiseArray.push(testPromise)
      } else {
        await testPromise
      }
    }
    await Promise.all(promiseArray)
  }

  /**
   * handle errors
   */
  threw (err) {
    console.log(err)
  }
}

export let tap = new Tap()

