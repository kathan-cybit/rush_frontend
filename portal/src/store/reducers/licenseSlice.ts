import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosinstance";
import { error_toast, success_toast } from "../../utils/toaster";

export const getLicenseApps = createAsyncThunk<unknown, any>(
  "license/getLicenseApps",
  async (props, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        props?.role == "admin" ? `/admin/newapp` : `/users/newapp`,
        {
          headers: { ...props.headers },
        }
      );
      return response.data;
    } catch (err: any) {
      const error = err.response?.data?.error || err.message;
      error_toast(error);
      return rejectWithValue({ error, status: err.response?.status });
    }
  }
);

export const getAllLicenses = createAsyncThunk<unknown, any>(
  "license/getAllLicenses",
  async (props, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/getlicenses`, {
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

interface licenseState {
  loading: boolean;
  allLicenses: unknown[];
  allApps: unknown[];
}

const initialState: licenseState = {
  loading: false,
  allApps: [],
  allLicenses: [],
};

const licenseSlice = createSlice({
  name: "license",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLicenseApps.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLicenseApps.fulfilled, (state, action) => {
        state.loading = false;
        state.allApps = action.payload as unknown[];
      })
      .addCase(getLicenseApps.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllLicenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllLicenses.fulfilled, (state, action) => {
        state.loading = false;
        state.allLicenses = action.payload as unknown[];
      })
      .addCase(getAllLicenses.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = licenseSlice.actions;
export default licenseSlice.reducer;
