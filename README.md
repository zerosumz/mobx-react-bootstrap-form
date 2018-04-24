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




 