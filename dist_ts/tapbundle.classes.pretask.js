"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreTask = void 0;
const tapbundle_classes_taptools_1 = require("./tapbundle.classes.taptools");
class PreTask {
    constructor(descriptionArg, preTaskFunctionArg) {
        this.description = descriptionArg;
        this.preTaskFunction = preTaskFunctionArg;
    }
    async run() {
        console.log(`::__PRETASK: ${this.description}`);
        await this.preTaskFunction(new tapbundle_classes_taptools_1.TapTools(null));
    }
}
exports.PreTask = PreTask;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwYnVuZGxlLmNsYXNzZXMucHJldGFzay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3RhcGJ1bmRsZS5jbGFzc2VzLnByZXRhc2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNkVBQXdEO0FBT3hELE1BQWEsT0FBTztJQUlsQixZQUFZLGNBQXNCLEVBQUUsa0JBQW9DO1FBQ3RFLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxlQUFlLEdBQUcsa0JBQWtCLENBQUM7SUFDNUMsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFHO1FBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDaEQsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUkscUNBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Q0FDRjtBQWJELDBCQWFDIn0=