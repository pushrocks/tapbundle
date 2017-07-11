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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwYnVuZGxlLmNsYXNzZXMudGFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvdGFwYnVuZGxlLmNsYXNzZXMudGFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSwyRUFBb0U7QUFDcEUsMkVBQXVFO0FBQ3ZFO0lBQUE7UUFFRTs7V0FFRztRQUNILFNBQUksR0FBRztZQUNMLElBQUksRUFBRSxDQUFDLGNBQXNCLEVBQUUsV0FBMEI7Z0JBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLGNBQWMsRUFBRSxDQUFDLENBQUE7WUFDaEQsQ0FBQztTQUNGLENBQUE7UUFFTyxjQUFTLEdBQWMsRUFBRSxDQUFBO0lBc0duQyxDQUFDO0lBcEdDOzs7O09BSUc7SUFDRyxJQUFJLENBQUMsZUFBdUIsRUFBRSxZQUEyQjs7WUFDN0QsSUFBSSxTQUFTLEdBQUcsSUFBSSxtQ0FBTyxDQUFDO2dCQUMxQixXQUFXLEVBQUUsZUFBZTtnQkFDNUIsWUFBWSxFQUFFLFlBQVk7Z0JBQzFCLFFBQVEsRUFBRSxLQUFLO2FBQ2hCLENBQUMsQ0FBQTtZQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQzlCLE1BQU0sQ0FBQyxTQUFTLENBQUE7UUFDbEIsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDSCxJQUFJLENBQUMsV0FBNkI7UUFDaEMsTUFBTSxDQUFDLElBQUksbUNBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFlBQVksQ0FBQyxlQUF1QixFQUFFLFlBQTJCO1FBQy9ELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksbUNBQU8sQ0FBQztZQUM5QixXQUFXLEVBQUUsZUFBZTtZQUM1QixZQUFZLEVBQUUsWUFBWTtZQUMxQixRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUVEOzs7O09B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