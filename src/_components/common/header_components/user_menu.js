import React, { Component, Fragment } from 'react';
import man from "../../../assets/images/user.png";
import {Link} from 'react-router-dom';
import { User, LogOut } from "react-feather";

class User_Menu extends Component{
    render() {
        return(
            <Fragment>
                <ul>
                    <li className="onhover-dropdown">
                        <div className="align-items-center">
                            <img className="align-self-center pull-right img-50 rounded-circle blur-up
lazyloaded" alt="header-user" src={man} />
                            <div className="dotted-animation"><span className="animatecircle"></span><span className="main-circle"></span></div>
                        </div>
                        <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                            <li> <Link to={`${process.env.PUBLIC_URL}/settings/profile`}><User/>Edit Profile</Link> </li>
                            <li> <Link to={`${process.env.PUBLIC_URL}/auth/login`}><LogOut/>Logout</Link> </li>
                        </ul>
                    </li>
                </ul>
            </Fragment>
        );
    }
}
export default User_Menu;