"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Users_1 = __importDefault(require("./Users"));
let Restaurants = class Restaurants extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Restaurants.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Restaurants.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Restaurants.prototype, "address", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Restaurants.prototype, "phoneno", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Restaurants.prototype, "vat", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Restaurants.prototype, "serviceCharge", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Restaurants.prototype, "numberOfTable", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Users_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Restaurants.prototype, "ownerId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Restaurants.prototype, "imgURL", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.DECIMAL(9, 6)),
    __metadata("design:type", Number)
], Restaurants.prototype, "lat", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.DECIMAL(9, 6)),
    __metadata("design:type", Number)
], Restaurants.prototype, "long", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Restaurants.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Restaurants.prototype, "updatedAt", void 0);
Restaurants = __decorate([
    sequelize_typescript_1.Table
], Restaurants);
exports.default = Restaurants;
