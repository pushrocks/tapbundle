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
    timeout(timeMilliArg) {
        return __awaiter(this, void 0, void 0, function* () {
            yield plugins.smartdelay.delayFor(timeMilliArg);
            if (this._tapTest.status === 'pending') {
                this._tapTest.status = 'timeout';
            }
        });
    }
}
exports.TapTools = TapTools;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwYnVuZGxlLmNsYXNzZXMudGFwdG9vbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90YXBidW5kbGUuY2xhc3Nlcy50YXB0b29scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBRzlDO0lBT0UsWUFBWSxVQUFVO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFBO0lBQzVCLENBQUM7SUFFRDs7T0FFRztJQUNILFlBQVk7UUFDVixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUE7SUFDckMsQ0FBQztJQUVEOztPQUVHO0lBQ0csUUFBUSxDQUFDLFlBQVk7O1lBQ3pCLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDakQsQ0FBQztLQUFBO0lBRUssT0FBTyxDQUFFLFlBQW9COztZQUNqQyxNQUFNLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBQy9DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQTtZQUNsQyxDQUFDO1FBQ0gsQ0FBQztLQUFBO0NBRUY7QUFoQ0QsNEJBZ0NDIn0=