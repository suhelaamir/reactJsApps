import React, { Component, Fragment } from 'react';
import {userService} from '../../_services/login/user.service';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Breadcrumb from '../../_components/common/breadcrumb';
import DataTable from '../common/datatable';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        this.getData();
    }
   
    getData = () => {
        debugger;
        userService.getAll()
            .then(
                res => {
                    if (res.isSuccess) {
                        this.setState({ data: res.data });
                    } else {
                        toast.error(res.errors[0], "Customers");
                    }
                },
                error => {
                    toast.error("Something went wrong", "Customers");
                }
            )
    };

    render() {
        const { data } = this.state;
        let allColumns = ['id', 'name', 'mobileNumber', 'emailId', 'address', 'smsMessage', 'modelName', 'modelNumber', 'amount', 'endDate', 'status'];
        return (
            <Fragment>
                <Breadcrumb title="Dashboard" parent="Masters" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Paid Customers</h5>
                                </div>
                                <div className="card-body">
                                    
                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                                        {/* <ReactTable
                                            data={data}
                                            columns={columns}
                                            defaultPageSize={2}
                                            pageSizeOptions={[2, 4, 6]}
                                        /> */}

                                        <DataTable
                                            myData={data}
                                            showColumns={allColumns}
                                            pagination={true}
                                            // editRow={this.onEdit}
                                            // deleteRow={this.onDelete}
                                            action={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
                <ToastContainer />
            </Fragment>
        )
    }
}

