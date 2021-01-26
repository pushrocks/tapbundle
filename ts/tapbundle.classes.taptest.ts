import * as plugins from './tapbundle.plugins';
import { tapCreator } from './tapbundle.tapcreator';
import { TapTools } from './tapbundle.classes.taptools';

// imported interfaces
import { Deferred } from '@pushrocks/smartpromise';
import { HrtMeasurement } from '@pushrocks/smarttime';

// interfaces
export type TTestStatus = 'success' | 'error' | 'pending' | 'errorAfterSuccess' | 'timeout';

export interface ITestFunction <T = unknown> { (tapTools?: TapTools): Promise<T> };

export class TapTest <T = unknown> {
  public description: string;
  public failureAllowed: boolean;
  public hrtMeasurement: HrtMeasurement;
  public parallel: boolean;
  public status: TTestStatus;
  public tapTools: TapTools;
  public testFunction: ITestFunction<T>;
  public testKey: number; // the testKey the position in the test qeue. Set upon calling .run()
  private testDeferred: Deferred<TapTest<T>> = plugins.smartpromise.defer();
  public testPromise: Promise<TapTest<T>> = this.testDeferred.promise;
  private testResultDeferred: Deferred<T> = plugins.smartpromise.defer();
  public testResultPromise: Promise<T> = this.testResultDeferred.promise;
  /**
   * constructor
   */
  constructor(optionsArg: { description: string; testFunction: ITestFunction<T>; parallel: boolean }) {
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
  public async run(testKeyArg: number) {
    this.hrtMeasurement.start();
    this.testKey = testKeyArg;
    const testNumber = testKeyArg + 1;
    try {
      const testReturnValue = await this.testFunction(this.tapTools);
      if (this.status === 'timeout') {
        throw new Error('Test succeeded, but timed out...');
      }
      this.hrtMeasurement.stop();
      console.log(
        `ok ${testNumber} - ${this.description} # time=${this.hrtMeasurement.milliSeconds}ms`
      );
      this.status = 'success';
      this.testDeferred.resolve(this);
      this.testResultDeferred.resolve(testReturnValue);
    } catch (err) {
      this.hrtMeasurement.stop();
      console.log(
        `not ok ${testNumber} - ${this.description} # time=${this.hrtMeasurement.milliSeconds}ms`
      );
      this.testDeferred.resolve(this);
      this.testResultDeferred.resolve(err);

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
