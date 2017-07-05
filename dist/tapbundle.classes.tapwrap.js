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
class TapWrap {
    /**
     * the constructor
     */
    constructor(wrapFunctionArg) {
        // nothing here
        this.wrapFunction = wrapFunctionArg;
    }
    /**
     * run the wrapFunction
     */
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.wrapFunction();
        });
    }
}
exports.TapWrap = TapWrap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwYnVuZGxlLmNsYXNzZXMudGFwd3JhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3RhcGJ1bmRsZS5jbGFzc2VzLnRhcHdyYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQU1BO0lBR0U7O09BRUc7SUFDSCxZQUFhLGVBQWlDO1FBQzVDLGVBQWU7UUFDZixJQUFJLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQTtJQUNyQyxDQUFDO0lBRUQ7O09BRUc7SUFDRyxHQUFHOztZQUNQLE1BQU0sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO1FBQzNCLENBQUM7S0FBQTtDQUNGO0FBakJELDBCQWlCQyJ9