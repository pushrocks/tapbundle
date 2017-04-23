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
// imported interfaces
const early_1 = require("early");
class TapTest {
    /**
     * constructor
     */
    constructor(optionsArg) {
        this.description = optionsArg.description;
        this.testFunction = optionsArg.testFunction;
        this.parallel = optionsArg.parallel;
        this.status = 'pending';
        this.hrtMeasurement = new early_1.HrtMeasurement();
    }
    /**
     * run the test
     */
    run(testKeyArg) {
        return __awaiter(this, void 0, void 0, function* () {
            this.hrtMeasurement.start();
            try {
                yield this.testFunction();
                this.hrtMeasurement.stop();
                console.log(`ok ${testKeyArg + 1} - ${this.description} # time=${this.hrtMeasurement.milliSeconds}ms`);
                this.status = 'success';
            }
            catch (err) {
                this.hrtMeasurement.stop();
                console.log(`not ok ${testKeyArg + 1} - ${this.description} # time=${this.hrtMeasurement.milliSeconds}ms`);
                if (this.status === 'success') {
                    this.status = 'errorAfterSuccess';
                    console.log('!!! ALERT !!!: weird behaviour, since test has been already successfull');
                }
                console.log(err);
            }
        });
    }
}
exports.TapTest = TapTest;
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
            this._tests.push(new TapTest({
                description: testDescription,
                testFunction: testFunction,
                parallel: false
            }));
        });
    }
    /**
     * A parallel test that will not be waited for before the next starts.
     * @param testDescription - A description of what the test does
     * @param testFunction - A Function that returns a Promise and resolves or rejects
     */
    testParallel(testDescription, testFunction) {
        this._tests.push(new TapTest({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwYnVuZGxlLnRhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3RhcGJ1bmRsZS50YXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUlBLHNCQUFzQjtBQUN0QixpQ0FBc0M7QUFVdEM7SUFPRTs7T0FFRztJQUNILFlBQWEsVUFJWjtRQUNDLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQTtRQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUE7UUFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFBO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxzQkFBYyxFQUFFLENBQUE7SUFDNUMsQ0FBQztJQUVEOztPQUVHO0lBQ0csR0FBRyxDQUFFLFVBQWtCOztZQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQzNCLElBQUksQ0FBQztnQkFDSCxNQUFNLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtnQkFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtnQkFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLFdBQVcsV0FBVyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUE7Z0JBQ3RHLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFBO1lBQ3pCLENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUE7Z0JBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxVQUFVLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxXQUFXLFdBQVcsSUFBSSxD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