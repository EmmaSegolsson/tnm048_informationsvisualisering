"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var translate = require("translate");
var readJSON = function () {
    var wines = [];
    var countries = {};
    var types = {};
    var grapes = {};
    return new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
        var winesRaw, mapRaw, featureIdx, WINE_TYPES, NON_DESIRED_COUNTRIES, _i, winesRaw_1, wine, bitter, sweetness, fruitAcid, body, roughness, current_grapes, _a, current_grapes_1, grape;
        return __generator(this, function (_b) {
            winesRaw = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "../systembolaget.json")));
            mapRaw = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "../../public/map_translated.geo.json")));
            for (featureIdx in mapRaw.features) {
                // const country = await translate(
                //   mapRaw.features[featureIdx].properties.name,
                //   {
                //     from: "en",
                //     to: "sv",
                //     key: "AIzaSyBo7bMJ8iie6gAM1bvcryVhXB9z4Ctew3k",
                //   },
                // );
                // mapRaw.features[featureIdx].properties.name_translation = country;
                console.log(mapRaw.features[featureIdx].properties.name_translation);
            }
            WINE_TYPES = ["Rött vin", "Vitt vin", "Mousserande vin", "Rosévin"];
            NON_DESIRED_COUNTRIES = [
                "Internationellt märke",
                "EU",
                "Varierande ursprung",
                "Övriga ursprung",
            ];
            if (false) {
                for (_i = 0, winesRaw_1 = winesRaw; _i < winesRaw_1.length; _i++) {
                    wine = winesRaw_1[_i];
                    if (WINE_TYPES.includes(wine["type"]) &&
                        wine["volume"] === 750 &&
                        !NON_DESIRED_COUNTRIES.includes(wine["country"])) {
                        bitter = Number.parseFloat(wine["tasteBitter"].split("%")[0]) / 100;
                        delete wine["tasteBitter"];
                        sweetness = Number.parseFloat(wine["tasteSweetness"].split("%")[0]) / 100;
                        delete wine["tasteSweetness"];
                        fruitAcid = Number.parseFloat(wine["tasteFruitAcid"].split("%")[0]) / 100;
                        delete wine["tasteFruitAcid"];
                        body = Number.parseFloat(wine["tasteBody"].split("%")[0]) / 100;
                        delete wine["tasteBody"];
                        roughness = Number.parseFloat(wine["tasteRoughness"].split("%")[0]) / 100;
                        delete wine["tasteRoughness"];
                        current_grapes = wine["grapes"].split("---");
                        if (wine["country"]) {
                            if (wine["country"] in countries) {
                                ++countries[wine["country"]];
                            }
                            else {
                                countries[wine["country"]] = 1;
                            }
                        }
                        if (wine["type"]) {
                            if (wine["type"] in types) {
                                ++types[wine["type"]];
                            }
                            else {
                                types[wine["type"]] = 1;
                            }
                        }
                        for (_a = 0, current_grapes_1 = current_grapes; _a < current_grapes_1.length; _a++) {
                            grape = current_grapes_1[_a];
                            if (grape) {
                                if (grape in grapes) {
                                    ++grapes[grape];
                                }
                                else {
                                    grapes[grape] = 1;
                                }
                            }
                        }
                        wines = __spreadArray(__spreadArray([], wines), [
                            __assign(__assign({}, wine), { taste: {
                                    text: wine["taste"],
                                    bitter: bitter,
                                    sweetness: sweetness,
                                    fruitAcid: fruitAcid,
                                    body: body,
                                    roughness: roughness,
                                }, current_grapes: current_grapes }),
                        ]);
                    }
                }
            }
            resolve({ wines: wines, countries: countries, types: types, grapes: grapes });
            return [2 /*return*/];
        });
    }); });
};
exports.default = readJSON;
//# sourceMappingURL=readJSON.js.map