import React, {Component} from 'react';
import SliderDesk from './sliderDesk';
import './styles.css';

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