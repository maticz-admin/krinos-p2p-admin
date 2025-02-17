import React from 'react'
import classnames from "classnames";
import { Modal, Form } from "react-bootstrap";

//import action
import { addSpotPair } from '../../actions/tradePairAction'

//import lib
import { toastAlert } from '../../lib/toastAlert';
import isEmpty from '../../lib/isEmpty'
import { Addoffertaghook, Editoffertaghook, Editpaymenttypehooks } from '../../actions/P2PCreateaction';


const options = [{ 'value': "binance", 'label': "binance" }, { 'value': "off", 'label': "Off" }];


const initialFormValue = {
    // "firstCurrencyId": " ",
    // "firstFloatDigit": "",
    // "secondCurrencyId": " ",
    // "secondFloatDigit": "",
    // "minPricePercentage": "",
    // "maxPricePercentage": "",
    // "minQuantity": "",
    // "maxQuantity": "",
    // "maker_rebate": "",
    // "taker_fees": "",
    // "markupPercentage": "",
    // "markPrice": "",
    // "botstatus": "off",
    "status": "", //active ,Inactive
    "name" : "",
    // "description" : "",
    "id" : ""
}

class EditpaymenttypeModal extends React.Component {
    constructor() {
        super();
        this.state = {
            formValue: initialFormValue,
            errors: {},
            loader: false
        };
    }

    handleChange = e => {
        e.preventDefault();
        let { name, id, value } = e.target;
        let formData = { ...this.state.formValue, ...{ [id]: value } };
        this.setState({ formValue: formData });
        if (!isEmpty(value)) {
            this.setState({ errors: {} })
        }
    };

    handleClose = () => {
        const { onHide } = this.props;
        onHide();
        this.setState({ 'formValue': initialFormValue, errors: {} });

    }

    handleSubmit = async e => {
        e.preventDefault();
        try {
            const { formValue } = this.state;
            const { fetchData } = this.props;
            
            let reqData = formValue;
            this.setState({ 'loader': true })
            // let { status, loading, result, error, message,pairName } = await Addoffertaghook(reqData);
            var result = await Editpaymenttypehooks(reqData);
            // this.setState({ 'loader': true })
            if (result?.data?.type === 'success') {
                fetchData();
                toastAlert('success', result?.data?.message, 'addTemplate');
                this.handleClose()
            } else {
                // if(error.pairName == 'Currency pair is not exists in binance'){
                //     toastAlert('error', error.pairName); 
                //     // this.handleClose() 
                // }
                if (result?.data?.error) {
                    this.setState({ errors: result?.data?.error })
                    this.setState({ 'loader': false })
                }
                toastAlert('error', result?.data?.message, 'addSpotPair');
            }
            this.setState({ 'loader': false })
        }
        catch (err) { }
    }

    // componentDidMount(){
    //     console.log("domponent did mount" , this.props);
    //     var data = this.state.formValue;
    //     data.name = this.props?.record?.name;
    //     data.description = this.props?.record?.description;
    //     data.status = this.props?.record?.status
    // }
    componentWillReceiveProps(nextProps){
        var data = this.state.formValue;
        data.name = nextProps?.record?.Name;
        // data.description = nextProps?.record?.Description;
        data.status = nextProps?.record?.status;
        data.id = nextProps?.record?._id;
        this.setState({formValue : data});
    }



