import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './styles.css';
import * as Constants from "../../constants/constants";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged_in: localStorage.getItem('token') ? true : false,
            username: 'Вася Пупкин',
        };
    }

    componentDidMount() {
        if (this.state.logged_in) {
            fetch(Constants.CURRENT_USER_ENDPOINT, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then(response => {
                    console.log('Header user response in fetch', response);
                    const res = response.json();
                    console.log('Header user jsoned', res);
                    return res;
                })
                .then(data => {
                    console.log('Header user data', data);
                    this.setState({username: data['username']})
                });
            }
    }

    render() {

        let userDiv = null;
        if (!this.props.user_name) {
                userDiv = (
                    <div className={'user-div'}>
                        <div
                            className={'enter button'}
                            onClick = {e => {
                                e.preventDefault();
                                this.props.onEnterClick(`Вы: ${this.state.username}`);
                            }}
                        >
                            <Link to='/authorization'>
                                <span className='button-text'>Войти</span>
                            </Link> 
                        </div>
                        <div className={'register button'}>
                            <Link to='/registration'>
                                <span className='button-text'>Зарегистрироваться</span>
                            </Link>
                        </div>
                    </div>
                );
        }
        else {
            userDiv = (
              <div className={'user-div'}>
                  <span>{this.props.user_name}</span>
                  <div
                      className={'escape button'}
                      onClick={e => {
                          e.preventDefault();
                          this.props.onEscapeClick();
                      }}
                  >
                      Выйти
                  </div>
              </div>
            );
        }


        return (
            <header>
                <div className="header-right">
                    <nav className="primary-nav">
                        <ul>
                            <li className="logo">
                                <Link to="/">
                                        <span className="g-logo">G</span>
                                        <span className="z-logo">Z</span>
                                </Link>
                            </li>
                            <li className="typical">
                                <Link to="/gallery">Галерея</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="header-left">
                    {userDiv}
                </div>
            </header>
        );
    }
}

export default Header;