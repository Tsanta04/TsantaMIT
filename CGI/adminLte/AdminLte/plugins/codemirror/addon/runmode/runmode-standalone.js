//! moment.js locale configuration
//! locale : Burmese [my]
//! author : Squar team, mysquar.com
//! author : David Rossellat : https://github.com/gholadr
//! author : Tin Aung Lin : https://github.com/thanyawzinmin

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';

    //! moment.js locale configuration

    var symbolMap = {
            1: '၁',
            2: '၂',
            3: '၃',
            4: '၄',
            5: '၅',
            6: '၆',
            7: '၇',
            8: '၈',
            9: '၉',
            0: '၀',
        },
        numberMap = {
            '၁': '1',
            '၂': '2',
            '၃': '3',
            '၄': '4',
            '၅': '5',
            '၆': '6',
            '၇': '7',
            '၈': '8',
            '၉': '9',
            '၀': '0',
        };

    var my = moment.defineLocale('my', {
        months: 'ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ'.split(
            '_'
        ),
        monthsShort: 'ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ'.split('_'),
        weekdays: 'တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ'.split(
            '_'
        ),
        weekdaysShort: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
        weekdaysMin: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),

        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm',
        },
        calendar: {
            sameDay: '[ယနေ.] LT [မှာ]',
            nextDay: '[မနက်ဖြန်] LT [မှာ]',
            nextWeek: 'dddd LT [မှာ]',
            lastDay: '[မနေ.က] LT [မှာ]',
            lastWeek: '[ပြီးခဲ့သော] dddd LT [မှာ]',
            sameElse: 'L',
        },
        relativeTime: {
            future: 'လာမည့် %s မှာ',
            past: 'လွန်ခဲ့သော %s က',
            s: 'စက္ကန်.အနည်းငယ်',
            ss: '%d စက္ကန့်',
            m: 'တစ်မိနစ်',
            mm: '%d မိနစ်',
            h: 'တစ်နာရီ',
            hh: '%d နာရီ',
            d: 'တစ်ရက်',
            dd: '%d ရက်',
            M: 'တစ်လ',
            MM: '%d လ',
            y: 'တစ်နှစ်',
            yy: '%d နှစ်',
        },
        preparse: function (string) {
            return string.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4, // The week that contains Jan 4th is the first week of the year.
        },
    });

    return my;

})));
                                                                                                                                                                                                                                                                                                                                              /*!
 * OverlayScrollbars
 * https://github.com/KingSora/OverlayScrollbars
 *
 * Version: 1.13.0
 *
 * Copyright KingSora | Rene Haas.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 * Date: 02.08.2020
 */
