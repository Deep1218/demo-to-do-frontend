import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../shared/api";
import { APIRoutes } from "../../config/constants";
import { DefaultResponse } from "../store";

interface UserState extends DefaultResponse {
  user: Record<string, any>;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  loading: false,
  error: false,
  success: false,
  user: {},
  isLoggedIn: false,
  message: null,
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ data }: any, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await apiService.post<any>(APIRoutes.USERS.SIGNIN, data);
      if (response.status === 200) {
        const resData: any = response.data;
        const { token, ...userDetails } = resData.data;
        localStorage.setItem("token", token);
        return fulfillWithValue<Record<string, any>>(userDetails);
      } else {
        return rejectWithValue("ERROR");
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.msg ||
        error.message;
      return rejectWithValue(message);
    }
  }
);
export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ data }: any, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await apiService.post<any>(APIRoutes.USERS.SIGNUP, data);
      if (response.data && response.data.code === 200) {
        const resData = response.data;
        return fulfillWithValue(resData);
      } else {
        return rejectWithValue("ERROR");
      }
    } catch (error: any) {
      const message =
        error.response.data.error || error.response.data.msg || error.message;
      return rejectWithValue(message);
    }
  }
);
export const logout = createAsyncThunk(
  "auth/logout",
  async (
    { isDelete }: { isDelete: boolean },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      let response = null;
      if (isDelete) {
        response = await apiService.delete<any>(APIRoutes.USERS.DELETE, true);
      } else {
        response = await apiService.patch<any>(
          APIRoutes.USERS.LOGOUT,
          {},
          true
        );
      }
      if (response.status === 200 || response.data.code === 200) {
        const resData = response.data;
        localStorage.removeItem("token");
        return fulfillWithValue(resData.data);
      }
    } catch (error: any) {
      const message =
        error?.response?.data.error ||
        error?.response?.data.msg ||
        error.message;
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAll: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      state.message = null;
    },
    clearUser: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      state.message = null;
      state.user = {};
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.isLoggedIn = false;
      })
      .addCase(
        signIn.fulfilled,
        (state, action: PayloadAction<Record<string, any>>) => {
          state.loading = false;
          state.success = true;
          state.user = action.payload;
          state.isLoggedIn = true;
          state.message = "Login successfully";
        }
      )
      .addCase(signIn.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.isLoggedIn = false;
      })
      .addCase(signUp.pending, (state, action) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.message = null;
        state.user = {};
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.msg;
      })
      .addCase(signUp.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.msg ?? action.payload;
      })
      .addCase(logout.pending, (state, action: any) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.message = null;
      })
      .addCase(logout.fulfilled, (state, action: any) => {
        state.loading = false;
        state.success = true;
        state.isLoggedIn = false;
        state.user = {};
      })
      .addCase(logout.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload?.msg || action.payload;
      });
  },
});

export const { clearAll, clearUser } = authSlice.actions;

export default authSlice.reducer;
