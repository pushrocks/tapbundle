"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tap = exports.Tap = void 0;
const plugins = __importStar(require("./tapbundle.plugins"));
const tapbundle_classes_pretask_1 = require("./tapbundle.classes.pretask");
const tapbundle_classes_taptest_1 = require("./tapbundle.classes.taptest");
const tapbundle_classes_tapwrap_1 = require("./tapbundle.classes.tapwrap");
class Tap {
    constructor() {
        /**
         * skips a test
         * tests marked with tap.skip.test() are never executed
         */
        this.skip = {
            test: (descriptionArg, functionArg) => {
                console.log(`skipped test: ${descriptionArg}`);
            },
            testParallel: (descriptionArg, functionArg) => {
                console.log(`skipped test: ${descriptionArg}`);
            }
        };
        /**
         * only executes tests marked as ONLY
         */
        this.only = {
            test: (descriptionArg, testFunctionArg) => {
                this.test(descriptionArg, testFunctionArg, 'only');
            }
        };
        this._tapPreTasks = [];
        this._tapTests = [];
        this._tapTestsOnly = [];
    }
    /**
     * Normal test function, will run one by one
     * @param testDescription - A description of what the test does
     * @param testFunction - A Function that returns a Promise and resolves or rejects
     */
    async test(testDescription, testFunction, modeArg = 'normal') {
        const localTest = new tapbundle_classes_taptest_1.TapTest({
            description: testDescription,
            testFunction,
            parallel: false
        });
        if (modeArg === 'normal') {
            this._tapTests.push(localTest);
        }
        else if (modeArg === 'only') {
            this._tapTestsOnly.push(localTest);
        }
        return localTest;
    }
    preTask(descriptionArg, functionArg) {
        this._tapPreTasks.push(new tapbundle_classes_pretask_1.PreTask(descriptionArg, functionArg));
    }
    /**
     * wraps function
     */
    wrap(functionArg) {
        return new tapbundle_classes_tapwrap_1.TapWrap(functionArg);
    }
    /**
     * A parallel test that will not be waited for before the next starts.
     * @param testDescription - A description of what the test does
     * @param testFunction - A Function that returns a Promise and resolves or rejects
     */
    testParallel(testDescription, testFunction) {
        this._tapTests.push(new tapbundle_classes_taptest_1.TapTest({
            description: testDescription,
            testFunction,
            parallel: true
        }));
    }
    /**
     * starts the test evaluation
     */
    async start(optionsArg) {
        // lets set the tapbundle promise
        const smartenvInstance = new plugins.smartenv.Smartenv();
        smartenvInstance.isBrowser ? globalThis.tapbundleDeferred = plugins.smartpromise.defer() : null;
        // lets continue with running the tests
        const promiseArray = [];
        // safeguard against empty test array
        if (this._tapTests.length === 0) {
            console.log('no tests specified. Ending here!');
            // TODO: throw proper error
            return;
        }
        // determine which tests to run
        let concerningTests;
        if (this._tapTestsOnly.length > 0) {
            concerningTests = this._tapTestsOnly;
        }
        else {
            concerningTests = this._tapTests;
        }
        // lets run the pretasks
        for (const preTask of this._tapPreTasks) {
            await preTask.run();
        }
        console.log(`1..${concerningTests.length}`);
        for (let testKey = 0; testKey < concerningTests.length; testKey++) {
            const currentTest = concerningTests[testKey];
            const testPromise = currentTest.run(testKey);
            if (currentTest.parallel) {
                promiseArray.push(testPromise);
            }
            else {
                await testPromise;
            }
        }
        await Promise.all(promiseArray);
        // when tests have been run and all promises are fullfilled
        const failReasons = [];
        const executionNotes = [];
        // collect failed tests
        for (const tapTest of concerningTests) {
            if (tapTest.status !== 'success') {
                failReasons.push(`Test ${tapTest.testKey + 1} failed with status ${tapTest.status}:\n` +
                    `|| ${tapTest.description}\n` +
                    `|| for more information please take a look the logs above`);
            }
        }
        // render fail Reasons
        for (const failReason of failReasons) {
            console.log(failReason);
        }
        if (optionsArg && optionsArg.throwOnError && failReasons.length > 0) {
            process.exit(1);
        }
    }
    /**
     * handle errors
     */
    threw(err) {
        console.log(err);
    }
}
exports.Tap = Tap;
exports.tap = new Tap();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwYnVuZGxlLmNsYXNzZXMudGFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvdGFwYnVuZGxlLmNsYXNzZXMudGFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2REFBK0M7QUFFL0MsMkVBQXdFO0FBQ3hFLDJFQUFxRTtBQUNyRSwyRUFBd0U7QUFDeEUsTUFBYSxHQUFHO0lBQWhCO1FBQ0U7OztXQUdHO1FBQ0ksU0FBSSxHQUFHO1lBQ1osSUFBSSxFQUFFLENBQUMsY0FBc0IsRUFBRSxXQUEwQixFQUFFLEVBQUU7Z0JBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLGNBQWMsRUFBRSxDQUFDLENBQUM7WUFDakQsQ0FBQztZQUNELFlBQVksRUFBRSxDQUFDLGNBQXNCLEVBQUUsV0FBMEIsRUFBRSxFQUFFO2dCQUNuRSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixjQUFjLEVBQUUsQ0FBQyxDQUFDO1lBQ2pELENBQUM7U0FDRixDQUFDO1FBRUY7O1dBRUc7UUFDSSxTQUFJLEdBQUc7WUFDWixJQUFJLEVBQUUsQ0FBQyxjQUFzQixFQUFFLGVBQThCLEVBQUUsRUFBRTtnQkFDL0QsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3JELENBQUM7U0FDRixDQUFDO1FBRU0saUJBQVksR0FBYyxFQUFFLENBQUM7UUFDN0IsY0FBUyxHQUFjLEVBQUUsQ0FBQztRQUMxQixrQkFBYSxHQUFjLEVBQUUsQ0FBQztJQTRIeEMsQ0FBQztJQTFIQzs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLElBQUksQ0FDZixlQUF1QixFQUN2QixZQUEyQixFQUMzQixVQUFzQyxRQUFRO1FBRTlDLE1BQU0sU0FBUyxHQUFHLElBQUksbUNBQU8sQ0FBQztZQUM1QixXQUFXLEVBQUUsZUFBZTtZQUM1QixZQUFZO1lBQ1osUUFBUSxFQUFFLEtBQUs7U0FD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