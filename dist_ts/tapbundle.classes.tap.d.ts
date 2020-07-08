import { IPreTaskFunction } from './tapbundle.classes.pretask';
import { TapTest, ITestFunction } from './tapbundle.classes.taptest';
import { TapWrap, ITapWrapFunction } from './tapbundle.classes.tapwrap';
export declare class Tap {
    /**
     * skips a test
     * tests marked with tap.skip.test() are never executed
     */
    skip: {
        test: (descriptionArg: string, functionArg: ITestFunction) => void;
        testParallel: (descriptionArg: string, functionArg: ITestFunction) => void;
    };
    /**
     * only executes tests marked as ONLY
     */
    only: {
        test: (descriptionArg: string, testFunctionArg: ITestFunction) => void;
    };
    private _tapPreTasks;
    private _tapTests;
    private _tapTestsOnly;
    /**
     * Normal test function, will run one by one
     * @param testDescription - A description of what the test does
     * @param testFunction - A Function that returns a Promise and resolves or rejects
     */
    test(testDescription: string, testFunction: ITestFunction, modeArg?: 'normal' | 'only' | 'skip'): Promise<TapTest>;
    preTask(descriptionArg: string, functionArg: IPreTaskFunction): void;
    /**
     * wraps function
     */
    wrap(functionArg: ITapWrapFunction): TapWrap;
    /**
     * A parallel test that will not be waited for before the next starts.
     * @param testDescription - A description of what the test does
     * @param testFunction - A Function that returns a Promise and resolves or rejects
     */
    testParallel(testDescription: string, testFunction: ITestFunction): void;
    /**
     * starts the test evaluation
     */
    start(optionsArg?: {
        throwOnError: boolean;
    }): Promise<void>;
    /**
     * handle errors
     */
    threw(err: any): void;
}
export declare let tap: Tap;
