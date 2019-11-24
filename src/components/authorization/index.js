import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import './styles.css'

class AuthorizationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height: 0
        };
        this.handleLoad = this.handleLoad.bind(this)
    }

    handleLoad = (e) => {
        let height = window.innerHeight - document.getElementsByTagName('header')[0].clientHeight -
            document.getElementsByTagName('footer')[0].clientHeight;
        console.log(height);
        this.setState({
            height: height
        });
    };

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
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
                        <Form>
                            <FormGroup row>
                                <Label for="userEmail" sm={2}>Email</Label>
                                <Col sm={10}>
                                    <Input type="email" name="email" id="userEmail" placeholder="Введите email" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="userPassword" sm={2}>Password</Label>
                                <Col sm={10}>
                                    <Input type="password" name="password" id="userPassword" placeholder="Введите пароль" />
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