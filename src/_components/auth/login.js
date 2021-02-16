import React, { Component, Fragment } from 'react';
import LoginTabset from "./loginTabset";
import { ArrowLeft} from 'react-feather';

class Login extends Component {
    
    render() {
        
        return(
        <Fragment>
                <div className="page-wrapper">
                    <div className="authentication-box">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 p-0 card-right">
                                    <div className="card tab2-card">
                                        <div className="card-body">
                                            <LoginTabset />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a href="#" className="btn btn-primary back-btn"> <ArrowLeft /> back</a>
                        </div>
                    </div>
                </div>
        </Fragment>
        );
    }
}
export default Login;
