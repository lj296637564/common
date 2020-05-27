/*
 * @Author: lj
 * @Date: 2019-04-19 14:46:39
 * @LastEditTime: 2020-05-27 11:43:58
 * @LastEditors: lj
 * @Description: 
 */
const com = {};

/**
 * 转换时间
 * @param {number} format:   要格式化的时间，默认为空
 * @param {string} type:     需要转换的日期格式（如：'yyyy-MM-dd'），默认为'yyyy-MM-dd'
 * @param {string} hyphen:   用于日期的连字符，默认为（'-'）
 * @return {string}          格式化后的时间字符串，默认返回当前时间
 */
com.prototype.formatDate = function(format = '', type = 'yyyy-MM-dd', hyphen = '-') {
        // 处理日期兼容性，在IE浏览器上只能识别 / 
        let time = format ? format.replace(/-/g, '/') : '';
        let date = time ? new Date(time) : new Date();
        let y = date.getFullYear();
        let m = judgeTime(date.getMonth() + 1);
        let d = judgeTime(date.getDate());
        let hh = judgeTime(date.getHours());
        let mm = judgeTime(date.getMinutes());
        let ss;
        ss = judgeTime(date.getSeconds());
        // 判断日期格式
        switch (type) {
            case 'yyyy-MM':
                return y + hyphen + m;
                break;
            case 'yyyy-MM-dd':
                return y + hyphen + m + hyphen + d;
                break;
            case 'yyyy-MM-dd hh:mm:ss':
                return y + hyphen + m + hyphen + d + ' ' + hh + ':' + mm + ':' + ss;
                break;
            case 'yyyy-MM-dd hh:mm':
                return y + hyphen + m + hyphen + d + ' ' + hh + ':' + mm;
                break;
            case 'hh:mm:ss':
                return hh + ':' + mm + ':' + ss;
                break;
            case 'hh:mm':
                return hh + ':' + mm;
                break;
            default:
                return y + hyphen + m + hyphen + d;
                break;
        }
    }
    /**
     * 获取星期几
     * @param {number} format:   要格式化的时间，默认空
     * @return {string}          返回具体的星期，默认返回当天
     */

com.prototype.getWeekDay = function(format = '') {
        // 处理日期兼容性，在IE浏览器上只能识别 / 
        let time = format ? format.replace(/-/g, '/') : '';
        let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        let date = time ? new Date(time) : new Date();
        return weekday[date.getDay()];
    }
    /**
     * 验证手机号码
     * @param {string} num:   需要验证的手机号码
     * @return {boolean}      true: 表示通过验证
     */
com.prototype.verificationPhone = function(num = '') {
        if (num === '') return false;
        let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        return reg.test(num);
    }
    /**
     * 验证座机
     * @param {string} num:   需要验证的座机号码
     * @return {boolean}      true: 表示通过验证
     */
com.prototype.verificationLandline = function(num = '') {
    if (num === '') return false;
    let reg = /^((0|4)[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/;
    return reg.test(num);
}

/**
 * 判断时间值是否大于9
 * @param {number} n: 需要判断的值
 * @return {string}   返回处理后的值
 */
function judgeTime(n) {
    return n > 9 ? n + '' : '0' + n
}

/* 数字、中文、大小写英文、常规标点符号*/
export const routineRE = /^[\u4e00-\u9fa5\uFF00-\uFFFFa-zA-Z0-9，。？！“”‘’：；（）、,./?:;'"!]+$/;

export function validateRoutine(str) {
    return routineRE.test(str)
}


/* 验证表情 */
export const regEmoji = /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g;

/**
 * 限制输入框输入内容
 * @param {String} 输入框值
 * @param {Object} 搜索值所在对象
 * @param {String} 搜索所在值的 key 值
 * @param {String} 可输入的类型 type
 * 
 */
export function regEmojiFn(val, obj, key, type = 'emoji') {
    switch (type) {
        case 'emoji': // 限制输入表情
            if (regEmoji.test(val)) {
                obj[key] = val.replace(regEmoji, '')
            }
            break;
        case 'number': // 纯数字
            let regNumber = /[^0-9]/ig;
            if (!/^\d{1,}$/.test(val)) {
                obj[key] = val.replace(regNumber, '')
            }
            break;
        case 'name': // 数字、中文、大小写英文、常规标点符号
            let regName = /[^\u4e00-\u9fa5\uFF00-\uFFFFa-zA-Z0-9，。？！“”‘’：；（）、,./?:;'"!]/ig;
            if (!routineRE.test(val)) {
                obj[key] = val.replace(regName, '')
            }
            break;
        case 'price': // 价格
            let regPrice = /[^\d.]/ig;
            if (!/^[\d.]+$/g.test(val)) {
                obj[key] = val.replace(regPrice, '')
            }
            break;
        case 'chinese': // 中文
            let regChinese = /[^\u4e00-\u9fa5]/ig;
            if (!/^[\u4e00-\u9fa5]+$/.test(val)) {
                obj[key] = val.replace(regChinese, '')
            }
            break;
    }

}
export default com;