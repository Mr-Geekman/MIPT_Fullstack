import React, {Component} from 'react';
import { Stage, Layer, Image } from 'react-konva';
import PageNotFound from "../../components/page_not_found";
import './styles.css';


class MapImage extends React.Component {
  state = {
    image: null
  };

  componentDidMount() {
    this.loadImage();
  }

  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }

  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }

  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener('load', this.handleLoad);
  }

  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };

  render() {
    return (
      <Image
        x={this.props.x}
        y={this.props.y}
        image={this.state.image}
        ref={node => {
          this.imageNode = node;
        }}
      />
    );
  }
}


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
        let header_height = document.getElementsByTagName('header')[0].clientHeight;
        let footer_height = document.getElementsByTagName('footer')[0].clientHeight;
        // Проблема: visible_width и visible_height не обновляются.
        // Для воспроизведения нужно перезагрузить страницу с открытым режимом разработчика, а затем выклюить его.
        // В таком случае часть экрана никак не будет заполнена изображением.
        let visible_width = window.innerWidth;
        let visible_height = window.innerHeight - header_height - footer_height;
        let bound_function = function (position) {
            console.log('called');
            // Придумать, откуда брать размеры картинки (вариант: redux)
            let map_width = 10512 - visible_width;
            let map_height = 5197 - visible_height;
            let new_x = Math.max(Math.min(0, position.x), -map_width);
            let new_y = Math.max(Math.min(0, position.y), -map_height);
            console.log(position.y);
            console.log('');
            return {x: new_x, y: new_y};
        };
        return (
            <main>
                <Stage width={visible_width} height={visible_height}>
                    <Layer draggable dragBoundFunc={bound_function}>
                        <MapImage src="https://src.lotrrol.ru/complete_map_9.jpg"/>
                    </Layer>
                </Stage>
            </main>
        );
    }
}

export default Map;