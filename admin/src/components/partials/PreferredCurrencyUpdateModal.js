import React from "react";
import classnames from "classnames";
import { Modal, Form } from "react-bootstrap";

// import action
import { updateCurrency, updatePreferredCurrency } from "../../actions/currency";

// import lib
import { toastAlert } from "../../lib/toastAlert";
import fileObjectUrl from "../../lib/fileObjectUrl";
import isEmpty from "../../lib/isEmpty";

const initialFormValue = {
  currencyId: "",
  name: "",
  coin: "",
  symbol: "",
  type: "crypto",
  withdrawFee: 0,
  minimumWithdraw: 0,
  fundLimit: 0,
  fundFee: 0,
  fundInterval: 0,
  decimal: 0,
  depositType: "coin_payment",
  image: "",
  bankName: "",
  accountNo: "",
  holderName: "",
  bankcode: "",
  country: "",
  tokenType: "",
  depositStatus: "Off",
  withdrawStatus: "Off",
  minABI: "",
  contractAddress: "",
  contractDecimal: "",
  status: "active",
  depositminlimit: 0,
  isPrimary: false,
  commisionfee : 0,
  buyercommisionfee : 0,
  coinpaymentsymbol : "",
  key : "",
  api : "",
  "bitgosymbol" : ""
};

