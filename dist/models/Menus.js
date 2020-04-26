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
const Restaurants_1 = __importDefault(require("./Restaurants"));
let Menus = class Menus extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Menus.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Restaurants_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Menus.prototype, "restaurantId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Menus.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Menus.prototype, "price", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Menus.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Menus.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Menus.prototype, "question", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Menus.prototype, "imgURL", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Menus.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Menus.prototype, "updatedAt", void 0);
Menus = __decorate([
    sequelize_typescript_1.Table
], Menus);
exports.default = Menus;
