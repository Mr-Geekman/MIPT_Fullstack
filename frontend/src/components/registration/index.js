import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import cookie from 'react-cookies'

import './styles.css';
import * as Constants from '../../constants/constants'

class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            login: '',
            password: '',
            email: ''
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
                            <FormGroup>
                                <Label for="username">Логин</Label>
                                <Input 
                                    type="text" 
                                    name="login"
                                    id="username"
                                    placeholder="Введите логин" 
                                    value={this.state.login}
                                    onChange={this.handleChange}
                                    size={'10pt'}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="username">Email</Label>
                                <Input 
                                    type="text" 
                                    name="email"
                                    id="userEmail"
                                    placeholder="Введите email" 
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
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

export default RegistrationForm;