import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './styles.css';
import * as Constants from "../../constants/constants";

// P.S. на самом деле токен может протухнуть (кажется, ошибка 401 будет), и ничего не получится, надо будет получать новый
// Как это работает: в настройках есть пункт JWT_EXPIRATION_DELTA, который говорит сколько проживет текущий токен,
// Но как только истекает это время не обязательно заново проводить процедуру входа при помощи логина и пароля,
// достаточно лишь обновить токен при помощи refresh_token - см. urls.py (кажется, надо послать текущий токен, и получишь новый).
// Но такое обновление тоже нельзя делать вечно. Есть ограничение в виде параметра
// JWT_REFRESH_EXPIRATION_DELTA, который говорит, как долго можно обновлять токен
// с момента последнего входа при помощи логина и пароля.
// Всю эту сложную логику можно попробовать реализовать прямо в компоненте header.
// Или можно просто перед каждым запросом, требующим авторазации (пока это лишь получение текущего пользователя)
// делать refresh токена.


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged_in: localStorage.getItem('token') ? true : false,
            username: '',
        };
    }

    // TODO: после отладки убрать лишние console.log
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
                    if (!response.ok) {
                        throw new Error(String(response.status));
                    }
                    return res;
                })
                .then(data => {
                    console.log('Header user data', data);
                    this.setState({username: data['username']});
                    this.props.enter(data);
                }).
                catch(error => {
                    if (error['message'] === '401') {
                        fetch(Constants.REFRESH_ENDPOINT, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}` 
                            }
                        })
                            .then(response => {
                                console.log(response)
                            })
                    }
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
                  <span>Вы: {this.props.user_name}</span>
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