class PreferredCurrencyUpdateModal extends React.Component {
  constructor() {
    super();
    this.state = {
      loader: false,
      formValue: initialFormValue,
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    const { record, imageUrl } = nextProps;
    console.log("record" , record);
    
    if (record) {
      let formData = {
        currencyId: record._id,
        name: record.name,
        coin: record.coin,
        symbol: record.showSymbol,
        image: isEmpty(record.image) ? "" : imageUrl + record.image,
        type: record.type,
        withdrawFee: record.withdrawFee,
        minimumWithdraw: record.minimumWithdraw,
        fundLimit: record.fundLimit,
        fundFee: record.fundFee,
        fundInterval: record.fundInterval,
        status: record.status,
        depositType: record.depositType,
        depositminlimit: record.depositminlimit,
        isPrimary: false,
        decimal: record.decimal,
        depositStatus: record.depositStatus,
        withdrawStatus: record.withdrawStatus,
        commisionfee : record.commisionfee,
        buyercommisionfee : record?.buyercommisionfee,
        coinpaymentsymbol : record.coinpaymentsymbol,
        "bitgosymbol" : record?.bitgosymbol
      };
      if (record.type == "fiat") {
        formData["bankName"] = record.bankDetails.bankName;
        formData["accountNo"] = record.bankDetails.accountNo;
        formData["holderName"] = record.bankDetails.holderName;
        formData["bankcode"] = record.bankDetails.bankcode;
        formData["country"] = record.bankDetails.country;
      } else if (record.type == "token") {
        formData["minABI"] = record.minABI;
        formData["contractAddress"] = record.contractAddress;
        formData["contractDecimal"] = record.contractDecimal;
        formData["tokenType"] = record.tokenType;
      }
      if(record.depositType == "local"){
         formData["api"] = record.api 
         formData["key"] = record.key 
      }
      this.setState({ formValue: formData });
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...this.state.formValue, ...{ [name]: value } };
    this.setState({ formValue: formData });
  };

  handleClose = () => {
    const { onHide } = this.props;
    onHide();
    this.setState({ formValue: initialFormValue, errors: {} });
  };

  handleFile = (e) => {
    e.preventDefault();
    const { name, files } = e.target;
    let formData = { ...this.state.formValue, ...{ [name]: files[0] } };
    this.setState({ formValue: formData });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { formValue } = this.state;
    const { fetchData } = this.props;

    if (formValue && formValue.image) {
      if (formValue.image.size > 20000) {
        this.setState({
          errors: { image: "Image size should be less than  20 Kb" },
        });
        toastAlert(
          "error",
          "Image size should be less than  20 Kb",
          "currencyUpdateModal"
        );
        return false;
      }
    }

    try {
      const formData = new FormData();
      formData.append("currencyId", formValue.currencyId);
      formData.append("type", formValue.type);
      formData.append("name", formValue.name);
      formData.append("coin", formValue.coin);
      formData.append("symbol", formValue.symbol);
      formData.append("contractAddress", formValue.contractAddress);
      formData.append("minABI", formValue.minABI);
      formData.append("contractDecimal", formValue.contractDecimal);
      formData.append("decimal", formValue.decimal);
      formData.append("tokenType", formValue.tokenType);
      formData.append("withdrawFee", formValue.withdrawFee);
      formData.append("minimumWithdraw", formValue.minimumWithdraw);
      formData.append("fundLimit", formValue.fundLimit);
      formData.append("fundFee", formValue.fundFee);
      formData.append("fundInterval", formValue.fundInterval);
      formData.append("bankName", formValue.bankName);
      formData.append("accountNo", formValue.accountNo);
      formData.append("holderName", formValue.holderName);
      formData.append("bankcode", formValue.bankcode);
      formData.append("country", formValue.country);
      formData.append("image", formValue.image);
      formData.append("depositType", formValue.depositType);
      formData.append("depositminlimit", formValue.depositminlimit);
      formData.append("status", formValue.status);
      formData.append("depositStatus", formValue.depositStatus);
      formData.append("withdrawStatus", formValue.withdrawStatus);
      formData.append("commisionfee" , formValue.commisionfee);
      formData.append("buyercommisionfee" , formValue.buyercommisionfee)
      formData.append("coinpaymentsymbol" , formValue.coinpaymentsymbol);
      formData.append("bitgosymbol" , formValue?.bitgosymbol)
      formData.append("api" , formValue.api);
      formData.append("key" , formValue.key);

      this.setState({ loader: true });

      const { status, loading, message, error } = await updatePreferredCurrency(
        formData
      );
      this.setState({ loader: loading });
      if (status == "success") {
        this.handleClose();
        fetchData();
        toastAlert("success", message, "currencyUpdateModal");
      } else if (status == "failed") {
        if (error) {
          this.setState({ errors: error });
        } else {
          toastAlert("error", message, "currencyUpdateModal");
        }
      }
    } catch (err) {}
  };

  render() {
    const {
      type,
      name,
      coin,
      symbol,
      decimal,
      tokenType,
      contractAddress,
      contractDecimal,
      minABI,
      withdrawFee,
      minimumWithdraw,
      fundLimit,
      fundFee,
      fundInterval,
      bankName,
      accountNo,
      holderName,
      bankcode,
      country,
      image,
      depositType,
      depositminlimit,
      status,
      depositStatus,
      withdrawStatus,
      commisionfee,
      buyercommisionfee,
      coinpaymentsymbol,
      bitgosymbol,
      api , 
      key
    } = this.state.formValue;
   
    const { errors, loader } = this.state;

    const { isShow } = this.props;
    console.log("image" , image);
    

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
            <h4 className="modal-title">Update Preferred Currency</h4>
          </Modal.Header>
          <Modal.Body>
            <form>
              
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
                  <span className="text-danger">{errors.coin}</span>
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
                  <span className="text-danger">{errors.symbol}</span>
                </div>
              </div>

              

              

             

              

             

              
              


             

             

              <div className="row mt-2">
                <div className="col-md-3">
                  <label>Status</label>
                </div>
                <div className="col-md-9">
                  <Form.Control
                    name="status"
                    value={status}
                    onChange={this.handleChange}
                    as="select"
                    custom
                  >
                    <option value={"active"}>Active</option>
                    <option value={"Inactive"}>Inactive</option>
                  </Form.Control>

                  <span className="text-danger">{errors.type}</span>
                </div>
              </div>

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
                    accept="image/x-png,image/gif,image/jpeg"
                    aria-describedby="fileHelp"
                  />
                  Choose File
                  </label>
                  <span className="text-danger">{errors.image}</span>
                  <img
                    className="img-fluid proofThumb"
                    src={fileObjectUrl(image)}
                  />
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
            <button onClick={this.handleSubmit} className="btn btn-primary">
              {loader && <i class="fas fa-spinner fa-spin"></i>}Update currency
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default PreferredCurrencyUpdateModal;
