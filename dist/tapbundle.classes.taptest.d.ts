import { TapTools } from './tapbundle.classes.taptools';
import { HrtMeasurement } from 'early';
export declare type TTestStatus = 'success' | 'error' | 'pending' | 'errorAfterSuccess' | 'timeout';
export interface ITestFunction {
    (tapTools?: TapTools): Promise<any>;
}
export declare class TapTest {
    description: string;
    failureAllowed: boolean;
    hrtMeasurement: HrtMeasurement;
    parallel: boolean;
    status: TTestStatus;
    tapTools: TapTools;
    testFunction: ITestFunction;
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
