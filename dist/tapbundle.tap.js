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
class TapTest {
    /**
     * constructor
     */
    constructor(optionsArg) {
        this.description = optionsArg.description;
        this.testFunction = optionsArg.testFunction;
        this.parallel = optionsArg.parallel;
        this.status = 'pending';
    }
    /**
     * run the test
     */
    run(testKeyArg) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.testFunction();
                console.log(`ok ${testKeyArg + 1} - ${this.description} # time=20.040ms`);
                this.status = 'success';
            }
            catch (err) {
                console.log(`not ok ${testKeyArg + 1} - ${this.description} # time=20.040ms`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwYnVuZGxlLnRhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3RhcGJ1bmRsZS50YXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQVlBO0lBT0U7O09BRUc7SUFDSCxZQUFhLFVBSVo7UUFDQyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUE7UUFDekMsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFBO1FBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQTtRQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQTtJQUN6QixDQUFDO0lBRUQ7O09BRUc7SUFDRyxHQUFHLENBQUUsVUFBa0I7O1lBQzNCLElBQUksQ0FBQztnQkFDSCxNQUFNLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtnQkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLFdBQVcsa0JBQWtCLENBQUMsQ0FBQTtnQkFDekUsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUE7WUFDekIsQ0FBQztZQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLFVBQVUsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLFdBQVcsa0JBQWtCLENBQUMsQ0FBQTtnQkFDN0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLG1CQUFtQixDQUFBO29CQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLHlFQUF5RSxDQUFDLENBQUE7Z0JBQ3hGLENBQUM7Z0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNsQixDQUFDO1FBQ0gsQ0FBQztLQUFBO0NBQ0Y7QUF0Q0QsMEJBc0NDO0FBRUQ7SUFBQTtRQUNVLFdBQU0sR0FBYyxFQUFFLENBQUE7SUFvRWhDLENBQUM7SUFsRUM7Ozs7T0FJRztJQUNHLElBQUksQ0FBRSxlQUF1QixFQUFFLFlBQTJCOztZQUM5RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQztnQkFDM0IsV0FBVyxFQUFFLGVBQWU7Z0JBQzVCLFlBQVksRUFBRSxZQUFZO2dCQUMxQixRQUFRLEVBQUUsS0FBSzthQUNoQixDQUFDLENBQUMsQ0FBQTtRQUNMLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDSCxZQUFZLENBQUUsZUFBdUIsRUFBRSxZQUEyQjtRQUNoRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQztZQUMzQixXQUFXLEVBQUUsZUFBZTtZQUM1QixZQUFZLEVBQUUsWUFBWTtZQUMxQixRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxXQUFXLENBQUUsZUFBdUIsRUFBRSxZQUEyQjtJQUVqRSxDQUFDO0lBRUQ7O09BRUc7SUFDRyxLQUFLOztZQUNULElBQUksWUFBWSxHQUFtQixFQUFFLENBQUE7WUFFckMscUNBQXFDO1lBQ3JDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQTtnQkFDL0MsTUFBTSxDQUFBO1lBQ1IsQ0FBQztZQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDdkMsR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDO2dCQUM5RCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUN0QyxJQUFJLFdBQVcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUMxQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDekIsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtnQkFDaEMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixNQUFNLFdBQVcsQ0FBQTtnQkFDbkIsQ0FBQztZQUNILENBQUM7WUFDRCxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDakMsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUUsR0FBRztRQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDbEIsQ0FBQztDQUNGO0FBckVELGtCQXFFQztBQUVVLFFBQUEsR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUEifQ==