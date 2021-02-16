import React, { Component, Fragment } from 'react'

import Sidebar from './common/sidebar_components/sidebar';
import Footer from './common/footer';
import Header from "./common/header_components/header";

class Layouts extends Component {
    render() {
        return(
            <Fragment>
                <div className="page-wrapper">
                    <Header />
                    <div className="page-body-wrapper">
                        <Sidebar/>
                        <div className="page-body">
                            {this.props.children}
                        </div>
                        <Footer />
                    </div>
                </div>
            </Fragment>
        );
    }
}
export default Layouts;