/* eslint-disable no-useless-escape */

/**
 * 유효성체크 클래스
 */
class Validation {

    /**
     * 이메일 정규식
     * @type {RegExp}
     */
    static EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    /**
     * 값있음 정규식
     * @type {RegExp}
     */
    static REQUIRED_REGEX = /^.+$/;

    /**
     * 새 유효성체크 클래스를 만든다.
     * @param {RegExp|Function} rule - 테스트용 정규식이나 함수.
     * @param {string} message - 테스트 실패시 메시지
     */
    constructor(rule, message) {

        /**
         * 유효성 체크 룰.
         * @type {RegExp|Function}
         */
        this.rule = rule;

        /**
         * 테스트 실패시 메세지
         * @type {string}
         */
        this.message = message;
    }


    rule = null;
    message = null;

    /**
     * 값이 유효한가?
     * @param {string} value - 테스트할 값
     * @return {boolean}
     */
    isValid(value) {
        return (this.rule instanceof RegExp && !this.rule.test(value)) ||
            (this.rule instanceof Function && !this.rule(value));
    }
}

export default Validation;