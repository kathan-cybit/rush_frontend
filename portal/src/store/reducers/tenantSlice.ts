import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosinstance";
import { error_toast, success_toast } from "../../utils/toaster";
import { AxiosResponse } from "axios";

type ApiResponse<T = unknown> = {
  data: T;
  message?: string;
};

interface FetchUsersParams {
  url: string;
}

interface LicensesState {
  microsoftTeam: number;
  powerPoint: number;
  outlook: number;
  excel: number;
}

interface TenantFormValues {
  admin_email: string;
  password: string;
  company_name: string;
  domain: string;
  gst?: string;
  status: string;
  phonenumber: string;
  contactperson: string;
  contactemail: string;
  licenses: LicensesState;
  schema_name: string;
}

interface CreateTenantParams {
  payload: TenantFormValues;
  currentTenant: string;
}
type UpdateTenantParams = unknown;
type FetchTenantsParams = string | null;

export const fetchUsers = createAsyncThunk<unknown, FetchUsersParams>(
  "tenant/fetchUsers",
  async (params) => {
    try {
      const response: AxiosResponse<ApiResponse<unknown>> =
        await axiosInstance.get(params.url);
      return response.data;
    } catch (err: any) {
      error_toast(err.response?.data?.error || err.message);
      return err.response?.data?.error || err.message;
    }
  }
);

export const createTenant = createAsyncThunk<unknown, CreateTenantParams>(
  "tenant/createTenant",
  async (params) => {
    try {
      const response: AxiosResponse<ApiResponse<unknown>> =
        await axiosInstance.post(
          `http://localhost:8080/api/admin/tenants`,
          params.payload
        );
      if (response?.data) {
        success_toast(response.data.message || "Tenant created successfully");
      }
      return response.data;
    } catch (err: any) {
      error_toast(err.response?.data?.error || err.message);
      return err.response?.data?.error || err.message;
    }
  }
);

export const updateTenant = createAsyncThunk<unknown, UpdateTenantParams>(
  "tenant/updateTenant",
  async (params) => {
    try {
      const response: AxiosResponse<ApiResponse<unknown>> =
        await axiosInstance.post(
          `http://localhost:8080/api/admin/tenants/update`,
          params
        );
      if (response?.data) {
        success_toast(response.data.message || "Tenant updated successfully");
      }
      return response.data;
    } catch (err: any) {
      error_toast(err.response?.data?.error || err.message);
      return err.response?.data?.error || err.message;
    }
  }
);

export const fetchTenants = createAsyncThunk<unknown, FetchTenantsParams>(
  "tenant/fetchTenants",
  async (currentTenant = null) => {
    try {
      const response: AxiosResponse<ApiResponse<unknown>> =
        await axiosInstance.get(
          `http://localhost:8080/api/admin/tenants?tenant=${currentTenant}`
        );
      return response.data;
    } catch (err: any) {
      error_toast(err.response?.data?.error || err.message);
      return err.response?.data?.error || err.message;
    }
  }
);

export const createTenantUser = createAsyncThunk<unknown, any>(
  "tenant/createTenantUser",
  async (props: any) => {
    try {
      const response: AxiosResponse<ApiResponse<unknown>> =
        await axiosInstance.post(
          `http://localhost:8080/api/users?tenant=${props.currentTenant}`,
          props?.payload
        );
      if (response?.data) {
        success_toast("User created successfully");
      }
      return response.data;
    } catch (err: any) {
      error_toast(err.response?.data?.error || err.message);
      return err.response?.data?.error || err.message;
    }
  }
);

export const deleteTenantUser = createAsyncThunk<unknown, any>(
  "tenant/deleteTenantUser",
  async (props: any) => {
    try {
      const response: AxiosResponse<ApiResponse<unknown>> =
        await axiosInstance.delete(
          `http://localhost:8080/api/users?tenant=${props.currentTenant}`,
          props?.payload
        );
      if (response?.data) {
        success_toast("User deleted successfully");
      }
      return response.data;
    } catch (err: any) {
      error_toast(err.response?.data?.error || err.message);
      return err.response?.data?.error || err.message;
    }
  }
);

export const updateTenantUser = createAsyncThunk<unknown, any>(
  "tenant/updateTenantUser",
  async (props: any) => {
    try {
      const response: AxiosResponse<ApiResponse<unknown>> =
        await axiosInstance.post(
          `http://localhost:8080/api/users/update/${props.id}?tenant=${props.currentTenant}`,
          props?.payload
        );
      if (response?.data) {
        success_toast("User updated successfully");
      }
      return response.data;
    } catch (err: any) {
      error_toast(err.response?.data?.error || err.message);
      return err.response?.data?.error || err.message;
    }
  }
);

interface TenantState {
  users: unknown[];
  tenants: unknown[];
  isLoading: boolean;
}

const initialState: TenantState = {
  users: [],
  tenants: [],
  isLoading: false,
};

const tenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload as unknown[];
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createTenant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTenant.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createTenant.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchTenants.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTenants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tenants = action.payload as unknown[];
      })
      .addCase(fetchTenants.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateTenant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTenant.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateTenant.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createTenantUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTenantUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createTenantUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteTenantUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTenantUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteTenantUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateTenantUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTenantUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateTenantUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default tenantSlice.reducer;
