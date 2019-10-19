import React from 'react';
import './styles.css';
import sliderItem from "../../../sliderItem";

const sliderWrapper = (task) => (
    <div className="sliderWrapper">
        {sliderItem(task)}
    </div>
);

export default sliderWrapper;