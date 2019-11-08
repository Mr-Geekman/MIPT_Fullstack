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
        if (!this.props.source) {
            return (
                <div className={"informationPanel"} style={
                    {
                        opacity: this.props.opacity,
                        height: this.props.height
                    }
                }>
                </div>
            );
        }
        return (
            <div className={"informationPanel"} style={
                {
                    opacity: this.props.opacity,
                    height: this.props.height
                }
            }>
                {this.props.source.map(node => renderNode(node))}
            </div>
        );
    }
}

export default InformationPanel;