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
exports.TapTest = void 0;
const plugins = __importStar(require("./tapbundle.plugins"));
const tapbundle_classes_taptools_1 = require("./tapbundle.classes.taptools");
const smarttime_1 = require("@pushrocks/smarttime");
class TapTest {
    /**
     * constructor
     */
    constructor(optionsArg) {
        this.testDeferred = plugins.smartpromise.defer();
        this.testPromise = this.testDeferred.promise;
        this.description = optionsArg.description;
        this.hrtMeasurement = new smarttime_1.HrtMeasurement();
        this.parallel = optionsArg.parallel;
        this.status = 'pending';
        this.tapTools = new tapbundle_classes_taptools_1.TapTools(this);
        this.testFunction = optionsArg.testFunction;
    }
    /**
     * run the test
     */
    async run(testKeyArg) {
        this.hrtMeasurement.start();
        this.testKey = testKeyArg;
        const testNumber = testKeyArg + 1;
        try {
            await this.testFunction(this.tapTools);
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
    }
}
exports.TapTest = TapTest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwYnVuZGxlLmNsYXNzZXMudGFwdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3RhcGJ1bmRsZS5jbGFzc2VzLnRhcHRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZEQUErQztBQUUvQyw2RUFBd0Q7QUFJeEQsb0RBQXNEO0FBT3RELE1BQWEsT0FBTztJQVdsQjs7T0FFRztJQUNILFlBQVksVUFBbUY7UUFMeEYsaUJBQVksR0FBc0IsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMvRCxnQkFBVyxHQUFxQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztRQUsvRCxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUM7UUFDMUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLDBCQUFjLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHFDQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO0lBQzlDLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBa0I7UUFDakMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUMxQixNQUFNLFVBQVUsR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLElBQUk7WUFFRixNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQzthQUNyRDtZQUNELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FDVCxNQUFNLFVBQVUsTUFBTSxJQUFJLENBQUMsV0FBVyxXQUFXLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxJQUFJLENBQ3RGLENBQUM7WUFDRixJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztZQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQztRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzQixPQUFPLENBQUMsR0FBRyxDQUNULFVBQVUsVUFBVSxNQUFNLElBQUksQ0FBQyxXQUFXLFdBQVcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLElBQUksQ0FDMUYsQ0FBQztZQUNGLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRWhDLDJDQUEyQztZQUMzQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO2dCQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLG1CQUFtQixDQUFDO2dCQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLHlFQUF5RSxDQUFDLENBQUM7YUFDeEY7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7YUFDdkI7WUFFRCxpQ0FBaUM7WUFDakMsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7YUFDOUM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztDQUNGO0FBaEVELDBCQWdFQyJ9