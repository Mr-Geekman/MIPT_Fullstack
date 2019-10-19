import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import Main from "./../components/main";
import Gallery from "./../components/gallery";
import PageNotFound from "./../components/page_not_found"

const MainRouter = () => (
    <Switch>
        <Route exact path='/' component={Main}/>
        <Route exact path='/gallery' component={Gallery}/>
        <Route path='*' component={PageNotFound}/>
    </Switch>
);

export default withRouter(MainRouter);