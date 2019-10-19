import React from 'react';
import './styles.css';

const sliderItem = ({title, description, img_url, id}) => (
    <div className="sliderItem" id={id} style={
        {
            background: "url(" + img_url + ")  center center no-repeat"
        }
    } >
        <div className="shadow">
            <p className="title">{title}</p>
            <p className="description">{description}</p>
        </div>
    </div>
);

export default sliderItem;