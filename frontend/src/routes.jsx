import React from "react";
import {Route, IndexRoute} from "react-router";
import NotFound from "./components/NotFound";
import App from "./containers/App";
import LoginBox from "./components/LoginBox";
import SearchOccupBox from "./components/SearchOccupBox"
import AddOccupBox from "./components/AddOccupBox";
import HelpBox from "./components/HelpBox";
import MainLayout from "./components/MainLayout";
import CtrlDcBox from "./components/CtrlDcBox";
import AboutBox from "./components/AboutBox";

export const routes = (
    <div>
        <Route path='/' component={App}>
            <IndexRoute component={LoginBox} />
            <Route path="about" component={AboutBox} />
            <Route component={MainLayout}>
                <Route path="add" component={AddOccupBox} />
                <Route path="search*" component={SearchOccupBox} />
                <Route path="ctrldict" component={CtrlDcBox}/>
                <Route path="help" component={HelpBox}/>
            </Route>
            <Route path='*' component={NotFound} />
        </Route>
    </div>
);
