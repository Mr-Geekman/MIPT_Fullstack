import React, {Component} from 'react';
import './styles.css'

function renderNode(node) {
    switch (node.type) {
        case 'h1':
            return (
                <h1>{node.header}</h1>
            );
        case 'img':
            return (
                <img className={"article-img"} src={node.src} draggable={"false"}/>
            );
        case 'paragraph':
            return (
              <p>{node.text}</p>
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
                <div className={"informationPanel"} style={
                    {
                        "margin-left": margin_left,
                        height: this.props.height
                    }
                }>
                </div>
            );
        }
        return (
            <div className={"informationPanel"} style={
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