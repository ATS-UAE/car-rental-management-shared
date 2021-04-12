"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BookingFormValidator_1 = require("./BookingFormValidator");
var errorResult = {};
var createValidatorValidateMockMethod = jest.fn(function () { return errorResult; });
jest.mock("./BookingFormCreateValidator", function () {
    var _a;
    return ({
        BookingFormCreateValidator: (_a = /** @class */ (function () {
                function class_1() {
                }
                return class_1;
            }()),
            _a.validate = function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i] = arguments[_i];
                }
                return createValidatorValidateMockMethod.apply(void 0, params);
            },
            _a)
    });
});
describe("BookingFormValidator", function () {
    it("Calls the create form validator.", function () {
        var formValues = {};
        var bookings = [];
        var errors = BookingFormValidator_1.BookingFormValidator.validateBookingCreate(formValues, bookings);
        expect(createValidatorValidateMockMethod).toBeCalledWith(formValues, bookings);
        expect(errors).toStrictEqual(errorResult);
    });
});
