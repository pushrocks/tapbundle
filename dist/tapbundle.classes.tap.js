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
        this.skip = {
            test: (...args) => {
                console.log('skipped');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwYnVuZGxlLmNsYXNzZXMudGFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvdGFwYnVuZGxlLmNsYXNzZXMudGFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSwyRUFBb0U7QUFFcEU7SUFBQTtRQUNFLFNBQUksR0FBRztZQUNMLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSTtnQkFDWixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ3hCLENBQUM7U0FDRixDQUFBO1FBRU8sV0FBTSxHQUFjLEVBQUUsQ0FBQTtJQXNFaEMsQ0FBQztJQXBFQzs7OztPQUlHO0lBQ0csSUFBSSxDQUFDLGVBQXVCLEVBQUUsWUFBMkI7O1lBQzdELElBQUksU0FBUyxHQUFHLElBQUksbUNBQU8sQ0FBQztnQkFDMUIsV0FBVyxFQUFFLGVBQWU7Z0JBQzVCLFlBQVksRUFBRSxZQUFZO2dCQUMxQixRQUFRLEVBQUUsS0FBSzthQUNoQixDQUFDLENBQUE7WUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUMzQixNQUFNLENBQUMsU0FBUyxDQUFBO1FBQ2xCLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDSCxZQUFZLENBQUMsZUFBdUIsRUFBRSxZQUEyQjtRQUMvRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLG1DQUFPLENBQUM7WUFDM0IsV0FBVyxFQUFFLGVBQWU7WUFDNUIsWUFBWSxFQUFFLFlBQVk7WUFDMUIsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsV0FBVyxDQUFDLGVBQXVCLEVBQUUsWUFBMkI7SUFFaEUsQ0FBQztJQUVEOztPQUVHO0lBQ0csS0FBSzs7WUFDVCxJQUFJLFlBQVksR0FBbUIsRUFBRSxDQUFBO1lBRXJDLHFDQUFxQztZQUNyQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUE7Z0JBQy9DLE1BQU0sQ0FBQTtZQUNSLENBQUM7WUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO1lBQ3ZDLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQztnQkFDOUQsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBRSxPQUFPLENBQUUsQ0FBQTtnQkFDeEMsSUFBSSxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQkFDMUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7Z0JBQ2hDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sTUFBTSxXQUFXLENBQUE7Z0JBQ25CLENBQUM7WUFDSCxDQUFDO1lBQ0QsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ2pDLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLEdBQUc7UUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ2xCLENBQUM7Q0FDRjtBQTdFRCxrQkE2RUM7QUFFVSxRQUFBLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBIn0=