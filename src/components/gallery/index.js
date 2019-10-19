import React, {Component} from 'react';
import Header from "../../components/header";
import Footer from '../../components/footer';

class Gallery extends Component {

    render() {
        return (
            <React.Fragment>
                <Header/>
                <div className="content">
                    <main>
                        <article>
                            <h2>Тут будет галерея со всеми картами</h2>
                        </article>
                    </main>
                </div>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default Gallery;