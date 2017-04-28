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
    timeout(timeMilliArg: number): Promise<void>;
}
