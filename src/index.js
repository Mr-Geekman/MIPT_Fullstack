// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import Header from "./components/header";
// import Footer from './components/footer';
// import Main from './components/main'
// import * as serviceWorker from './serviceWorker';
//
// ReactDOM.render(
//     <React.Fragment>
//         <Header/>
//         <Main/>
//         <Footer/>
//     </React.Fragment>,
//     document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();






import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './routes';
const render = () =>
    ReactDOM.render(
            <BrowserRouter>
                <MainRouter/>
            </BrowserRouter>,
        document.getElementById('root')
    );
render();