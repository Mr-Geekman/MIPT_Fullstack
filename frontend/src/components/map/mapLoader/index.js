import React from 'react';
import './styles.scss';


// TODO: понять, почему нельзя назвать mapLoader
// это более соответствует принятому стилю, но пока такое наименование не удается
// вместо подстановки того, что внутри подставляется в html так, будто mapLoader -- это тэг html
// Пример правильной работы: sliderItem
const MapLoader = ({height}) => (
        <div className={'map-loader-container'} style={{width: window.innerWidth, height:height}}>
            <div className="loading-text">
                <span className="loading-text-words">З</span>
                <span className="loading-text-words">А</span>
                <span className="loading-text-words">Г</span>
                <span className="loading-text-words">Р</span>
                <span className="loading-text-words">У</span>
                <span className="loading-text-words">З</span>
                <span className="loading-text-words">К</span>
                <span className="loading-text-words">А</span>
            </div>
        </div>
);

export default MapLoader;