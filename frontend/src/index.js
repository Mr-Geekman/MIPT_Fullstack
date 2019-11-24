import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './routes';
import HandledHeader from "./redux-components/containers/handled_header";
import Footer from "./components/footer";
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import { createStore} from "redux";
import reducer from "./redux-components/reducers";

let store = createStore(reducer);

const render = () =>
    ReactDOM.render(
        <React.Fragment>
            <BrowserRouter>
                <Provider store={store}>
                    <HandledHeader />
                    <MainRouter/>
                    <Footer/>
                </Provider>
            </BrowserRouter>
        </React.Fragment>,
        document.getElementById('root')
    );
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();