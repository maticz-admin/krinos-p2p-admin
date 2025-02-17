import React from 'react'
// import page
import P2pPair from "../pages/P2pPair"
import Dashboard from "../pages/Dashboard";
import Login from "../auth/Login";
import LoginHistory from "../partials/LoginHistory";
import Forgot from "../auth/Forgot";
import User from "../pages/Users";
import Bonus from "../pages/Bonus";
import Emailtemplates from "../pages/Emailtemplates";
import Pairmanagement from "../pages/Pairmanagement";
import Cms from "../pages/Cms";
import Profile from "../pages/Profile.jsx";
import Settings from "../pages/Settings";
import Changepassword from "../pages/Changepassword";
import Register from "../auth/Register";

import Withdraw from "../pages/Withdraw";
import Deposit from "../pages/Deposit";
import LanguagePage from "../pages/LanguagePage";
import Userbalance from "../pages/Userbalance";
import Liquidated from "../pages/Liquidated";
// import priceConversion from '../pages/priceConversion'
import Perpetual from "../pages/Perpetual";
import Contactus from "../pages/Contactus";
import ProfitManagement from "../pages/ProfitDisplay";
// import Chat from "./components/pages/Chat";
import Newsletter from "../pages/Newsletter";
import SupportCategory from '../pages/supportCategory';
import Support from "../pages/Support";
import SupportReply from "../pages/SupportReply";
import Currency from "../pages/Currency";
import SubAdmin from "../pages/SubAdmin";
import TradeHistory from "../pages/Tradehistory";
import Closedpositions from "../pages/Closedpositionshistory";
import OrderHistory from "../pages/Orderhistory";
import PerpetualOrderHistory from '../pages/perputualOrderHoitory'
import PerpetualTradeHistory from '../pages/perpetualTradeHistory'
import FeeSettings from "../pages/Feesettings.jsx"
// import Assets from "../../components/pages/AssetsExchange.jsx"
// import Category from "../../components/pages/category.jsx"
// import Subcategory from "../../components/pages/Subcategory.jsx";
import Anouncement from "../pages/anouncement";
// import Article from "../../components/pages/Article.jsx";
// import Staking from "../pages/Staking";
import StakeSettlement from "../pages/StakeSettelment";
import StakeOrder from "../pages/StakeHistory";

// import HelpCentreCategory from "../../components/pages/HelpCentrecategory.jsx"
// import HelpCentreArticle from "../../components/pages/HelpcentreArticle.jsx"
import Kyc from "../pages/Kyc";
import kycupdate from "./KycUpdate.js";
import Tradingbot from "../pages/Tradingbot"
// import Launchpad from "../pages/Launchpad"
import TokenPurchase from "../pages/TokenPurchase"

import SiteSettingPage from "../pages/SiteSettingPage";
// import LanguagePage from "../../components/LanguagePage";
import FaqCategory from "../pages/FaqCategory";
import FaqPage from "../pages/Faq";
import perpetualTradeHistory from "../pages/perpetualTradeHistory";
// p2p
import P2pOrder from "../pages/P2pOrder";
import P2pOrderView from "../pages/P2pOrderView";
import P2pDispute from '../pages/P2pDispute'

//passBook
import PassBookHistory from "../pages/PassBookHistory"
import Offer from "../pages/Offer"
import Paymenttypes from '../pages/Paymenttypes';

//2fa
import GoogleAuth from '../pages/SecurityTwoFA'


