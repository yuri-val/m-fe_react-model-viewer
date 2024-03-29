import { get } from '@m-fe/utils';
import { enMessages, zhMessages } from './messages';
let locale;
export function getDefaultLocale() {
    let i = window.navigator.language;
    if (i === 'en' || (i.startsWith && i.startsWith('en'))) {
        i = 'en';
    }
    if (i === 'zh' || (i.startsWith && i.startsWith('zh'))) {
        i = 'zh';
    }
    return i;
}
export function setLocale(_i) {
    let i = _i;
    if (!i) {
        i =
            get(null, () => localStorage.getItem('3d_model_viewer_lang')) ||
                getDefaultLocale();
    }
    if (localStorage) {
        localStorage.setItem('3d_model_viewer_lang', i);
    }
    locale = i;
    location.reload();
}
export function getLocale() {
    if (!locale) {
        return (get(null, () => localStorage.getItem('3d_model_viewer_lang')) ||
            getDefaultLocale());
    }
    return locale;
}
// 加载本地的待翻译的本文
const uni18nKeyMap = JSON.parse(localStorage.getItem('meshspace/uni18nKeyMap')) || {};
export function i18nFormat(id) {
    if (getLocale() === 'zh') {
        return zhMessages[id] || id;
    }
    if (!enMessages[id]) {
        uni18nKeyMap[id] = '';
        localStorage.setItem('meshspace/uni18nKeyMap', JSON.stringify(uni18nKeyMap));
    }
    return enMessages[id] || id;
}
//# sourceMappingURL=index.js.map