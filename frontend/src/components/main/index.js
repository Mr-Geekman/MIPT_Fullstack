import React, {Component} from 'react';
import BootstrapSlider from "./BootstrapSlider";
import './styles.css';

class Main extends Component {

    render() {
        return (
            <React.Fragment>
                {/*<Header/>*/}
                <div className="content">
                    <main>
                        <article>
                            <div className="full-dark-logo">
                                Gaze
                            </div>
                            <h2>О проекте</h2>
                            <p>
                                Это проект по просмотру интерактивных карт. Возможность создания пока доступна лишь весьма ограниченному кругу лиц.
                                На данный момент для просмотра доступны лишь три (см. Галерею), но мы убеждены, что они стоят вашего внимания. Желаем вам приятно и с пользой провести время ;)
                            </p>
                            <h2>Галерея</h2>
                            <p>
                                Ниже вы можете посмотреть несколько примеров интерактивных карт. В будущем еще больше можно будет найти на отдельной странице.
                            </p>
                            <div className="slider-wrapper">
                                <BootstrapSlider />
                            </div>
                            <h2>Авторы</h2>
                            <p>
                                Два студента МФТИ. См. на GitHub <a href="https://github.com/TulaShlyosberg">TulaShloysberg</a> и <a href="https://github.com/Mr-Geekman/">mrgeekman</a>.
                            </p>
                        </article>
                    </main>
                </div>
                {/*<Footer/>*/}
            </React.Fragment>
        );
    }
}

export default Main;
