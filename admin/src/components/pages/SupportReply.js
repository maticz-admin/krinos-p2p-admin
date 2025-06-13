// import package
import React, { useState, useEffect } from 'react';
import classnames from "classnames";
import { useParams } from 'react-router-dom';

// import component
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";

// import action
import { getMessage, replyMsg } from "../../actions/supportAction";

// import lib
import { toastAlert } from '../../lib/toastAlert';
import isEmpty from '../../lib/isEmpty';
import config from '../../config';
import { momentFormat } from '../../lib/dateTimeHelper';
import { viewUserProfile } from '../../actions/admin';

import { useNavigate } from 'react-router-dom';
const initialFormValue = {
    message: "",
};

const SupportReply = () => {
    const { id } = useParams();

    const [records, setRecords] = useState({});
    const [msgConversation, setMsgConversation] = useState([]);
    const [formValue, setFormValue] = useState(initialFormValue);
    const [errors, setErrors] = useState({});
    const [loader, setLoader] = useState(false);
    const [profileImage, setProfileImage] = useState()
    const viewUserProfiles = async () => {
        try {
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchTicketMessage();


    }, []);

    const fetchTicketMessage = async () => {
        try {
            setLoader(true);
            const reqData = { ticketId: id };
            console.log('id-----', id)
            const { status, loading, result, success } = await getMessage(reqData);
            const profiles = await viewUserProfile({ id: result.userId });
            console.log('success-------', result)
            setProfileImage(profiles.result.profileImage.split('/')[2])
            setLoader(loading);
            if (success) {
                setRecords(result);
                setMsgConversation(result.reply);
            } else {
                setRecords('');
            }
        } catch (err) {
            setLoader(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);

        const reqData = {
            tickerId: records.tickerId,
            receiverId: records.userId,
            message: formValue.message,
        };
        console.log('reqData------', reqData)
        try {
            const { status, loading, message, error, result } = await replyMsg(reqData);
            setLoader(loading);

            if (status === 'success') {
                toastAlert('success', message, 'replyMsg');
                setFormValue(initialFormValue);
                setMsgConversation(result.reply);
            } else {
                toastAlert('error', message, 'replyMsg');
            }

            if (error) {
                setErrors(error);
            }
        } catch (err) {
            setLoader(false);
        }
    };

    const { message } = formValue;

   const handleBack = () => {
        window.history.back(); 
      };

    return (
        <div>
            <Navbar />
            <div className="d-flex" id="wrapper">
                <Sidebar />
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                    <div className='d-flex flex-wrap align-items-center mt-2 mb-4 justify-content-between'>
                            <h3 className="text-secondary">Support Ticket</h3>
                            <button className='btn btn-primary' 
                            onClick={handleBack}
                            >Back</button>
                            </div>

                        {/* Chat Box */}
                        <div className="px-4 py-5 chat-box bg-white">
                            {!isEmpty(records) && msgConversation?.length > 0 ? (
                                msgConversation.map((item, key) => {
                                    const isAdmin = item.senderId === records.adminId;
                                    return (
                                        <div
                                            key={key}
                                            className={`media w-50 ${isAdmin ? "ml-auto" : ""} mb-3`}
                                        >

                                            {/* {!isAdmin ? (
                                                <img
                                                    src="https://img.freepik.com/premium-vector/user-circle-with-blue-gradient-circle_78370-4727.jpg?semt=ais_hybrid&w=740"
                                                    alt="user"
                                                    width={50}
                                                    className="rounded-circle"
                                                />
                                            ) : ( */}
                                            {!isAdmin && (
                                                <img
                                                    src={`${config.API_URL}/user_profile_img/${profileImage}`}
                                                    alt="user"
                                                    width={50}
                                                    className="rounded-circle"
                                                />
                                             )} 
                                             
                                            {/* )} */}
                                            <div className={`media-body ${!isAdmin ? "ml-3" : "ml-3"}`}>
                                                <div
                                                    className={`d-flex align-items-center justify-content-between rounded py-2 px-3 mb-2 ${isAdmin ? "bg-light-dark" : "bg-light"
                                                        }`}
                                                >
                                                    <p className={`text-small mb-0 ${!isAdmin ? "text-muted" : ""}`}>
                                                        {item.message}
                                                    </p>
                                                    {!isEmpty(item.attachment) && (
                                                    <a
                                                        href={`${config.API_URL}/images/support/${item.attachment}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        <i className="fa fa-paperclip f-20" aria-hidden="true"></i>
                                                    </a>
                                                )}
                                                </div>
                                                <p className="small text-muted">
                                                    {new Intl.DateTimeFormat('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: '2-digit',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: true
                                                    }).format(new Date(item.createdAt))}
                                                </p>

                                                
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center text-muted">No messages in this ticket.</div>

                            )}
                        </div>


                        {/* Typing area */}
                        <form className="">
                            <div className="input-group input-grp-dark">
                                <textarea
                                    placeholder="Type a message"
                                    aria-describedby="button-addon2"
                                    className="form-control rounded-0 border-0 py-4 bg-input-dark"
                                    name="message"
                                    rows={3}
                                    value={message}
                                    onChange={handleChange}
                                />
                                <div className="input-group-append">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loader}
                                        className="btn btn-link"
                                    >
                                        <i className="fa fa-paper-plane" />
                                    </button>
                                </div>
                            </div>
                            <span style={{ color: 'red' }}>{errors.message}</span>
                        </form>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportReply;
