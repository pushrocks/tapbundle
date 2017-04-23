import * as plugins from './tapbundle.plugins'

import { tapCreator } from './tapbundle.tapcreator'

// imported interfaces
import { HrtMeasurement } from 'early'

// interfaces
export type TTestStatus = 'success' | 'error' | 'pending' | 'errorAfterSuccess'

export interface ITestFunction {
  (): Promise<any>
}


export class TapTest {
  description: string
  parallel: boolean
  hrtMeasurement: HrtMeasurement
  testFunction: ITestFunction
  status: TTestStatus

  /**
   * constructor
   */
  constructor (optionsArg: {
    description: string,
    testFunction: ITestFunction,
    parallel: boolean
  }) {
    this.description = optionsArg.description
    this.testFunction = optionsArg.testFunction
    this.parallel = optionsArg.parallel
    this.status = 'pending'
    this.hrtMeasurement = new HrtMeasurement()
  }

  /**
   * run the test
   */
  async run (testKeyArg: number) {
    this.hrtMeasurement.start()
    try {
      await this.testFunction()
      this.hrtMeasurement.stop()
      console.log(`ok ${testKeyArg + 1} - ${this.description} # time=${this.hrtMeasurement.milliSeconds}ms`)
      this.status = 'success'
    } catch (err) {
      this.hrtMeasurement.stop()
      console.log(`not ok ${testKeyArg + 1} - ${this.description} # time=${this.hrtMeasurement.milliSeconds}ms`)
      if (this.status === 'success') {
        this.status = 'errorAfterSuccess'
        console.log('!!! ALERT !!!: weird behaviour, since test has been already successfull')
      }
      console.log(err)
    }
  }
}

export class Tap {
  private _tests: TapTest[] = []

  /**
   * Normal test function, will run one by one
   * @param testDescription - A description of what the test does
   * @param testFunction - A Function that returns a Promise and resolves or rejects
   */
  async test (testDescription: string, testFunction: ITestFunction) {
    this._tests.push(new TapTest({
      description: testDescription,
      testFunction: testFunction,
      parallel: false
    }))
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

