import React, {Component} from 'react';
import './styles.css';
import linkSliderItem from "./linkSliderItem";
import sliderItem from "./sliderItem";

class Slider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listItems: [
                {
                    title: "Карта Средиземья",
                    description: "Интерактивная карта по мотивам книг профессора " +
                        "Толкиена с множеством замечательных подробностей.",
                    img_url: "http://wolf-unity.clan.su/_fr/0/s0325719.jpg",
                    id: 1,
                },
                {
                    title: "Карта миров Лавкрафта",
                    description: "Интерактивная карта по мотивам творчества Лавкрафта " +
                        "с бесчисленным количеством описаний.",
                    img_url: "https://img0.etsystatic.com/034/0/5927863/il_fullxfull.570449466_5zkr.jpg",
                    id: 2,
                },
                {
                    title: "Поклонение Волхвов",
                    description: "Насыщенное путешествие по знаменитой картине Босха.",
                    img_url: "https://eclecticlightdotcom.files.wordpress.com/2016/06/boschadorationmagi3main.jpg",
                    id: 3,
                }
            ],
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="left-arrow"></div>
                <div className="slider">
                    <div className="link_row">
                        {this.state.listItems.map(task => linkSliderItem(task))}
                    </div>
                    <div className="slides">
                        {this.state.listItems.map(task => sliderItem(task))}
                    </div>
                </div>
                <div className="right-arrow"></div>
            </div>
        );
    }
}

export default Slider;