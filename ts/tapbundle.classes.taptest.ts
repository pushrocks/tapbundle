import * as plugins from './tapbundle.plugins';
import { tapCreator } from './tapbundle.tapcreator';
import { TapTools } from './tapbundle.classes.taptools';

// imported interfaces
import { HrtMeasurement } from '@pushrocks/early';
import { Deferred } from '@pushrocks/smartpromise';

// interfaces
export type TTestStatus = 'success' | 'error' | 'pending' | 'errorAfterSuccess' | 'timeout';

export interface ITestFunction {
  (tapTools?: TapTools): Promise<any>;
}

export class TapTest {
  description: string;
  failureAllowed: boolean;
  hrtMeasurement: HrtMeasurement;
  parallel: boolean;
  status: TTestStatus;
  tapTools: TapTools;
  testFunction: ITestFunction;
  testKey: number; // the testKey the position in the test qeue. Set upon calling .run()
  testDeferred: Deferred<TapTest> = plugins.smartpromise.defer();
  testPromise: Promise<TapTest> = this.testDeferred.promise;
  /**
   * constructor
   */
  constructor(optionsArg: { description: string; testFunction: ITestFunction; parallel: boolean }) {
    this.description = optionsArg.description;
    this.hrtMeasurement = new HrtMeasurement();
    this.parallel = optionsArg.parallel;
    this.status = 'pending';
    this.tapTools = new TapTools(this);
    this.testFunction = optionsArg.testFunction;
  }

  /**
   * run the test
   */
  async run(testKeyArg: number) {
    this.hrtMeasurement.start();
    this.testKey = testKeyArg;
    let testNumber = testKeyArg + 1;
    try {
      await this.testFunction(this.tapTools);
      if (this.status === 'timeout') {
        throw new Error('Test succeeded, but timed out...');
      }
      this.hrtMeasurement.stop();
      console.log(
        `ok ${testNumber} - ${this.description} # time=${this.hrtMeasurement.milliSeconds}ms`
      );
      this.status = 'success';
      this.testDeferred.resolve(this);
    } catch (err) {
      this.hrtMeasurement.stop();
      console.log(
        `not ok ${testNumber} - ${this.description} # time=${this.hrtMeasurement.milliSeconds}ms`
      );
      this.testDeferred.resolve(this);

      // if the test has already succeeded before
      if (this.status === 'success') {
        this.status = 'errorAfterSuccess';
        console.log('!!! ALERT !!!: weird behaviour, since test has been already successfull');
      } else {
        this.status = 'error';
      }

      // if the test is allowed to fail
      if (this.failureAllowed) {
        console.log(`please note: failure allowed!`);
      }
      console.log(err);
    }
  }
}
