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
class Tap {
    constructor() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwYnVuZGxlLmNsYXNzZXMudGFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvdGFwYnVuZGxlLmNsYXNzZXMudGFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSwyRUFBb0U7QUFFcEU7SUFBQTtRQUNVLFdBQU0sR0FBYyxFQUFFLENBQUE7SUFzRWhDLENBQUM7SUFwRUM7Ozs7T0FJRztJQUNHLElBQUksQ0FBRSxlQUF1QixFQUFFLFlBQTJCOztZQUM5RCxJQUFJLFNBQVMsR0FBRyxJQUFJLG1DQUFPLENBQUM7Z0JBQzFCLFdBQVcsRUFBRSxlQUFlO2dCQUM1QixZQUFZLEVBQUUsWUFBWTtnQkFDMUIsUUFBUSxFQUFFLEtBQUs7YUFDaEIsQ0FBQyxDQUFBO1lBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDM0IsTUFBTSxDQUFDLFNBQVMsQ0FBQTtRQUNsQixDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ0gsWUFBWSxDQUFFLGVBQXVCLEVBQUUsWUFBMkI7UUFDaEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxtQ0FBTyxDQUFDO1lBQzNCLFdBQVcsRUFBRSxlQUFlO1lBQzVCLFlBQVksRUFBRSxZQUFZO1lBQzFCLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDLENBQUE7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFdBQVcsQ0FBRSxlQUF1QixFQUFFLFlBQTJCO0lBRWpFLENBQUM7SUFFRDs7T0FFRztJQUNHLEtBQUs7O1lBQ1QsSUFBSSxZQUFZLEdBQW1CLEVBQUUsQ0FBQTtZQUVyQyxxQ0FBcUM7WUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFBO2dCQUMvQyxNQUFNLENBQUE7WUFDUixDQUFDO1lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtZQUN2QyxHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUM7Z0JBQzlELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQ3RDLElBQUksV0FBVyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQzFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUN6QixZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO2dCQUNoQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE1BQU0sV0FBVyxDQUFBO2dCQUNuQixDQUFDO1lBQ0gsQ0FBQztZQUNELE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUNqQyxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBRSxHQUFHO1FBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNsQixDQUFDO0NBQ0Y7QUF2RUQsa0JBdUVDO0FBRVUsUUFBQSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQSJ9