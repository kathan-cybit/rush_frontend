import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosinstance";
import { error_toast, success_toast } from "../../utils/toaster";

interface LoginResponse {
  token: string;
  user?: unknown | any;
  roleType: string;
  message?: string;
}

interface LoginPayload {
  currentTenantName?: string;
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk<LoginResponse, LoginPayload>(
  "auth/loginUser",
  async ({ currentTenantName, email, password }) => {
    try {
      const res = await axiosInstance.post<LoginResponse>(
        `http://localhost:8080/auth/login?tenant=${currentTenantName}`,
        { email, password }
      );

      if (res?.data) {
        success_toast(res.data.message || "Logged in successfully");
      }
      return res.data;
    } catch (err: any) {
      const msg = err.response?.data?.error || err.message;
      error_toast(msg);
      return msg;
    }
  }
);

interface AuthState {
  user: unknown | null | any;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  currentTenantName: string | null;
  currentTenantId: string | null;
  roleType: string;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("auth_token") || null,
  loading: false,
  isAuthenticated: false,
  currentTenantName: null,
  currentTenantId: null,
  roleType: localStorage.getItem("user_type") || "tenant",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentTenantName(state, action: PayloadAction<string>) {
      state.currentTenantName = action.payload;
    },
    setLogout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_type");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.roleType = action.payload.roleType;

        localStorage.setItem("auth_token", action.payload.token);
        localStorage.setItem("user_type", action.payload.roleType);
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setLogout, setCurrentTenantName } = authSlice.actions;
export default authSlice.reducer;
