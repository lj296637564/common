const com = new Object();

/**
 * 转换时间
 * @param {number} format:   要格式化的时间，默认为空
 * @param {string} type:     需要转换的日期格式（如：'yyyy-MM-dd'），默认为'yyyy-MM-dd'
 * @param {string} hyphen:   用于日期的连字符，默认为（'-'）
 * @return {string}          格式化后的时间字符串
 */
com.prototype.formatDate = function(format = '', type = 'yyyy-MM-dd', hyphen = '-') {
        let date = format ? new Date(+format) : new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        let hh = date.getHours();
        let mm = date.getMinutes();
        let ss = date.getSeconds();
        // 判断日期格式
        switch (type) {
            case 'yyyy-MM':
                return h + hyphen + judgeTime(m);
                break;
            case 'yyyy-MM-dd':
                return h + hyphen + judgeTime(m) + hyphen + judgeTime(d);
                break;
            case 'yyyy-MM-dd hh:mm:ss':
                return h + hyphen + judgeTime(m) + hyphen + judgeTime(d) + ' ' + judgeTime(hh) + ':' + judgeTime(mm) + ':' + judgeTime(ss);
                break;
            case 'yyyy-MM-dd hh:mm':
                return h + hyphen + judgeTime(m) + hyphen + judgeTime(d) + ' ' + judgeTime(hh) + ':' + judgeTime(mm);
                break;
            case 'hh:mm:ss':
                return judgeTime(hh) + ':' + judgeTime(mm) + ':' + judgeTime(ss);
                break;
            case 'hh:mm':
                return judgeTime(hh) + ':' + judgeTime(mm);
                break;
            default:
                break;
        }
    }
    /**
     * 获取星期几
     * @param {number} format:   要格式化的时间，默认空
     * @return {string}          返回具体的星期
     */

com.prototype.getWeekDay = function(format = '') {
        let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        let date = format !== '' ? new Date(+format) : new Date();
        return weekday[date.getDay()];
    }
    /**
     * 验证手机号码
     * @param {string} num:   需要验证的手机号码
     * @return {boolean}      true: 表示通过验证
     */
com.prototype.verificationPhone = function(num = '') {
        if (num === '') return false;
        let reg = /^1(3|4|5|7|8|9)\d{9}$/;
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
export default com;