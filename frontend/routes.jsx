import React from "react";
import {Route, IndexRoute} from "react-router";
import NotFound from "./components/NotFound";
import App from "./containers/App";
import LoginBox from "./components/LoginBox";
import SearchOccupBox from "./components/SearchOccupBox"
import AddOccupBox from "./components/AddOccupBox";
import MainLayout from "./components/MainLayout";

/*
 import Admin from './components/Admin'
 import List from './components/List'
 import Genre from './components/Genre'
 import Release from './components/Release'
 import Home from './components/Home'
 import LoginPage from './containers/LoginPage'
 import requireAuthentication from './containers/AuthenticatedComponent'

 export const routes = (
 <div>
 <Route path='/' component={App}>
 <IndexRoute component={Home} />
 <Route path='/admin' component={requireAuthentication(Admin)} />
 <Route path='/genre/:genre' component={Genre}>
 <Route path='/genre/:genre/:release' component={Release} />
 </Route>
 <Route path='/list' component={List} />
 <Route path='/login' component={LoginPage} />
 </Route>
 <Route path='*' component={NotFound} />
 </div>
 )
 */

export const routes = (
    <div>
        <Route path='/' component={App}>
            <IndexRoute component={LoginBox} />
            <Route component={MainLayout}>
                <Route path="add" component={AddOccupBox} />
                <Route path="search*" component={SearchOccupBox} />
            </Route>
            <Route path='*' component={NotFound} />
        </Route>
    </div>
);
