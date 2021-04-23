import Constant from "./Constant";

var obj_rep = {
    "Ã€": "À", "Ã": "Á", "Ã‚": "Â", "Ãƒ": "Ã", "Ãˆ": "È", "Ã‰": "É", "ÃŠ": "Ê", "ÃŒ": "Ì", "Ã": "Í", "Ã’": "Ò", "Ã“": "Ó", "Ã”": "Ô", "Ã•": "Õ", "Ã™": "Ù", "Ãš": "Ú", "Ã": "Ý", "Ã ": "à", "Ã¡": "á", "Ã¢": "â", "Ã£": "ã", "Ã¨": "è", "Ã©": "é", "Ãª": "ê", "Ã¬": "ì", "Ã­": "í", "Ã²": "ò", "Ã³": "ó", "Ã´": "ô", "Ãµ": "õ", "Ã¹": "ù", "Ãº": "ú", "Ã½": "ý", "Ä‚": "Ă", "Äƒ": "ă", "Ä": "Đ", "Ä‘": "đ", "Ä¨": "Ĩ", "Ä©": "ĩ", "Å¨": "Ũ", "Å©": "ũ", "Æ ": "Ơ", "Æ¡": "ơ", "Æ¯": "Ư", "Æ°": "ư", "áº ": "Ạ", "áº¡": "ạ", "áº¢": "Ả", "áº£": "ả", "áº¤": "Ấ", "áº¥": "ấ", "áº¦": "Ầ", "áº§": "ầ", "áº¨": "Ẩ", "áº©": "ẩ", "áºª": "Ẫ", "áº«": "ẫ", "áº¬": "Ậ", "áº­": "ậ", "áº®": "Ắ", "áº¯": "ắ", "áº°": "Ằ", "áº±": "ằ", "áº²": "Ẳ", "áº³": "ẳ", "áº´": "Ẵ", "áºµ": "ẵ", "áº¶": "Ặ", "áº·": "ặ", "áº¸": "Ẹ", "áº¹": "ẹ", "áºº": "Ẻ", "áº»": "ẻ", "áº¼": "Ẽ", "áº½": "ẽ", "áº¾": "Ế", "áº¿": "ế", "á»€": "Ề", "á»": "ề", "á»‚": "Ể", "á»ƒ": "ể", "á»„": "Ễ", "á»…": "ễ", "á»†": "Ệ", "á»‡": "ệ", "á»ˆ": "Ỉ", "á»‰": "ỉ", "á»Š": "Ị", "á»‹": "ị", "á»Œ": "Ọ", "á»": "ọ", "á»Ž": "Ỏ", "á»": "ỏ", "á»": "Ố", "á»‘": "ố", "á»’": "Ồ", "á»“": "ồ", "á»”": "Ổ", "á»•": "ổ", "á»–": "Ỗ", "á»—": "ỗ", "á»˜": "Ộ", "á»™": "ộ", "á»š": "Ớ", "á»›": "ớ", "á»œ": "Ờ", "á»": "ờ", "á»ž": "Ở", "á»Ÿ": "ở", "á» ": "Ỡ", "á»¡": "ỡ", "á»¢": "Ợ", "á»£": "ợ", "á»¤": "Ụ", "á»¥": "ụ", "á»¦": "Ủ", "á»§": "ủ", "á»¨": "Ứ", "á»©": "ứ", "á»ª": "Ừ", "á»«": "ừ", "á»¬": "Ử", "á»­": "ử", "á»®": "Ữ", "á»¯": "ữ", "á»°": "Ự", "á»±": "ự", "á»²": "Ỳ", "á»³": "ỳ", "á»´": "Ỵ", "á»µ": "ỵ", "á»¶": "Ỷ", "á»·": "ỷ", "á»¸": "Ỹ", "á»¹": "ỹ"
};

