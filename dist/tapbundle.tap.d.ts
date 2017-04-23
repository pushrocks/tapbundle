export declare type TTestStatus = 'success' | 'error' | 'pending';
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
    test(testDescription: string, testFunction: ITestFunction): Promise<void>;
    testParallel(testDescription: string, testFunction: ITestFunction): void;
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
