"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TapWrap = void 0;
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
    async run() {
        // TODO: make sure it makes sense what we do here.
        await this.wrapFunction();
    }
}
exports.TapWrap = TapWrap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwYnVuZGxlLmNsYXNzZXMudGFwd3JhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3RhcGJ1bmRsZS5jbGFzc2VzLnRhcHdyYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBTUEsTUFBYSxPQUFPO0lBR2xCOztPQUVHO0lBQ0gsWUFBWSxlQUFpQztRQUMzQyxlQUFlO1FBQ2YsSUFBSSxDQUFDLFlBQVksR0FBRyxlQUFlLENBQUM7SUFDdEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLEdBQUc7UUFDUCxrREFBa0Q7UUFDbEQsTUFBTSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBbEJELDBCQWtCQyJ9