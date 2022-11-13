"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var RouterImages_1 = __importDefault(require("./API/RouterImages"));
var Routing = express_1.default.Router();
Routing.use('/ImagesInFolder', RouterImages_1.default);
exports.default = Routing;
