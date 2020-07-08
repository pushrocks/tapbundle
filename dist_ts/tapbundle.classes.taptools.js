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
exports.TapTools = void 0;
const plugins = __importStar(require("./tapbundle.plugins"));
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
    async delayFor(timeMilliArg) {
        await plugins.smartdelay.delayFor(timeMilliArg);
    }
    async delayForRandom(timeMilliMinArg, timeMilliMaxArg) {
        await plugins.smartdelay.delayForRandom(timeMilliMinArg, timeMilliMaxArg);
    }
    async timeout(timeMilliArg) {
        const timeout = new plugins.smartdelay.Timeout(timeMilliArg);
        timeout.makeUnrefed();
        await timeout.promise;
        if (this._tapTest.status === 'pending') {
            this._tapTest.status = 'timeout';
        }
    }
    async checkIterationLeak(iterationfuncArg) {
        console.log('iteration leakage checks disabled for now due to incompatibilities with node v12');
    }
    async returnError(throwingFuncArg) {
        let funcErr;
        try {
            await throwingFuncArg();
        }
        catch (err) {
            funcErr = err;
        }
        return funcErr;
    }
    defer() {
        return plugins.smartpromise.defer();
    }
}
exports.TapTools = TapTools;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwYnVuZGxlLmNsYXNzZXMudGFwdG9vbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90YXBidW5kbGUuY2xhc3Nlcy50YXB0b29scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkRBQStDO0FBTy9DLE1BQWEsUUFBUTtJQU1uQixZQUFZLFVBQVU7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDN0IsQ0FBQztJQUVEOztPQUVHO0lBQ0ksWUFBWTtRQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7SUFDdEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZO1FBQ2hDLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVNLEtBQUssQ0FBQyxjQUFjLENBQUMsZUFBZSxFQUFFLGVBQWU7UUFDMUQsTUFBTSxPQUFPLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBb0I7UUFDdkMsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3RCxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEIsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ3RCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztTQUNsQztJQUNILENBQUM7SUFFTSxLQUFLLENBQUMsa0JBQWtCLENBQUMsZ0JBQThCO1FBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsa0ZBQWtGLENBQUMsQ0FBQztJQUNsRyxDQUFDO0lBRU0sS0FBSyxDQUFDLFdBQVcsQ0FBQyxlQUE2QjtRQUNwRCxJQUFJLE9BQWMsQ0FBQztRQUNuQixJQUFJO1lBQ0YsTUFBTSxlQUFlLEVBQUUsQ0FBQztTQUN6QjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osT0FBTyxHQUFHLEdBQUcsQ0FBQztTQUNmO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVNLEtBQUs7UUFDVixPQUFPLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdEMsQ0FBQztDQUNGO0FBdERELDRCQXNEQyJ9