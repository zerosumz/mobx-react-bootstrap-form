import {action, computed, observable} from 'mobx';
import Validation from './Validation';

/**
 * 폼 내의 각 인풋 필드의 값을 저장할 수 있는 스토어.
 */
class FormStore {

    /**
     * 동기화 된 인풋 필드의 값.(observable)
     *
     * @type {Map<String,*>}
     */
    @observable
    valueMap = new Map();

    /**
     * 상호작용에 의해 입력이 시도 되었는지의 상태 (observable)
     *
     * @type {Map<String,boolean>}
     */
    @observable
    hasTried = new Map();

    /**
     * 유효성체크 Validation 의 모음
     * @type {Map<String,Validation>}
     */
    validationMap = new Map();

    /**
     * 폼내의 인풋 필드의 모음 (observable)
     * observable
     * @type {Map<String,HtmlElement>}
     */
    @observable
    refs = new Map();

    /**
     * 입력시도 상태 및 값을 초기화한다.
     */
    @action.bound
    clear() {
        this.hasTried.clear();
        this.valueMap.forEach((v,k) => this.valueMap.set(k, ''));
    }

    /**
     * 모든 인풋 필드를 시도한 것으로 표시한다.
     */
    @action.bound
    tryAll(){
        let store = this;
        store.valueMap.forEach((v,k) => store.hasTried.set(k, true));
    }

    /**
     * 모든 인풋 필드를 시도한 것으로 표시한다.
     */
    @action.bound
    tryFirst(){
        let store = this;
        store.hasTried.set(store.firstInvalidInputName, true);
    }

    /**
     * 유효성 체크를 실행한다. 유효하지 않은 인풋 요소들의 메시지 상태를 변경하고 포커스한다.
     * @param first - 첫번째 유효하지 않은 요소에만 에러메시지 상태를 변경한다.
     * @return {boolean} - 유효한지?
     */
    @action.bound
    doCheckValid(first){
        if(first) {
            this.tryFirst()
        } else {
            this.tryAll();
        }
        this.firstInvalidRef.focus();
        return this.valid;
    }


    /**
     * 유효성 체크를 통과하지 못한 이름별 {@link Validation} 목록 (computed)
     * @return {Map<string, Array<Validation>>}
     */
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

    /**
     * 유효성 체크를 통과하지 못한 첫번째 인풋 요소의 이름.
     * @return {*}
     */
    @computed
    get firstInvalidInputName(){
        let firstInput = [...this.invalidationsMap.entries()][0];
        if (firstInput && firstInput.length > 1) {
            return firstInput[0];
        }
        return undefined;
    }

    /**
     * 유효성 체크를 통과하지 못한 첫 번째 {@link Validation}의 에러 메세지 (computed)
     * @return {string|null} message - 에러메세지
     */
    @computed
    get firstErrorMessage() {
        let firstInput = [...this.invalidationsMap.entries()][0];
        let validation;
        if (firstInput && firstInput.length > 1)
            validation = firstInput[1];

        return firstInput && validation[0] ? validation[0].message : null;
    }

    /**
     * 유효성 체크를 통과하지 못한 첫 번째 인풋 필드 (computed)
     * @return {HtmlElement}
     */
    @computed
    get firstInvalidRef() {
        let firstInput = [...this.invalidationsMap.entries()][0];
        if (firstInput && firstInput.length > 1) {
            let name = firstInput[0];
            return this.refs.get(name);
        }

        return undefined;
    }

    /**
     * valueMap 에 동기화된 모든 값이 다 유효한가?
     * @return {boolean}
     */
    @computed
    get valid() {
        return this.invalidationsMap.size === 0;
    }

    /**
     * 유효성 체크를 통과하지 못한 모든 인풋필드의 에러메시지 목록들 (computed)
     * @return {Map<string, Array<string>>}
     */
    @computed
    get errorMessagesMap() {
        let m = new Map();
        this.invalidationsMap.forEach((validations, name) => {
            m.set(name, validations.map(v => v.message));
        });
        return m;
    }

    /**
     * 인풋필드를 찾아서 유효하지 않을경우 에러 메시지를 얻는다
     * @param {string} name - 인풋필드의 이름
     * @return {Array<string>} - 유효하지 않은 경우 각각의 에러메시지 목록
     */
    getErrorMessages(name) {
        let errorMessages = this.errorMessagesMap.get(name);
        return errorMessages || [];
    }

}

export default FormStore;