import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './styles.css';

class PageNotFound extends Component {

    constructor(props){
        super(props);
        this.state = {
            ready: false,
            height: 0
        };
        this.handleLoad = this.handleLoad.bind(this);
    }

    // TODO: не срабатывает при загрузке в firefox - как следствие, не показывается изображение
    handleLoad = (e) => {
        let height = window.innerHeight - document.getElementsByTagName('header')[0].clientHeight -
            document.getElementsByTagName('footer')[0].clientHeight;
        console.log(height);
        this.setState({
            height: height
        });
    };

    componentDidMount() {
        this.setState({ready: true});
        window.addEventListener('load', this.handleLoad);
    }

    render() {
        if (!this.state.ready) {
            return ("404");
        }

        return (
            <div className="content-404" style={
                {
                    height: this.state.height
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