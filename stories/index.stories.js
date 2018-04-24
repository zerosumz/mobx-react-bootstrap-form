import React from 'react';
import {storiesOf} from '@storybook/react';
import {withStorySource} from '@storybook/addon-storysource';
import {observer} from 'mobx-react';
import Input from '../src/Input';
import FormStore from '../src/FormStore';
import Validation from '../src/Validation';
import {ControlLabel} from 'react-bootstrap';
import {action} from '@storybook/addon-actions';

const store = new FormStore();

storiesOf('유효성체크', module)
    .addDecorator(story => {
        let Story = observer(story);
        return (
            <div>
                <Story/>
            </div>
        )
    })
    .addDecorator(withStorySource(`
        import React, {Component} from 'react';
        import {observer} from 'mobx-react';
        import {FormStore, Validation, Input} from 'mobx-react-bootstrap-form';
            
        const store = new FormStore();
        
        @observer
        class ExampleView extends Component {
        
        render() {
            return (
            <div>
                <ControlLabel for="foo">3~6글자 숫자 입력하기</ControlLabel>
                <Input id="foo" store={store} name="foo" validations={[
                    new Validation(/^.+$/, '값을 입력해주세요.'),
                    new Validation(/^\\d+$/, '숫자만 입력해 주세요'),
                    new Validation(/^\\d{3,6}$/, '3에서 6글자로 입력해주세요'),
                ]} validOnBlur/>
                {
                    store.hasTried.has('foo') &&
                    <p>{store.getErrorMessages('foo')[0]}</p>
                }
            </div>
            )
        }
    `))
    .add('blur 시에 체크', () => <div>
        <ControlLabel for="foo">3~6글자 숫자 입력하기</ControlLabel>
        <Input store={store} name="foo" validations={[
            new Validation(/^.+$/, '값을 입력해주세요.'),
            new Validation(/^\d+$/, '숫자만 입력해 주세요'),
            new Validation(/^\d{3,6}$/, '3에서 6글자로 입력해주세요'),
        ]} onChange={action('Input changed!')} onBlur={action('Input blurred')} validOnBlur/>
        {
            store.hasTried.has('foo') &&
            <p>{store.getErrorMessages('foo')[0]}</p>
        }
    </div>);

