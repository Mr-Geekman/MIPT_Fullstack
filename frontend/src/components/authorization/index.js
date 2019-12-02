import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import cookie from 'react-cookies'

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


    submitForm = async (e) => {
        e.preventDefault();
        const data = {'username': this.state.login,
            'password': this.state.password};
        this.setState({
            'password': ''
        });
        // вдруг их надо было проинициализировать?
        cookie.save('csrftoken', '', { path: '/' });
        cookie.save('sessionid', '', { path: '/' });
        console.log(document.cookie);
        const response = await fetch(Constants.LOGIN_PREFIX, {
            method: 'POST',
            headers: {
                //"Access-Control-Allow-Origin": "*",
                //"Content-Type": "multipart/form-data",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body: JSON.stringify(data),
        })
        console.log(response);
        console.log(document.cookie);
        if (response.status === 200) {
            const tokens = await response.json();
            console.log(tokens);
        }      
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
                            <FormGroup row>
                                <Label for="username" sm={2}>Логин</Label>
                                <Col sm={10}>
                                    <Input 
                                        type="text" 
                                        name="login"
                                        id="username"
                                        placeholder="Введите логин" 
                                        value={this.state.login}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="userPassword" sm={2}>Password</Label>
                                <Col sm={10}>
                                    <Input 
                                        type="password"
                                        name="password" 
                                        id="userPassword" 
                                        placeholder="Введите пароль" 
                                        value = {this.state.password}
                                        onChange={this.handleChange}
                                    />
                                </Col>
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