mobx react bootstrap form (store) :poop:
========================================


데모 
----

http://mobx-formstore.esc-korea.com/


소개
---

* mobx 와 react-bootstrap 에 기반한 폼 관련 컴포넌트의 유효성 체크.
* 다른 (_**따로 숙지해야하는**_) 룰이 필요없이 정규식과 함수로만 validation 한다.


실행
---

```bash
yarn add zerosumz/mobx-react-bootstrap-form
```


예제
---

```js

        import React, {Component} from 'react';
        import {observer} from 'mobx-react';
        import {FormStore, Validation, Input} from 'mobx-react-bootstrap-form';
        
        const store = new FormStore();
        
        @observer
        class ExampleView extends Component {
            render() {
                return (
                    <div>
                        <ControlLabel>3~6글자 숫자 입력하기</ControlLabel>
                        <Input id="foo" store={store} name="foo" validations={[
                            new Validation(/^.+$/, '값을 입력해주세요.'),
                            new Validation(/^\d+$/, '숫자만 입력해 주세요'),
                            new Validation(/^\d{3,6}$/, '3에서 6글자로 입력해주세요'),
                        ]} validOnBlur/>
                        {
                            store.hasTried.has('foo') &&
                            <p>{store.getErrorMessages('foo')[0]}</p>
                        }
                    </div>
                )
            }
       }

```

# Class

## `FormStore`

폼 내의 각 인풋 필드의 값을 저장할 수 있는 스토어.

### `valueMap: Map<String,*>`

동기화 된 인풋 필드의 값.(observable)

### `hasTried: Map<String,boolean>`

상호작용에 의해 입력이 시도 되었는지의 상태 (observable)

### `validationMap: Map<String,Validation>`

유효성체크 Validation 의 모음

### `refs: Map<String,HtmlElement>`

폼내의 인풋 필드의 모음 (observable) observable

### `clear()`

입력시도 상태 및 값을 초기화한다.

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `tryAll()`

모든 인풋 필드를 시도한 것으로 표시한다.

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `tryFirst()`

모든 인풋 필드를 시도한 것으로 표시한다.

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `doCheckValid(first: *): boolean`

유효성 체크를 실행한다. 유효하지 않은 인풋 요소들의 메시지 상태를 변경하고 포커스한다.

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| first | * |  | 첫번째 유효하지 않은 요소에만 에러메시지 상태를 변경한다. |

### `getErrorMessages(name: string): Array<string>`

인풋필드를 찾아서 유효하지 않을경우 에러 메시지를 얻는다

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| name | string |  | 인풋필드의 이름 |

## `Input`

mobx 폼 스토어와 동기화 되는 인풋 필드.

## `Validation`

유효성체크 클래스

### `constructor(rule: RegExp|Function, message: string)`

새 유효성체크 클래스를 만든다.

### `EMAIL_REGEX: RegExp`

이메일 정규식

### `REQUIRED_REGEX: RegExp`

값있음 정규식

### `rule: RegExp|Function`

유효성 체크 룰.

### `message: string`

테스트 실패시 메세지

### `isValid(value: string): boolean`

값이 유효한가?

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| value | string |  | 테스트할 값 |


 