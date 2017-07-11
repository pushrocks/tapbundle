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
const plugins = require("./tapbundle.plugins");
const tapbundle_classes_taptools_1 = require("./tapbundle.classes.taptools");
// imported interfaces
const early_1 = require("early");
class TapTest {
    /**
     * constructor
     */
    constructor(optionsArg) {
        this.testDeferred = plugins.smartq.defer();
        this.testPromise = this.testDeferred.promise;
        this.description = optionsArg.description;
        this.hrtMeasurement = new early_1.HrtMeasurement();
        this.parallel = optionsArg.parallel;
        this.status = 'pending';
        this.tapTools = new tapbundle_classes_taptools_1.TapTools(this);
        this.testFunction = optionsArg.testFunction;
    }
    /**
     * run the test
     */
    run(testKeyArg) {
        return __awaiter(this, void 0, void 0, function* () {
            this.hrtMeasurement.start();
            this.testKey = testKeyArg;
            let testNumber = testKeyArg + 1;
            try {
                yield this.testFunction(this.tapTools);
                if (this.status === 'timeout') {
                    throw new Error('Test succeeded, but timed out...');
                }
                this.hrtMeasurement.stop();
                console.log(`ok ${testNumber} - ${this.description} # time=${this.hrtMeasurement.milliSeconds}ms`);
                this.status = 'success';
                this.testDeferred.resolve(this);
            }
            catch (err) {
                this.hrtMeasurement.stop();
                console.log(`not ok ${testNumber} - ${this.description} # time=${this.hrtMeasurement.milliSeconds}ms`);
                this.testDeferred.resolve(this);
                // if the test has already succeeded before
                if (this.status === 'success') {
                    this.status = 'errorAfterSuccess';
                    console.log('!!! ALERT !!!: weird behaviour, since test has been already successfull');
                }
                else {
                    this.status = 'error';
                }
                // if the test is allowed to fail
                if (this.failureAllowed) {
                    console.log(`please note: failure allowed!`);
                }
                console.log(err);
            }
        });
    }
}
exports.TapTest = TapTest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwYnVuZGxlLmNsYXNzZXMudGFwdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3RhcGJ1bmRsZS5jbGFzc2VzLnRhcHRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtDQUE4QztBQUU5Qyw2RUFBdUQ7QUFFdkQsc0JBQXNCO0FBQ3RCLGlDQUFzQztBQVd0QztJQVdFOztPQUVHO0lBQ0gsWUFBYSxVQUlaO1FBVEQsaUJBQVksR0FBc0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUN4RCxnQkFBVyxHQUFxQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQTtRQVN2RCxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUE7UUFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLHNCQUFjLEVBQUUsQ0FBQTtRQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUE7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUE7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHFDQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFBO0lBQzdDLENBQUM7SUFFRDs7T0FFRztJQUNHLEdBQUcsQ0FBRSxVQUFrQjs7WUFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtZQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQTtZQUN6QixJQUFJLFVBQVUsR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFBO1lBQy9CLElBQUksQ0FBQztnQkFDSCxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUN0QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUUsa0NBQWtDLENBQUMsQ0FBQTtnQkFDdEQsQ0FBQztnQkFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFBO2dCQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sVUFBVSxNQUFNLElBQUksQ0FBQyxXQUFXLFdBQVcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFBO2dCQUNsRyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQTtnQkFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDakMsQ0FBQztZQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtnQkFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLFVBQVUsTUFBTSxJQUFJLENBQUMsV0FBVyxXQUFXLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQTtnQkFDdEcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBRS9CLDJDQUEyQztnQkFDM0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLG1CQUFtQixDQUFBO29CQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLHlFQUF5RSxDQUFDLENBQUE7Z0JBQ3hGLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUE7Z0JBQ3ZCLENBQUM7Z0JBRUQsaUNBQWlDO2dCQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFBO2dCQUM5QyxDQUFDO2dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDbEIsQ0FBQztRQUNILENBQUM7S0FBQTtDQUNGO0FBL0RELDBCQStEQyJ9