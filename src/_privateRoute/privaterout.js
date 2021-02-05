import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import App from '../_components/app';

export const PrivateRout = ({component: Component, ...rest}) => {
    return <Route {...rest} render={props => {
        return localStorage.getItem('userDetails') ? <App><Component {...props} /></App> : <Redirect to={{pathname : 'auth/login', state: {from: props.location}}}/>
    }} />
    
}   