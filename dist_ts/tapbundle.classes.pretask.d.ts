import { TapTools } from './tapbundle.classes.taptools';
export interface IPreTaskFunction {
    (tapTools?: TapTools): Promise<any>;
}
export declare class PreTask {
    description: string;
    preTaskFunction: IPreTaskFunction;
    constructor(descriptionArg: string, preTaskFunctionArg: IPreTaskFunction);
    run(): Promise<void>;
}
