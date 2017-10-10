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
class TapTools {
    constructor(TapTestArg) {
        this._tapTest = TapTestArg;
    }
    /**
     * allow failure
     */
    allowFailure() {
        this._tapTest.failureAllowed = true;
    }
    /**
     * async/await delay method
     */
    delayFor(timeMilliArg) {
        return __awaiter(this, void 0, void 0, function* () {
            yield plugins.smartdelay.delayFor(timeMilliArg);
        });
    }
    delayForRandom(timeMilliMinArg, timeMilliMaxArg) {
        return __awaiter(this, void 0, void 0, function* () {
            yield plugins.smartdelay.delayForRandom(timeMilliMinArg, timeMilliMaxArg);
        });
    }
    timeout(timeMilliArg) {
        return __awaiter(this, void 0, void 0, function* () {
            let timeout = new plugins.smartdelay.Timeout(timeMilliArg);
            timeout.makeUnrefed();
            yield timeout.promise;
            if (this._tapTest.status === 'pending') {
                this._tapTest.status = 'timeout';
            }
        });
    }
    checkIterationLeak(iterationfuncArg) {
        return __awaiter(this, void 0, void 0, function* () {
            yield plugins.leakage.iterate.async(iterationfuncArg);
        });
    }
    returnError(throwingFuncArg) {
        return __awaiter(this, void 0, void 0, function* () {
            let funcErr;
            try {
                yield throwingFuncArg();
            }
            catch (err) {
                funcErr = err;
            }
            return funcErr;
        });
    }
}
exports.TapTools = TapTools;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwYnVuZGxlLmNsYXNzZXMudGFwdG9vbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90YXBidW5kbGUuY2xhc3Nlcy50YXB0b29scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBTzlDO0lBT0UsWUFBYSxVQUFVO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFBO0lBQzVCLENBQUM7SUFFRDs7T0FFRztJQUNILFlBQVk7UUFDVixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUE7SUFDckMsQ0FBQztJQUVEOztPQUVHO0lBQ0csUUFBUSxDQUFFLFlBQVk7O1lBQzFCLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDakQsQ0FBQztLQUFBO0lBRUssY0FBYyxDQUFFLGVBQWUsRUFBRSxlQUFlOztZQUNwRCxNQUFNLE9BQU8sQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUMsQ0FBQTtRQUMzRSxDQUFDO0tBQUE7SUFFSyxPQUFPLENBQUUsWUFBb0I7O1lBQ2pDLElBQUksT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7WUFDMUQsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQ3JCLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQTtZQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUE7WUFDbEMsQ0FBQztRQUNILENBQUM7S0FBQTtJQUVLLGtCQUFrQixDQUFFLGdCQUE4Qjs7WUFDdEQsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUN2RCxDQUFDO0tBQUE7SUFFSyxXQUFXLENBQUUsZUFBNkI7O1lBQzlDLElBQUksT0FBYyxDQUFBO1lBQ2xCLElBQUksQ0FBQztnQkFDSCxNQUFNLGVBQWUsRUFBRSxDQUFBO1lBQ3pCLENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNiLE9BQU8sR0FBRyxHQUFHLENBQUE7WUFDZixDQUFDO1lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQTtRQUNoQixDQUFDO0tBQUE7Q0FDRjtBQW5ERCw0QkFtREMifQ==