var obj_rep_x = {
    "\u00c3\u20ac": "\u00c0", "\u00c3\u0081": "\u00c1", "\u00c3\u201a": "\u00c2", "\u00c3\u0192": "\u00c3", "\u00c3\u02c6": "\u00c8", "\u00c3\u2030": "\u00c9", "\u00c3\u0160": "\u00ca", "\u00c3\u0152": "\u00cc", "\u00c3\u008d": "\u00cd", "\u00c3\u2019": "\u00d2", "\u00c3\u201c": "\u00d3", "\u00c3\u201d": "\u00d4", "\u00c3\u2022": "\u00d5", "\u00c3\u2122": "\u00d9", "\u00c3\u0161": "\u00da", "\u00c3\u009d": "\u00dd", "\u00c3\u00a0": "\u00e0", "\u00c3\u00a1": "\u00e1", "\u00c3\u00a2": "\u00e2", "\u00c3\u00a3": "\u00e3", "\u00c3\u00a8": "\u00e8", "\u00c3\u00a9": "\u00e9", "\u00c3\u00aa": "\u00ea", "\u00c3\u00ac": "\u00ec", "\u00c3\u00ad": "\u00ed", "\u00c3\u00b2": "\u00f2", "\u00c3\u00b3": "\u00f3", "\u00c3\u00b4": "\u00f4", "\u00c3\u00b5": "\u00f5", "\u00c3\u00b9": "\u00f9", "\u00c3\u00ba": "\u00fa", "\u00c3\u00bd": "\u00fd", "\u00c4\u201a": "\u0102", "\u00c4\u0192": "\u0103", "\u00c4\u0090": "\u0110", "\u00c4\u2018": "\u0111", "\u00c4\u00a8": "\u0128", "\u00c4\u00a9": "\u0129", "\u00c5\u00a8": "\u0168", "\u00c5\u00a9": "\u0169", "\u00c6\u00a0": "\u01a0", "\u00c6\u00a1": "\u01a1", "\u00c6\u00af": "\u01af", "\u00c6\u00b0": "\u01b0", "\u00e1\u00ba\u00a0": "\u1ea0", "\u00e1\u00ba\u00a1": "\u1ea1", "\u00e1\u00ba\u00a2": "\u1ea2", "\u00e1\u00ba\u00a3": "\u1ea3", "\u00e1\u00ba\u00a4": "\u1ea4", "\u00e1\u00ba\u00a5": "\u1ea5", "\u00e1\u00ba\u00a6": "\u1ea6", "\u00e1\u00ba\u00a7": "\u1ea7", "\u00e1\u00ba\u00a8": "\u1ea8", "\u00e1\u00ba\u00a9": "\u1ea9", "\u00e1\u00ba\u00aa": "\u1eaa", "\u00e1\u00ba\u00ab": "\u1eab", "\u00e1\u00ba\u00ac": "\u1eac", "\u00e1\u00ba\u00ad": "\u1ead", "\u00e1\u00ba\u00ae": "\u1eae", "\u00e1\u00ba\u00af": "\u1eaf", "\u00e1\u00ba\u00b0": "\u1eb0", "\u00e1\u00ba\u00b1": "\u1eb1", "\u00e1\u00ba\u00b2": "\u1eb2", "\u00e1\u00ba\u00b3": "\u1eb3", "\u00e1\u00ba\u00b4": "\u1eb4", "\u00e1\u00ba\u00b5": "\u1eb5", "\u00e1\u00ba\u00b6": "\u1eb6", "\u00e1\u00ba\u00b7": "\u1eb7", "\u00e1\u00ba\u00b8": "\u1eb8", "\u00e1\u00ba\u00b9": "\u1eb9", "\u00e1\u00ba\u00ba": "\u1eba", "\u00e1\u00ba\u00bb": "\u1ebb", "\u00e1\u00ba\u00bc": "\u1ebc", "\u00e1\u00ba\u00bd": "\u1ebd", "\u00e1\u00ba\u00be": "\u1ebe", "\u00e1\u00ba\u00bf": "\u1ebf", "\u00e1\u00bb\u20ac": "\u1ec0", "\u00e1\u00bb\u0081": "\u1ec1", "\u00e1\u00bb\u201a": "\u1ec2", "\u00e1\u00bb\u0192": "\u1ec3", "\u00e1\u00bb\u201e": "\u1ec4", "\u00e1\u00bb\u2026": "\u1ec5", "\u00e1\u00bb\u2020": "\u1ec6", "\u00e1\u00bb\u2021": "\u1ec7", "\u00e1\u00bb\u02c6": "\u1ec8", "\u00e1\u00bb\u2030": "\u1ec9", "\u00e1\u00bb\u0160": "\u1eca", "\u00e1\u00bb\u2039": "\u1ecb", "\u00e1\u00bb\u0152": "\u1ecc", "\u00e1\u00bb\u008d": "\u1ecd", "\u00e1\u00bb\u017d": "\u1ece", "\u00e1\u00bb\u008f": "\u1ecf", "\u00e1\u00bb\u0090": "\u1ed0", "\u00e1\u00bb\u2018": "\u1ed1", "\u00e1\u00bb\u2019": "\u1ed2", "\u00e1\u00bb\u201c": "\u1ed3", "\u00e1\u00bb\u201d": "\u1ed4", "\u00e1\u00bb\u2022": "\u1ed5", "\u00e1\u00bb\u2013": "\u1ed6", "\u00e1\u00bb\u2014": "\u1ed7", "\u00e1\u00bb\u02dc": "\u1ed8", "\u00e1\u00bb\u2122": "\u1ed9", "\u00e1\u00bb\u0161": "\u1eda", "\u00e1\u00bb\u203a": "\u1edb", "\u00e1\u00bb\u0153": "\u1edc", "\u00e1\u00bb\u009d": "\u1edd", "\u00e1\u00bb\u017e": "\u1ede", "\u00e1\u00bb\u0178": "\u1edf", "\u00e1\u00bb\u00a0": "\u1ee0", "\u00e1\u00bb\u00a1": "\u1ee1", "\u00e1\u00bb\u00a2": "\u1ee2", "\u00e1\u00bb\u00a3": "\u1ee3", "\u00e1\u00bb\u00a4": "\u1ee4", "\u00e1\u00bb\u00a5": "\u1ee5", "\u00e1\u00bb\u00a6": "\u1ee6", "\u00e1\u00bb\u00a7": "\u1ee7", "\u00e1\u00bb\u00a8": "\u1ee8", "\u00e1\u00bb\u00a9": "\u1ee9", "\u00e1\u00bb\u00aa": "\u1eea", "\u00e1\u00bb\u00ab": "\u1eeb", "\u00e1\u00bb\u00ac": "\u1eec", "\u00e1\u00bb\u00ad": "\u1eed", "\u00e1\u00bb\u00ae": "\u1eee", "\u00e1\u00bb\u00af": "\u1eef", "\u00e1\u00bb\u00b0": "\u1ef0", "\u00e1\u00bb\u00b1": "\u1ef1", "\u00e1\u00bb\u00b2": "\u1ef2", "\u00e1\u00bb\u00b3": "\u1ef3", "\u00e1\u00bb\u00b4": "\u1ef4", "\u00e1\u00bb\u00b5": "\u1ef5", "\u00e1\u00bb\u00b6": "\u1ef6", "\u00e1\u00bb\u00b7": "\u1ef7", "\u00e1\u00bb\u00b8": "\u1ef8", "\u00e1\u00bb\u00b9": "\u1ef9"
};

