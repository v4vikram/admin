// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/_AuthApi'; 
import authReducer from "../features/auth/authSlice"
// import userReducer from "../features/user/userSlice"
// import { userApi } from '../features/user/UserApi';
// import { salesPersonsApi } from '../features/salespersons/SalesPersonsApi';
// import salesPersonsReducer from "../features/salespersons/salesPersonsSlice"
// import { customerApi } from '../features/customer/customerApi';
// import { productApi } from '../features/product/productApi';
import { blogApi } from '../features/blog/blogApi';
// import customerReducer from "../features/customer/customerSlice"

export const store = configureStore({
  reducer: {
    // Add the RTK Query reducer
    [authApi.reducerPath]: authApi.reducer,
    // [userApi.reducerPath]: userApi.reducer,
    // [salesPersonsApi.reducerPath]: salesPersonsApi.reducer,
    // [customerApi.reducerPath]: customerApi.reducer,
    // [productApi.reducerPath]: productApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    auth:authReducer,
    // user:userReducer,
    // sales:salesPersonsReducer,
    
    // customer:salesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(authApi.middleware)
  // .concat(userApi.middleware)
  // .concat(salesPersonsApi.middleware)
  // .concat(customerApi.middleware)
  // .concat(productApi.middleware)
  .concat(blogApi.middleware)
});
