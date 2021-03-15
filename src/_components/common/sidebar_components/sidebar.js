import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { MENUITEMS } from "../../../_constants/menu";
import Logo from "../../../assets/images/SahosoftMallBachend-logo.png";
import UserPanel from "../../common/sidebar_components/user_panel";

class Sidebar extends Component {
    constructor() {
        super();
        this.state = {
            mainmenu: []
        }
    }

    componentWillMount() {
        this.setState({
            mainmenu: MENUITEMS
        });
    }

    setNavActive(item) {
        debugger;
        MENUITEMS.filter(menuItem => {
            if(menuItem != item) {
                menuItem.active = false;
            }
            if(menuItem.children && menuItem.children.includes(item)) {
                menuItem.active = true;
            }
            if(menuItem.children) {
                menuItem.children.filter(subSubMenuItems => {
                    if (subSubMenuItems != item) {
                        subSubMenuItems.active = false;
                    }
                    if(subSubMenuItems.children){
                        if(subSubMenuItems.children.includes(item)) {
                            subSubMenuItems.active = true;
                            menuItem.active = true;
                        }
                    }
                });
            }
        });


        item.active = !item.active;
        this.setState({
            mainmenu: MENUITEMS
        });
    }

    componentDidMount() {
        var currentUrl = window.location.pathname;
        this.state.mainmenu.filter(items => {
            if(!items.children) {
                if(items.path === currentUrl) {
                    this.setNavActive(items);
                    return false;
                }
            }
if(items.children) {
            items.children.filter(subItem => {
                if(subItem.path === currentUrl) {
                    this.setNavActive(subItem);
                }
                if(!subItem.children) {
                    return false;
                }

                subItem.children.filter(subSubItems => {
                    if(subSubItems.path === currentUrl) {
                        this.setNavActive(subSubItems);
                    }
                });
            });
        }
        });
    }
    



    render(){
        const mainmenu = this.state.mainmenu.map((menuItem, i) => {
            return <li className={`${menuItem.active ? 'active': ''}`} key={i}>
                {(menuItem.type === 'sub') ? 
                    <a className="sidebar-header" href="javascript:void(0);" onClick={() => this.setNavActive(menuItem)}>
                        <menuItem.icon />
                        <span>{menuItem.title}</span>
                        <i className="fa fa-angle-right pull-right"></i>
                    </a> : ''
                } 

                {
                    (menuItem.type === 'link') ? <Link to={`${process.env.PUBLIC_URL}${menuItem.path}`} 
                    className={`sidebar-header ${menuItem.active ? 'active' : ''}`}
                    onClick={() => this.setNavActive(menuItem)}
                    >
                        <menuItem.icon />
                        <span>{menuItem.title   }</span>
                        {menuItem.children ? <i className="fa fa-angle-right pull-right"></i> : ''}
                    </Link> : ''
                }

                { menuItem.children ? 
                    <ul className={`sidebar-submenu ${menuItem.active ? 'menu-open' : ''}`}>
                        {menuItem.children.map((childrenItem, index)=>{
                            //
                            return <li className={`${childrenItem.children ? childrenItem.active ? 'active' : '' : ''}`} key={index}>
                            {
                                (childrenItem.type === 'sub') ?
                                        <a href="javascript:void(0);" onClick={() => this.setNavActive(childrenItem)}>
                                            <i className="fa fa-circle"></i>
                                            <span>{childrenItem.title}</span>
                                    <i className="fa fa-angle-right pull-right"></i>
                                </a> : ''
                            }

                            {
                                    (childrenItem.type === 'link') ? 
                                    <Link to={`${process.env.PUBLIC_URL}${childrenItem.path}`}
                                        className={`${childrenItem.active ? 'active' : ''}`}
                                        onClick={() => this.setNavActive(childrenItem)}
                                >
                                        <i className="fa fa-circle"></i>
                                        <span>{childrenItem.title}</span>
                                </Link> : ''
                            }

                            {childrenItem.children ?
                                    <ul className={`sidebar-submenu ${childrenItem.active ? 'menu-open' : ''}`}>
                                        {childrenItem.children.map((childrenSubItem, index) => {
                                          return  <li className={`${childrenSubItem.active ? 'active' : ''}`} key={index}>
                                                {
                                                    (childrenSubItem.type === 'link') ? 
                                                    <Link to={`${process.env.PUBLIC_URL}${childrenSubItem.path}`}
                                                        className={`${childrenSubItem.active ? 'active' : ''}`}
                                                        onClick={() => this.setNavActive(childrenSubItem)}
                                                    >
                                                        <i className="fa fa-circle"></i>
                                                        <span>{childrenSubItem.title}</span>
                                                    </Link> : ''
                                                }
                                            </li>
                                        })}
                                    </ul>
                            : ''

                            }

                            </li>
                            //
                        })}
                    </ul>
                    : ''

                }

            </li>
        });

        return(
            <Fragment>
                <div className="page-sidebar">
                    <div className="main-header-left d-none d-lg-block">
                        <div className="logo-wrapper">
                            <Link to={`${process.env.PUBLIC_URL}/dashboard`}>
                            <img className="blur-up lazyloaded" alt="" src={Logo}/>
                            </Link>
                        </div>
                    </div>
                    <div className="sidebar custom-scrollbar">
                        <UserPanel />
                        <ul className="sidebar-menu">
                            {/* bind menu here */}
                            {mainmenu}
                        </ul>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Sidebar;