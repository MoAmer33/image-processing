"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var Index_1 = __importDefault(require("./Routers/Index"));
var application = (0, express_1.default)();
var port = 3030;
application.use('/API', Index_1.default);
application.get('/', function (req, res) {
    res.status(200).send('the server initilize correct');
});
//Check the folder of resize image is created or not
application.listen(port, function () {
    var CreateFolderOfImageResize = path_1.default.resolve(__dirname, '../Images/Thumbs');
    if (fs_1.default.existsSync(CreateFolderOfImageResize) === true) {
        console.log('Folder Thumbs is exist');
    }
    else {
        fs_1.default.mkdirSync(CreateFolderOfImageResize);
    }
    console.log("server Running on port ".concat(port));
});
exports.default = application;
//# sourceMappingURL=index.js.map