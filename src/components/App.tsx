import React from "react";
import { Route, Switch } from "react-router-dom";
import UserPage from "./UserPage";
import UserList from "./UserList";
import Group from "./Group";
import Header from "./Header";
import { UsersContextProvider } from "../contexts/UsersContext";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <div className="container-fluid" id="app">
            <UsersContextProvider>
                <Header />

                <Switch>
                    <Route exact path="/" component={UserList} />
                    <Route path="/user/:id?" component={UserPage} />
                    <Route path="/groups" component={Group} />
                </Switch>
                <ToastContainer autoClose={3000} hideProgressBar />
            </UsersContextProvider>
        </div>
    );
}

export default App;
