"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullDate = (date) => {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
};
exports.getTime = (date) => {
    const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return date.getHours() + '.' + minute;
};
