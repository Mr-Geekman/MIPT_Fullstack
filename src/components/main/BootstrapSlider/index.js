import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators
} from 'reactstrap';
import sliderItem from "../../sliderItem";

const items = [
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
]
const BootstrapSlider = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = items.map((item) => {
        return (
            <CarouselItem
                className="custom-tag"
                tag="div"
                key={item.id}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
            >
                {sliderItem(item)}
            </CarouselItem>
        );
    });

    return (
        <div>
            <style>
                {
                    `.custom-tag {
              max-width: 100%;
              height: 274px;
              background: black;
            }`
                }
            </style>
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
        </div>
    );
}

export default BootstrapSlider;