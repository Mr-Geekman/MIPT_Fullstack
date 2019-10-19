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
                <h2>Тут должен быть просмотрщик карт для {this.state.name}.</h2>
                <h2>Найден: {this.state.found + ""}</h2>
            </main>
        );
    }
}

export default Map;