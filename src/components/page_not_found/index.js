import React, {Component} from 'react';
import { Link } from "react-router-dom";
import Header from "../../components/header";
import Footer from '../../components/footer';

class PageNotFound extends Component {

    render() {
        return (
            <React.Fragment>
                <Header/>
                <div className="content">
                    <main>
                        <article>
                            <h2>Похоже, что вы забрели не туда, такой страницы не существует</h2>
                            <p>Советуем вам вернуться обратно на <Link to="/">главную страницу</Link></p>
                        </article>
                    </main>
                </div>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default PageNotFound;