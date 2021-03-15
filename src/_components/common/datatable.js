import React, { Component, Fragment } from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class DataTable extends Component {
    constructor(props) {
        super(props);
        debugger;
        this.state = {
            myData: this.props.myData
        };
    }
    componentWillReceiveProps(nextProps) {
        debugger;
        this.setState({ myData: nextProps.myData });
    }

    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        const { showColumns, editRow, deleteRow, action } = this.props;
        //alert(this.props.action);
        //const { showColumns} = this.props;
        const { myData } = this.state;
        const columns = [];
        let colName = "";
        for (let key of showColumns) {
            debugger;
                colName = key.toString();
            

            if (key === "imagePath") {
                columns.push(
                    {
                        Header: <b>{this.Capitalize(colName)}</b>,
                        accessor: key,
                        Cell: (row) => {
                            console.log(row);
                            <img alt="_image" src={row.original.imagePath} style={{ width: 50, height: 50 }} />
                        },
                        style: {
                            textAlign: 'center'
                        },
                        sortable: false
                    }
                );
            } else {
                debugger;
                columns.push(
                    {
                        Header: <b>{this.Capitalize(colName)}</b>,
                        accessor: key,
                        style: {
                            textAlign: 'center'
                        }
                    }
                );
            }
         }
        if(!action) {
        columns.push(
            {
                Header: <b>Actions</b>,
                accessor: 'delete',
                Cell: (row) => (
                    <div>
                        <span onClick={() => {
                            let data = myData[row.index];
                            deleteRow(data.id);
                        }} >
                            <i class="fa fa-trash-o"></i>
                        </span>

                        <span onClick={() => {
                            let data = myData[row.index];
                            editRow(data);
                        }} >
                            <i class="fa fa-edit"></i>
                        </span>
                    </div>
                ),
                style: {
                    textAlign: 'center'
                },
                sortable: false
            }
        
        )
        }

        return (
            <Fragment>
                <ReactTable
                    noDataText="Loading..."
                    data={myData}
                    columns={columns}
                    minRows={0}
                    defaultPageSize={(myData.length > 5 ? 5 : myData.length) === 0 ? 5 : myData.length}
                    showPagination={myData.length > 5 ? true : false}
                />
                <ToastContainer />
            </Fragment>
        )
    }
}

