import React, {Component} from 'react';
import sliderWrapper from "./sliderWrapper";
import './styles.css'

// TODO: избавиться, сделать через fetch
class SliderDesk extends Component {
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
                    map_name: 'tolkien',
                },
                {
                    title: "Карта миров Лавкрафта",
                    description: "Интерактивная карта по мотивам творчества Лавкрафта " +
                        "с бесчисленным количеством описаний.",
                    img_url: "https://img0.etsystatic.com/034/0/5927863/il_fullxfull.570449466_5zkr.jpg",
                    id: 2,
                    map_name: 'lovecraft',
                },
                {
                    title: "Поклонение Волхвов",
                    description: "Насыщенное путешествие по знаменитой картине Босха.",
                    img_url: "https://eclecticlightdotcom.files.wordpress.com/2016/06/boschadorationmagi3main.jpg",
                    id: 3,
                    map_name: 'bosch'
                }
            ],
        }
    }

    render() {
        return (
            <div className="maps-table">
                {this.state.listItems.map(task => sliderWrapper(task))}
            </div>
        );
    }
}

export default SliderDesk;