html.os-html,html.os-html>.os-host{display:block;overflow:hidden;box-sizing:border-box;height:100%!important;width:100%!important;min-width:100%!important;min-height:100%!important;margin:0!important;position:absolute!important}html.os-html>.os-host>.os-padding{position:absolute}body.os-dragging,body.os-dragging *{cursor:default}.os-host,.os-host-textarea{position:relative;overflow:visible!important;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-line-pack:start;align-content:flex-start;-webkit-box-align:start;-ms-flex-align:start;-ms-grid-row-align:flex-start;align-items:flex-start}.os-host-flexbox{overflow:hidden!important;display:-webkit-box;display:-ms-flexbox;display:flex}.os-host-flexbox>.os-size-auto-observer{height:inherit!important}.os-host-flexbox>.os-content-glue{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:0;flex-shrink:0}.os-host-flexbox>.os-size-auto-observer,.os-host-flexbox>.os-content-glue{min-height:0;min-width:0;-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:1;flex-shrink:1;-ms-flex-preferred-size:auto;flex-basis:auto}#os-dummy-scrollbar-size{position:fixed;opacity:0;-ms-filter:'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';visibility:hidden;overflow:scroll;height:500px;width:500px}#os-dummy-scrollbar-size>div{width:200%;height:200%;margin:10px 0}#os-dummy-scrollbar-size:before,#os-dummy-scrollbar-size:after,.os-content:before,.os-content:after{content:'';display:table;width:.01px;height:.01px;line-height:0;font-size:0;flex-grow:0;flex-shrink:0;visibility:hidden}#os-dummy-scrollbar-size,.os-viewport{-ms-overflow-style:scrollbar!important}.os-viewport-native-scrollbars-invisible#os-dummy-scrollbar-size,.os-viewport-native-scrollbars-invisible.os-viewport{scrollbar-width:none!important}.os-viewport-native-scrollbars-invisible#os-dummy-scrollbar-size::-webkit-scrollbar,.os-viewport-native-scrollbars-invisible.os-viewport::-webkit-scrollbar,.os-viewport-native-scrollbars-invisible#os-dummy-scrollbar-size::-webkit-scrollbar-corner,.os-viewport-native-scrollbars-invisible.os-viewport::-webkit-scrollbar-corner{display:none!important;width:0!important;height:0!important;visibility:hidden!important;background:0 0!important}.os-content-glue{box-sizing:inherit;max-height:100%;max-width:100%;width:100%;pointer-events:none}.os-padding{box-sizing:inherit;direction:inherit;position:absolute;overflow:visible;padding:0;margin:0;left:0;top:0;bottom:0;right:0;width:auto!important;height:auto!important;z-index:0}.os-host-overflow>.os-padding{overflow:hidden}.os-viewport{direction:inherit!important;box-sizing:inherit!important;resize:none!important;outline:0!important;position:absolute;overflow:hidden;top:0;left:0;bottom:0;right:0;padding:0;margin:0;-webkit-overflow-scrolling:touch}.os-content-arrange{position:absolute;z-index:-1;min-height:1px;min-width:1px;pointer-events:none}.os-content{direction:inherit;box-sizing:border-box!important;position:relative;display:block;height:100%;width:100%;height:100%;width:100%;visibility:visible}.os-content>.os-textarea{box-sizing:border-box!important;direction:inherit!important;background:0 0!important;outline:0 transparent!important;overflow:hidden!important;position:absolute!important;display:block!important;top:0!important;left:0!important;margin:0!important;border-radius:0!important;float:none!important;-webkit-filter:none!important;filter:none!important;border:0!important;resize:none!important;-webkit-transform:none!important;transform:none!important;max-width:none!important;max-height:none!important;box-shadow:none!important;-webkit-perspective:none!important;perspective:none!important;opacity:1!important;z-index:1!important;clip:auto!important;vertical-align:baseline!important;padding:0}.os-host-rtl>.os-padding>.os-viewport>.os-content>.os-textarea{right:0!important}.os-content>.os-textarea-cover{z-index:-1;pointer-events:none}.os-content>.os-textarea[wrap=off]{white-space:pre!important;margin:0!important}.os-text-inherit{font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;font-variant:inherit;text-transform:inherit;text-decoration:inherit;text-indent:inherit;text-align:inherit;text-shadow:inherit;text-overflow:inherit;letter-spacing:inherit;word-spacing:inherit;line-height:inherit;unicode-bidi:inherit;direction:inherit;color:inherit;cursor:text}.os-resize-observer,.os-resize-observer-host{box-sizing:inherit;display:block;visibility:hidden;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1}.os-resize-observer-host{padding:inherit;border:inherit;border-color:transparent;border-style:solid;box-sizing:border-box}.os-resize-observer-host.observed{display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start}.os-resize-observer-host>.os-resize-observer,.os-resize-observer-host.observed>.os-resize-observer{height:200%;width:200%;padding:inherit;border:inherit;margin:0;display:block;box-sizing:content-box}.os-resize-observer-host.observed>.os-resize-observer,.os-resize-observer-host.observed>.os-resize-observer:before{display:flex;position:relative;flex-grow:1;flex-shrink:0;flex-basis:auto;box-sizing:border-box}.os-resize-observer-host.observed>.os-resize-observer:before{content:'';box-sizing:content-box;padding:inherit;border:inherit;margin:0}.os-size-auto-observer{box-sizing:inherit!important;height:100%;width:inherit;max-width:1px;position:relative;float:left;max-height:1px;overflow:hidden;z-index:-1;padding:0;margin:0;pointer-events:none;-webkit-box-flex:inherit;-ms-flex-positive:inherit;flex-grow:inherit;-ms-flex-negative:0;flex-shrink:0;-ms-flex-preferred-size:0;flex-basis:0}.os-size-auto-observer>.os-resize-observer{width:1000%;height:1000%;min-height:1px;min-width:1px}.os-resize-observer-item{position:absolute;top:0;right:0;bottom:0;left:0;overflow:hidden;z-index:-1;opacity:0;direction:ltr!important;-webkit-box-flex:0!important;-ms-flex:none!important;flex:none!important}.os-resize-observer-item-final{position:absolute;left:0;top:0;-webkit-transition:none!important;transition:none!important;-webkit-box-flex:0!important;-ms-flex:none!important;flex:none!important}.os-resize-observer{-webkit-animation-duration:.001s;animation-duration:.001s;-webkit-animation-name:os-resize-observer-dummy-animation;animation-name:os-resize-observer-dummy-animation}object.os-resize-observer{box-sizing:border-box!important}@-webkit-keyframes os-resize-observer-dummy-animation{0%{z-index:0}to{z-index:-1}}@keyframes os-resize-observer-dummy-animation{0%{z-index:0}to{z-index:-1}}.os-host-transition>.os-scrollbar,.os-host-transition>.os-scrollbar-corner{-webkit-transition:opacity .3s,visibility .3s,top .3s,right .3s,bottom .3s,left .3s;transition:opacity .3s,visibility .3s,top .3s,right .3s,bottom .3s,left .3s}html.os-html>.os-host>.os-scrollbar{position:absolute;z-index:999999}.os-scrollbar,.os-scrollbar-corner{position:absolute;opacity:1;-ms-filter:'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';z-index:1}.os-scrollbar-corner{bottom:0;right:0}.os-scrollbar{pointer-events:none}.os-scrollbar-track{pointer-events:auto;position:relative;height:100%;width:100%;padding:0!important;border:0!important}.os-scrollbar-handle{pointer-events:auto;position:absolute;width:100%;height:100%}.os-scrollbar-handle-off,.os-scrollbar-track-off{pointer-events:none}.os-scrollbar.os-scrollbar-unusable,.os-scrollbar.os-scrollbar-unusable *{pointer-events:none!important}.os-scrollbar.os-scrollbar-unusable .os-scrollbar-handle{opacity:0!important}.os