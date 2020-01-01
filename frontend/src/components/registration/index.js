import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

import './styles.css';
import * as Constants from '../../constants/constants'

class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            login: '',
            password: '',
            email: '',
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


    submitForm = async (e) => {
        e.preventDefault();
        const data = {
            'username': this.state.login,
            'email': this.state.email,
            'password': this.state.password
        };
        
        this.setState({
            'password': '',
            'error': ''
        });

        if (!data.username) {
            this.setState({
                error: 'Введите имя пользователя!'
            });
            return;
        }
        if (!data.password) {
            this.setState({
                error: 'Введите пароль!'
            });
            return;
        } 
        if (!data.email) {
            this.setState({
                error: 'Введите email!'
            });
            return;
        }

        // TODO: научиться обрабатывать ошибки 400
        // Воспроизвести можно при помощи создания пользователя с уже занятым username
        // Для того, чтобы посмотреть, какие пользователи существуют и удаления их
        // можно воспользовать админкой, которая доступна по адресу localhost:8000/admin
        // TODO: после отладки убрать console.log
        fetch(Constants.REGISTER_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                console.log('Response in fetch', response);
                const res = response.json();
                if (response.ok === true) {
                    return res;
                }
                throw new Error(response.status)
            })
            .then(data => {
                console.log('Data', data);
                localStorage.setItem('token', data['token']);
                this.props.enter(data.user);
            })
            .catch(error => {
                let status = error['message'];
                let errorText = '';
                if (status === '400') {
                    errorText = 'Логин занят!';
                }
                else {
                    errorText = 'Ошибка, но мы уже побежали ее исправлять';
                }
                this.setState({
                    error: errorText
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
                        <Form onSubmit={this.submitForm} style={{
                            'font-size': '10pt'
                        }} >
                            {errorText}
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
                                <Label for="userEmail">Email</Label>
                                <Input 
                                    type="email" 
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
                            <Button>Зарегистрироваться</Button>
                        </Form>
                    </div>
                </div>
            </main>
        );
    }
}

export default RegistrationForm;