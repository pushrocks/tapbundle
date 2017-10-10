export interface IPromiseFunc {
    (): Promise<any>;
}
export declare class TapTools {
    /**
     * the referenced TapTest
     */
    private _tapTest;
    constructor(TapTestArg: any);
    /**
     * allow failure
     */
    allowFailure(): void;
    /**
     * async/await delay method
     */
    delayFor(timeMilliArg: any): Promise<void>;
    delayForRandom(timeMilliMinArg: any, timeMilliMaxArg: any): Promise<void>;
    timeout(timeMilliArg: number): Promise<void>;
    checkIterationLeak(iterationfuncArg: IPromiseFunc): Promise<void>;
    returnError(throwingFuncArg: IPromiseFunc): Promise<Error>;
}
