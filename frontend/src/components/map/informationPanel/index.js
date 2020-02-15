import React, {Component} from 'react';
import * as Constants from "../../../constants/constants";
import './styles.css'

function renderNode(node) {
    switch (node.type) {
        case 'h1':
            return (
                <h1>{node.content}</h1>
            );
        case 'h3':
            return (
                <h3>{node.content}</h3>
            );
        case 'img':
            return (
                <div>
                    <img 
                        className={"article-img"} src={Constants.BACKEND_PREFIX +  node.src} 
                        draggable={"false"}
                    />
                    <div className={"article-img-caption"}>
                        <i>{node.content}</i>
                    </div>
                </div>
            );
        case 'paragraph':
            return (
                <p>
                <div dangerouslySetInnerHTML={{ __html: node.content}} />    
                </p>
            );
        default:
            return null;
    }
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
                <div 
                    className={"information-panel"} 
                    style={
                        {
                            "margin-left": margin_left,
                            height: this.props.height
                        }
                    }
                >
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
                {this.props.source.map(node => renderNode(node))}
            </div>
        );
    }
}

export default InformationPanel;