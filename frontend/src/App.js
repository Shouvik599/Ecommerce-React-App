import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import WebFont from "webfontloader";
import React, { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import Cart from './component/Cart/Cart';
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from "./component/Cart/ConfirmOrder.js"
import Payment from "./component/Cart/Payment.js"
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSucces.js"
import MyOrders from "./component/Order/MyOrders.js"
import OrderDetails from "./component/Order/OrderDetails.js"

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log(isAuthenticated, " ", user);
  // const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");

  //   setStripeApiKey(data.stripeApiKey);
  //   console.log(data.setStripeApiKey);
  // }
  const stripeApiKey = "pk_test_51KeMPVSCGvfstJuYoKR5HOH2ODRGEmLTLKzrvqPlcstFxr0mCKVNf7qdWwn3OOBKLSRgb1WWFs5zE7JPYjPsnPjK00BQNXXomj";
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans"],
      },
    });
    store.dispatch(loadUser());
    // getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/Search" component={Search} />
      <ProtectedRoute exact path="/account" component={Profile} />
      <Route exact path="/login" component={LoginSignUp} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute
        exact
        path="/password/update"
        component={UpdatePassword}
      />
      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/cart" component={Cart} />
      <ProtectedRoute exact path="/shipping" component={Shipping}/>
      
      
      <Elements stripe={loadStripe(stripeApiKey)}><ProtectedRoute exact path="/process/payment" component={Payment}/></Elements>
      <ProtectedRoute exact path="/success" component={OrderSuccess} />
      <ProtectedRoute exact path="/orders" component={MyOrders} />
      <Switch>
      <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder}/>
      <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
