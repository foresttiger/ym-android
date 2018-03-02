'use strict';

import { Dimensions } from 'react-native'

export default function DataEncrypt(string) {

    var myDecrypt = (function() {
        /*! https://mths.be/fromcodepoint v0.2.1 by @mathias */
        if (!String.fromCodePoint) {
            (function() {
                var defineProperty = (function() {
                    // IE 8 only supports `Object.defineProperty` on DOM elements
                    try {
                        var object = {};
                        var $defineProperty = Object.defineProperty;
                        var result = $defineProperty(object, object, object) && $defineProperty;
                    } catch (error) {}
                    return result;
                }());
                var stringFromCharCode = String.fromCharCode;
                var floor = Math.floor;
                var fromCodePoint = function(_) {
                    var MAX_SIZE = 0x4000;
                    var codeUnits = [];
                    var highSurrogate;
                    var lowSurrogate;
                    var index = -1;
                    var length = arguments.length;
                    if (!length) {
                        return '';
                    }
                    var result = '';
                    while (++index < length) {
                        var codePoint = Number(arguments[index]);
                        if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
                            codePoint < 0 || // not a valid Unicode code point
                            codePoint > 0x10FFFF || // not a valid Unicode code point
                            floor(codePoint) != codePoint // not an integer
                        ) {
                            throw RangeError('Invalid code point: ' + codePoint);
                        }
                        if (codePoint <= 0xFFFF) { // BMP code point
                            codeUnits.push(codePoint);
                        } else { // Astral code point; split in surrogate halves
                            // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                            codePoint -= 0x10000;
                            highSurrogate = (codePoint >> 10) + 0xD800;
                            lowSurrogate = (codePoint % 0x400) + 0xDC00;
                            codeUnits.push(highSurrogate, lowSurrogate);
                        }
                        if (index + 1 == length || codeUnits.length > MAX_SIZE) {
                            result += stringFromCharCode.apply(null, codeUnits);
                            codeUnits.length = 0;
                        }
                    }
                    return result;
                };
                if (defineProperty) {
                    defineProperty(String, 'fromCodePoint', {
                        'value': fromCodePoint,
                        'configurable': true,
                        'writable': true
                    });
                } else {
                    String.fromCodePoint = fromCodePoint;
                }
            }());
        }

        /*! http://mths.be/codepointat v0.1.0 by @mathias */
        if (!String.prototype.codePointAt) {
            (function() {
                'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
                var codePointAt = function(position) {
                    if (this == null) {
                        throw TypeError();
                    }
                    var string = String(this);
                    var size = string.length;
                    // `ToInteger`
                    var index = position ? Number(position) : 0;
                    if (index != index) { // better `isNaN`
                        index = 0;
                    }
                    // Account for out-of-bounds indices:
                    if (index < 0 || index >= size) {
                        return undefined;
                    }
                    // Get the first code unit
                    var first = string.charCodeAt(index);
                    var second;
                    if ( // check if it’s the start of a surrogate pair
                        first >= 0xD800 && first <= 0xDBFF && // high surrogate
                        size > index + 1 // there is a next code unit
                    ) {
                        second = string.charCodeAt(index + 1);
                        if (second >= 0xDC00 && second <= 0xDFFF) { // low surrogate
                            // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                            return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
                        }
                    }
                    return first;
                };
                if (Object.defineProperty) {
                    Object.defineProperty(String.prototype, 'codePointAt', {
                        'value': codePointAt,
                        'configurable': true,
                        'writable': true
                    });
                } else {
                    String.prototype.codePointAt = codePointAt;
                }
            }());
        }

        var String_fromCharCode = String.fromCharCode;
        var String_fromCodePoint = String.fromCodePoint;

        // public method for decoding
        function decode(input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4, enc0;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\-\_\.]/g, "");

            while (i < input.length) {

                enc4 = _K.indexOf(input.charAt(i++));
                enc2 = _K.indexOf(input.charAt(i++));
                enc3 = _K.indexOf(input.charAt(i++));
                enc1 = _K.indexOf(input.charAt(i++));
                //enc0 = Base64._K.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String_fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String_fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String_fromCharCode(chr3);
                }

            }

            output = _ud(output);

            return output;

        }

        // private method for UTF-8 decoding
        var _ud = function(utftext) {
            var string = "";
            var c2 = 0;
            var c1 = 0;
            var c3 = 0;
            var i = 0;
            var c = c1 = c2;

            while (i < utftext.length) {

                c = utftext.charCodeAt(i);

                if (c < 128) {
                    string += String_fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String_fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String_fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            }
            return string;
        }

        var _K = (function() {
            var A = ("A").codePointAt(0),
                Z = ("Z").codePointAt(0);
            var a = ("a").codePointAt(0),
                z = ("z").codePointAt(0);
            var _0 = ("0").codePointAt(0),
                _9 = ("9").codePointAt(0);
            var len = Z - A + 1;
            var AZ = [],
                az = [],
                _09 = [],
                rv = [];
            for (var i = 0; i < len; ++i) {
                AZ.push(String_fromCodePoint(A + i));
                az.push(String_fromCodePoint(a + i));
            }
            for (var i = 0; i < _9 - _0 + 1; ++i) _09.push(String_fromCodePoint(_0 + i));
            _09.push("-", "_", ".");
            for (var i = 0; i < len; ++i) {
                rv.push(_09[i] || "", az[i], AZ[i]);
            }
            return rv.join("");
        })();
        return decode;
    })();
    return JSON.parse(myDecrypt(string))
}