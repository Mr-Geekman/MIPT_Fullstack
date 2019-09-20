import React, {Component} from 'react';
import './styles.css';

class Main extends Component {
    render() {
        return (
            <div className="content">
                <main>
                    <article>
                        <h1>MapWatching</h1>
                        <p>
                            Это проект по просмотру и созданию интерактивных карт.
                            Вы можете рассматривать картины великих художников...
                        </p>
                        <h2>Галерея</h2>
                        <p>
                            Ниже вы можете посмотреть небольшие примеры карт,
                            которые могут получиться.
                        </p>
                        <div className="slider">
                            <a href="#slide-1">1</a>
                            <a href="#slide-2">2</a>
                            <a href="#slide-3">3</a>

                            <div className="slides">
                                <div id="slide-1">
                                    <span className='title'>Карта средиземья</span>
                                </div>
                                <div id="slide-2">
                                    <span className='title'>Карта миров Лавкрафта</span>
                                </div>
                                <div id="slide-3">
                                    <span className='title'>Поклонение волхвов</span>
                                </div>
                            </div>
                        </div>
                    </article>
                </main>
            </div>
        );
    }
}

export default Main;
