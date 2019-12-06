import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import './App.css'

import Login from './components/Login/Login';
import SideBar from './components/PrimaryNav/PrimaryNav';
import UserRouter from './components/User/UserRouter';
import CourseHome from './components/Course/Home/CourseHome'
import { createBrowserHistory } from "history";
import PrivateRoute from './PrivateRoute'
import Setting from './components/Setting/setting'
import Sales from './components/Sales/Sales'
import Enrollment from './components/Emrollment/Enrollment'
import Dashboard from './components/Dashboard/Dashboard';
import CourseRouter from './components/Course/CourseRouter';

const customHistory = createBrowserHistory();

function App() {
  return (
    <>
      <Router history={customHistory}>
        <Switch>
          <Route exact path="/"> <Login /></Route>
          {/* <Route exact path="/"> <SideBar/><Dashboard/> </Route> */}
              
          <PrivateRoute path='/dashboard'> <SideBar/> <Dashboard/> </PrivateRoute>
          <PrivateRoute path='/course'> <SideBar/> <CourseRouter/> </PrivateRoute>
          <PrivateRoute path='/enroll'> <SideBar/> <Enrollment/>  </PrivateRoute>

          <PrivateRoute path="/user"><SideBar/> <UserRouter /></PrivateRoute>
          <PrivateRoute path='/sale'> <SideBar/> <Sales/> </PrivateRoute>
          <PrivateRoute path="/setting"> <SideBar /><Setting/> </PrivateRoute>

          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Router>
    </>
  );
}
function mapStateToProps(state) {
  const { student } = state;
  return {
      _id:student._id,
      identity: student.identity,
      status: student.status
  };
}
export default connect(mapStateToProps, {})(App);
// export default connect(mapStateToProps)(App);
