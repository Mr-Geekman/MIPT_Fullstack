import React from 'react';
import { Link } from "react-router-dom";
import './styles.css';

const address = (map_name) => (
    'maps/' + map_name
);

const sliderItem = ({title, description, img_url, id, map_name}) => (
    <Link to={address(map_name)}>
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
    </Link>
);

export default sliderItem;