import { Route, Switch } from 'react-router';

import React from 'react';
import Header from './common/Header';
import NotFound from './common/NotFound';
import CardList from './home/CardList';
import User from './user/User';

function App() {
    return (
        <React.Fragment>
            <Header />
            <Switch>
                <Route exact path='/'>
                    <CardList />
                </Route>
                <Route path='/users/:userId'>
                    <User />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </React.Fragment>
    );
}

export default App;
