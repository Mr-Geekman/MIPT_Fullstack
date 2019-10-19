import React, {Component} from 'react';
import PageNotFound from "../../components/page_not_found"
import './styles.css';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {...this.props.match.params, found: false, pending: true};
    }

    componentDidMount() {
        this.setState({found: true, pending: false});
    }

    render() {
        if(this.state.pending) {
            return (
                <main>
                    <h2>Loading...</h2>
                </main>
            )
        }
        if(!this.state.found) {
            return (
                <PageNotFound/>
            );
        }
        return (
            <main>
                <canvas></canvas>
            </main>
        );
    }
}

export default Map;