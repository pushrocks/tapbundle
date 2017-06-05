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
            let timeout = new plugins.smartdelay.Timeout(timeMilliArg);
            timeout.makeUnrefed();
            yield timeout.promise;
            if (this._tapTest.status === 'pending') {
                this._tapTest.status = 'timeout';
            }
        });
    }
}
exports.TapTools = TapTools;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwYnVuZGxlLmNsYXNzZXMudGFwdG9vbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90YXBidW5kbGUuY2xhc3Nlcy50YXB0b29scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBRzlDO0lBT0UsWUFBWSxVQUFVO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFBO0lBQzVCLENBQUM7SUFFRDs7T0FFRztJQUNILFlBQVk7UUFDVixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUE7SUFDckMsQ0FBQztJQUVEOztPQUVHO0lBQ0csUUFBUSxDQUFFLFlBQVk7O1lBQzFCLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDakQsQ0FBQztLQUFBO0lBRUssT0FBTyxDQUFFLFlBQW9COztZQUNqQyxJQUFJLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBQzFELE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUNyQixNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUE7WUFDckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFBO1lBQ2xDLENBQUM7UUFDSCxDQUFDO0tBQUE7Q0FFRjtBQWxDRCw0QkFrQ0MifQ==