    render() {
        const { errors, loader } = this.state;
        const { markupPercentage, markPrice, maker_rebate, taker_fees, minPricePercentage, maxPricePercentage, maxQuantity, minQuantity, firstCurrencyId,
            firstFloatDigit, secondCurrencyId, secondFloatDigit, botstatus , status , name , description } = this.state.formValue

        const { isShow, currencyOptions } = this.props;


        return (
            <div>
                <Modal
                    show={isShow}
                    onHide={this.handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    size="lg"
                    centered
                    scrollable={true}
                >
                    <Modal.Header closeButton>
                        <h4 className="modal-title">Edit Payment Types</h4>
                    </Modal.Header>
                    <Modal.Body>

                        <form noValidate id="add-spot">

                            {/* <div className="row mt-2">
                                <div className="col-md-3">
                                    <label htmlFor="identifier">Base Currency </label>
                                </div>
                                <div className="col-md-9">
                                    <Form.Control
                                        as="select"
                                        custom
                                        name={'firstCurrencyId'}
                                        id={'firstCurrencyId'}
                                        value={firstCurrencyId}
                                        onChange={this.handleChange}
                                    >
                                        <option value={''}>{"Select Base Currency"}</option>
                                        {
                                            currencyOptions && currencyOptions.length > 0 && currencyOptions.map((item, key) => {
                                                return (
                                                    <option key={key} value={item.value}>{item.label}</option>
                                                )
                                            })
                                        }
                                    </Form.Control>
                                    <span className="text-danger">{errors.firstCurrencyId}</span>
                                </div>
                            </div> */}
                            <div className="row mt-2">
                                <div className="col-md-3">
                                    <label htmlFor="taker_fees">Name</label>
                                </div>
                                <div className="col-md-9">
                                    <input
                                        onChange={this.handleChange}
                                        value={name}
                                        name="name"
                                        error={errors.name}
                                        id="name"
                                        type="text"
                                        className={classnames("form-control", {
                                            invalid: errors.name
                                        })}
                                    />
                                    <span className="text-danger">{errors.name}</span>
                                </div>
                            </div>

                            {/* <div className="row mt-2">
                                <div className="col-md-3">
                                    <label htmlFor="identifier">Quote Currency </label>
                                </div>
                                <div className="col-md-9">
                                    <Form.Control
                                        as="select"
                                        custom
                                        name={'secondCurrencyId'}
                                        id={'secondCurrencyId'}
                                        value={secondCurrencyId}
                                        onChange={this.handleChange}
                                    >
                                        <option value={''}>{"Select Quote Currency"}</option>
                                        {
                                            currencyOptions && currencyOptions.length > 0 && currencyOptions.map((item, key) => {
                                                return (
                                                    <option key={key} value={item.value}>{item.label}</option>
                                                )
                                            })
                                        }
                                    </Form.Control>
                                    <span className="text-danger">{errors.secondCurrencyId}</span>
                                </div>
                            </div> */}
                            {/* <div className="row mt-2">
                                <div className="col-md-3">
                                    <label htmlFor="taker_fees">Quote Currency Decimal</label>
                                </div>
                                <div className="col-md-9">
                                    <input
                                        onChange={this.handleChange}
                                        value={secondFloatDigit}
                                        name="secondFloatDigit"
                                        error={errors.secondFloatDigit}
                                        id="secondFloatDigit"
                                        type="text"
                                        className={classnames("form-control", {
                                            invalid: errors.secondFloatDigit
                                        })}
                                    />
                                    <span className="text-danger">{errors.secondFloatDigit}</span>
                                </div>
                            </div> */}

                            {/* <div className="row mt-2">
                                <div className="col-md-3">
                                    <label htmlFor="maker_rebate">Maker Fee(%)</label>
                                </div>
                                <div className="col-md-9">
                                    <input
                                        onChange={this.handleChange}
                                        value={maker_rebate}
                                        name="maker_rebate"
                                        error={errors.maker_rebate}
                                        id="maker_rebate"
                                        type="text"
                                        className={classnames("form-control", {
                                            invalid: errors.maker_rebate
                                        })}
                                    />
                                    <span className="text-danger">{errors.maker_rebate}</span>
                                </div>
                            </div> */}


                            {/* <div className="row mt-2">
                                <div className="col-md-3">
                                    <label htmlFor="taker_fees">Taker Fee(%)</label>
                                </div>
                                <div className="col-md-9">
                                    <input
                                        onChange={this.handleChange}
                                        value={taker_fees}
                                        name="taker_fees"
                                        error={errors.taker_fees}
                                        id="taker_fees"
                                        type="text"
                                        className={classnames("form-control", {
                                            invalid: errors.taker_fees
                                        })}
                                    />
                                    <span className="text-danger">{errors.taker_fees}</span>
                                </div>
                            </div> */}

                            {/* <div className="row mt-2">
                                <div className="col-md-3">
                                    <label htmlFor="taker_fees">Description</label>
                                </div>
                                <div className="col-md-9">
                                    <input
                                        onChange={this.handleChange}
                                        value={description}
                                        name="description"
                                        error={errors.description}
                                        id="description"
                                        type="text"
                                        className={classnames("form-control", {
                                            invalid: errors.description
                                        })}
                                    />
                                    <span className="text-danger">{errors.description}</span>
                                </div>
                            </div> */}
                            {/* <div className="row mt-2">
                                <div className="col-md-3">
                                    <label htmlFor="taker_fees">Status</label>
                                </div>
                                <div className="col-md-9">
                                    <input
                                        onChange={this.handleChange}
                                        value={maxPricePercentage}
                                        name="maxPricePercentage"
                                        error={errors.maxPricePercentage}
                                        id="maxPricePercentage"
                                        type="text"
                                        className={classnames("form-control", {
                                            invalid: errors.maxPricePercentage
                                        })}
                                    />
                                    <span className="text-danger">{errors.maxPricePercentage}</span>
                                </div>
                            </div> */}



                            {/* <div className="row mt-2">
                                <div className="col-md-3">
                                    <label htmlFor="minQuantity">Minimum Quantity</label>
                                </div>
                                <div className="col-md-9">
                                    <input
                                        onChange={this.handleChange}
                                        value={minQuantity}
                                        name="minQuantity"
                                        error={errors.minQuantity}
                                        id="minQuantity"
                                        type="text"
                                        className={classnames("form-control", {
                                            invalid: errors.minQuantity
                                        })}
                                    />
                                    <span className="text-danger">{errors.minQuantity}</span>
                                </div>
                            </div> */}


                            {/* <div className="row mt-2">
                                <div className="col-md-3">
                                    <label htmlFor="maxQuantity">Maximum Quantity</label>
                                </div>
                                <div className="col-md-9">
                                    <input
                                        onChange={this.handleChange}
                                        value={maxQuantity}
                                        name="maxQuantity"
                                        error={errors.maxQuantity}
                                        id="maxQuantity"
                                        type="text"
                                        className={classnames("form-control", {
                                            invalid: errors.maxQuantity
                                        })}
                                    />
                                    <span className="text-danger">{errors.maxQuantity}</span>
                                </div>
                            </div> */}
                            {/* <div className="row mt-2">
                                <div className="col-md-3">
                                    <label htmlFor="maxQuantity"> MarkPrice</label>
                                </div>
                                <div className="col-md-9">
                                    <input
                                        onChange={this.handleChange}
                                        value={markPrice}
                                        name="markPrice"
                                        error={errors.markPrice}
                                        id="markPrice"
                                        type="text"
                                        className={classnames("form-control", {
                                            invalid: errors.markPrice
                                        })}
                                    />
                                    <span className="text-danger">{errors.markPrice}</span>
                                </div>
                            </div> */}
                            {/* {
                                botstatus == 'binance' &&
                                <div className="row mt-2">
                                    <div className="col-md-3">
                                        <label>Markup(%)</label>
                                    </div>
                                    <div className="col-md-9">

                                        <input
                                            onChange={this.handleChange}
                                            value={markupPercentage}
                                            name="maxQuantity"
                                            error={errors.markupPercentage}
                                            id="markupPercentage"
                                            type="text"
                                            className={classnames("form-control", {
                                                invalid: errors.markupPercentage
                                            })}
                                        />


                                        <span className="text-danger">{errors.markupPercentage}</span>
                                    </div>
                                </div>
                            } */}

                            <div className="row mt-2">
                                <div className="col-md-3">
                                    <label htmlFor="autobot">Status</label>
                                </div>
                                <div className="col-md-9">
                                    <Form.Control
                                        as="select"
                                        custom
                                        name={'status'}
                                        id={'status'}
                                        value={status}
                                        onChange={this.handleChange}
                                    >
                                        {/* <option value={''}>{"Status"}</option> */}
                                        <option value = {"Active"}>Active</option>
                                        <option value = {"Inactive"}>Inactive</option>
                                        {/* {
                                            options && options.length > 0 && options.map((item, key) => {
                                                return (
                                                    <option key={key} value={item.value}>{item.label}</option>
                                                )
                                            })
                                        } */}
                                    </Form.Control>
                                    <span className="text-danger">{errors.botstatus}</span>
                                </div>
                            </div>

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={this.handleClose}
                            disabled={loader}
                        >
                            Close
                        </button>
                        <button
                            onClick={this.handleSubmit}
                            className="btn btn-primary"
                            disabled={loader}
                        >
                            {loader && <i class="fas fa-spinner fa-spin"></i>}
                            Submit
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}



export default EditpaymenttypeModal;
