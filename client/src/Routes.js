import React from 'react';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import SignUp from './Auth/SignUp/SignUp';
import SignIn from './Auth/SignIn/SignIn';
import Home from './Home/Home';
import test from './Test';
import SharableFile from './SharableFile/SharableFile';
import Tesst from './tes';
import Starred from './Starred/Starred';
import AdminRoute from './AdminRoute';


const Routes = ()=> {
   return <BrowserRouter>
       <Switch>
       <AdminRoute path="/" exact component={Home}></AdminRoute>

        <Route path='/register' exact component={SignUp}></Route>
        <Route path='/signin' exact component={SignIn}></Route>
        <AdminRoute path='/starred' exact component={Starred}></AdminRoute>

        <Route path='/test' exact component={test}></Route>
        

        <Route path='/file/:filename' exact component={SharableFile}></Route>
        
       </Switch>
      </BrowserRouter>
}
export default Routes;