var Validate = {
    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },

    validateMobile(mobile) {
        if (typeof (mobile) !== 'string') {
            return false;
        }

        if (!mobile) return false;

        var match = mobile.match(/(0)+(9[0-9]|12[0-9]|16[0-9]|18[0-9]|99[0-9]|7[0-9]|8[0-9]|3[0-9]|5[0-9]|19[0-9]|5[0-9])\d{7}$/);
        if (match != null && match.length >= 1 && mobile.substr(0, 1) === '0') {
            return true;
        }

        return false;
    },

    validateFullname(fullname) {
        if (!fullname) return false;
        fullname = fullname.toLowerCase();
        var match = fullname.match(/^[0123456789a-zàáâãèéêìíòóôõùúýỳỹỷỵựửữừứưụủũợởỡờớơộổỗồốọỏịỉĩệểễềếẹẻẽặẳẵằắăậẩẫầấạảđ₫ ]+$/);
        if (match != null && match.length >= 1) {
            return true;
        }

        var special = fullname.match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/);
        if (special != null) {
            return true;
        }
        return false;
    },

    iOSversion() {
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            return [parseInt(v[1], 10)];
        }
    },

    getAndroidVersion(ua) {
        ua = (ua || navigator.userAgent).toLowerCase();
        var match = ua.match(/android\s([0-9.]*)/);
        return match ? match[1] : 0;
    },

    getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/windows phone/i.test(userAgent)) return "Windows Phone";
        if (/android/i.test(userAgent)) return "Android";
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "iOS";
        return null;
    },

    requestPost(url, data, cb, count = 0) {
        try {
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {

                    var datax = JSON.parse(this.responseText);
                    if (datax.continueRequest) {
                        Validate.requestPost(datax.continueRequest, data, cb, count + 1);
                    } else {
                        cb(null, JSON.parse(this.responseText));
                    }
                }
            });

            xhr.open("POST", url);
            xhr.onerror = function (err) {
                cb('Vui lòng kiểm tra lại đường truyền mạng....', null);
            }

            xhr.timeout = 5000;
            xhr.ontimeout = function (e) {
                cb('Vui lòng kiểm tra lại đường truyền mạng....', null);
            };

            if (url !== (Constant.API_BASE_URL + "chooseAccount") && url !== (Constant.API_BASE_URL + "checkLogin")) {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Accept", "application/json");
            }

            xhr.send(data);
        } catch (error) {
            cb('Vui lòng kiểm tra lại đường truyền mạng.....', null);
        }
    },

    sendError(action, acc, from_api, to_api, req, res, ext = "error") {
        try {
            var obj = {
                topic: "userlog",
                type: "error",
                source: "frontend",
                action: action,
                acc: acc,
                from_api: from_api,
                to_api: to_api,
                req: req,
                res: res,
                ext: ext
            };

            var str = "";
            for (var key in obj) {
                if (str !== "") {
                    str += "&";
                }
                str += key + "=" + encodeURIComponent(obj[key]);
            };

            var data = null;
            var xhr = new XMLHttpRequest();

            xhr.open("GET", Constant.API_SEND_LOG + str);
            xhr.timeout = 2000;
            xhr.send(data);
        } catch (err) { }
    },

    sendSuccess(action, acc, from_api, to_api, req, res, ext = "success") {
        try {
            var obj = {
                topic: "userlog",
                type: "success",
                source: "frontend",
                action: action,
                acc: acc,
                from_api: from_api,
                to_api: to_api,
                req: req,
                res: res,
                ext: ext
            };

            var str = "";
            for (var key in obj) {
                if (str !== "") {
                    str += "&";
                }
                str += key + "=" + encodeURIComponent(obj[key]);
            };

            var data = null;
            var xhr = new XMLHttpRequest();

            xhr.open("GET", Constant.API_SEND_LOG + str);
            xhr.timeout = 2000;
            xhr.send(data);
        } catch (err) { }
    },

    allReplace(retStr) {
        for (var x in obj_rep) {
            retStr = retStr.replace(new RegExp(x, 'g'), obj_rep[x]);
        };

        for (var y in obj_rep_x) {
            retStr = retStr.replace(new RegExp(y, 'g'), obj_rep_x[y]);
        };

        return retStr;
    },

    parseURLParams(url) {
        var queryStart = url.indexOf("?") + 1,
            queryEnd = url.indexOf("#") + 1 || url.length + 1,
            query = url.slice(queryStart, queryEnd - 1),
            pairs = query.replace(/\+/g, " ").split("&"),
            parms = {}, i, n, v, nv;

        if (query === url || query === "") return;

        for (i = 0; i < pairs.length; i++) {
            nv = pairs[i].split("=", 2);
            n = decodeURIComponent(nv[0]);
            v = decodeURIComponent(nv[1]);

            if (!parms.hasOwnProperty(n)) parms[n] = [];
            parms[n].push(nv.length === 2 ? v : null);
        }
        return parms;
    }
};

export default Validate;