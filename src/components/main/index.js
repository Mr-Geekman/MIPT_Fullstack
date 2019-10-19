import React, {Component} from 'react';
import Header from "../../components/header";
import Footer from '../../components/footer';
import './styles.css';
import Slider from "./slider";

class Main extends Component {

    render() {
        return (
            <React.Fragment>
                {/*<Header/>*/}
                <div className="content">
                    <main>
                        <article>
                            <div className="full_dark_logo">
                                Gaze
                            </div>
                            <h2>О проекте</h2>
                            <p>
                                Это проект по просмотру и созданию интерактивных карт. Вы можете как сами создавать и редактировать
                                карты, так и знакомиться с работами других пользователей. Наш сервис поддерживает возможность добавления
                                меток на карты, а также создание аудиосопровождения. Таким образом вы сможете познакомиться с творчеством
                                как великих художников, так и великих писателей, трудолюбиво воспроизведенными их фанатами в виде заметок
                                на изображениях. Да что там, человечество давно придумало тысячу и один способ применения интерактивных
                                карт.
                            </p>
                            <p>Так что присоединяйтесь к нам и попробуйте придумать еще один!</p>
                            <h2>Галерея</h2>
                            <p>
                                Ниже вы можете посмотреть небольшие примеры карт,
                                которые могут получиться.
                            </p>
                            <Slider />
                        </article>
                    </main>
                </div>
                {/*<Footer/>*/}
            </React.Fragment>
        );
    }
}

export default Main;
