import * as plugins from './tapbundle.plugins';

import { TapTest, ITestFunction } from './tapbundle.classes.taptest';
import { TapWrap, ITapWrapFunction } from './tapbundle.classes.tapwrap';
export class Tap {
  /**
   * skips a test
   * tests marked with tap.skip.test() are never executed
   */
  skip = {
    test: (descriptionArg: string, functionArg: ITestFunction) => {
      console.log(`skipped test: ${descriptionArg}`);
    },
    testParallel: (descriptionArg: string, functionArg: ITestFunction) => {
      console.log(`skipped test: ${descriptionArg}`);
    }
  };

  /**
   * only executes tests marked as ONLY
   */
  only = {
    test: (descriptionArg: string, testFunctionArg: ITestFunction) => {
      this.test(descriptionArg, testFunctionArg, 'only');
    }
  }

  private _tapTests: TapTest[] = [];
  private _tapTestsOnly: TapTest[] = [];

  /**
   * Normal test function, will run one by one
   * @param testDescription - A description of what the test does
   * @param testFunction - A Function that returns a Promise and resolves or rejects
   */
  async test(testDescription: string, testFunction: ITestFunction, modeArg: 'normal' | 'only' | 'skip' = 'normal' ) {
    let localTest = new TapTest({
      description: testDescription,
      testFunction: testFunction,
      parallel: false
    });
    if(modeArg === 'normal') {
      this._tapTests.push(localTest);
    } else if (modeArg === 'only') {
      this._tapTestsOnly.push(localTest);
    }
    return localTest;
  }

  /**
   * wraps function
   */
  wrap(functionArg: ITapWrapFunction) {
    return new TapWrap(functionArg);
  }

  /**
   * A parallel test that will not be waited for before the next starts.
   * @param testDescription - A description of what the test does
   * @param testFunction - A Function that returns a Promise and resolves or rejects
   */
  testParallel(testDescription: string, testFunction: ITestFunction) {
    this._tapTests.push(
      new TapTest({
        description: testDescription,
        testFunction: testFunction,
        parallel: true
      })
    );
  }

  /**
   * starts the test evaluation
   */
  async start(optionsArg?: { throwOnError: boolean }) {
    let promiseArray: Promise<any>[] = [];

    // safeguard against empty test array
    if (this._tapTests.length === 0) {
      console.log('no tests specified. Ending here!');
      return;
    }

    // determine which tests to run
    let concerningTests: TapTest[];
    if(this._tapTestsOnly.length > 0) {
      concerningTests = this._tapTestsOnly;
    } else {
      concerningTests = this._tapTests;
    }

    console.log(`1..${concerningTests.length}`);
    for (let testKey = 0; testKey < concerningTests.length; testKey++) {
      let currentTest = concerningTests[testKey];
      let testPromise = currentTest.run(testKey);
      if (currentTest.parallel) {
        promiseArray.push(testPromise);
      } else {
        await testPromise;
      }
    }
    await Promise.all(promiseArray);

    // when tests have been run and all promises are fullfilled
    let failReasons: string[] = [];
    let executionNotes: string[] = [];
    // collect failed tests
    for (let tapTest of concerningTests) {
      if (tapTest.status !== 'success') {
        failReasons.push(
          `Test ${tapTest.testKey + 1} failed with status ${tapTest.status}:\n` +
            `|| ${tapTest.description}\n` +
            `|| for more information please take a look the logs above`
        );
      }
    }

    // render fail Reasons
    for (let failReason of failReasons) {
      console.log(failReason);
    }

    if (optionsArg && optionsArg.throwOnError && failReasons.length > 0) {
      process.exit(1);
    }
  }

  /**
   * handle errors
   */
  threw(err) {
    console.log(err);
  }
}

export let tap = new Tap();
