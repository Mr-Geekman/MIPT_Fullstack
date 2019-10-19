import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './styles.css';

class Header extends Component {

    render() {
        return (
            <header>
                <div className="header-right">
                    <nav className="primary-nav">
                        <ul>
                            <li className="logo">
                                <Link to="/"/>
                            </li>
                            <li>
                                <Link to="/gallery">Галерея</Link>
                            </li>
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