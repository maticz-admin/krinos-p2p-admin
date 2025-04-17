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

    useEffect(() => {
        fetchTicketMessage();
    }, []);

    const fetchTicketMessage = async () => {
        try {
            setLoader(true);
            const reqData = { ticketId: id };
            console.log('id-----', id)
            const { status, loading, result, success } = await getMessage(reqData);
            console.log('success-------', success)
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
            ticketId: records.tickerId,
            receiverId: records.userId,
            message: formValue.message,
        };

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

    return (
        <div>
            <Navbar />
            <div className="d-flex" id="wrapper">
                <Sidebar />
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <h3 className="mt-2 text-secondary mb-4">Support Ticket</h3>

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
                                            {!isAdmin && (
                                                <img
                                                    src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                                                    alt="user"
                                                    width={50}
                                                    className="rounded-circle"
                                                />
                                            )}
                                            <div className={`media-body ${!isAdmin ? "ml-3" : ""}`}>
                                                <div
                                                    className={`rounded py-2 px-3 mb-2 ${isAdmin ? "bg-light-dark" : "bg-light"
                                                        }`}
                                                >
                                                    <p className={`text-small mb-0 ${!isAdmin ? "text-muted" : ""}`}>
                                                        {item.message}
                                                    </p>
                                                </div>
                                                <p className="small text-muted">{momentFormat(item.createdAt)}</p>
                                                {!isEmpty(item.attachment) && (
                                                    <a
                                                        href={`${config.API_URL}/images/support/${item.attachment}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        <i className="fa fa-paperclip fa-2x" aria-hidden="true"></i>
                                                    </a>
                                                )}
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
