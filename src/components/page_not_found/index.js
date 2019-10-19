import React, {Component} from 'react';
import { Link } from "react-router-dom";
import NotFoundPicture from "../../static/img/404.jpeg"
import './styles.css';

class PageNotFound extends Component {

    render() {
        return (
            <div className="content">
                <main>
                    <article>
                        <h2>Похоже, что вы забрели не туда, такой страницы не существует</h2>
                        <img className={"not-found-picture"} src={NotFoundPicture} alt="Bosch Hell"/>
                        <p className={"tip-to-main"}>Советуем вам вернуться обратно на <Link to="/">главную страницу</Link></p>
                    </article>
                </main>
            </div>
        );
    }
}

export default PageNotFound;