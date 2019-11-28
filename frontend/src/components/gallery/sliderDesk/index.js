import React, {Component} from 'react';
import sliderWrapper from "./sliderWrapper";
import './styles.css'
import * as Constants from "../../../constants/constants";


class SliderDesk extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        }
    }

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

    render() {
        return (
            <div className="maps-table">
                {this.state.items.map(task => sliderWrapper(task))}
            </div>
        );
    }
}

export default SliderDesk;