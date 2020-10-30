import React from "react";
import Login from "./login/Login";
import Register from "./register/Register";
import {Route, Switch} from "react-router-dom";
import MapPage from "./home/map/MapPage";
import MyProfile from "./home/myProfile/MyProfile";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Login}></Route>
                <Route exact path="/register" component={Register}></Route>
                <Route exact path="/map" component={MapPage}></Route>
                <Route exact path="/profile" component={MyProfile}></Route>
            </Switch>
        </div>
    );
}

export default App;
