import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './routes';
import Header from "./components/header";
import Footer from './components/footer';
import * as serviceWorker from './serviceWorker';

const render = () =>
    ReactDOM.render(
        <React.Fragment>
            <BrowserRouter>
                <Header/>
                <MainRouter/>
                <Footer/>
            </BrowserRouter>
        </React.Fragment>,
        document.getElementById('root')
    );
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();