const route = [
    {
        path: "/login-history",
        name: 'LoginHistory',
        component: LoginHistory,
        exact: true,
        type: "private",
        sidemenu: false
    },
   
    {
        path: "/",
        name: 'Login',
        component: Login,
        exact: true,
        type: "auth",
        sidemenu: false
    },
    {
        path: "/register",
        name: 'Register',
        component: Register,
        exact: true,
        type: "auth",
        sidemenu: false,
    },
    {
        path: "/login",
        name: 'Login',
        component: Login,
        exact: true,
        sidemenu: false,
        type: "auth"
    },
    {
        path: "/forgot",
        name: 'Forgot',
        component: Forgot,
        exact: true,
        sidemenu: false,
        type: "auth"
    },
    {
        path: "/dashboard",
        name: 'Dashboard',
        component: Dashboard,
        exact: true,
        sidemenu: true,
        type: "private"
    },
   
    {
        path: "/users",
        name: 'User',
        component: User,
        exact: true,
        sidemenu: true,
        type: "private"
    },
    {
        path: "/site-setting",
        name: 'SiteSettingPage',
        component: SiteSettingPage,
        exact: true,
        sidemenu: true,
        type: "private"
    },
    
    {
        path: "/cms",
        name: 'Cms',
        component: Cms,
        exact: true,
        sidemenu: true,
        type: "private"
    },
    {
        path: "/contactus",
        name: 'Contactus',
        component: Contactus,
        exact: true,
        sidemenu: true,
        type: "private"
    },

    {
        path: "/faq-category",
        name: 'FaqCategory',
        component: FaqCategory,
        exact: true,
        sidemenu: true,
        type: "private"
    },
    {
        path: "/faq",
        name: 'FaqPage',
        component: FaqPage,
        exact: true,
        sidemenu: true,
        type: "private"
    },
    {
        path: "/emailtemplates",
        name: 'Emailtemplates',
        component: Emailtemplates,
        exact: true,
        sidemenu: true,
        type: "private"
    },
    
    {
        path: "/support-category",
        name: 'SupportCategory',
        component: SupportCategory,
        exact: true,
        sidemenu: true,
        type: "private"
    },
    {
        path: "/support",
        name: 'Support',
        component: Support,
        exact: true,
        sidemenu: true,
        type: "private"
    },
    {
        path: "/support_reply/:id",
        name: 'SupportReply',
        component: SupportReply,
        exact: true,
        sidemenu: true,
        type: "private"
    },
    {
        path: "/security",
        name: 'GoogleAuth',
        component: GoogleAuth,
        exact: true,
        sidemenu: true,
        type: "private"
    },


    {
        path: "/kyc",
        name: 'Kyc',
        component: Kyc,
        exact: true,
        sidemenu: true,
        type: "private"
    },
    {
        path: "/currency",
        name: 'Currency',
        component: Currency,
        exact: true,
        sidemenu: true,
        type: "private"
    },

    {
        path: "/profile",
        name: 'Profile',
        component: Profile,
        exact: true,
        sidemenu: true,
        type: "private"
    },
   
    {
        path: "/changepassword",
        name: 'Changepassword',
        component: Changepassword,
        exact: true,
        sidemenu: true,
        type: "private"
    },
    {
        path: "/orderhistory",
        name: 'OrderHistory',
        component: OrderHistory,
        exact: true,
        sidemenu: true,
        type: "private"
    },
    {
        path: "/tradehistory",
        name: 'TradeHistory',
        component: TradeHistory,
        exact: true,
        sidemenu: true,
        type: "private"
    },
    
    {
        path: "/withdraw",
        name: 'Withdraw',
        component: Withdraw,
        exact: true,
        sidemenu: true,
        type: "private"
    },
    {
        path: "/deposit",
        name: 'Deposit',
        component: Deposit,
        exact: true,
        sidemenu: true,
        type: "private"
    },
   
    {
        path: "/kyc",
        name: 'Kyc',
        component: Kyc,
        exact: true,
        sidemenu: true,
        type: "private"
    },
    {
        path: "/contactus",
        name: 'Contactus',
        exact: true,
        sidemenu: true,
        component: Contactus
    },
    {
        path: "/newsletter",
        name: 'Newsletter',
        exact: true,
        sidemenu: true,
        component: Newsletter
    },
   
    {
        path: "/kycupdate/:id",
        name: 'kycupdate',
        exact: true,
        sidemenu: true,
        component: kycupdate
    },
    {
        path: "/Offer",
        name: 'Offer',
        exact: true,
        sidemenu: true,
        component: Offer
    },
    {
        path: "/paymenttypes",
        name: 'paymenttypes',
        exact: true,
        sidemenu: true,
        component: Paymenttypes
    }

]

export default route