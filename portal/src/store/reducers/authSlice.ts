import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosinstance";
import { error_toast, success_toast } from "../../utils/toaster";

interface LoginResponse {
  token: string;
  user?: unknown | any;
  tenantType: string;
  message?: string;
}

interface LoginPayload {
  currentTenantName?: string;
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk<any, any>(
  "auth/loginUser",
  async ({ currentTenantName, email, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post<any>(
        `/auth/login?tenant=${currentTenantName}`,
        { email, password }
      );

      if (res?.data?.code == 200 || res?.data?.status == "success") {
        success_toast(res.data.message || "Logged in successfully");
      }
      return res.data?.data;
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.response?.data?.error || err.message;
      error_toast(msg);
      return rejectWithValue({ err, status: err.response?.status });
    }
  }
);

export const verifyUser = createAsyncThunk<unknown, any>(
  "auth/verifyUser",
  async ({ tenant, token }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get<any>(
        `/auth/verify-email?token=${token}&tenant=${tenant}`
      );

      if (res?.data?.code == 200 || res?.data?.status == "success") {
        success_toast(res.data.message || "Verifid successfully");
      }
      return res.data?.data;
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.response?.data?.error || err.message;
      error_toast(msg);
      return rejectWithValue({ err, status: err.response?.status });
    }
  }
);

export const getUserDetails = createAsyncThunk<unknown, any>(
  "auth/getUserDetails",
  async (props, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get<any>(`/users/details`, {
        headers: { ...props.headers },
      });
      return res.data?.data;
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.response?.data?.error || err.message;
      error_toast(msg);
      return rejectWithValue({ err, status: err.response?.status });
    }
  }
);

export const updatePassword = createAsyncThunk<unknown, any>(
  "auth/updatePassword",
  async (props, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post<any>(
        props.role == "admin"
          ? `/admin/updatepassword`
          : `/users/updatepassword`,
        props.payload,
        { headers: { ...props.headers } }
      );

      if (res?.data?.code == 200 || res?.data?.status == "success") {
        success_toast(res.data.message || "Updated successfully");
      }
      return res.data?.data;
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.response?.data?.error || err.message;
      error_toast(msg);
      return rejectWithValue({ err, status: err.response?.status });
    }
  }
);

export const forgotPassword = createAsyncThunk<unknown, any>(
  "auth/forgotPassword",
  async (props, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post<any>(
        `/auth/changepassword`,
        props.payload,
        { headers: { ...props.headers } }
      );

      if (res?.data?.code == 200 || res?.data?.status == "success") {
        success_toast(res.data.message || "Verified successfully");
      }
      return res.data?.data;
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.response?.data?.error || err.message;
      error_toast(msg);
      return rejectWithValue({ err, status: err.response?.status });
    }
  }
);

export const verifytokenPasswdLink = createAsyncThunk<unknown, any>(
  "auth/verifytokenPasswdLink",
  async (props, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post<any>(
        `/auth/verify-changepasword-email`,
        props.payload,
        { headers: { ...props.headers } }
      );

      if (res?.data?.code == 200 || res?.data?.status == "success") {
        success_toast(res.data.message || "Verified successfully");
      }
      return res.data?.data;
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.response?.data?.error || err.message;
      error_toast(msg);
      return rejectWithValue({ err, status: err.response?.status });
    }
  }
);

export const resetPassword = createAsyncThunk<unknown, any>(
  "auth/resetPassword",
  async (props, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post<any>(
        `/auth/reset-password`,
        props.payload,
        { headers: { ...props.headers } }
      );

      if (res?.data?.code == 200 || res?.data?.status == "success") {
        success_toast(res.data.message || "Changed password ccessfully");
      }
      return res.data?.data;
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.response?.data?.error || err.message;
      error_toast(msg);
      return rejectWithValue({ err, status: err.response?.status });
    }
  }
);

export const resenndVerifyEmail = createAsyncThunk<unknown, any>(
  "auth/resenndVerifyEmail",
  async (props, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post<any>(
        `/auth/resend-verify-email`,
        props.payload,
        { headers: { ...props.headers } }
      );

      if (res?.data?.code == 200 || res?.data?.status == "success") {
        success_toast(res.data.message || "Email sent successfully");
      }
      return res.data?.data;
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.response?.data?.error || err.message;
      error_toast(msg);
      return rejectWithValue({ err, status: err.response?.status });
    }
  }
);

interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  currentTenantName: string | null;
  currentTenantId: string | null;
  tenantType: string;
  allDetails: any;
}
const userString = localStorage.getItem("user");

const initialState: AuthState = {
  user:
    userString && (userString !== "undefined" || userString == undefined)
      ? JSON.parse(userString)
      : null,
  token: localStorage.getItem("auth_token") || null,
  loading: false,
  isAuthenticated: false,
  currentTenantName: null,
  currentTenantId: null,
  tenantType: localStorage.getItem("user_type") || "tenant",
  allDetails: null,
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
        state.tenantType = action.payload.tenantType;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("auth_token", action.payload.token);
        localStorage.setItem("user_type", action.payload.tenantType);
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(verifyUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(verifyUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updatePassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(verifytokenPasswdLink.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifytokenPasswdLink.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(verifytokenPasswdLink.rejected, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action: any) => {
        state.loading = false;
        state.allDetails = action.payload;
      })
      .addCase(getUserDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(resenndVerifyEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(resenndVerifyEmail.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(resenndVerifyEmail.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setLogout, setCurrentTenantName } = authSlice.actions;
export default authSlice.reducer;
