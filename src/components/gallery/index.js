import React, {Component} from 'react';
import Header from "../../components/header";
import Footer from '../../components/footer';
import SliderDesk from './sliderDesk';

class Gallery extends Component {

    render() {
        return (
            <div className="content-gallery">
                <SliderDesk />
            </div>
        );
    }
}

export default Gallery;