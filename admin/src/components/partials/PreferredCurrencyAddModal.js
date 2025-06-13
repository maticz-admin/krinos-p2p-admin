import React from "react";
import classnames from "classnames";
import { Modal, Form } from "react-bootstrap";

// import lib
import { toastAlert } from '../../lib/toastAlert';
import fileObjectUrl from '../../lib/fileObjectUrl'
import Select from 'react-select';

// import action
import { addCurrency, addPreferredCurrency } from '../../actions/currency';
import isEmpty from "../../lib/isEmpty";

const initialFormValue = {
  'name': '',
  'coin': '',
  'symbol': '',
  'type': 'crypto',
  'withdrawFee': 0,
  'minimumWithdraw': 0,
  'depositType': 'bitgo',
  'image': '',
  'bankName': '',
  'accountNo': '',
  'holderName': '',
  'bankcode': '',
  'country': '',
  'tokenType': '',
  'depositStatus': 'Off',
  'withdrawStatus': 'Off',
  'minABI': '',
  'contractAddress': '',
  'decimals': 0,
  'isPrimary': false,
  'payment': [],
 'upiInputValue':0,
 'commisionfee' : 0,
 'buyercommisionfee' : 0,
 "coinpaymentsymbol" : "",
 "api" : "",
 "key" : "",
 "bitgosymbol" : ""

}

class PreferredCurrencyAddModal extends React.Component {
  constructor() {
    super();
    this.state = {
      loader: false,
      formValue: initialFormValue,
      errors: {},
      //upi: false,
      //bank:false
    };
    this.paymentOption = [
      { 'label': 'BankTransaction', 'value': 'bank' },
      { 'label': 'UPI', 'value': 'upi' }
    ]
    this.handlePayment = this.handlePayment.bind(this);
  }

  styles = {
        option: (provided, state) => ({
          ...provided,
          color: "white",
          backgroundColor: "#242827",
        }),
        valueContainer: (provided, state) => ({
          ...provided,
          height: '52px',
          padding: '0 6px',
          backgroundColor: "#1a1b1c",
          borderColor: '#59615f',
        borderRadius: 8,
        borderStyle: 'solid',
        borderWidth: '1px'
         
        }),
        control: (provided, state) => ({
          ...provided,
          height: '52px',
          borderRadius:8,
          backgroundColor: "#1a1b1c",
          border:'none'
         
        }),
        indicatorsContainer: (provided, state) => ({
          ...provided,
          height: '52px',
          position: 'absolute',
          right: 0,
          top: 0,
          color:'#fff' 
        }),    
        singleValue: (provided, state) => ({
          ...provided,
          color: "#fff"
        })
      };

