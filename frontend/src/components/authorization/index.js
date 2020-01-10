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
            password: '',
            error: ''
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
        const data = {
            'username': this.state.login,
            'password': this.state.password
        };
        this.setState({
            'password': '',
            'error': ''
        });
        
        
        if (!data.username) {
            this.setState({
                error: 'Введите имя пользователя.'
            });
            return;
        }
        if (!data.password) {
            this.setState({
                error: 'Введите пароль.'
            });
            return;
        } 
        fetch(Constants.LOGIN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                return response.ok ? response.json() : Promise.reject(response);
            })
            .then(data => {
                localStorage.setItem('token', data['token']);
                this.props.enter(data.user);
            })
            .catch(response => {
                response.json().then(data => {
                    for (let i in Object.keys(data)) {
                        let error_array = data[Object.keys(data)[i]];
                        for (let j in error_array) {
                            this.setState({
                                error: error_array[j]
                            });
                        }
                    }
                });
            });
    };

    // Кажется, здесь не нужны handleChange, все будет в e.target при нажатии
    render() {
        let errorText = '';
        if (this.state.error) {
            errorText = (
                <Label style={{color: 'red'}}>{this.state.error}</Label>
            );
        }
        return (
            <main>
                <div className={'content-auth'}
                    style={{
                        height: this.state.height
                    }}
                >
                    <div className={'form-wrapper'}>
                        <Form onSubmit={this.submitForm} style={{'font-size': '10pt'}}>
                            {errorText}
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