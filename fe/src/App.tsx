import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/(admin)/dashboard/page";
import LayoutAdmin from "./pages/(admin)/layout";
import AdminProductPage from "./pages/(admin)/products/page";
// import SingUpPage from "./pages/(auth)/signup/page";
import NotFoundPage from "./pages/(website)/404/page";
import HomePage from "./pages/(website)/home/page";
import LayoutWebsite from "./pages/(website)/layout";
import SignupPage from "./pages/(auth)/signup/page";
import SigninPage from "./pages/(auth)/signin/page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWebsite />}>
          <Route index element={<HomePage />} />
          {/* <Route path="shop" element={<ProductList />} /> */}
          {/* <Route path="cart" element={<Cart />} /> */}
          <Route path="signup" element={<SignupPage />} />
          <Route path="signin" element={<SigninPage />} />
        </Route>
        <Route path="admin" element={<LayoutAdmin />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="products" element={<AdminProductPage />} />
          {/* <Route path="products/add" element={<ProductAdd />} /> */}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
