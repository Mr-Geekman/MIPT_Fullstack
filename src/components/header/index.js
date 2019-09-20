import React, {Component} from 'react';
import './styles.css';

class Header extends Component {

    render() {
        return (
            <header>
                <div className="header-right">
                    <nav className="primary-nav">
                        <ul>
                            <li className="logo">
                                <a href="/">
                                </a>
                            </li>
                            <li><a href="#">Галерея</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="header-left">
                </div>
            </header>
        );
    }
}

export default Header;