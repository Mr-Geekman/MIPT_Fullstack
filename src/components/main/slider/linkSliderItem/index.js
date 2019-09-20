import React from 'react';
import './styles.css';

const linkSliderItem = ({title, description, img_url, id}) => (
   <a href={"#" + id} className="linkSlider">○</a>
);

export default linkSliderItem;