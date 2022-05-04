"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringSlugify = exports.convertToSlug = exports.truncate = exports.isValidAddress = exports.rand = exports.orderAndRemoveEmpty = exports.removeEmpty = exports.orderObjectProps = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const slugify_1 = __importDefault(require("slugify"));
function orderObjectProps(obj) {
    return Object.entries(obj)
        .sort()
        .reduce((o, [k, v]) => ((o[k] = v), o), {});
}
exports.orderObjectProps = orderObjectProps;
function removeEmpty(obj) {
    Object.keys(obj).forEach((k) => {
        if (obj[k] === undefined || obj[k] === '' || obj[k] === null) {
            delete obj[k];
        }
    });
    return obj;
}
exports.removeEmpty = removeEmpty;
function orderAndRemoveEmpty(obj) {
    return orderObjectProps(removeEmpty(obj));
}
exports.orderAndRemoveEmpty = orderAndRemoveEmpty;
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
exports.rand = rand;
function isValidAddress(address) {
    return /^(0x){1}[0-9a-fA-F]{40}$/i.test(address);
}
exports.isValidAddress = isValidAddress;
const truncate = (str, max) => {
    if (!str) {
        return '';
    }
    return str.length > max ? `${str.substr(0, max - 1)}...` : str;
};
exports.truncate = truncate;
const convertToSlug = (text) => text
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '_')
    .replace('__', '_');
exports.convertToSlug = convertToSlug;
const stringSlugify = (text) => `${slugify_1.default(text)}-${dayjs_1.default().unix()}`;
exports.stringSlugify = stringSlugify;
//# sourceMappingURL=Utils.js.map