import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DashboardLayout from "./layout/DashboardLayout";
import RegisterForm from "./features/auth/RegisterForm";
import LoginForm from "./features/auth/LoginForm";
import ProtectedRoute from "./route/ProtectedRoute";
import { useSelector } from "react-redux";
import PublicRoute from "./route/PublicRoute";
import {
  Category,
  Create,
  CreateProduct,
  CustomerEdit,
  CustomerList,
  CustomerVisit,
  Edit,
  List,
  ProductCategory,
  ProductCategoryEdit,
  SalesEdit,
  SalesPersonList,
  UserList,
} from "./pages";

function App() {
  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = Boolean(user?.token);

  return (
    <>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={
              <PublicRoute isAuthenticated={isAuthenticated}>
                <LoginForm />
              </PublicRoute>
            }
          />
          <Route path="/register" element={<RegisterForm />} />

          {/* Protected + Nested routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Dashboard child routes */}

            {/* Product Management */}
            <Route
              path="/dashboard/product/create"
              element={<CreateProduct />}
            />
            <Route
              path="/dashboard/product/category"
              element={<ProductCategory />}
            />
            <Route
              path="/dashboard/product/category/edit/:id"
              element={<ProductCategoryEdit />}
            />

            {/* ✅ Blog Management */}
            <Route path="blog">
              <Route path="create" element={<Create />} />
              <Route path="edit" element={<Edit />} />
              <Route path="edit/:id" element={<Edit />} />
              <Route path="list" element={<List />} />
              <Route path="category" element={<Category />} />
               {/* <Route path="edit/:id" element={<BlogEdit />} /> */}
              {/* <Route path="delete/:id" element={<BlogDelete />} /> */}
              {/* <Route path="update/:id" element={<BlogUpdate />} />  */}
            </Route>

            {/* Sales Management */}
            <Route
              path="/dashboard/sales-management/salespersons/list"
              element={<SalesPersonList />}
            />
            <Route
              path="/dashboard/sales-management/sales/edit/:id"
              element={<SalesEdit />}
            />

            {/* User Management */}
            <Route
              path="/dashboard/user-management/user/list"
              element={<UserList />}
            />
            {/* Customer Management */}
            <Route
              path="/dashboard/customer-management/customer/list"
              element={<CustomerList />}
            />
            <Route
              path="/dashboard/customer-management/customer/visit"
              element={<CustomerVisit />}
            />
            <Route
              path="/dashboard/customer-management/customer/edit/:id"
              element={<CustomerEdit />}
            />
          </Route>
        </Routes>
      </Router>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
