"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18nFormat = exports.getLocale = exports.setLocale = exports.getDefaultLocale = void 0;
const utils_1 = require("@m-fe/utils");
const messages_1 = require("./messages");
let locale;
function getDefaultLocale() {
    let i = window.navigator.language;
    if (i === 'en' || (i.startsWith && i.startsWith('en'))) {
        i = 'en';
    }
    if (i === 'zh' || (i.startsWith && i.startsWith('zh'))) {
        i = 'zh';
    }
    return i;
}
exports.getDefaultLocale = getDefaultLocale;
function setLocale(_i) {
    let i = _i;
    if (!i) {
        i =
            (0, utils_1.get)(null, () => localStorage.getItem('3d_model_viewer_lang')) ||
                getDefaultLocale();
    }
    if (localStorage) {
        localStorage.setItem('3d_model_viewer_lang', i);
    }
    locale = i;
    location.reload();
}
exports.setLocale = setLocale;
function getLocale() {
    if (!locale) {
        return ((0, utils_1.get)(null, () => localStorage.getItem('3d_model_viewer_lang')) ||
            getDefaultLocale());
    }
    return locale;
}
exports.getLocale = getLocale;
// 加载本地的待翻译的本文
const uni18nKeyMap = JSON.parse(localStorage.getItem('meshspace/uni18nKeyMap')) || {};
function i18nFormat(id) {
    if (getLocale() === 'zh') {
        return messages_1.zhMessages[id] || id;
    }
    if (!messages_1.enMessages[id]) {
        uni18nKeyMap[id] = '';
        localStorage.setItem('meshspace/uni18nKeyMap', JSON.stringify(uni18nKeyMap));
    }
    return messages_1.enMessages[id] || id;
}
exports.i18nFormat = i18nFormat;
//# sourceMappingURL=index.js.map