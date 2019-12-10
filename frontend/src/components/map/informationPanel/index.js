import React, {Component} from 'react';
import './styles.css'
import * as Constants from "../../../constants/constants";


function renderInfo(mark) {
    return (
        <React.Fragment>
            <h1>{mark.title}</h1>
            <img className={"article-img"} src={Constants.BACKEND_PREFIX + mark.image} />
            <p>{mark.content}</p>
        </React.Fragment>

    );
}

class InformationPanel extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let margin_left = "100vw";
        if (this.props.show === 1){
            margin_left = "60vw";
        }
        if (!this.props.source) {
            return (
                <div className={"information-panel"} style={
                    {
                        "margin-left": margin_left,
                        height: this.props.height
                    }
                }>
                </div>
            );
        }
        return (
            <div className={"information-panel"} style={
                {
                    "margin-left": margin_left,
                    height: this.props.height
                }
            }>
                {renderInfo(this.props.source)}
            </div>
        );
    }
}

export default InformationPanel;