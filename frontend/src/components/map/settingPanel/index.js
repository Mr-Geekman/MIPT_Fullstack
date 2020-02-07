import './styles.css';
import React from 'react';

const SettingPanel = (props) => (
    <div 
        className={"setting-panel"}
        >
        <div className={"menu-button"}>
            <div className={"line"} />
            <div className={"line"} />
            <div className={"line"} />
        </div>
        <div 
            className={"eye"}
            title="Скрыть/показать метки"
            onClick={
                e => {
                    let eye = e.currentTarget;
                    if (!props.changeVisability()) {
                        eye.style.color = "white";
                        return;
                    }
                    eye.style.color = "black";
                }
            }
        >
            &bull;
            <div className={"brow"} />
        </div>
        <div
            className={"speaker-sign"}
            onClick={() => {
                let son = document.getElementsByClassName("traverser")[0];
                if (props.changePlaying()) {
                    son.style.height = "40px";
                    return;
                }
                son.style.height = "0px";
            }}
        >
            <div className={"traverser"} />
        </div>
        <div 
            className={"inform-sign"}
            title="Описание карты"
            onClick={props.showSummary}
        >
            i
        </div>
    </div>
);

export default SettingPanel;