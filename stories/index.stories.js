import React from 'react';
import {storiesOf} from '@storybook/react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {FormStore, Input, Validation} from '../dist';
import {Button, ControlLabel, Modal} from 'react-bootstrap';
import {action} from '@storybook/addon-actions';

const store1 = new FormStore();
const store2 = new FormStore();
const store3 = new FormStore();

let showModal = observable.box(false);

storiesOf('유효성체크', module)
    .addDecorator(story => {
        let Story = observer(story);
        return (
            <div>
                <Story/>
            </div>
        );
    })
    .add('blur 시에 체크', () => {

        return (
            <div>
                <ControlLabel htmlFor="foo">3~6글자 숫자 입력하기</ControlLabel>
                <Input store={store1} name="foo" validations={[
                    new Validation(/^.+$/, '값을 입력해주세요.'),
                    new Validation(/^\d+$/, '숫자만 입력해 주세요'),
                    new Validation(/^\d{3,6}$/, '3에서 6글자로 입력해주세요')
                ]} onChange={action('Foo Input changed!')} onBlur={action('Foo Input blurred')} validOnBlur/>
                {
                    store1.hasTried.has('foo') &&
                    <p>{store1.getErrorMessages('foo')[0]}</p>
                }
                <ControlLabel htmlFor="bar">이메일 형식으로 입력하기</ControlLabel>
                <Input store={store1} name="bar" validations={[
                    new Validation(/^.+$/, '값을 입력해주세요.'),
                    new Validation(Validation.EMAIL_REGEX, '이메일 형식으로 입력해주세요.')
                ]} onChange={action('Bar Input changed!')} onBlur={action('Bar Input blurred')} validOnBlur/>
                {
                    store1.hasTried.has('bar') &&
                    <p>{store1.getErrorMessages('bar')[0]}</p>
                }
                <ControlLabel htmlFor="bar">패스워드</ControlLabel>
                <Input store={store1} name="pass" validations={[
                    new Validation(/^.+$/, '값을 입력해주세요.')
                ]} onChange={action('pass Input changed!')} onBlur={action('pass Input blurred')} validOnBlur/>
                {
                    store1.hasTried.has('pass') &&
                    <p>{store1.getErrorMessages('pass')[0]}</p>
                }
                <ControlLabel htmlFor="bar">패스워드 확인</ControlLabel>
                <Input store={store1} name="pass2" validations={[
                    new Validation(/^.+$/, '값을 입력해주세요.'),
                    new Validation(v => v === store1.valueMap.get('pass'), '패스워드가 일치하지 않습니다')
                ]} onChange={action('pass2 Input changed!')} onBlur={action('pass2 Input blurred')} validOnBlur/>
                {
                    store1.hasTried.has('pass2') &&
                    <p>{store1.getErrorMessages('pass2')[0]}</p>
                }
                <div>
                    store1.valueMap :
                    {JSON.stringify(store1.valueMap)}
                </div>
                <div>
                    store1.valid :
                    {JSON.stringify(store1.valid)}
                </div>
            </div>
        );
    })
    .add('api 호출해서 체크', () => <div>
        <ControlLabel htmlFor="foo">3~6글자 숫자 입력하기</ControlLabel>
        <Input store={store2} name="foo" validations={[
            new Validation(/^.+$/, '값을 입력해주세요.'),
            new Validation(/^\d+$/, '숫자만 입력해 주세요'),
            new Validation(/^\d{3,6}$/, '3에서 6글자로 입력해주세요')
        ]} onChange={action('Foo Input changed!')} onBlur={action('Foo Input blurred')}/>
        {
            store2.hasTried.has('foo') &&
            <p>{store2.getErrorMessages('foo')[0]}</p>
        }
        <ControlLabel htmlFor="bar">이메일 형식으로 입력하기</ControlLabel>
        <Input store={store2} name="bar" validations={[
            new Validation(/^.+$/, '값을 입력해주세요.'),
            new Validation(Validation.EMAIL_REGEX, '이메일 형식으로 입력해주세요.')
        ]} onChange={action('Bar Input changed!')} onBlur={action('Bar Input blurred')}/>
        {
            store2.hasTried.has('bar') &&
            <p>{store2.getErrorMessages('bar')[0]}</p>
        }
        <div>
            store2.valueMap :
            {JSON.stringify(store2.valueMap)}
        </div>
        <div>
            store2.valid :
            {JSON.stringify(store2.valid)}
        </div>
        <div>
            <Button onClick={e => store2.clear()}>리셋</Button>
            <Button onClick={e => store2.doCheckValid()}>확인</Button>
        </div>
    </div>)
    .add('모달루', () => <div>
        <ControlLabel htmlFor="foo">3~6글자 숫자 입력하기</ControlLabel>
        <Input store={store3} name="foo" validations={[
            new Validation(/^.+$/, '값을 입력해주세요.'),
            new Validation(/^\d+$/, '숫자만 입력해 주세요'),
            new Validation(/^\d{3,6}$/, '3에서 6글자로 입력해주세요')
        ]} onChange={action('Foo Input changed!')} onBlur={action('Foo Input blurred')}/>
        <ControlLabel htmlFor="bar">이메일 형식으로 입력하기</ControlLabel>
        <Input store={store3} name="bar" validations={[
            new Validation(/^.+$/, '값을 입력해주세요.'),
            new Validation(Validation.EMAIL_REGEX, '이메일 형식으로 입력해주세요.')
        ]} onChange={action('Bar Input changed!')} onBlur={action('Bar Input blurred')}/>
        <div>
            store3.valueMap :
            {JSON.stringify(store3.valueMap)}
        </div>
        <div>
            store3.valid :
            {JSON.stringify(store3.valid)}
        </div>
        <div>
            <Button onClick={e => store3.clear()}>리셋</Button>
            <Button onClick={e => showModal.set(!store3.doCheckValid())}>확인</Button>
        </div>
        <Modal show={showModal.get()} onHide={() => showModal.set(false)}>
            <Modal.Header closeButton>
                <Modal.Title>오류</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {store3.firstErrorMessage}
            </Modal.Body>
        </Modal>
    </div>);

