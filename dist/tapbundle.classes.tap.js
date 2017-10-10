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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwYnVuZGxlLmNsYXNzZXMudGFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvdGFwYnVuZGxlLmNsYXNzZXMudGFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSwyRUFBb0U7QUFDcEUsMkVBQXVFO0FBQ3ZFO0lBQUE7UUFFRTs7V0FFRztRQUNILFNBQUksR0FBRztZQUNMLElBQUksRUFBRSxDQUFDLGNBQXNCLEVBQUUsV0FBMEIsRUFBRSxFQUFFO2dCQUMzRCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixjQUFjLEVBQUUsQ0FBQyxDQUFBO1lBQ2hELENBQUM7U0FDRixDQUFBO1FBRU8sY0FBUyxHQUFjLEVBQUUsQ0FBQTtJQTZGbkMsQ0FBQztJQTNGQzs7OztPQUlHO0lBQ0csSUFBSSxDQUFFLGVBQXVCLEVBQUUsWUFBMkI7O1lBQzlELElBQUksU0FBUyxHQUFHLElBQUksbUNBQU8sQ0FBQztnQkFDMUIsV0FBVyxFQUFFLGVBQWU7Z0JBQzVCLFlBQVksRUFBRSxZQUFZO2dCQUMxQixRQUFRLEVBQUUsS0FBSzthQUNoQixDQUFDLENBQUE7WUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUM5QixNQUFNLENBQUMsU0FBUyxDQUFBO1FBQ2xCLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ0gsSUFBSSxDQUFFLFdBQTZCO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLG1DQUFPLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDakMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxZQUFZLENBQUUsZUFBdUIsRUFBRSxZQUEyQjtRQUNoRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLG1DQUFPLENBQUM7WUFDOUIsV0FBVyxFQUFFLGVBQWU7WUFDNUIsWUFBWSxFQUFFLFlBQVk7WUFDMUIsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUMsQ0FBQTtJQUNMLENBQUM7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