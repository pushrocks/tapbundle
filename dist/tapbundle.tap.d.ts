export declare type TTestStatus = 'success' | 'error' | 'pending' | 'errorAfterSuccess';
export interface ITestFunction {
    (): Promise<any>;
}
export declare class TapTest {
    description: string;
    testFunction: ITestFunction;
    status: TTestStatus;
    parallel: boolean;
    returnValue: any;
    /**
     * constructor
     */
    constructor(optionsArg: {
        description: string;
        testFunction: ITestFunction;
        parallel: boolean;
    });
    /**
     * run the test
     */
    run(testKeyArg: number): Promise<void>;
}
export declare class Tap {
    private _tests;
    /**
     * Normal test function, will run one by one
     * @param testDescription - A description of what the test does
     * @param testFunction - A Function that returns a Promise and resolves or rejects
     */
    test(testDescription: string, testFunction: ITestFunction): Promise<void>;
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
