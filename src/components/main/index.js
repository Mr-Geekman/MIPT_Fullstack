import React, {Component} from 'react';
import './styles.css';
import Slider from "./slider";

class Main extends Component {

    render() {
        return (
            <div className="content">
                <main>
                    <article>
                        <h1>Gaze</h1>
                        <p>
                            Это проект по просмотру и созданию интерактивных карт.
                            Вы можете рассматривать картины великих художников...
                        </p>
                        <h2>Галерея</h2>
                        <p>
                            Ниже вы можете посмотреть небольшие примеры карт,
                            которые могут получиться.
                        </p>
                        <Slider />
                    </article>
                </main>
            </div>
        );
    }
}

export default Main;
