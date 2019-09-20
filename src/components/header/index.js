import React, {Component} from 'react';
import './styles.css';

class Header extends Component {

    render() {
        return (
            <header>
                <nav className="primary-nav">
                    <ul>
                        <li className="logo"><a href="/">Логотип</a></li>
                        <li><a href="#">Галерея</a></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;