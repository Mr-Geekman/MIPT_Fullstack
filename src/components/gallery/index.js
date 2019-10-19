import React, {Component} from 'react';
import Header from "../../components/header";
import Footer from '../../components/footer';
import SliderDesk from './sliderDesk';

class Gallery extends Component {

    render() {
        return (
            <React.Fragment>
                <Header/>
                <div className="content-gallery">
                    <SliderDesk />
                </div>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default Gallery;