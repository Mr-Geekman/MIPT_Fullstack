import React, {Component} from 'react';
import { Stage, Layer, Image } from 'react-konva';

import * as Constants from "../../constants/constants";
import PageNotFound from "../../components/pageNotFound";

import marker from "./marker"
import InformationPanel from "./informationPanel";
import MapLoader from "./mapLoader";


class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {...this.props.match.params,
            found: false, // найдена ли карта
            loaded: false, // загружается изображение
            stageY: 1,
            height: 0,
            imageData: {},
            image: {},
            markersOpacity: 1,
            inform: null, // текущий элемента на информационной панели
            stageScale: 1,
            stageX: 1,
        };

        this.handleLoad = this.handleLoad.bind(this);
        this.handleWindowLoad = this.handleWindowLoad.bind(this);
    }


    // загрузка изображения
    handleLoad = () => {
        this.setState({
            loaded: true
        });
    };

    //загрузка окна
    handleWindowLoad = (e) => {
        e.preventDefault();
        let height = window.innerHeight - document.getElementsByTagName('header')[0].clientHeight -
            document.getElementsByTagName('footer')[0].clientHeight;
        this.setState({
            height: height
        });
    };

    componentDidMount() {
        let url = `${Constants.MAPS_PREFIX}/${this.state.name}/`;

        fetch(url)
            .then(response => {
                if(response.status === 404) {
                    this.setState({found: false, loaded: true});
                } else if(response.status === 200) {
                    return response.json();
                }
            })
            .then(data => {
                this.setState({ imageData: data });
                if(this.state.imageData) {
                    const stageScaleValue = Math.min(
                        window.innerWidth / this.state.imageData.width,
                        window.innerHeight / this.state.imageData.height * 0.8
                    );
                    this.setState({stageScale: stageScaleValue});
                    const stageXValue = (window.innerWidth -
                        this.state.imageData.width * this.state.stageScale) / 2;
                    this.setState({stageX: stageXValue});

                    let map_image = new window.Image();
                    map_image.src = Constants.BACKEND_PREFIX + this.state.imageData.image;
                    map_image.addEventListener('load', this.handleLoad);
                    this.setState({image: map_image, found: true});
                }
            })
            .catch(err => console.log('Send failed', err));

        if (document.getElementsByTagName('footer')) {
            document.getElementsByTagName('footer')[0].style.display = 'none';
        }
        if (document.getElementsByTagName("footer") &&
            document.getElementsByTagName("header")){
            let height = window.innerHeight - document.getElementsByTagName('header')[0].clientHeight -
                document.getElementsByTagName('footer')[0].clientHeight;
            this.setState({
                height: height
            });
        }
        else {
            window.addEventListener('load', this.handleWindowLoad);
        }
    }

    componentWillUnmount() {
        document.getElementsByTagName('footer')[0].style.display = 'block';
    }

    handleWheel = e => {
        e.evt.preventDefault();

        const scaleBy = 0.95;
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
    
    handleClick = (index) => {
        console.log(index);
        return e => {
            e.evt.preventDefault();
            this.setState({
                inform: this.state.imageData.marks[index],
                markersOpacity: 0
            });
        }
    };

    handleBack = e => {
        this.setState({
            markersOpacity: 1
        });
    };

    getMarginLeft() {
        if (this.state.markersOpacity === 0) {
            return "15px";
        }
        return "-100px";

    }

    render() {
        if(!this.state.loaded) {
            return (
                <MapLoader
                    height={this.state.height}
                >
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
        let visible_height = this.state.height;
        let bound_function = function (position) {
            console.log('called');
            // Придумать, откуда брать размеры картинки (вариант: redux)
            let map_width = this.state.imageData.width - visible_width;
            let map_height = this.state.imageData.height - visible_height;
            let new_x = Math.max(Math.min(0, position.x), -map_width);
            let new_y = Math.max(Math.min(0, position.y), -map_height);
            return {x: new_x, y: new_y};
        };


        // TODO: поправить размер кнопки НАЗАД
        return (
            <main>
                <div
                    className={"back-button"}
                    onClick={this.handleBack}
                    style={{
                        "margin-left": this.getMarginLeft()
                    }}
                >
                    <span>{"НАЗАД"}</span>
                </div>
                <InformationPanel
                    source={this.state.inform}
                    show={1 - this.state.markersOpacity}
                    height={visible_height}
                />
                <Stage
                    width={visible_width}
                    height={this.state.height}
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
                        {this.state.imageData.marks.map(
                            // handleClick каррируется
                            // туда передается только index, аргумент e попадает при нажатии
                            (mark_props, index) => marker(Object.assign(mark_props,
                                {
                                    handler: this.handleClick(index),
                                    opacity: this.state.markersOpacity
                                }))
                        )}
                    </Layer>
                </Stage>
            </main>
        );
    }
}

export default Map;