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
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(params.url);
      return response.data;
    } catch (err: any) {
      const error = err.response?.data?.error || err.message;
      error_toast(error);
      return rejectWithValue({ error, status: err.response?.status });
    }
  }
);

export const createTenant = createAsyncThunk<unknown, CreateTenantParams>(
  "tenant/createTenant",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/admin/tenants`,
        params.payload
      );
      success_toast(response.data.message || "Tenant created successfully");
      return response.data;
    } catch (err: any) {
      const error = err.response?.data?.error || err.message;
      error_toast(error);
      return rejectWithValue({ error, status: err.response?.status });
    }
  }
);

export const updateTenant = createAsyncThunk<unknown, UpdateTenantParams>(
  "tenant/updateTenant",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/admin/tenants/update`,
        params
      );
      success_toast(response.data.message || "Tenant updated successfully");
      return response.data;
    } catch (err: any) {
      const error = err.response?.data?.error || err.message;
      error_toast(error);
      return rejectWithValue({ error, status: err.response?.status });
    }
  }
);

export const fetchTenants = createAsyncThunk<unknown, FetchTenantsParams>(
  "tenant/fetchTenants",
  async (currentTenant = null, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/admin/tenants?tenant=${currentTenant}`
      );
      return response.data;
    } catch (err: any) {
      const error = err.response?.data?.error || err.message;
      error_toast(error);
      return rejectWithValue({ error, status: err.response?.status });
    }
  }
);

export const createTenantUser = createAsyncThunk<unknown, any>(
  "tenant/createTenantUser",
  async (props, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/users?tenant=${props.currentTenant}`,
        props?.payload
      );
      success_toast("User created successfully");
      return response.data;
    } catch (err: any) {
      const error = err.response?.data?.error || err.message;
      error_toast(error);
      return rejectWithValue({ error, status: err.response?.status });
    }
  }
);

export const deleteTenantUser = createAsyncThunk<unknown, any>(
  "tenant/deleteTenantUser",
  async (props, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/users?tenant=${props.currentTenant}`,
        props?.payload
      );
      success_toast("User deleted successfully");
      return response.data;
    } catch (err: any) {
      const error = err.response?.data?.error || err.message;
      error_toast(error);
      return rejectWithValue({ error, status: err.response?.status });
    }
  }
);

export const updateTenantUser = createAsyncThunk<unknown, any>(
  "tenant/updateTenantUser",
  async (props, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/users/update/${props.id}?tenant=${props.currentTenant}`,
        props?.payload
      );
      success_toast("User updated successfully");
      return response.data;
    } catch (err: any) {
      const error = err.response?.data?.error || err.message;
      error_toast(error);
      return rejectWithValue({ error, status: err.response?.status });
    }
  }
);

export const addRole = createAsyncThunk<unknown, any>(
  "tenant/addRole",
  async (props, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        props.role != "admin" ? `/users/addroles` : "/admin/addroles",
        props?.payload,
        { headers: { ...props.headers } }
      );
      success_toast(response.data.message || "Role added successfully");
      return response.data;
    } catch (err: any) {
      const error = err.response?.data?.error || err.message;
      error_toast(error);
      return rejectWithValue({ error, status: err.response?.status });
    }
  }
);

export const addPermssion = createAsyncThunk<unknown, any>(
  "tenant/addPermssion",
  async (props, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        props.role != "admin" ? `/users/permissions` : "/admin/permissions",
        props?.payload,
        { headers: { ...props.headers } }
      );
      success_toast(response.data.message || "permissions added successfully");
      return response.data;
    } catch (err: any) {
      const error = err.response?.data?.error || err.message;
      error_toast(error);
      return rejectWithValue({ error, status: err.response?.status });
    }
  }
);

export const getPermssion = createAsyncThunk<unknown, any>(
  "tenant/getPermssion",
  async (props, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        props.role != "admin" ? `/users/permissions` : "/admin/permissions",
        { headers: { ...props.headers } }
      );
      return response.data;
    } catch (err: any) {
      const error = err.response?.data?.error || err.message;
      error_toast(error);
      return rejectWithValue({ error, status: err.response?.status });
    }
  }
);

export const getRoles = createAsyncThunk<unknown, any>(
  "tenant/getRoles",
  async (props, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        props.role != "admin" ? `/users/addroles` : "/admin/addroles",
        { headers: { ...props.headers } }
      );
      return response.data;
    } catch (err: any) {
      const error = err.response?.data?.error || err.message;
      error_toast(error);
      return rejectWithValue({ error, status: err.response?.status });
    }
  }
);

