import { tapCreator } from './tapbundle.tapcreator'
import { TapTools } from './tapbundle.classes.taptools'

// imported interfaces
import { HrtMeasurement } from 'early'

// interfaces
export type TTestStatus = 'success' | 'error' | 'pending' | 'errorAfterSuccess' | 'timeout'

export interface ITestFunction {
  (tapTools?: TapTools): Promise<any>
}


export class TapTest {
  description: string
  failureAllowed: boolean
  hrtMeasurement: HrtMeasurement
  parallel: boolean
  status: TTestStatus
  tapTools: TapTools
  testFunction: ITestFunction
  /**
   * constructor
   */
  constructor (optionsArg: {
    description: string,
    testFunction: ITestFunction,
    parallel: boolean
  }) {
    this.description = optionsArg.description
    this.hrtMeasurement = new HrtMeasurement()
    this.parallel = optionsArg.parallel
    this.status = 'pending'
    this.tapTools = new TapTools(this)
    this.testFunction = optionsArg.testFunction
  }

  /**
   * run the test
   */
  async run (testKeyArg: number) {
    this.hrtMeasurement.start()
    try {
      await this.testFunction(this.tapTools)
      if (this.status === 'timeout') {
        throw new Error ('Test succeeded, but timed out...')
      }
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
      if(this.failureAllowed) {
        console.log(`please note: failure allowed!`)
      }
      console.log(err)
    }
  }
}
