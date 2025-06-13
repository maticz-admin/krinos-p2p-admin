import React, { useEffect, useState } from "react";
import { CKEditor } from "ckeditor4-react";
import Select from "react-select";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import { allSubscribed, sendNews } from "../../actions/newsLetterAction";
import { toastAlert } from "../../lib/toastAlert";
import isEmpty from "../../lib/isEmpty";

const initialFormValue = {
    subscribedId: [],
    message: "",
};

const Newsletter = () => {
    const [formValue, setFormValue] = useState(initialFormValue);
    const [subscribed, setSubscribed] = useState([]);
    const [errors, setErrors] = useState({});
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        fetchSubscribed();
    }, []);

    const fetchSubscribed = async () => {
        try {
            const { status, result } = await allSubscribed();
            if (status === "success") {
                const subs = result.map((item) => ({
                    label: item.email,
                    value: item._id,
                }));
                setSubscribed(subs);
            }
        } catch (err) { }
    };

    const handleSubscriber = (selectedOption) => {
        const ids = selectedOption ? selectedOption.map((el) => el.value) : [];
        setFormValue((prevFormValue) => ({
            ...prevFormValue,
            subscribedId: ids
        }));
        if (!isEmpty(selectedOption)) setErrors({});
    };
    

    const handleSelectAll = () => {
        setFormValue((prevFormValue) => ({
            ...prevFormValue,
            subscribedId: subscribed.map((el) => el.value),
        }));
    };
    

    const handleEditorChange = (e) => {
        const message = e.editor.getData();
        setFormValue((prevFormValue) => ({
            ...prevFormValue,
            message
        }));
        if (!isEmpty(message)) setErrors({});
    };
    

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { subscribedId, message } = formValue;
        const reqData = { subscribedId, message };

        try {
            setLoader(true);
            const { status, loading, message: msg, errors } = await sendNews(reqData);
            setLoader(loading);
            if (status === "success") {
                setFormValue(initialFormValue);
                toastAlert("success", msg, "newsLetter");
                await sleep(3000);
                window.location.reload();
            } else {
                toastAlert("error", errors.message);

                if (!isEmpty(errors)) setErrors(errors);
                toastAlert("error", msg, "newsLetter");
            }
        } catch (err) { }
    };

    const styles = {
        option: (provided) => ({
            ...provided,
            color: "white",
            backgroundColor: "#242827",
        }),
        valueContainer: (provided) => ({
            ...provided,
            height: "52px",
            padding: "0 6px",
            backgroundColor: "#1a1b1c",
            borderColor: "#59615f",
            borderRadius: 8,
            borderStyle: "solid",
            borderWidth: "1px",
        }),
        control: (provided) => ({
            ...provided,
            height: "52px",
            borderRadius: 8,
            backgroundColor: "#1a1b1c",
            border: "none",
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            height: "52px",
            position: "absolute",
            right: 0,
            top: 0,
            color: "#fff",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#fff",
        }),
    };

    return (
        <div>
            <Navbar />
            <div className="d-flex" id="wrapper">
                <Sidebar />
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <h3 className="mt-2 text-secondary">Newsletter Details</h3>
                        <form noValidate onSubmit={handleSubmit} id="send-email">
                            <div className="row mt-2">
                                <div className="col-md-3">
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="col-md-9">
                                    <div className="d-flex gap-2">
                                        <div className="w-full">
                                            <Select
                                                value={
                                                    subscribed.length > 0
                                                        ? subscribed.filter((el) =>
                                                            formValue.subscribedId.includes(el.value)
                                                        )
                                                        : []
                                                }
                                                isMulti
                                                name="subscribedId"
                                                options={subscribed}
                                                onChange={handleSubscriber}
                                                styles={styles}
                                                className="border_blue_select basic-multi-select"
                                                classNamePrefix="select w-full"
                                            />
                                            <span className="text-danger">{errors.email}</span>
                                        </div>
                                        <button
                                            className="themebtn noshrink"
                                            type="button"
                                            onClick={handleSelectAll}
                                        >
                                            Select All
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-md-3">
                                    <label htmlFor="content">Message</label>
                                </div>
                                <div className="col-md-9">
                                    <CKEditor
                                        config={{
                                            extraAllowedContent: "div(*)",
                                            allowedContent: true,
                                            height: 500,
                                        }}
                                        initData={formValue.message}
                                        onChange={handleEditorChange}
                                    />
                                    <span className="text-danger">{errors.message}</span>

                                </div>
                            </div>
                        </form>

                        <br />
                        <div className="modal-footer">
                            <button
                                form="send-email"
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleSubmit}
                            >
                                {loader && <i className="fas fa-spinner fa-spin"></i>}
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
