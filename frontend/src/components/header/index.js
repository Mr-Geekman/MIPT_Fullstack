import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './styles.css';

class Header extends Component {

    render() {

        let userDiv = null;
        if (!this.props.user_name) {
                userDiv = (
                    <div className={'user_div'}>
                        <div
                            className={'enter button'}
                            onClick = {e => {
                                e.preventDefault();
                                this.props.onEnterClick('Вы: ' + 'Вася Пупкин');
                            }}
                        >
                            Войти
                        </div>
                        <div className={'register button'}>
                            Зарегистрироваться
                        </div>
                    </div>
                );
        }
        else {
            userDiv = (
              <div className={'user_div'}>
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