import React, {Component} from 'react';
import { Stage, Layer, Image } from 'react-konva';
import PageNotFound from "../../components/page_not_found";
import './styles.scss';
import visibleHeight from "../visible_height";


const MapLoader = () => {
    let visible_width = window.innerWidth;
    let visible_height = visibleHeight();
    return (
        <div className={'map-loader-container'} style={{width: visible_width, height:visible_height}}>
            <div className="loading-text">
                <span className="loading-text-words">З</span>
                <span className="loading-text-words">А</span>
                <span className="loading-text-words">Г</span>
                <span className="loading-text-words">Р</span>
                <span className="loading-text-words">У</span>
                <span className="loading-text-words">З</span>
                <span className="loading-text-words">К</span>
                <span className="loading-text-words">А</span>
            </div>
        </div>
    )
};


function getImageData(name) {
    switch (name) {
        case 'tolkien':
            return {
                src: 'https://src.lotrrol.ru/complete_map_9.jpg',
                width: 10512,
                height: 5197
            };
        case 'lovecraft':
            return {
                src: 'https://img0.etsystatic.com/034/0/5927863/il_fullxfull.570449466_5zkr.jpg',
                width: 1000,
                height: 777
            };
        case 'bosch':
            return {
                src: 'http://s02.yapfiles.ru/files/770610/J._Bosch_Adoration_of_the_Magi_Triptych.jpg',
                width: 2535,
                height: 2170
            };
        default:
            return null;
    }
}

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {...this.props.match.params,
            found: false,
            pending: true,
            loaded: false,
            stageY: 0
        };
        this.state.imageData = getImageData(this.state.name);
        if (this.state.imageData) {
            this.state.stageScale = Math.min(
                window.innerWidth / this.state.imageData.width,
                window.innerHeight / this.state.imageData.height * 0.8
            );
            this.state.stageX = (window.innerWidth -
                this.state.imageData.width * this.state.stageScale) / 2;
        }

        this.image = new window.Image();
        this.image.src = this.state.imageData.src;
        this.image.addEventListener('load', this.handleLoad);
    }

    handleLoad = () => {
        this.setState({
            loaded: true,
            image: this.image
        });
    };

    componentDidMount() {
        this.setState({found: true, pending: false});
    }

    handleWheel = e => {
        e.evt.preventDefault();

        const scaleBy = 1.05;
        const stage = e.target.getStage();
        const oldScale = stage.scaleX();
        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
        };

        const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

        stage.scale({ x: newScale, y: newScale });

        this.setState({
            stageScale: newScale,
            stageX:
                -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
            stageY:
                -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
        });
    };

    render() {
        if(this.state.pending || !this.state.loaded) {
            return (
                <MapLoader>
                </MapLoader>
            )
        }
        if(!this.state.found || !this.state.imageData) {
            return (
                <PageNotFound/>
            );
        }
        // Проблема: visible_width и visible_height не обновляются.
        // Для воспроизведения нужно перезагрузить страницу с открытым режимом разработчика, а затем выклюить его.
        // В таком случае часть экрана никак не будет заполнена изображением.
        let visible_width = window.innerWidth;
        let visible_height = visibleHeight();
        let bound_function = function (position) {
            console.log('called');
            // Придумать, откуда брать размеры картинки (вариант: redux)
            let map_width = this.state.imageData.width - visible_width;
            let map_height = this.state.imageData.height - visible_height;
            let new_x = Math.max(Math.min(0, position.x), -map_width);
            let new_y = Math.max(Math.min(0, position.y), -map_height);
            console.log(position.y);
            console.log('');
            return {x: new_x, y: new_y};
        };
        return (
            <main>
                <Stage width={visible_width} height={visible_height}
                   onWheel={this.handleWheel}
                   scaleX={this.state.stageScale}
                   scaleY={this.state.stageScale}
                   x={this.state.stageX}
                   y={this.state.stageY}
                >
                    <Layer draggable /*dragBoundFunc={bound_function}*/>
                        <Image
                            image={this.state.image}
                        />
                    </Layer>
                </Stage>
            </main>
        );
    }
}

export default Map;