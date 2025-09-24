import React, { Suspense } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
const HomeRunaway = React.lazy(() => import("./home/HomeRunaway"));
const ProductRunaway = React.lazy(() => import("./home/ProductRunaway"));
const ShoppingBag = React.lazy(() => import("./shops/ShoppingBag"));
const UserLogin = React.lazy(() => import("./userView/UserLogin"));
const UserRegister = React.lazy(() => import("./userView/UserRegister"));
const ProfileView = React.lazy(() => import("./userView/ProfileView"));
const ShippingView = React.lazy(() => import("./shops/ShippingView"));
const PaymentView = React.lazy(() => import("./shops/PaymentView"));
const PlaceOrderView = React.lazy(() => import("./shops/PlaceOrderView"));
const OrderView = React.lazy(() => import("./shops/OrderView"));
const UserListView = React.lazy(() => import("./userView/UserListView"));
const UserEditView = React.lazy(() => import("./userView/UserEditView"));
const ProductListView = React.lazy(() =>
  import("./productView/ProductListView")
);
const ProductEditView = React.lazy(() =>
  import("./productView/ProductEditView")
);

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<HomeRunaway />} />
              <Route path="/product/:id" element={<ProductRunaway />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/register" element={<UserRegister />} />
              <Route path="/profile" element={<ProfileView />} />
              <Route path="/bag/:id?" element={<ShoppingBag />} />
              <Route path="/shipping" element={<ShippingView />} />
              <Route path="/payment" element={<PaymentView />} />
              <Route path="/placeorder" element={<PlaceOrderView />} />
              <Route path="/order/:id" element={<OrderView />} />
              <Route path="/admin/userlist" element={<UserListView />} />
              <Route path="/admin/user/:id/edit" element={<UserEditView />} />
              <Route path="/admin/productlist" element={<ProductListView />} />
              <Route
                path="/admin/product/:id/edit"
                element={<ProductEditView />}
              />
            </Routes>
          </Suspense>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
