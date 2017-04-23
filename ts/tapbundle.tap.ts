import * as plugins from './tapbundle.plugins'

import { tapCreator } from './tapbundle.tapcreator'

// interfaces
export type TTestStatus = 'success' | 'error' | 'pending' | 'errorAfterSuccess'

export interface ITestFunction {
  (): Promise<any>
}


export class TapTest {
  description: string
  testFunction: ITestFunction
  status: TTestStatus
  parallel: boolean
  returnValue

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
  }

  /**
   * run the test
   */
  async run (testKeyArg: number) {
    try {
      await this.testFunction()
      console.log(`ok ${testKeyArg + 1} - ${this.description} # time=20.040ms`)
      this.status = 'success'
    } catch (err) {
      console.log(`not ok ${testKeyArg + 1} - ${this.description} # time=20.040ms`)
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

