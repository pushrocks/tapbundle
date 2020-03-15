import * as plugins from './tapbundle.plugins';

import { IPreTaskFunction, PreTask } from './tapbundle.classes.pretask';
import { TapTest, ITestFunction } from './tapbundle.classes.taptest';
import { TapWrap, ITapWrapFunction } from './tapbundle.classes.tapwrap';
export class Tap {
  /**
   * skips a test
   * tests marked with tap.skip.test() are never executed
   */
  public skip = {
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
  public only = {
    test: (descriptionArg: string, testFunctionArg: ITestFunction) => {
      this.test(descriptionArg, testFunctionArg, 'only');
    }
  };

  private _tapPreTasks: PreTask[] = [];
  private _tapTests: TapTest[] = [];
  private _tapTestsOnly: TapTest[] = [];

  /**
   * Normal test function, will run one by one
   * @param testDescription - A description of what the test does
   * @param testFunction - A Function that returns a Promise and resolves or rejects
   */
  public async test(
    testDescription: string,
    testFunction: ITestFunction,
    modeArg: 'normal' | 'only' | 'skip' = 'normal'
  ) {
    const localTest = new TapTest({
      description: testDescription,
      testFunction,
      parallel: false
    });
    if (modeArg === 'normal') {
      this._tapTests.push(localTest);
    } else if (modeArg === 'only') {
      this._tapTestsOnly.push(localTest);
    }
    return localTest;
  }

  public preTask (descriptionArg: string, functionArg: IPreTaskFunction) {
    this._tapPreTasks.push(new PreTask(descriptionArg, functionArg));
  }

  /**
   * wraps function
   */
  public wrap(functionArg: ITapWrapFunction) {
    return new TapWrap(functionArg);
  }

  /**
   * A parallel test that will not be waited for before the next starts.
   * @param testDescription - A description of what the test does
   * @param testFunction - A Function that returns a Promise and resolves or rejects
   */
  public testParallel(testDescription: string, testFunction: ITestFunction) {
    this._tapTests.push(
      new TapTest({
        description: testDescription,
        testFunction,
        parallel: true
      })
    );
  }

  /**
   * starts the test evaluation
   */
  public async start(optionsArg?: { throwOnError: boolean }) {
    const promiseArray: Array<Promise<any>> = [];

    // safeguard against empty test array
    if (this._tapTests.length === 0) {
      console.log('no tests specified. Ending here!');
      // TODO: throw proper error
      return;
    }

    // determine which tests to run
    let concerningTests: TapTest[];
    if (this._tapTestsOnly.length > 0) {
      concerningTests = this._tapTestsOnly;
    } else {
      concerningTests = this._tapTests;
    }

    // lets run the pretasks
    for (const preTask of this._tapPreTasks) {
      await preTask.run();
    }

    console.log(`1..${concerningTests.length}`);
    for (let testKey = 0; testKey < concerningTests.length; testKey++) {
      const currentTest = concerningTests[testKey];
      const testPromise = currentTest.run(testKey);
      if (currentTest.parallel) {
        promiseArray.push(testPromise);
      } else {
        await testPromise;
      }
    }
    await Promise.all(promiseArray);

    // when tests have been run and all promises are fullfilled
    const failReasons: string[] = [];
    const executionNotes: string[] = [];
    // collect failed tests
    for (const tapTest of concerningTests) {
      if (tapTest.status !== 'success') {
        failReasons.push(
          `Test ${tapTest.testKey + 1} failed with status ${tapTest.status}:\n` +
            `|| ${tapTest.description}\n` +
            `|| for more information please take a look the logs above`
        );
      }
    }

    // render fail Reasons
    for (const failReason of failReasons) {
      console.log(failReason);
    }

    if (optionsArg && optionsArg.throwOnError && failReasons.length > 0) {
      process.exit(1);
    }
  }

  /**
   * handle errors
   */
  public threw(err) {
    console.log(err);
  }
}

export let tap = new Tap();
