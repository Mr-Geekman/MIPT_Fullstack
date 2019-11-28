import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators
} from 'reactstrap';
import sliderItem from "../../sliderItem";
import * as Constants from "../../../constants/constants";


class BootstrapSlider extends Component {
    constructor(props) {
        super(props);
        // тут нет this.props.match.params могут ли быть потом от этого проблемы (с ними кидало ошибку)?
        this.state = {
            activeIndex: 0,
            animating: false,
            items: [],
        };
    };

    componentDidMount() {
        const request = async() => {
            const data = await fetch(Constants.MAPS_PREFIX)
                .then(response => response.json())
                .catch(err => console.log('Send failed', err));
            if(data) {
                this.setState({ items: data });
            }
        };
        request();
    }

    next = () => {
        if (this.state.animating) return;
        const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({activeIndex: nextIndex});
    };

    previous = () => {
        if (this.state.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
        this.setState({activeIndex: nextIndex});
    };

    goToIndex = (newIndex) => {
        if (this.state.animating) return;
        this.setState({activeIndex: newIndex});
    };

    render() {
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
                    activeIndex={this.state.activeIndex}
                    next={this.next}
                    previous={this.previous}
                >
                    <CarouselIndicators items={this.state.items} activeIndex={this.state.activeIndex}
                                        onClickHandler={this.goToIndex}/>
                    {this.state.items.map((item) => {
                        return (
                            <CarouselItem
                                className="custom-tag"
                                tag="div"
                                key={item.id}
                                onExiting={() => this.setState({animating: true})}
                                onExited={() => this.setState({animating: false})}
                            >
                                {sliderItem(item)}
                            </CarouselItem>
                        );
                    })}
                    <CarouselControl direction="prev" directionText="Previous"
                                     onClickHandler={this.previous}/>
                    <CarouselControl direction="next" directionText="Next"
                                     onClickHandler={this.next}/>
                </Carousel>
            </div>
        );
    }
};


export default BootstrapSlider;