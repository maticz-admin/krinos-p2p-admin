import React, { Component, Fragment } from "react";
import ReactDatatable from '@ashvin27/react-datatable';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import compoents
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import OffettagAddmodal from "../partials/OffertagAddmodal";
import EditOffertagModal from "../partials/EditOffertagModal";
import { getOffer } from "../../actions/adminOffer";


//import action
import { spotPairList } from '../../actions/tradePairAction'
import { getCurrency } from '../../actions/currency'
import { Getoffertaghook } from "../../actions/P2PCreateaction";

class Offer extends Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                key: "Name",
                text: "Name",
                className: "firstCurrencySymbol",
                align: "left",
                sortable: true,
                width: 200
            },
            {
                key: "Description",
                text: "Description",
                className: "secondCurrencySymbol",
                align: "left",
                sortable: true,
                width: 200
            },
            {
                // key: "Status",
                cell : record => record?.status ? "Active" : "Deactive",
                text: "Status",
                className: "status",
                align: "left",
                sortable: true,
                width: 200
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
                                data-target="#update-spot-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editRecord(record)}
                                style={{ marginRight: '5px' }}>
                                <i className="fa fa-edit"></i>
                            </button>

                        </Fragment>
                    );
                }
            }
        ];

        this.config = {
            page_size: 10,
            length_menu: [10, 20, 50],
            filename: "Perpetual",
            no_data_text: 'No Contracts found!',
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
            show_length_menu: false,
            show_filter: true,
            show_pagination: true,
            show_info: true,
        };

        this.state = {
            records: [],
            addFormModal: false,
            editFormModal: false,
            currencyOptions:[],            
            editRecord: {},
            loader: "",
            page: 1,
            limit: 10,
            count: 0,
            lastrequest : {}

        };

        this.getSpotPairData = this.getSpotPairData.bind(this);
        this.handleCloseAddForm = this.handleCloseAddForm.bind(this);
        this.handleCloseEditForm = this.handleCloseEditForm.bind(this);
        this.handlePagination = this.handlePagination.bind(this)
        // this.getCurrencyData = this.getCurrencyData.bind(this)
    }

    componentDidMount() {
        const { page, limit } = this.state;
        var payload = {
            page: page,
            limit: limit,
        }
        // this.getSpotPairData(reqData);
        this.getoffertag(payload)
    };
    // componentWillUnmount(){

    // }

    async getoffertag(data){
        var payload = data ? data : this.state.lastrequest
        var result = await Getoffertaghook(payload);
        if(result?.data?.status == "success"){
            // var value = this?.state?.count + this?.state?.limit
            // this.setState({ "count": value , 'records': result?.data?.data })
            
            this.setState({"count": result?.data?.count , 'records': result?.data?.data })
        }
    }


    async getSpotPairData(reqData) {

        try {
            this.setState({ 'loader': true })

            const { status, loading, result } = await spotPairList(reqData);
            this.setState({ 'loader': loading })
            if (status == 'success') {
                this.setState({ "count": result.count, 'records': result.data })
            }
        } catch (err) { }

    }

    async getOfferDetails(){
        const { result, status } = await getOffer();
        if (status == "success") {
           
        }
    }

    editRecord(record) {
        this.setState({
            editFormModal: true,
            editRecord: record
        })
    }
    addRecord() {
        this.setState({ addFormModal: true })
    }

                    handleCloseAddForm() {
        this.setState({ addFormModal: false })
    }

    handleCloseEditForm() {
        this.setState({ editFormModal: false })
    }

    handlePagination(index) {
        var limit = index.page_number * 10;
        var skip = limit - 10;
        let reqData = {
            page: index.page_number,
            limit: index.page_size,
            search: index.filter_value
            // limit : limit,
            // skip : skip
        }
        this.getoffertag(reqData);
        this.setState({ page: index.page_number, limit: index.page_size, search: index.filter_value })
    }
   


    render() {
        const { addFormModal, editRecord, editFormModal ,currencyOptions} = this.state;

        return (
            <div>
                <Navbar />
                <div className="d-flex" id="wrapper">
                    <Sidebar />
                    <OffettagAddmodal
                        isShow={addFormModal}
                        onHide={this.handleCloseAddForm}
                        currencyOptions={currencyOptions}
                        fetchData={()=>this.getoffertag()}
                    />
                    <EditOffertagModal
                        isShow={editFormModal}
                        onHide={this.handleCloseEditForm}
                        currencyOptions={currencyOptions}
                        fetchData={() => this.getoffertag()}
                        record={editRecord}
                    />
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <button onClick={() => this.addRecord()} className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-spot-modal"><FontAwesomeIcon icon={faPlus}  className="mr-1" /> Add </button>
                            <div className="clearfix" />
                            <h3 className="mt-2 text-secondary">Offer</h3>
                            <ReactDatatable className="table table-bordered table-striped"
                                config={this.config}
                                records={this.state.records}
                                columns={this.columns}
                                onChange={this.handlePagination}
                                dynamic={true}
                                total_record={this?.state?.count}
                            />
                        </div>
                    </div>
                  
                </div>
            </div>
        );
    }

}


export default Offer;
