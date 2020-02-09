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
                    let brow = eye.children[0];
                    let traverser = eye.children[1];
                    if (props.changeVisability()) {
                        brow.style.borderColor = 
                            "black transparent transparent transparent";
                        eye.style.color = "black";
                        traverser.style.height = "40px";
                        return;
                    }
                    eye.style.color = "white";
                    brow.style.borderColor = 
                        "white transparent transparent transparent";
                    traverser.style.height = "0px";
                }
            }
        >
            &bull;
            <div className={"brow"} />
            <div className={"traverser"} />
        </div>
        <div
            className={"speaker-sign"}
            onClick={() => {
                let son = document.querySelector('.speaker-sign > .traverser');
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