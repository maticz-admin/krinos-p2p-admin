import React, { Component, Fragment } from "react";
import ReactDatatable from '@ashvin27/react-datatable';

//import components
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";

//import actions
import { spotOrderHistory } from '../../actions/reportActions'

// import lib
import { momentFormat } from '../../lib/dateTimeHelper'


//import downloads
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { CSVLink } from "react-csv";
import { Getofferhistoryhook } from "../../actions/P2PCreateaction";

class tradehistory extends Component {
    constructor(props) {
        super(props);

        // this.columns = [
        //     {
        //         key: "orderDate",
        //         text: "Date",
        //         className: "Date",
        //         align: "left",
        //         sortable: true,
        //         width: 500,
        //         cell: record => {
        //             return momentFormat(record.orderDate, 'YYYY-MM-DD HH:mm')
        //         }
        //     },
        //     {
        //         key: "userId",
        //         text: "userId",
        //         className: "Total",
        //         align: "left",
        //         sortable: true,
        //         width: 200,
        //     },
        //     {
        //         key: "firstCurrency",
        //         text: "Base Currency",
        //         className: "pairName",
        //         align: "left",
        //         sortable: true,
        //         width: 200,
        //     },
        //     {
        //         key: "secondCurrency",
        //         text: "Quote Currency",
        //         className: "name",
        //         align: "left",
        //         sortable: true,
        //     },
        //     {
        //         key: "orderType",
        //         text: "Type",
        //         className: "Type",
        //         align: "left",
        //         sortable: true,
        //         width: 200,
        //     },
        //     {
        //         key: "buyorsell",
        //         text: "Side",
        //         className: "Side",
        //         align: "left",
        //         sortable: true,
        //         width: 200,
        //     },
        //     {
        //         key: "averagePrice",
        //         text: "Executed Price",
        //         className: "Average",
        //         align: "left",
        //         sortable: true,
        //         width: 200,
        //         cell:(record => {
        //             return record.averagePrice > 0 ? Number(record.averagePrice / record.filledQuantity).toFixed(8) : '-';
        //         })
        //     },
        //     {
        //         key: "price",
        //         text: "Price",
        //         className: "Price",
        //         align: "left",
        //         sortable: true,
        //         width: 200,
        //         cell:(record => {
        //             return ['market'].includes(record.orderType) ? 'Market price' : record.price
        //         })
        //     },

        //     {
        //         key: "filledQuantity",
        //         text: "Executed",
        //         className: "Executed",
        //         align: "left",
        //         sortable: true,
        //         width: 200,
        //     },
        //     {
        //         key: "averagePrice",
        //         text: "Total",
        //         className: "Amount",
        //         align: "left",
        //         sortable: true,
        //         width: 200,
        //     },
        //     {
        //         key: "status",
        //         text: "order status",
        //         className: "Total",
        //         align: "left",
        //         sortable: true,
        //         width: 200,
        //     },


        // ];

        this.columns = [
            {
                key: "createdAt",
                text: "Date",
                className: "Date",
                align: "left",
                sortable: true,
                width: 500,
                cell: record => {
                    return momentFormat(record.createdAt, 'YYYY-MM-DD HH:mm')
                }
            },
            {
                key: "createrid",
                text: "Creater Id",
                className: "Total",
                align: "left",
                sortable: true,
                width: 200,
            },
            {
                // key: "orderid",
                text: "Creater Name",
                className: "pairName",
                align: "left",
                // sortable: true,
                width: 200,
                cell : record => record?.userdata?.firstName +" "+ record?.userdata?.lastName
            },
            {
                // key: "orderid",
                text: "Creater Email",
                className: "pairName",
                align: "left",
                // sortable: true,
                width: 200,
                cell : record => record?.userdata?.email
            },
            {
                key: "orderid",
                text: "Order Id",
                className: "pairName",
                align: "left",
                sortable: true,
                width: 200,
            },
            {
                key: "coin",
                text: "Currency",
                className: "name",
                align: "left",
                sortable: true,
            },
            {
                key: "ordertype",
                text: "Type",
                className: "Type",
                align: "left",
                sortable: true,
                width: 200,
            },
            {
                key: "preferedcurrency",
                text: "Prefered Currency",
                className: "Side",
                align: "left",
                sortable: true,
                width: 200,
            },
            {
                key: "pricetype",
                text: "Price Type",
                className: "Average",
                align: "left",
                sortable: true,
                width: 200,
                // cell:(record => {
                //     return record.averagePrice > 0 ? Number(record.averagePrice / record.filledQuantity).toFixed(8) : '-';
                // })
            },
            {
                key: "offertimelimit",
                text: "Time Limit",
                className: "Price",
                align: "left",
                sortable: true,
                width: 200,
                // cell:(record => {
                //     return ['market'].includes(record.orderType) ? 'Market price' : record.price
                // })
            },

            {
                key: "min",
                text: "Min Buy",
                className: "Executed",
                align: "left",
                sortable: true,
                width: 200,
            },
            {
                key: "max",
                text: "Max Buy",
                className: "Amount",
                align: "left",
                sortable: true,
                width: 200,
            },
            {
                key: "offermargin",
                text: "Offer Margin",
                className: "Total",
                align: "left",
                sortable: true,
                width: 200,
                cell:(record => {
                    return record?.offermargin ? record?.offermargin : "-"
                })
            },
            // {
            //     key: "status",
            //     text: "order status",
            //     className: "Total",
            //     align: "left",
            //     sortable: true,
            //     width: 200,
            // },


        ];

        this.config = {
            page_size: 10,
            length_menu: [10, 20, 50],
            filename: "Offerhistory",
            no_data_text: 'No Records found!',
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
            loader: false,
            page: 1,
            limit: 10,
            count: 0,
        };
        this.handlePagination = this.handlePagination.bind(this);
        this.exportPDF = this.exportPDF.bind(this);
        this.DownloadeCSV = this.DownloadeCSV.bind(this);
        this.DownloadeXLS = this.DownloadeXLS.bind(this);

    }
    componentDidMount() {
        const { page, limit } = this.state;
        let reqData = {
            page,
            limit,
            export: 'false'
        }
        this.getData(reqData)
    };

