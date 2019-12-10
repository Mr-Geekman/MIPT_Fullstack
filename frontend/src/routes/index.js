import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import Main from "./../components/main";
import Gallery from "./../components/gallery";
import PageNotFound from "./../components/pageNotFound"
import Map from "./../components/map"
import AuthorizationForm from "../components/authorization";

const MainRouter = () => (
    <Switch>
        <Route exact path='/' component={Main}/>
        <Route exact path='/gallery' component={Gallery}/>
        <Route path="/maps/:name" component={Map}/>
        <Route path="/authorization" component={AuthorizationForm}/>
        <Route path='*' component={PageNotFound}/>
    </Switch>
);

export default withRouter(MainRouter);