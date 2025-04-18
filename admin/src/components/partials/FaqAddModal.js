import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { Modal, Form } from 'react-bootstrap';

// import action
import { faqAdd, faqCategoryList } from '../../actions/faqActions';

// import lib
import { toastAlert } from '../../lib/toastAlert';

const initialFormValue = {
    categoryId: '',
    question: '',
    answer: '',
};

const FaqAddModal = ({ isShow, onHide, fetchData }) => {
    const [formValue, setFormValue] = useState(initialFormValue);
    const [errors, setErrors] = useState({});
    const [categoryOption, setCategoryOption] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue((prev) => ({ ...prev, [name]: value }));
        if (value) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleClose = () => {
        onHide();
        setFormValue(initialFormValue);
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { status, message, error } = await faqAdd(formValue);
            if (status === 'success') {
                fetchData();
                toastAlert('success', message, 'addFaq');
                handleClose();
            } else {
                if (error) setErrors(error);
                toastAlert('error', message, 'addFaq');
            }
        } catch (err) {
            console.error('Submit error:', err);
        }
    };

    const getFaqCategoryList = async () => {
        try {
            const selectFaq = await faqCategoryList();
            console.log('selectFaq-----', selectFaq)
            setCategoryOption(selectFaq.result)
        } catch (error) {

        }
    }

    useEffect(() => {
        getFaqCategoryList();
    }, [])

    return (
        <Modal
            show={isShow}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            size="lg"
            centered
            scrollable={true}
        >
            <Modal.Header closeButton>
                <h4 className="modal-title">Add Faq</h4>
            </Modal.Header>
            <Modal.Body>
                <form noValidate onSubmit={handleSubmit}>
                    {/* Category */}
                    <div className="row mt-2">
                        <div className="col-md-3">
                            <label htmlFor="categoryId">Category</label>
                        </div>
                        <div className="col-md-9">
                            <Form.Control
                                as="select"
                                name="categoryId"
                                value={formValue.categoryId}
                                onChange={handleChange}
                                
                            >
                                <option value="">Select Category</option>
                                {categoryOption &&
                                    categoryOption.length > 0 &&
                                    categoryOption.map((item, key) => (
                                        <option key={key} value={item._id}
                                        style={{
                                            backgroundColor: '#333', // Dark background
                                            color: '#fff' // White text
                                        }}>
                                            {item.name}
                                        </option>
                                    ))}
                            </Form.Control>

                            <span className="text-danger">{errors.categoryId}</span>
                        </div>
                    </div>

                    {/* Question */}
                    <div className="row mt-2">
                        <div className="col-md-3">
                            <label htmlFor="question">Question</label>
                        </div>
                        <div className="col-md-9">
                            <textarea
                                name="question"
                                value={formValue.question}
                                onChange={handleChange}
                                className={classnames('form-control', {
                                    invalid: errors.question,
                                })}
                            />
                            <span className="text-danger">{errors.question}</span>
                        </div>
                    </div>

                    {/* Answer */}
                    <div className="row mt-2">
                        <div className="col-md-3">
                            <label htmlFor="answer">Answer</label>
                        </div>
                        <div className="col-md-9">
                            <textarea
                                name="answer"
                                value={formValue.answer}
                                onChange={handleChange}
                                className={classnames('form-control', {
                                    invalid: errors.answer,
                                })}
                            />
                            <span className="text-danger">{errors.answer}</span>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                    Close
                </button>
                <button onClick={handleSubmit} className="btn btn-primary">
                    Submit
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default FaqAddModal;
