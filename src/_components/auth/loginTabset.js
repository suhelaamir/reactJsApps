import React, { Component, Fragment } from 'react';
import { Tabs,TabList,TabPanel,Tab } from "react-tabs";
import { User, Unlock, Flag } from "react-feather";

//HOC
import { withRouter } from "react-router-dom";
//for popup notification
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//login API call from the service
import { userService } from "../../_services/login/user.service";
//read the current router history
import { history } from "../../_helpers/history";
//connect the redux
import { connect } from "react-redux";
import { changeLoggedIn } from "../../_actions/user.actions";

//validatation
import validator from "validator";
import FormValidator from "../../_validators/formValidator";

class LoginTabset extends Component {
    constructor(props) {
        super(props);
        this.validatorLogin = new FormValidator([
            {
                field: 'userName',
                method: 'isEmpty',
                validWhen: false,
                message: 'UserName is required'
            },
            {
                field: 'userName',
                method: 'isEmail',
                validWhen: true,
                message: 'Enter valid UserName'
            },
            {
                field: 'password',
                method: 'isEmpty',
                validWhen: false,
                message: 'Password is required'
            }
        ]);

        this.validatorReg = new FormValidator([
            {
                field: 'firstName',
                method: 'isEmpty',
                validWhen: false,
                message: 'firstName is required'
            },
            {
                field: 'lastName',
                method: 'isEmpty',
                validWhen: false,
                message: 'lastName is required'
            },
            {
                field: 'email',
                method: 'isEmpty',
                validWhen: false,
                message: 'email is required'
            },
            {
                field: 'email',
                method: 'isEmail',
                validWhen: true,
                message: 'Enter valida email'
            },
            {
                field: 'password',
                method: 'isEmpty',
                validWhen: false,
                message: 'password is required'
            },
            {
                field: 'confirmPassword',
                method: 'isEmpty',
                validWhen: false,
                message: 'confirm Password is required'
            },
            {
                field: 'confirmPassword',
                method: this.passwordMatch,
                validWhen: true,
                message: 'Password and Confirm Password do not match',
            }
        ]);

        this.state = {
            tabIndex: 0,

            userName: '',
            password: '',
            loginSubmitted: false,

            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                userTypeId: 1
            },
            regSubmitted: false,
            validationReg: this.validatorReg.valid(),
            validationLogin: this.validatorLogin.valid()
        };
    }

    passwordMatch = (confirmPassword, state) => {
        return state.user.password === confirmPassword;
    }

    handleChange(event) {
        event.preventDefault();
        const [name, value] = event.target;
        this.setState({[name]: value});
    }

    tabChange(index) {
        this.setState({tabIndex: index});
    }

    render() {
        //destructuring the state value
        const {userName, password, loginSubmitted, user, regSubmitted} = this.state;
        return (
            <div>
                <Fragment>
                    <Tabs selectedIndex={this.state.tabIndex} onSelect={(tabIndex) => this.tabChange(tabIndex)}>
                        <TabList className="nav nav-tabs tab-coupon">
                            <Tab className="nav-link"><Unlock/> Login</Tab>
                            <Tab className="nav-link"><User/> Register</Tab>
                        </TabList>
                    <TabPanel>
                        Login Form
<form className="form-horizontal auth-form">
                            <div className='form-group'>
                                <input name="userName" type="email" className="form-control"
                                    placeholder="Username" />
                            </div>
                            <div className='form-group'>
                                <input name="password" type="password" className="form-control"
                                    placeholder="Password" />

                            </div>
                            <div className="form-button">
                                <button className="btn btn-primary" type="submit" >Login</button>
                            </div>
                        </form>
                    </TabPanel>
                    <TabPanel>
                        Registration Form
<form className="form-horizontal auth-form" >
                            <div className="form-group">
                                <input name="firstName" type="text" className='form-control'
                                    placeholder="First Name" />
                            </div>
                            <div className="form-group">
                                <input name="lastName" type="text" className='form-control'
                                    placeholder="Last Name" />

                            </div>
                            <div className="form-group">
                                <input name="email" type="email" className='form-control'
                                    placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <input name="password" type="password" className='form-control'
                                    placeholder="Password" />

                            </div>
                            <div className="form-group">
                                <input name="confirmPassword" type="password" className='form-control'
                                    placeholder="Confirm Password" />

                            </div>
                            <div className="form-button">
                                <button className="btn btn-primary" type="submit">Register</button>
                            </div>
                        </form>
                    </TabPanel>
                    </Tabs>
                </Fragment>
                <ToastContainer />
            </div>
        )
    }
}

const mapStoreToProps = (state) =>{
    return {
        user: state.user
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setLoggedIn: (isLoggedIn, user) => {
            dispatch(changeLoggedIn(isLoggedIn, user))
        }
    }
};

export default connect(mapStoreToProps, mapDispatchToProps)(withRouter(LoginTabset));

