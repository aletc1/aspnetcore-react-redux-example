import * as React from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/home';
import { Shell } from './shell';

export const routes = <Shell>
    <Route exact path='/' component={Home} />
</Shell>;
