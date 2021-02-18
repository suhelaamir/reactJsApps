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

        this.handleChange = this.handleChange.bind(this);
        this.doLogin = this.doLogin.bind(this);

        this.logout();
    }

    passwordMatch = (confirmPassword, state) => {
        return state.user.password === confirmPassword;
    }

    handleChange(event) {
        event.preventDefault();
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    tabChange = (index) => {
        this.setState({tabIndex: index});
    }

    async doLogin(event) {
        debugger;
        event.preventDefault();
        const validation = this.validatorLogin.validate(this.state, '');
        this.setState({validationLogin: validation});

        //update the state of input
        this.setState({loginSubmitted: true});
        const {userName, password} = this.state;

        //make a call to API
        if(validation.isValid) {
            debugger;
            userService.login(userName, password)
            .then(
                res => {
                    debugger;
                if(res.isSuccess) {
                    if(res.data.id === 0) {
                        this.clearLoginForm();
                        toast.error("Please enter valid username and password !!", 'Login');
                        localStorage.removeItem("userDetails");
                    } else {
                        localStorage.setItem("userDetails", JSON.stringify(res.data));
                        this.props.setLoggedIn(true, res.data);
                        this.clearLoginForm();
                        history.push('/dashboard');
                    }
                } else {
                    this.clearLoginForm();
                    toast.error("Invalid credentials !!", "Login");
                    localStorage.removeItem("userDetails");
                }
            },
            error => {
                toast.error("something went wrong, Please try again !!", 'Login');
                this.clearLoginForm();
            }
            );
        }
    }

    clearLoginForm = () => {
        this.setState({
            userName: '',
            password: ''
        });
    }

    logout = () => {
        localStorage.clear();
        //update the store with blank data once logout
        this.props.setLoggedIn(false, {});
    }


    render() {
        //destructuring the state value
        const {userName, password, loginSubmitted, user, regSubmitted} = this.state;
        let _validationReg = regSubmitted ? this.validatorReg.validate(this.state, 'user') : this.state.validationReg;
        let _validatingLogin = loginSubmitted ? this.validatorLogin.validate(this.state, '') : this.state.validationLogin;
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
<form className="form-horizontal auth-form" onSubmit={this.doLogin}>
                            <div className='form-group'>
                                <input name="userName" type="email" 
                                className={"form-control" + (_validatingLogin.userName.isInvalid ? 'has-error' : '')}
                                    placeholder="Username" value={userName} onChange={this.handleChange}/>
                                    {
                                        _validatingLogin.userName.isInvalid && 
                                        <div className="help-block">
                                            {_validatingLogin.userName.message}
                                        </div>
                                    }
                            </div>
                            <div className='form-group'>
                                <input name="password" type="password" 
                                className={"form-control" + (_validatingLogin.password.isInvalid ? 'has-error' : '')}
                                    placeholder="Password" value={password} onChange={this.handleChange}/>
                                    {
                                        _validatingLogin.password.isInvalid && 
                                        <div className="help-block">
                                            {_validatingLogin.password.message}
                                        </div>
                                    }

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

