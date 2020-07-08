import { TapTools } from './tapbundle.classes.taptools';
import { Deferred } from '@pushrocks/smartpromise';
import { HrtMeasurement } from '@pushrocks/smarttime';
export declare type TTestStatus = 'success' | 'error' | 'pending' | 'errorAfterSuccess' | 'timeout';
export declare type ITestFunction = (tapTools?: TapTools) => Promise<any>;
export declare class TapTest {
    description: string;
    failureAllowed: boolean;
    hrtMeasurement: HrtMeasurement;
    parallel: boolean;
    status: TTestStatus;
    tapTools: TapTools;
    testFunction: ITestFunction;
    testKey: number;
    testDeferred: Deferred<TapTest>;
    testPromise: Promise<TapTest>;
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
