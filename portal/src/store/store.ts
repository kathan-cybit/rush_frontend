import { configureStore } from "@reduxjs/toolkit";
import tenantReducer from "./reducers/tenantSlice";
import authReducer from "./reducers/authSlice";
import licenseReducer from "./reducers/licenseSlice";

export const store = configureStore({
  reducer: {
    tenant: tenantReducer,
    auth: authReducer,
    license: licenseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
