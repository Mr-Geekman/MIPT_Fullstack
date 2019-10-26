import React from 'react';
import { Link } from "react-router-dom";
import './styles.css';

const address = (id) => (
    'maps/' + id
);

const sliderItem = ({title, description, img_url, id}) => (
    <Link to={address(id)}>
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