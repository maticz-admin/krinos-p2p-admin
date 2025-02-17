import React from 'react'
import Sidebar from "../partials/Sidebar";
import Navbar from "../partials/Navbar";
import { StakeSettlement } from '../../actions/staking'
import ReactDatatable from '@ashvin27/react-datatable';
import { momentFormat } from '../../lib/dateTimeHelper'

class StakingModule extends React.Component {
        constructor(props) {
            super(props);

            this.columns = [
                {
                    key: "settleDate",
                    text: "Settle Date",
                    className: "Date",
                    align: "left",
                    sortable: true,
                    width: 200,
                    cell: records =>{
                        return momentFormat(records.settleDate , 'YYYY-MM-DD HH:mm')
                    }

                },
                {
                    key: "email",
                    text: "Email",
                    className: "Price",
                    align: "left",
                    sortable: true,
                    width: 200,
                    cell: records => {
                        return records && records.userId && records.userId.email
                    }
                },
                {
                    key: "stakeOrderId",
                    text: "Order Id",
                    className: "Type",
                    align: "left",
                    sortable: true,
                    width: 200,
                },
                {
                    key: "coin",
                    text: "Coin",
                    className: "Side",
                    align: "left",
                    sortable: true,
                    width: 100,
                    // cell: records =>{
                    //     if(records.coin == ''){
                    //         return '-'
                    //     }
                    // }
                },
                {
                    key: "amount",
                    text: "Amount",
                    className: "Side",
                    align: "left",
                    sortable: true,
                    width: 200,
                },
                {
                    key: "type",
                    text: "Type",
                    className: "Side",
                    align: "left",
                    sortable: true,
                    width: 200,
                },



            ];

            this.config = {
                page_size: 10,
                length_menu: [10, 20, 50],
                filename: "Order",
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

        }
        componentDidMount() {
            const { page, limit } = this.state;
            let reqData = {
                page,
                limit
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
                this.setState({ 'loader': true })

                const { status, loading, result } = await StakeSettlement(reqData);
                this.setState({ 'loader': loading })
                if (status == 'success') {

                    this.setState({ "count": result.count, 'records': result.data })
                }
            } catch (err) { }



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
                                <h3 className="mt-2 text-secondary">Stake Settlement</h3>

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




export default (StakingModule);

