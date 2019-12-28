import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

import './styles.css';
import * as Constants from '../../constants/constants'

class AuthorizationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            login: '',
            password: ''
        };
        this.handleLoad = this.handleLoad.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // загрузка окна
    handleLoad = (e) => {
        let height = window.innerHeight - document.getElementsByTagName('header')[0].clientHeight -
            document.getElementsByTagName('footer')[0].clientHeight;
        console.log(height);
        this.setState({
            height: height
        });
    };

    componentDidMount() {
        if (document.getElementsByTagName('header') &&
            document.getElementsByTagName('footer')){
            let height = window.innerHeight - document.getElementsByTagName('header')[0].clientHeight -
                document.getElementsByTagName('footer')[0].clientHeight;
            this.setState({
                height: height
            });
        }
        else {
            window.addEventListener('load', this.handleLoad);
        }
    }

    handleChange = async (e) => {
        const {target} = e;
        this.setState({
            [target.name]: target.value
        });
    };


    submitForm = (e) => {
        e.preventDefault();
        const data = {'username': this.state.login,
            'password': this.state.password};
        this.setState({
            'password': ''
        });
        fetch(Constants.TOKEN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                console.log('Response in fetch', response);
                console.log(document.cookie);
                const res = response.json();
                console.log('Jsoned', res);
                return res;
            })
            .then(data => {
                console.log('Data', data);
                localStorage.setItem('token', data['token']);
            });
    };

    // Кажется, здесь не нужны handleChange, все будет в e.target при нажатии
    render() {
        return (
            <main>
                <div className={'content-auth'}
                    style={{
                        height: this.state.height
                    }}
                >
                    <div className={'form-wrapper'}>
                        <Form onSubmit={this.submitForm}>
                            <FormGroup col>
                                <Label for="username">Логин</Label>
                                <Input 
                                    type="text" 
                                    name="login"
                                    id="username"
                                    placeholder="Введите логин" 
                                    value={this.state.login}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup col>
                                <Label for="userPassword">Password</Label>
                                <Input 
                                    type="password"
                                    name="password" 
                                    id="userPassword" 
                                    placeholder="Введите пароль" 
                                    value = {this.state.password}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <Button>Войти</Button>
                        </Form>
                    </div>
                </div>
            </main>
        );
    }
}

export default AuthorizationForm;