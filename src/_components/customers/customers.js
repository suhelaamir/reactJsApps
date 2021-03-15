import React, { Component, Fragment } from 'react'

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { userService } from '../../_services/login/user.service'
import FormValidator from "../../_validators/formValidator";

import DbOperation from '../../_helpers/dbOperation';

import Breadcrumb from '../../_components/common/breadcrumb';
import DataTable from '../common/datatable';


import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class Customers extends Component {

    constructor(props) {
        super(props);

        this.validatorForm = new FormValidator([
            {
                field: 'name',
                method: 'isEmpty',
                validWhen: false,
                message: 'Name is required'
            }, 
            {
                field: 'mobileNumber',
                method: 'isEmpty',
                validWhen: false,
                message: 'MobileNumber is required'
            },
            {
                field: 'address',
                method: 'isEmpty',
                validWhen: false,
                message: 'Address is required'
            },
            {
                field: 'smsMessage',
                method: 'isEmpty',
                validWhen: false,
                message: 'SmsMessage is required'
            },
            {
                field: 'modelName',
                method: 'isEmpty',
                validWhen: false,
                message: 'ModelName is required'
            },
            {
                field: 'modelNumber',
                method: 'isEmpty',
                validWhen: false,
                message: 'ModelNumber is required'
            },
            {
                field: 'amount',
                method: 'isEmpty',
                validWhen: false,
                message: 'Amount is required'
            }
            // ,
            // {
            //     field: 'endDate',
            //     method: 'isEmpty',
            //     validWhen: false,
            //     message: 'EndDate is required'
            // }
        ]);

        this.state = {
            dbops: DbOperation.create,
            btnText: "Save",
            data: [],
            open: false, 
            customer: {
                id: 0,
                name: '',
                mobileNumber: '',
                emailId: '',
                address: '',
                smsMessage: '',
                modelName: '',
                modelNumber: '',
                amount:0,
                endDate:''
            },
            submitted: false,
            formValidation: this.validatorForm.valid(),
            startDate: new Date()
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        const { customer } = this.state;
        this.setState({
            customer: {
                ...customer,
                [name]: value
            }
        });
    }
    clearForm = () => {
        this.setState({
            customer: {
                id: 0,
                name: '',
                mobileNumber: '',
                emailId: '',
                address: '',
                smsMessage: '',
                modelName: '',
                modelNumber: '',
                amount: '',
                endDate: ''
            },
            startDate:new Date()
        });
    }

    handleSubmit(event) {
        debugger;
        event.preventDefault();
        this.setState({ submitted: true });
        //const { customer, dbops } = this.state;
        const { customer, dbops, startDate } = this.state;
        customer.endDate = startDate.toLocaleDateString();
        // this.setState({
        //     customer: {
        //         ...customer,
        //         {customer.endDate: startDate}
        //     }
        // });
debugger;
        const validation = this.validatorForm.validate(this.state, 'customer');
        this.setState({ formValidation: validation });
debugger;
        if (validation.isValid) {
            switch (dbops) {
                case DbOperation.create:
                    userService.save(customer)
                        .then(
                            res => {
                                if (res.isSuccess) {
                                    toast.success("Data Saved successfully !!", "Customer");
                                    this.getData();
                                    this.clearForm();
                                    this.onCloseModal();
                                } else {
                                    toast.error(res.errors[0], "Customer");
                                }
                            },
                            error => {
                                toast.error("Something went wrong", "Customer");
                            }
                        );
                    break;
                case DbOperation.update:
                    userService.update(customer)
                        .then(
                            res => {
                                if (res.isSuccess) {
                                    toast.success("Data Updated successfully !!", "Customer");
                                    this.getData();
                                    this.clearForm();
                                    this.onCloseModal();
                                } else {
                                    toast.error(res.errors[0], "Customer");
                                }
                            },
                            error => {
                                toast.error("Something went wrong", "Customer");
                            }
                        );
                    break;

            }

        }
    }
    componentDidMount() {
        this.getData();
    }


    onOpenModal = () => {
        this.setState({ open: true, btnText: "Save", dbops: DbOperation.create });
        this.clearForm();
    }
    onCloseModal = () => {
        this.setState({ open: false, btnText: "Save", dbops: DbOperation.create });
        this.clearForm();
    }

    getData = () => {
        userService.getAll()
            .then(
                res => {
                    if (res.isSuccess) {
                        this.setState({ data: res.data });
                    } else {
                        toast.error(res.errors[0], "Size Master");
                    }
                },
                error => {
                    toast.error("Something went wrong", "Size Master");
                }
            )
    };

    onEdit = (objRow) => {
        debugger;
        this.setState({ open: true, btnText: 'Update', dbops: DbOperation.update });
        this.setState({
            customer: {
                id: objRow.id,
                name: objRow.name,
                mobileNumber: objRow.mobileNumber,
                emailId: objRow.emailId,
                address: objRow.address,
                smsMessage: objRow.smsMessage,
                modelName: objRow.modelName,
                modelNumber: objRow.modelNumber,
                amount: objRow.amount,
                endDate: objRow.endDate
            }
        });
    }
    onDelete = (Id) => {
        let obj = {
            id: Id
        };

        userService.delete(obj)
            .then(
                res => {
                    if (res.isSuccess) {
                        this.getData();
                        toast.success("Your record has been deleted !!", "Customer");
                    } else {
                        toast.error(res.errors[0], "Customer");
                    }
                },
                error => {
                    toast.error("Something went wrong", "Customer");
                }
            )
    }

    handleChange = (date) => {
        this.setState({
            startDate: date
        })
    }

    // onFormSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(this.state.startDate.toLocaleDateString())
    // }

    render() {
        debugger;
        const { open, data, btnText, customer, submitted } = this.state;
        let _validation = submitted ? this.validatorForm.validate(this.state, 'customer') : this.state.formValidation;
        let allColumns = ['id', 'name', 'mobileNumber', 'emailId', 'address', 'smsMessage', 'status', 'modelName', 'modelNumber', 'amount', 'endDate'];
        return (
            <Fragment>
                <Breadcrumb title="Customers" parent="Masters" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Customers</h5>
                                </div>
                                <div className="card-body">
                                    <div className="btn-popup pull-right">
                                        <button type="button" className="btn btn-primary" onClick={this.onOpenModal}>Add Customer</button>
                                        <Modal 
                                        open={open} onClose={this.onCloseModal}>
                                            <div className="modal-header">
                                                <h5 className="modal-title f-w-600" id="exampleModalLabel2">Add Customer</h5>
                                            </div>
                                            <div className="modal-body">
                                                <form onSubmit={this.handleSubmit} >
                                                    <div>
                                                        <label htmlFor="recipient-name" className="col-form-label" >Name :</label>
                                                    </div>
                                                    <div className="form-group">
                                                        
                                                        <input type="text" name="name"
                                                            className={"form-control " + (_validation.name.isInvalid ? "has-error" : "")}
                                                            value={customer.name} onChange={this.handleInputChange}
                                                        />
                                                        {_validation.name.isInvalid &&
                                                            <div className="help-block" >{_validation.name.message}</div>
                                                        }
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="recipient-name" className="col-form-label" >Mobile Number :</label>
                                                        <input type="text" name="mobileNumber"
                                                            className={"form-control " + (_validation.mobileNumber.isInvalid ? "has-error" : "")}
                                                            value={customer.mobileNumber} onChange={this.handleInputChange}
                                                        />
                                                        {_validation.mobileNumber.isInvalid &&
                                                            <div className="help-block" >{_validation.mobileNumber.message}</div>
                                                        }
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="recipient-name" className="col-form-label" >EmailId :</label>
                                                        <input type="text" name="emailId"
                                                            className="form-control"
                                                            value={customer.emailId} onChange={this.handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="recipient-name" className="col-form-label" >Address :</label>
                                                        <input type="text" name="address"
                                                            className={"form-control " + (_validation.address.isInvalid ? "has-error" : "")}
                                                            value={customer.address} onChange={this.handleInputChange}
                                                        />
                                                        {_validation.address.isInvalid &&
                                                            <div className="help-block" >{_validation.address.message}</div>
                                                        }
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="recipient-name" className="col-form-label" >SmsMessage :</label>
                                                        <input type="text" name="smsMessage"
                                                            className={"form-control " + (_validation.smsMessage.isInvalid ? "has-error" : "")}
                                                            value={customer.smsMessage} onChange={this.handleInputChange}
                                                        />
                                                        {_validation.smsMessage.isInvalid &&
                                                            <div className="help-block" >{_validation.smsMessage.message}</div>
                                                        }
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="recipient-name" className="col-form-label" >ModelName :</label>
                                                        <input type="text" name="modelName"
                                                            className={"form-control " + (_validation.modelName.isInvalid ? "has-error" : "")}
                                                            value={customer.modelName} onChange={this.handleInputChange}
                                                        />
                                                        {_validation.modelName.isInvalid &&
                                                            <div className="help-block" >{_validation.modelName.message}</div>
                                                        }
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="recipient-name" className="col-form-label" >ModelNumber :</label>
                                                        <input type="text" name="modelNumber"
                                                            className={"form-control " + (_validation.modelNumber.isInvalid ? "has-error" : "")}
                                                            value={customer.modelNumber} onChange={this.handleInputChange}
                                                        />
                                                        {_validation.modelNumber.isInvalid &&
                                                            <div className="help-block" >{_validation.modelNumber.message}</div>
                                                        }
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="recipient-name" className="col-form-label" >Amount :</label>
                                                        <input type="text" name="amount"
                                                            className={"form-control " + (_validation.amount.isInvalid ? "has-error" : "")}
                                                            value={customer.amount} onChange={this.handleInputChange}
                                                        />
                                                        {_validation.amount.isInvalid &&
                                                            <div className="help-block" >{_validation.amount.message}</div>
                                                        }
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="recipient-name" className="col-form-label" >EndDate :</label>
                                                        {/* <input type="text" name="endDate"
                                                            className={"form-control " + (_validation.endDate.isInvalid ? "has-error" : "")}
                                                            value={customer.endDate} onChange={this.handleInputChange}
                                                        />
                                                        {_validation.endDate.isInvalid &&
                                                            <div className="help-block" >{_validation.endDate.message}</div>
                                                        } */}
                                                        <DatePicker 
                                                            selected={this.state.startDate}
                                                            onChange={this.handleChange}
                                                            name="startDate"
                                                            dateFormat="MM/dd/yyyy"
                                                        />
                                                    </div>  
                                                    <div className="modal-footer">
                                                        <button type="submit" className="btn btnprimary">{btnText}</button>
                                                        <button type="button" className="btn btnsecondary" onClick={() => this.onCloseModal()} >Close</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                                        <DataTable
                                            myData={data}
                                            showColumns={allColumns}
                                            pagination={true}
                                            editRow={this.onEdit}
                                            deleteRow={this.onDelete}
                                            isAction
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </Fragment>
        );
    }
}
export default Customers;