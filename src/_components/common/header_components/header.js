import React, { Component, Fragment } from 'react'
import User_Menu from "./user_menu";
import { AlignLeft } from "react-feather";
//Image
import Logo from "../../../assets/images/SahosoftMallBachend-logo.png";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebar: true
        };
    }

    OpenCloseSidebar = () => {
        if(this.state.sidebar){
            this.setState({sidebar: false});
            document.querySelector(".page-main-header").classList.add('open');
            document.querySelector(".page-sidebar").classList.add('open');
        } else {
            this.setState({ sidebar: true});
            document.querySelector(".page-main-header").classList.remove('open');
            document.querySelector(".page-sidebar").classList.remove('open');
        }
    }

    render() {
        return(
            <Fragment>
            <div className="page-main-header ">
                <div className="main-header-right row">
                    <div className="main-header-left d-lg-none" >
                        <div className="logo-wrapper">
                            <a href="index.html">
                                    <img className="blur-up lazyloaded" alt="Logo Image" src={Logo} />
                            </a>
                        </div>
                    </div>
                    <div className="mobile-sidebar">
                        <div className="media-body text-right switch-sm">
                                <label className="switch"><a onClick={this.OpenCloseSidebar}><AlignLeft /></a></label>
                        </div>
                    </div>
                    <div className="nav-right col">
                        <ul className="nav-menus open">
                            <li>
                                <User_Menu />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            </Fragment>
        );
    }
}

export default Header;