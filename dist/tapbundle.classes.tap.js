"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tapbundle_classes_taptest_1 = require("./tapbundle.classes.taptest");
const tapbundle_classes_tapwrap_1 = require("./tapbundle.classes.tapwrap");
class Tap {
    constructor() {
        /**
         * skip a test
         */
        this.skip = {
            test: (descriptionArg, functionArg) => {
                console.log(`skipped test: ${descriptionArg}`);
            }
        };
        this._tapTests = [];
    }
    /**
     * Normal test function, will run one by one
     * @param testDescription - A description of what the test does
     * @param testFunction - A Function that returns a Promise and resolves or rejects
     */
    test(testDescription, testFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            let localTest = new tapbundle_classes_taptest_1.TapTest({
                description: testDescription,
                testFunction: testFunction,
                parallel: false
            });
            this._tapTests.push(localTest);
            return localTest;
        });
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
            testFunction: testFunction,
            parallel: true
        }));
    }
    /**
     * tests leakage
     * @param testDescription - A description of what the test does
     * @param testFunction - A Function that returns a Promise and resolves or rejects
     */
    testLeakage(testDescription, testFunction) {
    }
    /**
     * starts the test evaluation
     */
    start(optionsArg) {
        return __awaiter(this, void 0, void 0, function* () {
            let promiseArray = [];
            // safeguard against empty test array
            if (this._tapTests.length === 0) {
                console.log('no tests specified. Ending here!');
                return;
            }
            console.log(`1..${this._tapTests.length}`);
            for (let testKey = 0; testKey < this._tapTests.length; testKey++) {
                let currentTest = this._tapTests[testKey];
                let testPromise = currentTest.run(testKey);
                if (currentTest.parallel) {
                    promiseArray.push(testPromise);
                }
                else {
                    yield testPromise;
                }
            }
            yield Promise.all(promiseArray);
            // when tests have been run and all promises are fullfilled
            let failReasons = [];
            let executionNotes = [];
            // collect failed tests
            for (let tapTest of this._tapTests) {
                if (tapTest.status !== 'success') {
                    failReasons.push(`Test ${tapTest.testKey + 1} failed with status ${tapTest.status}:\n`
                        + `|| ${tapTest.description}\n`
                        + `|| for more information please take a look the logs above`);
                }
            }
            // render fail Reasons
            for (let failReason of failReasons) {
                console.log(failReason);
            }
            if (optionsArg && optionsArg.throwOnError && failReasons.length > 0) {
                process.exit(1);
            }
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwYnVuZGxlLmNsYXNzZXMudGFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvdGFwYnVuZGxlLmNsYXNzZXMudGFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSwyRUFBb0U7QUFDcEUsMkVBQXVFO0FBQ3ZFO0lBQUE7UUFFRTs7V0FFRztRQUNILFNBQUksR0FBRztZQUNMLElBQUksRUFBRSxDQUFDLGNBQXNCLEVBQUUsV0FBMEIsRUFBRSxFQUFFO2dCQUMzRCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixjQUFjLEVBQUUsQ0FBQyxDQUFBO1lBQ2hELENBQUM7U0FDRixDQUFBO1FBRU8sY0FBUyxHQUFjLEVBQUUsQ0FBQTtJQXNHbkMsQ0FBQztJQXBHQzs7OztPQUlHO0lBQ0csSUFBSSxDQUFDLGVBQXVCLEVBQUUsWUFBMkI7O1lBQzdELElBQUksU0FBUyxHQUFHLElBQUksbUNBQU8sQ0FBQztnQkFDMUIsV0FBVyxFQUFFLGVBQWU7Z0JBQzVCLFlBQVksRUFBRSxZQUFZO2dCQUMxQixRQUFRLEVBQUUsS0FBSzthQUNoQixDQUFDLENBQUE7WUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUM5QixNQUFNLENBQUMsU0FBUyxDQUFBO1FBQ2xCLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ0gsSUFBSSxDQUFDLFdBQTZCO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLG1DQUFPLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDakMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxZQUFZLENBQUMsZUFBdUIsRUFBRSxZQUEyQjtRQUMvRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLG1DQUFPLENBQUM7WUFDOUIsV0FBVyxFQUFFLGVBQWU7WUFDNUIsWUFBWSxFQUFFLFlBQVk7WUFDMUIsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUMsQ0FBQTtJQUNMLENBQUM7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