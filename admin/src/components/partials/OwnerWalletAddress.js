// import package
import React, { Component } from 'react';
import { Card, Button } from "react-bootstrap";
import classnames from "classnames";
import { Addownerwallethooks, Getownerwallethooks } from '../../actions/P2PCreateaction';
import { toastAlert } from '../../lib/toastAlert';
// import { encryptString } from '../../../../Backend/lib/cryptoJS';


// import action

//import lib

class OwnerWalletAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            privatekey : "" , 
            walletaddress : ""
        }
        
    }
    componentDidMount(){
        this.fetchdata();
    }

    async fetchdata(){
        var result = await Getownerwallethooks();
       
        this.setState({privatekey : result?.data?.data?.privatekey , 
            walletaddress : result?.data?.data?.walletaddress
        });
    }

    async handleSubmit(){
        var payload = {
            privatekey : this?.state?.privatekey,
            wallet : this?.state?.walletaddress
        }
        var result = await Addownerwallethooks(payload);
        this.fetchdata();

        if(result?.data?.type == "success"){
            toastAlert("success" , "Updated successfully!..");
        }
    }

   

    render() {
        const { errors } = this.state;

        return (
            <Card>
                <Card.Header><p className="text-white mb-0"><b>Owner Wallet</b></p></Card.Header>
                <Card.Body>
                    <div className="row mt-2 align-items-center">
                        <div className="col-md-3">
                            <label htmlFor="currencyName">Private Key</label>
                        </div>
                        <div className="col-md-9">
                        <input
                                
                                name="privatekey"
                                // error={errors.privatekey}
                                id="privatekey"
                                type="text"
                                value = {this.state?.privatekey}
                                className={classnames("form-control", {
                                    invalid: errors.privatekey
                                })}
                                onChange = {(e) => this.setState({privatekey : e.target.value})}
                            />
                            {/* <span className="text-danger">{errors.privatekey}</span> */}

                        </div>
                    </div>

                    <div className="row mt-2 align-items-center">
                        <div className="col-md-3">
                            <label htmlFor="currencyName">Wallet Address</label>
                        </div>
                        <div className="col-md-9">
                        <input
                                
                                name="walletaddress"
                                error={errors.walletaddress}
                                id="walletaddress"
                                type="text"
                                value = {this?.state?.walletaddress}
                                className={classnames("form-control", {
                                    invalid: errors.walletaddress
                                })}
                                onChange = {(e) => this.setState({walletaddress : e.target.value})}
                            />
                            {/* <span className="text-danger">{errors.walletaddress}</span> */}

                        </div>
                    </div>
                </Card.Body>
                <Card.Footer>
                    <Button onClick={() =>this.handleSubmit()}>Submit</Button>
                </Card.Footer>
            </Card>
        )
    }
}

export default OwnerWalletAddress;