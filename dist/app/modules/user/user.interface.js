"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isActive = exports.Role = void 0;
var Role;
(function (Role) {
    Role["SUPER_ADMIN"] = "SUPER_ADMIN";
    Role["ADMIN"] = "ADMIN";
    Role["SENDER"] = "SENDER";
    Role["RECEIVER"] = "RECEIVER";
    Role["DELIVERY_BOY"] = "DELIVERY_BOY";
})(Role || (exports.Role = Role = {}));
var isActive;
(function (isActive) {
    isActive["ACTIVE"] = "ACTIVE";
    isActive["INACTIVE"] = "INACTIVE";
    isActive["BLOCKED"] = "BLOCKED";
})(isActive || (exports.isActive = isActive = {}));
