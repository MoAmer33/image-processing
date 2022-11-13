"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var promises_1 = __importDefault(require("fs/promises"));
var path_1 = __importDefault(require("path"));
var index_1 = __importDefault(require("../../index"));
describe('GET /API/ImagesInFolder', function () {
    it('responds with 400 if called without parameters', function (done) {
        (0, supertest_1.default)(index_1.default).get('/API/ImagesInFolder').expect(400, done);
    });
    it('responds with 400 if called with a missing parameter', function (done) {
        (0, supertest_1.default)(index_1.default).get('/API/ImagesInFolder?filename=test&height=100').expect(400, done);
    });
    it('responds with 404 if called correctly but image does not exist', function (done) {
        (0, supertest_1.default)(index_1.default).get('/API/ImagesInFolder?filename=test&height=100&width=100').expect(404, done);
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
