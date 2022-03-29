import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {
    Login,
    Signup,
    Started,
    UseCases,
    Location,
    LocationDetails,
    ItemList,
    ItemDetail,
    HelperCount,
    DateSelect, PayMethod, ThankYou, MyOrders, OrderDetails
} from "./pages";

const AppRoutes = ({auth}) => {
    return  (
        <Switch>
        {
            auth ? (
                <>
                    <Route path="/" exact component={Started}/>
                    <Route path="/usecases" exact component={UseCases}/>
                    <Route path="/location" exact component={Location}/>
                    <Route path="/location-details" exact component={LocationDetails}/>
                    <Route path="/item-list" exact component={ItemList}/>
                    <Route path="/item-detail" exact component={ItemDetail}/>
                    <Route path="/helper-count" exact component={HelperCount}/>
                    <Route path="/date-select" exact component={DateSelect}/>
                    <Route path="/paymethod" exact component={PayMethod}/>
                    <Route path="/thankyou" exact component={ThankYou}/>
                    <Route path="/my-orders" exact component={MyOrders}/>
                    <Route path="/order/:id" exact component={OrderDetails}/>
                    <Redirect to="/"/>
                </>
            ) : (
                <>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/signup" exact component={Signup}/>
                    <Redirect to="/login"/>
                </>
            )
        }
        </Switch>
    )
}

export default AppRoutes