import { TapTest, ITestFunction } from './tapbundle.classes.taptest';
import { TapWrap, ITapWrapFunction } from './tapbundle.classes.tapwrap';
export declare class Tap {
    /**
     * skip a test
     */
    skip: {
        test: (descriptionArg: string, functionArg: ITestFunction) => void;
    };
    private _tests;
    /**
     * Normal test function, will run one by one
     * @param testDescription - A description of what the test does
     * @param testFunction - A Function that returns a Promise and resolves or rejects
     */
    test(testDescription: string, testFunction: ITestFunction): Promise<TapTest>;
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
     * tests leakage
     * @param testDescription - A description of what the test does
     * @param testFunction - A Function that returns a Promise and resolves or rejects
     */
    testLeakage(testDescription: string, testFunction: ITestFunction): void;
    /**
     * starts the test evaluation
     */
    start(): Promise<void>;
    /**
     * handle errors
     */
    threw(err: any): void;
}
export declare let tap: Tap;
