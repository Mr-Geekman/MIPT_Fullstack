import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import Main from "./../components/main";
import Gallery from "./../components/gallery";

const MainRouter = () => (
    <Switch>
        <Route exact path='/' component={Main}/>
        <Route path='/gallery' component={Gallery}/>
    </Switch>
);

export default withRouter(MainRouter);