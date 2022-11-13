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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ImageHelper_1 = __importDefault(require("../../HelperOfImage/ImageHelper"));
var supertest_1 = __importDefault(require("supertest"));
var promises_1 = __importDefault(require("fs/promises"));
var path_1 = __importDefault(require("path"));
var index_1 = __importDefault(require("../../index"));
//Direction of Images
var TheThumbsPathImage = path_1.default.resolve(__dirname, '../../../Images/Thumbs/encenadaport.jpg');
var TheFullPathImage = path_1.default.resolve(__dirname, '../../../Images/Full/encenadaport.jpg');
//Resizing Image
describe('Resizing Image', function () {
    it('After Images Loaded return buffer', function () { return __awaiter(void 0, void 0, void 0, function () {
        var MyBuffer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ImageHelper_1.default.ResizeTheImage({
                        Heigth: 200,
                        Width: 600,
                        TheFullPathImage: TheFullPathImage,
                        TheThumbsPathImage: TheThumbsPathImage,
                    })];
                case 1:
                    MyBuffer = _a.sent();
                    expect(MyBuffer).toBeInstanceOf(Buffer);
                    return [2 /*return*/];
            }
        });
    }); });
    //Error in Resizing Images
    it('Error In resizing', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expectAsync(ImageHelper_1.default.ResizeTheImage({
                        Heigth: 200,
                        Width: 600,
                        TheFullPathImage: '',
                        TheThumbsPathImage: TheThumbsPathImage,
                    })).toBeRejected()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('GET /API/ImagesInFolder', function () {
    it('responds with 400 if called without parameters', function (done) {
        (0, supertest_1.default)(index_1.default).get('/API/ImagesInFolder').expect(400, done);
    });
    it('responds with 400 if called with a missing parameter', function (done) {
        (0, supertest_1.default)(index_1.default).get('/API/ImagesInFolder?filename=test&height=100').expect(400, done);
    });
    it('responds with 200 if called correctly and image exist', function (done) {
        (0, supertest_1.default)(index_1.default).get('/API/ImagesInFolder?filename=fjord&height=100&width=100').expect(200, done);
    });
    it('created a thumb version of the image', function (done) {
        (0, supertest_1.default)(index_1.default)
            .get('/API/ImagesInFolder?filename=fjord&height=100&width=100')
            .then(function () {
            promises_1.default.stat(path_1.default.resolve(__dirname, '../../../Images/Thumbs/fjord-100x100.jpg')).then(function (fileStat) {
                expect(fileStat).not.toBeNull();
            });
            done();
        });
    });
});