  handlePayment(selectedOption) {
    if (selectedOption && selectedOption.length > 0) {
      let formData = { ...this.state.formValue, 'payment': selectedOption.map((el) => { return el.value; }) };

   
      this.setState({ formValue: formData });
    } else {
      let formData = { ...this.state.formValue, 'payment': [] };
      this.setState({ formValue: formData });
    }
  };
  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...this.state.formValue, ...{ [name]: value } };
    this.setState({ formValue: formData });
  };

  handleClose = () => {
    const { onHide } = this.props;
    onHide();
    this.setState({ 'formValue': initialFormValue, errors: {} });
  }


  handleFile = (e) => {
    e.preventDefault();
    const { name, files } = e.target;
    let formData = { ...this.state.formValue, ...{ [name]: files[0] } };
    this.setState({ formValue: formData });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      type,
      name,
      coin,
      symbol,
      depositType,
      contractAddress,
      minABI,
      decimals,
      tokenType,
      withdrawFee,
      minimumWithdraw,
      bankName,
      accountNo,
      holderName,
      bankcode,
      country,
      image,
      payment,
      upiInputValue,
      depositStatus,
      withdrawStatus,
      commisionfee,
      buyercommisionfee,
      coinpaymentsymbol,
      bitgosymbol

    } = this.state.formValue;
    const { fetchData } = this.props;

    if (image) {
      if (image.size > 20000) {
        this.setState({ errors: { image: "Image size should be less than  20 Kb" } })
        toastAlert('error', "Image size should be less than  20 Kb", 'currencyAddModal')
        return false
      }
    }

    const formData = new FormData();
    formData.append("type", type);
    formData.append("name", name);
    formData.append("coin", coin);
    formData.append("symbol", symbol);
    formData.append("depositType", depositType);
    formData.append("contractAddress", contractAddress);
    formData.append("minABI", minABI);
    formData.append("decimals", decimals);
    formData.append("tokenType", tokenType);
    formData.append("withdrawFee", withdrawFee);
    formData.append("minimumWithdraw", minimumWithdraw);
    formData.append("payment", payment)
    formData.append("bankName", bankName);
    formData.append("accountNo", accountNo);
    formData.append("holderName", holderName);
    formData.append("bankcode", bankcode);
    formData.append("country", country);
    formData.append("image", image);
    formData.append("upiInputValue",upiInputValue)
    formData.append("depositStatus",depositStatus)
    formData.append("withdrawStatus",withdrawStatus)
    formData.append("commisionfee" , commisionfee);
    formData.append("buyercommisionfee" , buyercommisionfee)
    formData.append("coinpaymentsymbol", coinpaymentsymbol)
    formData.append("bitgosymbol" , bitgosymbol)
    this.setState({ loader: true })
    try {
      const { status, loading, message, error } = await addPreferredCurrency(formData);
      console.log("status, loading, message, error" , status, loading, message, error);
      this.setState({ loader: loading })
      if (status == 'success') {
        this.handleClose()
        fetchData()
        toastAlert('success', message, 'currencyAddModal')
      } else if (status == 'failed') {
        if (error) {
          toastAlert('error', error.errors)
          this.setState({ errors: error })
        } else {
          toastAlert('error', message, 'currencyAddModal')
        }
      }
    } catch (err) {
    }
  };

  render() {
    const {
      type,
      name,
      coin,
      symbol,
      decimals,
      depositType,
      tokenType,
      contractAddress,
      minABI,
      withdrawFee,
      minimumWithdraw,
      bankName,
      accountNo,
      holderName,
      bankcode,
      country,
      image,
      payment,
      upiInputValue,
      depositStatus,
      withdrawStatus,
      commisionfee,
      buyercommisionfee,
      coinpaymentsymbol,
      api,
      key,
      bitgosymbol
    } = this.state.formValue;
    const { errors, loader, upi } = this.state;

    const { isShow } = this.props;

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
            <h4 className="modal-title">Add Preferred Currency</h4>
          </Modal.Header>
          <Modal.Body>

            <form noValidate>

              <div className="row mt-2">
                <div className="col-md-3">
                  <label>Coin</label>
                </div>
                <div className="col-md-9">
                  <input
                    name="coin"
                    type="text"
                    value={coin}
                    onChange={this.handleChange}
                    error={errors.coin}
                    className={classnames("form-control", {
                      invalid: errors.coin,
                    })}
                  />
                  <span className="text-danger">
                    {errors.coin}
                  </span>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-3">
                  <label>Symbol</label>
                </div>
                <div className="col-md-9">
                  <input
                    name="symbol"
                    type="text"
                    value={symbol}
                    onChange={this.handleChange}
                    error={errors.symbol}
                    className={classnames("form-control", {
                      invalid: errors.symbol,
                    })}
                  />
                  <span className="text-danger">
                    {errors.symbol}
                  </span>
                </div>
              </div>


              
             

             
             

              
             
            

              {depositType =="local" &&<>
              {/* <div className="row mt-2"> */}
                {/* <div className="col-md-3">
                  <label>API</label>
                </div> */}
                {/* <div className="col-md-9">
                  <input
                    name="api"
                    type="text"
                    value={api}
                    onChange={this.handleChange}
                    error={errors.api}
                    className={classnames("form-control", {
                      invalid: errors.api,
                    })}
                  />
                  <span className="text-danger">{errors.api}</span>
                </div> */}
              {/* </div> */}
              {/* <div className="row mt-2">
                <div className="col-md-3">
                  <label>Key</label>
                </div>
                <div className="col-md-9">
                  <input
                    name="key"
                    type="text"
                    value={key}
                    onChange={this.handleChange}
                    error={errors.key}
                    className={classnames("form-control", {
                      invalid: errors.key,
                    })}
                  />
                  <span className="text-danger">{errors.key}</span>
                </div>
              </div> */}
              
              </>}

              
             


              
              

              <div className="row mt-2">
                <div className="col-md-3">
                  <label htmlFor="minimum">Currency icon</label>
                </div>
                <div className="col-md-9">

                <label class="custom-file-upload">
                <input
                    name="image"
                    type="file"
                    onChange={this.handleFile}
                    accept="image/x-png,image/gif,image/jpeg, image/png"
                    aria-describedby="fileHelp"
                  />
                Choose File
            </label>

                 
                
                  <img
                    className="img-fluid proofThumb"
                    src={fileObjectUrl(image)}
                  />
                  <div>
                  <span className="text-danger">{errors.image}</span>
                  </div>
                </div>
              </div>

            </form>

          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={this.handleClose}
            >
              Close
            </button>
            <button
              onClick={this.handleSubmit}
              className="btn btn-primary"
            >
              {loader && <i class="fas fa-spinner fa-spin mr-2"></i>}Add currency
            </button>
          </Modal.Footer>
        </Modal>
      </div >
    );
  }
}

export default PreferredCurrencyAddModal