    handlePagination(index) {
        let reqData = {
            page: index.page_number,
            limit: index.page_size,
            search: index.filter_value
        }
        this.getData(reqData);
        this.setState({ page: index.page_number, limit: index.page_size, search: index.filter_value })
    }


    async getData(reqData) {
        try {
            this.setState({ 'loader': true });
            // const { status, loading, result } = await spotOrderHistory(reqData);
            // this.setState({ 'loader': loading })
            // if (status == 'success') {
            //     this.setState({ "count": result.count, 'records': result.data })
            // }
            //offer history
            var result = await Getofferhistoryhook(reqData);
            if(result?.data?.type == "success"){
                this.setState({ "count": result?.data?.count, 'records': result.data?.data })
            }
        } catch (err) { }
    }


    async exportPDF() {
        const { records } = this.state
        const { page, limit } = this.state;
        let reqData = {
            page,
            limit,
            export: 'pdf'
        }
        // const { status, loading, result } = await Getofferhistoryhook(reqData);
        const result  = await Getofferhistoryhook(reqData);
        if (result?.data?.success || result?.data?.success == "true") {
            const unit = "pt";
            const size = "A4"; // Use A1, A2, A3 or A4
            const orientation = "landscape"; // portrait or landscape

            const marginLeft = 40;
            const doc = new jsPDF(orientation, unit, size);

            doc.setFontSize(13);

            const title = "Offerhistory";
            const headers = [
                ["Date", "Creater Id", "Order Id", "Currency" , "Type" , "Prefered Currency" , "Price Type" , "Time Limit" , "Min Buy" , "Max Buy" , "Offer Margin"]
            ];

            const data =
                result && result?.data?.result?.pdfData?.length > 0 &&
                result?.data?.result?.pdfData?.map((elt) => [
                    elt.createdAt,
                    elt.createrid,
                    elt.orderid,
                    elt.coin,
                    elt.ordertype,
                    elt.preferedcurrency,
                    elt.pricetype,
                    elt.offertimelimit,
                    elt.min,
                    elt.max,
                    elt.offermargin?elt.offermargin: "-",
                ]);

            let content = {
                startY: 50,
                head: headers,
                body: data,
            };

            doc.text(title, marginLeft, 40);
            doc.autoTable(content);
            doc.save("SpotOrderHistory.pdf");
        }
    }

    async DownloadeCSV() {
        const { page, limit } = this.state;
        let reqData = {
            page,
            limit,
            export: 'csv'
        }
        const { status, loading, result } = await Getofferhistoryhook(reqData);

    }
    async DownloadeXLS() {
        const { page, limit } = this.state;
        let reqData = {
            page,
            limit,
            export: 'xls'
        }
        const { status, loading, result } = await Getofferhistoryhook(reqData);

    }

    render() {

        const { records, count } = this.state
        return (
            <div>
                <Navbar />
                <div className="d-flex" id="wrapper">
                    <Sidebar />
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <h3 className="mt-2 text-secondary">Offer History</h3>

                            {records && records.length > 0 ? (
                                <button onClick={this.exportPDF} className='btn btn-info mr-2 mb-2' style={{ width: '118px', height: '35px', fontSize: '13px' }}>Download(PDF)</button>
                            ) : (
                                ""
                            )}

                            {records && records.length > 0 ? (

                                <button className='btn btn-info mr-2 mb-2' onClick={this.DownloadeCSV} style={{ width: '118px', height: '35px', fontSize: '13px' }}>Download(CSV)</button>
                            ) : (
                                ""
                            )}

                            {records && records.length > 0 ? (

                                <button className='btn btn-info mb-2' onClick={this.DownloadeXLS} style={{ width: '118px', height: '35px', fontSize: '13px' }}>Download(XLS)</button>
                            ) : (
                                ""
                            )}
                            <ReactDatatable className="table table-bordered table-striped user_management_table"
                                config={this.config}
                                records={this.state.records}
                                columns={this.columns}
                                dynamic={true}
                                total_record={count}
                                onChange={this.handlePagination}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}




export default (tradehistory);
