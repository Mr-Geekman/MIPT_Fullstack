import React from 'react';
import { Link } from "react-router-dom";
import './styles.css';
import * as Constants from "../../constants/constants";

const address = (map_name) => (
    'maps/' + map_name
);

const sliderItem = ({title, description, thumbnail, id, url}) => (
    <Link to={address(url)}>
        <div className="slider-item" id={id} style={
            {
                background: `url(${Constants.BACKEND_PREFIX}${thumbnail}) center center no-repeat`
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