import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Layouts from '../_components/layouts';

export const PrivateRout = ({component: Component, ...rest}) => {
    return <Route {...rest} render={props => {
        debugger;
        return localStorage.getItem('userDetails') ? <Layouts><Component {...props} /></Layouts> : <Redirect to={{pathname : 'auth/login', state: {from: props.location}}}/>
    }} />  

    // return <Route {...rest} render={props => {
    //     return localStorage.getItem('userDetails') ? <Layouts><Component {...props} /></Layouts> : 
    //         <Layouts><Component {...props} /></Layouts>
    // }} />  
}   