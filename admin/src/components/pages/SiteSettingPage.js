import React, { Component } from "react";
import { Card, Button, Form } from "react-bootstrap";
import Select from 'react-select';

//lib
import { toastAlert } from "../../lib/toastAlert";
// import component
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import SiteDetails from '../partials/siteDetals'
import UserDashboard from '../partials/UserDashboard';
import SocialMedia from '../partials/SocialMedia'
import MailUpdate from '../partials/EmailIntegration'
import SendinBlue from '../partials/SendinBlue'
import FaqTrend from '../partials/FaqTrend'
import OwnerWalletAddress from '../partials/OwnerWalletAddress'

// import action
import { getSiteSetting, updateSiteSetting, getMailIntegrate, updateMailIntegrate } from '../../actions/siteSettingActions';
import { getPairDropdown, } from '../../actions/commonActions'
import { getCurrency } from '../../actions/currency';
import { getFaqDropdown } from '../../actions/faqActions'



const initialFormValue = {
    "fromemail": "",
    "host": "",
    "port": "",
    "secure": "",
    "user": "",
    "pass": "",
}

class SiteSettingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValue: initialFormValue,
            pairListOption: [],
            currencyOption: [],
            faqOption: [],
            marketTrend: [],
            records: {},
            loader: false,
            errors: {}
        };

        this.fetchSiteSetting = this.fetchSiteSetting.bind(this);
        this.handlePairChange = this.handlePairChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchCurrency = this.fetchCurrency.bind(this)
        this.handleChange = this.handleChange.bind(this)
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

    componentDidMount() {
        this.fetchSiteSetting();
        this.fetchPairDropdown();
        this.fetchCurrency();
        this.fetchFaqDropdown()
    };


    async fetchSiteSetting() {
        try {
            const { status, loading, result } = await getSiteSetting();
          
            if (status == 'success') {
                this.setState({ 'marketTrend': result.marketTrend, "records": result })
            }
        } catch (err) { }
    }

    async fetchPairDropdown() {
        try {
            const { status, loading, result } = await getPairDropdown();
            if (status == 'success') {
                let option = []
                result && result.length > 0 && result.map((item, key) => {
                    option.push({
                        'label': item.firstCurrencySymbol + item.secondCurrencySymbol,
                        'value': item._id
                    })
                })
                this.setState({ 'pairListOption': option })
            }
        } catch (err) { }
    }

    async fetchFaqDropdown() {
        try {
            const { status, loading, result } = await getFaqDropdown();
            if (status == 'success') {
                let option = []
                result && result.length > 0 && result.map((item, key) => {
                    option.push({
                        'label': item.question,
                        'value': item._id
                    })
                })
                this.setState({ 'faqOption': option })
            }
        } catch (err) { }
    }

    async fetchCurrency() {
        try {
            const { status, result } = await getCurrency();
            if (status == 'success') {
                this.setState({ currencyOption: result })
            }
        } catch (err) { }
    }

    async fetchSiteSetting() {
        try {
            const { status, loading, result } = await getSiteSetting();
            if (status == 'success') {
                this.setState({ 'marketTrend': result.marketTrend, "records": result })
            }
        } catch (err) { }
    }



    handlePairChange(selectedOption) {
        if (selectedOption && selectedOption.length > 0) {
            this.setState({
                "marketTrend": selectedOption.map((el) => { return el.value; })
            })
        } else {
            this.setState({ "marketTrend": [] })
        }
    };

    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        let formData = { ...this.state.formValue, ...{ [name]: value } };
        this.setState({ formValue: formData });
    }






    async handleSubmit(e) {
        e.preventDefault();
        const { marketTrend } = this.state;

        let reqData = {
            marketTrend
        }

        try {
            const { status, loading, result, message } = await updateSiteSetting(reqData);
            if (status == 'success') {
                this.setState({ 'marketTrend': result.marketTrend })
                toastAlert('success', message, 'marketTrends')
            } else {
                toastAlert('error', message, 'marketTrends')
            }

        } catch (err) { }
    }


    componentDidMount() {
        this.fetchSiteSetting();
        this.fetchPairDropdown();
        this.fetchCurrency();
        this.fetchFaqDropdown();
    };



    render() {
        const { pairListOption, marketTrend, currencyOption, records, errors, faqOption } = this.state;
        const {
            fromemail,
            host,
            port,
            secure,
            user,
            pass
        } = this.state.formValue;


        return (
            <div>
                <Navbar />
                <div className="d-flex" id="wrapper">
                    <Sidebar />
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <h3 className="mt-2 text-secondary"> Site Setting</h3>
                            <Card>
                                <Card.Header><p className="text-white"><b>Market Trend</b></p></Card.Header>
                                <Card.Body>
                                    <div className="row mt-2 align-items-center">
                                        <div className="col-md-3">
                                            <label htmlFor="currencyName">Pair Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <Select
                                                value={pairListOption && pairListOption.length > 0 ? pairListOption.filter((el) => {
                                                    if (marketTrend.includes(el.value)) {
                                                        return el;
                                                    }
                                                }) : []}
                                                isMulti
                                                name="colors"
                                                options={pairListOption}
                                                onChange={this.handlePairChange}
                                                styles={this.styles} className="border_blue_select basic-multi-select"
                                                classNamePrefix="select"
                                            />

                                        </div>
                                    </div>
                             
                                </Card.Body>
                                <Card.Footer>
                                    <Button onClick={this.handleSubmit}>Submit</Button>
                                </Card.Footer>
                            </Card>
                            <FaqTrend
                                records={records}
                                faqOption={faqOption}
                            /> 

                            <OwnerWalletAddress /> 
                            <SiteDetails
                                records={records}
                                fetchSiteSetting={this.fetchSiteSetting}
                            />
                            <UserDashboard
                                records={records}
                                currencyOption={currencyOption}
                            />
                            <SocialMedia
                                records={records}
                                currencyOption={currencyOption}
                            />
                            {/*<MailUpdate
                            />*/}
                            <SendinBlue
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default SiteSettingPage;