export const addPermissonRole = createAsyncThunk<unknown, any>(
  "tenant/addPermissonRole",
  async (props, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        props.role != "admin"
          ? `/users/addpermissionsroles`
          : "/admin/addpermissionsroles",
        props?.payload,
        { headers: { ...props.headers } }
      );
      success_toast(
        response.data.message || "addpermissionsroles added successfully"
      );
      return response.data;
    } catch (err: any) {
      const error = err.response?.data?.error || err.message;
      error_toast(error);
      return rejectWithValue({ error, status: err.response?.status });
    }
  }
);

export const getPermissonRole = createAsyncThunk<unknown, any>(
  "tenant/getPermissonRole",
  async (props, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        props.role != "admin"
          ? `/users/permissionsroles/${props?.id}`
          : `/admin/permissionsroles/${props?.id}`,
        { headers: { ...props.headers } }
      );

      return response.data;
    } catch (err: any) {
      const error = err.response?.data?.error || err.message;
      error_toast(error);
      return rejectWithValue({ error, status: err.response?.status });
    }
  }
);

export const getAllPermissonRole = createAsyncThunk<unknown, any>(
  "tenant/getAllPermissonRole",
  async (props, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        props.role != "admin"
          ? `/users/allpermissionsroles`
          : `/admin/allpermissionsroles`,
        { headers: { ...props.headers } }
      );

      return response.data;
    } catch (err: any) {
      const error = err.response?.data?.error || err.message;
      error_toast(error);
      return rejectWithValue({ error, status: err.response?.status });
    }
  }
);

export const getAllRoleUsers = createAsyncThunk<unknown, any>(
  "tenant/getAllRoleUsers",
  async (props, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        props.role != "admin"
          ? `/users/getAllRolesUsers`
          : `/admin/getAllRolesUsers`,
        { headers: { ...props.headers } }
      );

      return response.data;
    } catch (err: any) {
      const error = err.response?.data?.error || err.message;
      error_toast(error);
      return rejectWithValue({ error, status: err.response?.status });
    }
  }
);

export const getAllUsersRolesPermissions = createAsyncThunk<unknown, any>(
  "tenant/getAllUsersRolesPermissions",
  async (props, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        props.role != "admin"
          ? `/users/getAllUsersRolesPermissions`
          : `/admin/getAllUsersRolesPermissions`,
        { headers: { ...props.headers } }
      );

      return response.data;
    } catch (err: any) {
      const error = err.response?.data?.error || err.message;
      error_toast(error);
      return rejectWithValue({ error, status: err.response?.status });
    }
  }
);

export const getApps = createAsyncThunk<unknown, any>(
  "tenant/getApps",
  async (props, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/users/createapps", {
        headers: { ...props.headers },
      });
      return response.data;
    } catch (err: any) {
      const error = err.response?.data?.error || err.message;
      error_toast(error);
      return rejectWithValue({ error, status: err.response?.status });
    }
  }
);

interface TenantState {
  users: unknown[];
  tenants: unknown[];
  isLoading: boolean;
  allRoles: unknown[];
  allUsersRoles: unknown[];
  allpermissions: unknown[];
  permissionsRoles: unknown[];
  allpermissionsroles: unknown[];
  allApps: unknown[];
  allUsersRolesPermissions: unknown[];
}

const initialState: TenantState = {
  users: [],
  tenants: [],
  allpermissions: [],
  allRoles: [],
  permissionsRoles: [],
  allUsersRoles: [],
  allpermissionsroles: [],
  allApps: [],
  allUsersRolesPermissions: [],
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
      })
      .addCase(addRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRole.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addRole.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addPermssion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPermssion.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addPermssion.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addPermissonRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPermissonRole.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addPermissonRole.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getPermssion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPermssion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allpermissions = action.payload as unknown[];
      })
      .addCase(getPermssion.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getRoles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allRoles = action.payload as unknown[];
      })
      .addCase(getRoles.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getPermissonRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPermissonRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.permissionsRoles = action.payload as unknown[];
      })
      .addCase(getPermissonRole.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllPermissonRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPermissonRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allpermissionsroles = action.payload as unknown[];
      })
      .addCase(getAllPermissonRole.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllRoleUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRoleUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allUsersRoles = action.payload as unknown[];
      })
      .addCase(getAllRoleUsers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllUsersRolesPermissions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsersRolesPermissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allUsersRolesPermissions = action.payload as unknown[];
      })
      .addCase(getAllUsersRolesPermissions.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getApps.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApps.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allApps = action.payload as unknown[];
      })
      .addCase(getApps.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default tenantSlice.reducer;
