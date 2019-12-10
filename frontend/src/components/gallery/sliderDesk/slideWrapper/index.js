import React from 'react';
import './styles.css';
import sliderItem from "../../../sliderItem";

const slideWrapper = (task) => (
    <div className="slide-wrapper">
        {sliderItem(task)}
    </div>
);

export default slideWrapper;