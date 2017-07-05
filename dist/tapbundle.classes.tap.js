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
        this._tests = [];
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
            this._tests.push(localTest);
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
        this._tests.push(new tapbundle_classes_taptest_1.TapTest({
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
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            let promiseArray = [];
            // safeguard against empty test array
            if (this._tests.length === 0) {
                console.log('no tests specified. Ending here!');
                return;
            }
            console.log(`1..${this._tests.length}`);
            for (let testKey = 0; testKey < this._tests.length; testKey++) {
                let currentTest = this._tests[testKey];
                let testPromise = currentTest.run(testKey);
                if (currentTest.parallel) {
                    promiseArray.push(testPromise);
                }
                else {
                    yield testPromise;
                }
            }
            yield Promise.all(promiseArray);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwYnVuZGxlLmNsYXNzZXMudGFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvdGFwYnVuZGxlLmNsYXNzZXMudGFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSwyRUFBb0U7QUFDcEUsMkVBQXVFO0FBQ3ZFO0lBQUE7UUFFRTs7V0FFRztRQUNILFNBQUksR0FBRztZQUNMLElBQUksRUFBRSxDQUFDLGNBQXNCLEVBQUUsV0FBMEI7Z0JBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLGNBQWMsRUFBRSxDQUFDLENBQUE7WUFDaEQsQ0FBQztTQUNGLENBQUE7UUFFTyxXQUFNLEdBQWMsRUFBRSxDQUFBO0lBNkVoQyxDQUFDO0lBM0VDOzs7O09BSUc7SUFDRyxJQUFJLENBQUUsZUFBdUIsRUFBRSxZQUEyQjs7WUFDOUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxtQ0FBTyxDQUFDO2dCQUMxQixXQUFXLEVBQUUsZUFBZTtnQkFDNUIsWUFBWSxFQUFFLFlBQVk7Z0JBQzFCLFFBQVEsRUFBRSxLQUFLO2FBQ2hCLENBQUMsQ0FBQTtZQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQzNCLE1BQU0sQ0FBQyxTQUFTLENBQUE7UUFDbEIsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDSCxJQUFJLENBQUUsV0FBNkI7UUFDakMsTUFBTSxDQUFDLElBQUksbUNBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFlBQVksQ0FBRSxlQUF1QixFQUFFLFlBQTJCO1FBQ2hFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksbUNBQU8sQ0FBQztZQUMzQixXQUFXLEVBQUUsZUFBZTtZQUM1QixZQUFZLEVBQUUsWUFBWTtZQUMxQixRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxXQUFXLENBQUUsZUFBdUIsRUFBRSxZQUEyQjtJQUVqRSxDQUFDO0lBRUQ7O09BRUc7SUFDRyxLQUFLOztZQUNULElBQUksWUFBWSxHQUFtQixFQUFFLENBQUE7WUFFckMscUNBQXFDO1lBQ3JDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQTtnQkFDL0MsTUFBTSxDQUFBO1lBQ1IsQ0FBQztZQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDdkMsR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDO2dCQUM5RCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFFLE9BQU8sQ0FBRSxDQUFBO2dCQUN4QyxJQUFJLFdBQVcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUMxQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDekIsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtnQkFDaEMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixNQUFNLFdBQVcsQ0FBQTtnQkFDbkIsQ0FBQztZQUNILENBQUM7WUFDRCxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDakMsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUUsR0FBRztRQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDbEIsQ0FBQztDQUNGO0FBeEZELGtCQXdGQztBQUVVLFFBQUEsR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUEifQ==