/* eslint-disable no-useless-escape */
import {computed, observable, action} from 'mobx';


const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const REQUIRED_REGEX= /^.+$/;

/**
 * 유효성체크 클래스
 */
class Validation {
    
    /**
     * 새 유효성체크 클래스를 만든다.
     * @param {RegExp|Function} rule - 테스트용 정규식이나 함수.
     * @param {String} message - 테스트 실패시 메시지
     */
    constructor(rule, message) {
        this.rule = rule;
        this.message = message;
    }

    /**
     * 테스트.
     * @member {RegExp|Function}
     */
    rule = null;

    /**
     * 테스트 실패시 메세지
     * @member {String}
     */
    message = null;

    isValid(value) {
        return (this.rule instanceof RegExp && !this.rule.test(value)) ||
            (this.rule instanceof Function && !this.rule(value));
    }
}

class FormStore {

    @observable
    valueMap = new Map();

    @observable
    hasTried = new Map();

    validationMap = new Map();

    @observable
    refs = new Map();

    @action.bound
    clear(){
        this.hasTried.clear();
        this.valueMap.clear();
    }


    @computed
    get invalidationsMap() {
        let m = new Map();
        this.valueMap.forEach((value, name) => {
            let validations = this.validationMap.get(name) || [];
            let invalidations = validations.filter(validation => validation.isValid(value));
            if (invalidations && invalidations.length > 0)
                m.set(name, invalidations);
        });

        return m;
    }

    @computed
    get firstErrorMessage() {
        let firstInput = [...this.invalidationsMap.entries()][0];
        let validation;
        if(firstInput && firstInput.length > 1)
             validation = firstInput[1];

        return firstInput && validation[0] ? validation[0].message : null;
    }

    @computed
    get firstInvalidRef() {
        let firstInput = [...this.invalidationsMap.entries()][0];
        if(firstInput && firstInput.length > 1) {
            let name = firstInput[0];
            return this.refs.get(name);
        }

        return undefined;
    }

    @computed
    get valid() {
        return this.invalidationsMap.size === 0;
    }

    @computed
    get errorMessagesMap() {
        let m = new Map();
        this.invalidationsMap.forEach((validations, name) => {
            m.set(name, validations.map(v => v.message));
        });
        return m;
    }

    getErrorMessages(name) {
        let errorMessages = this.errorMessagesMap.get(name);
        return errorMessages || [];
    }

}

export {Validation, FormStore, EMAIL_REGEX, REQUIRED_REGEX};