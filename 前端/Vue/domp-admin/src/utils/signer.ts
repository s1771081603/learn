// import globalconfig from "@/assets/js/config";
import CryptoJS from "crypto-js";

const hexTable = new Array(256);
for (let item = 0; item < 256; ++item)
    hexTable[item] = '%' + ((item < 16 ? '0' : '') + item.toString(16)).toUpperCase();


export default {
    Key: window.SITE_CONFIG['mseKey'],
    Secret: window.SITE_CONFIG['mseSecret'],
    Algorithm: "SDK-HMAC-SHA256",
    HeaderXDate: "X-Sdk-Date",
    HeaderAuthorization: "v587sign",
    HeaderContentSha256: "x-sdk-content-sha256",
    crypto_wrapper: {
        hmacsha256: function (keyByte, message) {
            return CryptoJS.HmacSHA256(message, keyByte).toString(CryptoJS.enc.Hex)
        },
        HexEncodeSHA256Hash: function (body) {
            return CryptoJS.SHA256(body)
        }
    },
    urlEncode: (str) => {
        if (typeof str !== 'string') {
            if (typeof str === 'object')
                str = String(str);
            else
                str += '';
        }
        var out = '';
        var lastPos = 0;
        var noEscape = [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0 - 15
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, // 32 - 47
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, // 48 - 63
                0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, // 80 - 95
                0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0  // 112 - 127
            ];
        for (let item = 0; item < str.length; ++item) {
            let c = str.charCodeAt(item);

            // ASCII
            if (c < 0x80) {
                if (noEscape[c] === 1)
                    continue;
                if (lastPos < item)
                    out += str.slice(lastPos, item);
                lastPos = item + 1;
                out += hexTable[c];
                continue;
            }

            if (lastPos < item)
                out += str.slice(lastPos, item);

            // Multi-byte characters ...
            if (c < 0x800) {
                lastPos = item + 1;
                out += hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)];
                continue;
            }
            if (c < 0xD800 || c >= 0xE000) {
                lastPos = item + 1;
                out += hexTable[0xE0 | (c >> 12)] +
                    hexTable[0x80 | ((c >> 6) & 0x3F)] +
                    hexTable[0x80 | (c & 0x3F)];
                continue;
            }
            // Surrogate pair
            ++item;

            if (item >= str.length)
                throw new errors.URIError('ERR_INVALID_URI');

            let c2 = str.charCodeAt(item) & 0x3FF;

            lastPos = item + 1;
            c = 0x10000 + (((c & 0x3FF) << 10) | c2);
            out += hexTable[0xF0 | (c >> 18)] +
                hexTable[0x80 | ((c >> 12) & 0x3F)] +
                hexTable[0x80 | ((c >> 6) & 0x3F)] +
                hexTable[0x80 | (c & 0x3F)];
        }
        if (lastPos === 0)
            return str;
        if (lastPos < str.length)
            return out + str.slice(lastPos);
        return out;
    },
    HttpRequest: (method, url, headers, body) => {
        const req = {}
        if (method === undefined) {
            req.method = "";
        } else {
            req.method = method;
        }
        if (url === undefined) {
            req.host = "";
            req.uri = "";
            req.query = {};
        } else {
            req.query = {};
            let host, path;
            let item1 = url.indexOf("://");
            if (item1 !== -1) {
                url = url.substr(item1 + 3)
            }
            let item2 = url.indexOf("?");
            if (item2 !== -1) {
                let query_str = url.substr(item2 + 1);
                url = url.substr(0, item2);
                let spl = query_str.split("&");
                for (let sp in spl) {
                    let kv = spl[sp];
                    let index = kv.indexOf('=');
                    let key, value;
                    if (index >= 0) {
                        key = kv.substr(0, index);
                        value = kv.substr(index + 1);
                    } else {
                        key = kv;
                        value = "";
                    }
                    if (key !== "") {
                        key = decodeURI(key);
                        value = decodeURI(value);
                        if (req.query[key] === undefined) {
                            req.query[key] = [value]
                        } else {
                            req.query[key].push(value)
                        }
                    }
                }
            }
            let item3 = url.indexOf("/");
            if (item3 === -1) {
                host = url;
                path = "/";
            } else {
                host = url.substr(0, item3);
                path = url.substr(item3);
            }
            req.host = host;
            req.uri = decodeURI(path);
        }
        if (headers === undefined) {
            req.headers = {};
        } else {
            req.headers = headers;
        }
        if (body === undefined) {
            req.body = "";
        } else {
            req.body = body;
        }
        return req
    },
    findHeader(r, header) {
        for (let k in r.headers) {
            if (k.toLowerCase() === header.toLowerCase()) {
                return r.headers[k]
            }
        }
        return null;
    },
    CanonicalRequest(r, signedHeaders) {
        // 获取header的某个key对应的值
        var hexencode = this.findHeader(r, this.HeaderContentSha256);
        if (hexencode === null) {
            var data = this.RequestPayload(r); //获取body
            // body编码
            hexencode = this.crypto_wrapper.HexEncodeSHA256Hash(data);
        }
        return r.method + "\n" + this.CanonicalURI(r) + "\n" + this.CanonicalQueryString(r) + "\n" + this.CanonicalHeaders(r, signedHeaders) + "\n" + signedHeaders.join(';') + "\n" + hexencode
    },
    CanonicalURI(r) {
        var pattens = r.uri.split('/');
        var uri = [];
        for (var k in pattens) {
            var v = pattens[k];
            uri.push(this.urlEncode(v))
        }
        var urlpath = uri.join('/');
        if (urlpath[urlpath.length - 1] !== '/') {
            urlpath = urlpath + '/'
        }
        //r.uri = urlpath
        return urlpath;
    },
    CanonicalQueryString(r) {
        let keys = [];
        for (let key in r.query) {
            keys.push(key)
        }
        keys.sort();
        let a = [];
        for (let ke in keys) {
            let key1 = this.urlEncode(keys[ke]);
            let value = r.query[keys[ke]];
            if (Array.isArray(value)) {
                value.sort();
                for (let iv in value) {
                    a.push(key1 + '=' + this.urlEncode(value[iv]))
                }
            } else {
                a.push(key1 + '=' + this.urlEncode(value))
            }
        }
        return a.join('&');
    },
    CanonicalHeaders(r, signedHeaders) {
        let headers = {};
        for (let key in r.headers) {
            headers[key.toLowerCase()] = r.headers[key];
        }
        let a = [];
        for (let sign in signedHeaders) {
            let value = headers[signedHeaders[sign]];
            a.push(signedHeaders[sign] + ':' + value)
        }
        return a.join('\n') + "\n"
    },
    SignedHeaders(r) {
        let a = [];
        for (let key in r.headers) {
            a.push(key.toLowerCase())
        }
        a.sort();
        return a
    },
    RequestPayload(r) {
        return r.body
    },
    StringToSign(canonicalRequest, t) {
        let bytes = this.crypto_wrapper.HexEncodeSHA256Hash(canonicalRequest);
        return this.Algorithm + "\n" + t + "\n" + bytes
    },
    SignStringToSign(stringToSign, signingKey) {
        return this.crypto_wrapper.hmacsha256(signingKey, stringToSign)
    },
    AuthHeaderValue(signature, Key, signedHeaders) {
        return this.Algorithm + " Access=" + Key + ", SignedHeaders=" + signedHeaders.join(';') + ", Signature=" + signature
    },
    twoChar(s) {
        if (s >= 10) {
            return "" + s
        } else {
            return "0" + s
        }
    },
    getTime() {
        let date = new Date();
        return "" + date.getUTCFullYear() + this.twoChar(date.getUTCMonth() + 1) + this.twoChar(date.getUTCDate()) + "T" +
            this.twoChar(date.getUTCHours()) + this.twoChar(date.getUTCMinutes()) + this.twoChar(date.getUTCSeconds()) + "Z"
    },
    Sign(r) {
        let headerTime = this.findHeader(r, this.HeaderXDate);
        if (headerTime === null) {
            headerTime = this.getTime();
            r.headers[this.HeaderXDate] = headerTime
        }
        if (r.method !== "PUT" && r.method !== "PATCH" && r.method !== "POST") {
            r.body = ""
        }
        let queryString = this.CanonicalQueryString(r);
        if (queryString !== "") {
            queryString = "?" + queryString
        }
        let options = {
            hostname: r.host,
            path: encodeURI(r.uri) + queryString,
            method: r.method,
            headers: r.headers
        };
        if (this.findHeader(r, 'host') === null) {
            r.headers.host = r.host;
        }
        // 给header的keys排序
        let signedHeaders = this.SignedHeaders(r);
        let canonicalRequest = this.CanonicalRequest(r, signedHeaders);
        // console.log(canonicalRequest, 'canonicalRequest')
        let stringToSign = this.StringToSign(canonicalRequest, headerTime);
        // console.log(stringToSign, 'stringToSign')
        let signature = this.SignStringToSign(stringToSign, this.Secret);
        // console.log(signature, 'signature')
        options.headers[this.HeaderAuthorization] = this.AuthHeaderValue(signature, this.Key, signedHeaders);
        return options
    }
};
