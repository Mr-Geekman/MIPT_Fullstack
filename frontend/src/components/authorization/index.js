import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
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
    }


    submitForm = async (e) => {
        e.preventDefault();
        let data = { 
            'username': this.state.login,
            'password': this.state.password
        };
        console.log(data);
        this.setState({
            'password': ''
        });
        let url = Constants.LOGIN_PREFIX;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });
        console.log(response.headers);
        if (response.status === 200) {
            const tokens = await response.json();
            console.log(tokens);
        }      
    }

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
                                <Label for="user_name" sm={2}>Логин</Label>
                                <Col sm={10}>
                                    <Input 
                                        type="text" 
                                        name="login"
                                        id="user_name"
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