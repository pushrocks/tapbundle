export interface ITapWrapFunction {
    (): Promise<any>;
}
export declare class TapWrap {
    wrapFunction: ITapWrapFunction;
    /**
     * the constructor
     */
    constructor(wrapFunctionArg: ITapWrapFunction);
    /**
     * run the wrapFunction
     */
    run(): Promise<void>;
}
