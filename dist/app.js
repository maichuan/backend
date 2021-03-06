"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const restaurant_routes_1 = __importDefault(require("./routes/restaurant.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const me_routes_1 = __importDefault(require("./routes/me.routes"));
const menu_routes_1 = __importDefault(require("./routes/menu.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const search_route_1 = __importDefault(require("./routes/search.route"));
const history_route_1 = __importDefault(require("./routes/history.route"));
const ordered_routes_1 = __importDefault(require("./routes/ordered.routes"));
const rank_route_1 = __importDefault(require("./routes/rank.route"));
const summary_route_1 = __importDefault(require("./routes/summary.route"));
const qrcode_route_1 = __importDefault(require("./routes/qrcode.route"));
const database_1 = require("./database");
class App {
    constructor(port) {
        this.port = port;
        this.app = express_1.default();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }
    middlewares() {
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(index_routes_1.default);
        this.app.use('/restaurants', restaurant_routes_1.default);
        this.app.use('/payment', payment_routes_1.default);
        this.app.use('/me', me_routes_1.default);
        this.app.use('/menu', menu_routes_1.default);
        this.app.use('/user', user_routes_1.default);
        this.app.use('/order', order_routes_1.default);
        this.app.use('/search', search_route_1.default);
        this.app.use('/history', history_route_1.default);
        this.app.use('/ordered', ordered_routes_1.default);
        this.app.use('/rank', rank_route_1.default);
        this.app.use('/summary', summary_route_1.default);
        this.app.use('/qrcode', qrcode_route_1.default);
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.sequelize.sync({ alter: true });
            yield this.app.listen(this.app.get('port'));
            console.log('Server on port', this.app.get('port'));
        });
    }
}
exports.default = App;
