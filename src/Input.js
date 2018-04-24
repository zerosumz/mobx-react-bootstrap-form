import React from 'react';
import PropTypes from 'prop-types';
import {FormControl} from 'react-bootstrap';
import {observer} from 'mobx-react';
import Validation from './Validation';

/**
 * 오브젝트에서 지정한 키목록을 제거
 * @param {object} obj 변경하고자 하는 오브젝트
 * @param {...string} keys 지우고자 하는 키 목록
 * @return {object} 복제된 결과 오브젝트
 */
const omit = (obj, ...keys) => {
    let result = Object.assign({}, obj);
    keys.forEach(key => delete result[key]);
    return result;
};

/**
 * mobx 폼 스토어와 동기화 되는 인풋 필드.
 *
 * @reactProps {object} store - mobx 스토어
 * @reactProps {string} name  - 필드 이름
 * @reactProps {*} value  - 필드 값
 * @reactProps {Array<Validation>} validations  - 유효성 체크목록
 */
@observer
class Input extends React.Component {

    componentWillMount() {
        let {store, name, value, validations} = this.props;
        store.validationMap.set(name, validations);
        store.valueMap.set(name, value || '');
    }

    render() {
        let {store, name, validOnBlur, onChange, onBlur} = this.props;
        return (
            <FormControl inputRef={ref => store.refs.set(name, ref)}
                         value={store.valueMap.get(name)}
                         onChange={e => {
                             store.valueMap.set(name, e.target.value || '');
                             onChange && onChange(e);
                         }}
                         onBlur={e => {
                             if(validOnBlur)
                                 store.hasTried.set(name, true);

                             onBlur && onBlur(e);
                         }}
                         {...omit(this.props, 'store', 'value', 'validations', 'validOnBlur', 'onChange', 'onBlur')}
            />
        );
    }
}

Input.propTypes = {
    store: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    validOnBlur: PropTypes.bool,
    value: PropTypes.any,
    validations: PropTypes.arrayOf(PropTypes.instanceOf(Validation))
};

export default Input;