import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './styles.css';

class PageNotFound extends Component {

    constructor(props){
        super(props);
        this.state = {
            ready: false
        };
    }

    componentDidMount() {
        this.setState({ready: true});
    }

    render() {
        if (!this.state.ready) {
            return ("404");
        }

        return (
            <div className="content-404" style={
                {
                    height: this.props.height
                }
            }>
                <div className="text-404">
                        <span>Похоже,</span><br/>
                        <span>что вы забрели не туда,</span><br/>
                        <span>такой страницы не существует</span><br/>
                        <span>Советуем вернуться на <Link to="/">главную</Link></span>
                </div>
            </div>
        );
    }
}

export default PageNotFound;