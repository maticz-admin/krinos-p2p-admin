import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDatatable from '@ashvin27/react-datatable';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// import component
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import KycUpdate from "../partials/KycUpdate";

// import action
import { getAllUserKyc, changeUserType } from '../../actions/userKycAction';
import { toastAlert } from "../../lib/toastAlert";

const UserKyc = () => {
    const columns = [
        {
            text: "Email",
            className: "identifier",
            align: "left",
            sortable: true,
            cell: (record) => record?.email || `${record?.phoneCode || ''}${record?.phoneNo || ''}`
        },
        {
            text: "Status",
            className: "identifier",
            align: "left",
            sortable: true,
            cell: (record) => {
                const status = record?.status || "";
                return status.charAt(0).toUpperCase() + status.slice(1);
            }
        }
       

         // {
            //     key: "identity",
            //     text: "Identity Document",
            //     className: "subject",
            //     align: "left",
            //     sortable: true,
            //     cell: record => {
            //         if (record.idProof.status == 'new') {
            //             return '-'
            //         } else 
            //         // if (record.idProof.status == 'pending') 
            //         {
            //             return (
            //                 <>
            //                     {record.idProof.status}
            //                     <span>
            //                         <button
            //                             className="btn btn-primary btn-sm ml-2"
            //                             onClick={() => this.editRecord(record, 'idProof')}
            //                             style={{ marginRight: '5px' }}
            //                         >
            //                             View
            //                         </button>
            //                     </span>
            //                 </>
            //             )
            //         } 
            //         // else {
            //         //     return (
            //         //         <>
            //         //             {record.idProof.status}

            //         //         </>
            //         //     )
            //         // }
            //     }
            // },
            // {
            //     key: "identity",
            //     text: "Residential Document",
            //     className: "subject",
            //     align: "left",
            //     sortable: true,
            //     cell: record => {
            //         if (record.addressProof.status == 'new') {
            //             return '-'
            //         } else if (record.addressProof.status == 'pending') {
            //             return (
            //                 <>
            //                     {record.addressProof.status}
            //                     <span>
            //                         <button
            //                             className="btn btn-primary btn-sm ml-2"
            //                             onClick={() => this.editRecord(record, 'addressProof')}
            //                             style={{ marginRight: '5px' }}
            //                         >
            //                             View
            //                         </button>
            //                     </span>
            //                 </>
            //             )
            //         } else {
            //             return (
            //                 <>
            //                     {record.addressProof.status}

            //                 </>
            //             )
            //         }
            //     }
            // },
            // {
            //     key: "type",
            //     text: "Verification Type",
            //     className: "subject",
            //     align: "left",
            //     sortable: true,
            //     cell: record => {

            //         if((record.addressProof.status == 'approved') && (record.idProof.status == 'approved')){
            //             return(
            //             <span>APPROVED</span>
            //             )
            //         }
            //         else if (['basic_processing', 'advanced_processing', 'pro_processing'].includes(record.type)) {
            //             return (
            //                 <span>
            //                     <button
            //                         className="btn btn-primary btn-sm"
            //                         onClick={() => this.handleVerifyType(record)}
            //                         style={{ marginRight: '5px' }}
            //                     >
            //                         Approve
            //                     </button>
            //                     ({record.type})
            //                 </span>
            //             )
            //         } else {
            //             return (
            //                 <>
            //                     {record.type}
            //                 </>
            //             )
            //         }
            //     }
            // }
    ];

    const config = {
        page_size: 10,
        length_menu: [10, 20, 50],
        filename: "Emailtemplates",
        no_data_text: 'No Email Templates found!',
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

    const [docFormModal, setDocFormModal] = useState(false);
    const [docRecord, setDocRecord] = useState({});
    const [records, setRecords] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [count, setCount] = useState(0);
    const [loader, setLoader] = useState(false);

    const fetchKyc = useCallback(async (reqData) => {
        setLoader(true);
        try {
            const { status, loading, result } = await getAllUserKyc(reqData);
            console.log("result in user kyc" , result);
            
            setLoader(loading);
            if (status === 'success') {
                setCount(result.count);
                setRecords(result?.data || []);
            }
        } catch (err) {
            setLoader(false);
        }
    }, []);

    useEffect(() => {
        fetchKyc({ page, limit });
    }, [fetchKyc, page, limit]);

    const handleVerifyType = async (reqData) => {
        setLoader(true);
        try {
            const { status, loading, message } = await changeUserType(reqData.userid);
            setLoader(loading);
            if (status === 'success') {
                toastAlert('success', message, 'kyc');
                refetch();
            } else {
                toastAlert('error', message, 'kyc');
            }
        } catch (err) {
            setLoader(false);
        }
    };

    const editRecord = (record, formType) => {
        let docRecord = {};
        if (formType === 'idProof') {
            docRecord = {
                userId: record.userId,
                type: record.idProof?.type,
                proofNumber: record.idProof?.proofNumber,
                frontImage: record.idProof?.frontImage,
                backImage: record.idProof?.backImage,
                selfiImage: record.idProof?.selfiImage,
                panImage: record.idProof?.panImage,
                status: record.idProof?.status,
                formType
            };
        } else if (formType === 'addressProof') {
            docRecord = {
                userId: record.userId,
                type: record.addressProof?.type,
                frontImage: record.addressProof?.frontImage,
                status: record.addressProof?.status,
                formType
            };
        }
        setDocFormModal(true);
        setDocRecord(docRecord);
    };

    const handlePagination = (index) => {
        const reqData = {
            page: index.page_number,
            limit: index.page_size,
            search: index.filter_value
        };
        fetchKyc(reqData);
        setPage(index.page_number);
        setLimit(index.page_size);
        setSearch(index.filter_value);
    };

    const handleCloseDocForm = () => {
        setDocFormModal(false);
    };

    const refetch = () => {
        fetchKyc({ page, limit });
    };

    return (
        <div>
            <Navbar />
            <div className="d-flex" id="wrapper">
                <Sidebar />
                <KycUpdate
                    isShow={docFormModal}
                    onHide={handleCloseDocForm}
                    fetchData={refetch}
                    record={docRecord}
                />
                <div id="page-content-wrapper">
                    <div className="container-fluid user_asset_modal_table">
                        <h3 className="mt-2 text-secondary">KYC List</h3>
                        <ReactDatatable
                            className="table table-bordered table-striped kyc_table"
                            config={config}
                            records={records}
                            columns={columns}
                            dynamic={true}
                            total_record={count}
                            loading={loader}
                            onChange={handlePagination}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserKyc;
