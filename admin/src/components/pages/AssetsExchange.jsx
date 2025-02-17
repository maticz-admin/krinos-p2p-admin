import React, { Component, Fragment } from "react";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import ReactDatatable from '@ashvin27/react-datatable';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import AssetAddModal from "../partials/AssetAddmodal.jsx";
import AssetUpdateModal from "../partials/AssetupdateModal.jsx";
import { toast, ToastContainer} from "react-toastify";
import $ from 'jquery';
import keys from "../../actions/config";
const url = keys.baseUrl;

class Perpetual extends Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                key: "pair",
                text: "Assets",
                className: "pair",
                align: "left",
                sortable: true,
                width:200
            },
            {
                key: "action",
                text: "Action",
                className: "action",
                width: 100,
                align: "left",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                data-toggle="modal"
                                data-target="#update-perpetual-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editRecord(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => this.deleteRecord(record)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ];

        this.config = {
            page_size: 10,
            length_menu: [ 10, 20, 50 ],
            filename: "Perpetual",
            no_data_text: 'No Exchange data found!',
            language: {
                length_menu: "Show _MENU_ result per page",
                filter: "Filter in records...",
                info: "Showing _START_ to _END_ of _TOTAL_ records",
                pagination: {
                    first: "<<",
                    previous: "<",
                    next: ">",
                    last: ">>"
                  }
            },
            show_length_menu: true,
            show_filter: true,
            show_pagination: true,
            show_info: true,
        };

        this.state = {
            records: []
        };

        this.state = {
            currentRecord: {
                id: '',
                tiker_root: '',
            }
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData()
    };

    componentWillReceiveProps(nextProps) {
        this.getData()
    }

    getData() {
        axios
            .post(url+"api/asset-data")
            .then(res => {
                if(res.data != undefined)
                {
                    this.setState({ records: res.data.data});
                }
                
            })
            .catch()
    }

    editRecord(record) {
         $("#update-perpetual-modal").find(".text-danger").hide();
         this.setState({ currentRecord: record});
    }
    addRecord() {
        $("#add-perpetual-modal").find(".text-danger").hide();
    }

    deleteRecord(record) {
        if(!window.confirm('Are you sure you want to delete this contract?')){ return false; }
        axios
            .post(url+"api/perpetual-delete", {_id: record._id})
            .then(res => {
                if (res.status === 200) {
                   toast(res.data.message, {
                       position: toast.POSITION.TOP_CENTER,
                   })
                }
            })
            .catch();
        setTimeout(
    function() {
        this.getData();
    }
    .bind(this),
    1000
);
        
    }

    pageChange(pageData) {
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    <AssetAddModal/>
                    <AssetUpdateModal record={this.state.currentRecord}/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <button onClick={() => this.addRecord()} className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-perpetual-modal"><FontAwesomeIcon icon={faPlus} className="mr-1" /> Add Asset Exchange page</button>
                            <div className="clearfix" />
                            <h3 className="mt-2 text-secondary">Assets Exchange</h3>
                            <ReactDatatable className="table table-bordered table-striped user_management_table"
                                config={this.config}
                                records={this.state.records}
                                columns={this.columns}
                                onPageChange={this.pageChange.bind(this)}
                            />
                        </div>
                    </div>
                    <ToastContainer/>
                </div>
            </div>
        );
    }

}

Perpetual.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(Perpetual);
