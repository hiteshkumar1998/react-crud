import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import StudentList from "./StudentList";
import EditStudent from './EditStudent';
import AddStudent from './AddStudent';
const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Route exact path="/" component={StudentList} />
        <Route exact path="/students" component={StudentList} />
        <Route exact path="/AddStudent" component={AddStudent} />
        <Route exact path="/student/edit/:id" component={EditStudent} />
    </Router>
    , document.getElementById("root"));
