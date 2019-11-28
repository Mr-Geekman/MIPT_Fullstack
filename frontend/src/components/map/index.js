import React, {Component} from 'react';
import { Stage, Layer, Image } from 'react-konva';
import PageNotFound from "../../components/page_not_found";
import './styles.scss';
import marker from "./marker"
import InformationPanel from "./informationPanel";


const MapLoader = ({height}) => {
    let visible_width = window.innerWidth;
    return (
        <div className={'map-loader-container'} style={{width: visible_width, height:height}}>
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
                height: 5197,
                markers: [],
                inform: {}
            };
        case 'lovecraft':
            return {
                src: 'https://img0.etsystatic.com/034/0/5927863/il_fullxfull.570449466_5zkr.jpg',
                width: 1000,
                height: 777,
                markers: [
                    {
                        radius: 15,
                        id: "cthulu",
                        x: 227,
                        y: 510
                    },
                    {
                        radius: 5,
                        id: "rlyech",
                        x: 188,
                        y: 572
                    }
                ],
                inform: {
                    "cthulu": [
                        {
                            type: 'h1',
                            header: 'Ктулху'
                        },
                        {
                            type: 'img',
                            src: "https://pbs.twimg.com/media/D_CMONrXkAAlXyd.jpg"
                        },
                        {
                            type: "paragraph",
                            text: "На вид Ктулху разными частями тела подобен осьминогу, " +
                                "дракону и человеку: судя по барельефу Энтони Уилкокса, " +
                                "героя «Зова Ктулху», и таинственному древнему изваянию из " +
                                "рассказа, чудовище имеет голову с щупальцами, гуманоидное тело," +
                                " покрытое чешуёй, и пару рудиментарных крыльев."
                        }
                    ],
                    "rlyech": [
                        {
                            type: 'h1',
                            header: 'Р’льех'
                        },
                        {
                            type: 'img',
                            src: "https://img-fotki.yandex.ru/get/6602/44938346.2e/0_83159_53362ce6_XL"
                        },
                        {
                            type: "paragraph",
                            text: "Р’льех — город, созданный Древними в незапамятные времена. В " +
                                "настоящее время он затоплен и находится на дне Мирового океана."  +
                                " Архитектура Р’льеха характеризуется Лавкрафтом как «циклопическая» и " +
                                "«неевклидова» (Лавкрафт подразумевает, что Р’льех построен в большем числе" +
                                " измерений, чем способен воспринимать человеческий разум, поэтому люди " +
                                "видят Р’льех искажённым). На стенах зданий Р’льеха высечены ужасные " +
                                "изображения и иероглифы."
                        }
                    ]

                }
            };
        case 'bosch':
            return {
                src: 'http://s02.yapfiles.ru/files/770610/J._Bosch_Adoration_of_the_Magi_Triptych.jpg',
                width: 2535,
                height: 2170,
                markers: [],
                inform: {}
            };
        default:
            return null;
    }
}

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
            inform: null,
            stageScale: 1,
            stageX: 1,
        };
        //this.state.imageData = getImageData(this.state.name);

        // if (this.state.imageData) {
        //     this.state.stageScale = Math.min(
        //         window.innerWidth / this.state.imageData.width,
        //         window.innerHeight / this.state.imageData.height * 0.8
        //     );
        //     this.state.stageX = (window.innerWidth -
        //         this.state.imageData.width * this.state.stageScale) / 2;
        // }
        //
        // this.image = new window.Image();
        // this.image.src = this.state.imageData.src;
        // this.image.addEventListener('load', this.handleLoad);

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
        // Пока запрос не работает
        // Возможно, проблема с CORS
        // Обработать ошибку 404 тоже где-то здесь
        // Вынести адрес api и префикс maps в константы
        // Переписать через .then, сейчас написано так только чтобы понять, где была ошибка (не нашлась)
        const request = async() => {
            let url = 'http://127.0.0.1:8000/api/maps/' + this.state.name + '/';
            const data = await fetch(url, {'method':"get"})
                .then(response => response.json())
                .catch(err => console.log('Send failed', err));

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
                map_image.src = 'http://127.0.0.1:8000' + this.state.imageData.image;
                map_image.addEventListener('load', this.handleLoad);
                this.setState({image: map_image, found: true});
            }
        };
        request();

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
    
    handleClick = (id) => {
        return e => {
            e.evt.preventDefault();
            this.setState({
                inform: this.state.imageData.inform[id],
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
        if (this.state.markersOpacity == 0) {
            return "15px";
        }
        return "-100px";

    }

    render() {
        if(this.state.pending || !this.state.loaded) {
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
                        {console.log(this.state)}
                        {this.state.imageData.marks.map(
                            //handleClick каррируется
                            //туда передается только id, аргумент e попадает при нажатии
                            marker_props => marker(Object.assign(marker_props,
                                {
                                    handler: this.handleClick,
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