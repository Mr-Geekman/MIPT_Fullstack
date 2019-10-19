import React, {Component} from 'react';
import { Link } from "react-router-dom";

class PageNotFound extends Component {

    render() {
        return (
            <div className="content">
                <main>
                    <article>
                        <h2>Похоже, что вы забрели не туда, такой страницы не существует</h2>
                        <p>Советуем вам вернуться обратно на <Link to="/">главную страницу</Link></p>
                    </article>
                </main>
            </div>
        );
    }
}

export default PageNotFound;