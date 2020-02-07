import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './styles.css';
import * as Constants from "../../constants/constants";

// Токен может протухнуть (кажется, ошибка 401 будет), и ничего не получится, надо будет получать новый
// Как это работает: в настройках есть пункт JWT_EXPIRATION_DELTA, который говорит сколько проживет текущий токен,
// Но как только истекает это время не обязательно заново проводить процедуру входа при помощи логина и пароля,
// достаточно лишь обновить токен при помощи refresh_token - см. urls.py (кажется, надо послать текущий токен, и получишь новый).
// Но такое обновление тоже нельзя делать вечно. Есть ограничение в виде параметра
// JWT_REFRESH_EXPIRATION_DELTA, который говорит, как долго можно обновлять токен
// с момента последнего входа при помощи логина и пароля.
// Всю эту сложную логику можно попробовать реализовать прямо в компоненте header.
// Или можно просто перед каждым запросом, требующим авторазации (пока это лишь получение текущего пользователя)
// делать refresh токена.
// P.S. в итоге было решено не обновлять токен, а сделать сроком жизни токена 1 день.


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged_in: localStorage.getItem('token') ? true : false,
            username: '',
        };
        this.handleWindow = this.handleWindow.bind(this);
    }


    handleWindow = (e) => {
        e.preventDefault();
        let height = window.innerHeight - document.getElementsByTagName('header')[0].clientHeight -
            document.getElementsByTagName('footer')[0].clientHeight;
        console.log(height);
        this.props.setHeight(height);
    };

    componentDidMount() {
        if (this.state.logged_in) {
            fetch(Constants.CURRENT_USER_ENDPOINT, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then(response => {
                    const res = response.json();
                    if (!response.ok) {
                        //do nothing
                    }
                    return res;
                })
                .then(data => {
                    this.setState({username: data['username']});
                    this.props.enter(data);
                })
            }
        if (document.getElementsByTagName("footer") &&
            document.getElementsByTagName("header")){
            let height = window.innerHeight - document.getElementsByTagName('header')[0].clientHeight -
                document.getElementsByTagName('footer')[0].clientHeight;
            this.props.setHeight(height);
        }
        else {
            window.addEventListener('load', this.handleWindow);
        }

        window.addEventListener('resize', this.handleWindow);
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