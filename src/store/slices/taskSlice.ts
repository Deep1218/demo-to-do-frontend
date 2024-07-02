import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../shared/api";
import { APIRoutes } from "../../config/constants";
import { DefaultResponse } from "../store";

interface TaskState extends DefaultResponse {
  task: any;
  tasks: any[];
}

const initialState: TaskState = {
  loading: false,
  error: false,
  success: false,
  task: {},
  tasks: [],
  message: null,
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get<any>(
        APIRoutes.TASKS.FETCH_ALL,
        {},
        true
      );
      if (response.status === 200) {
        return response.data.data;
      } else {
        return rejectWithValue("Failed to fetch tasks");
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTaskById = createAsyncThunk(
  "tasks/fetchTaskById",
  async (id: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await apiService.get<any>(
        `${APIRoutes.TASKS.DETAIL}/${id}`,
        {},
        true
      );
      if (response.status === 200) {
        return fulfillWithValue(response.data.data);
      }
      return rejectWithValue("Failed to fetch task");
    } catch (error: any) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ data }: { data: any }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await apiService.post<any>(
        APIRoutes.TASKS.CREATE,
        data,
        true
      );
      if (response.status === 200) {
        return fulfillWithValue(response.data.data);
      } else {
        return rejectWithValue("Failed to create task");
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response = await apiService.put<any>(
        `${APIRoutes.TASKS.UPDATE}/${id}`,
        data,
        true
      );
      if (response.status === 200) {
        return fulfillWithValue(response.data.data);
      }
      return rejectWithValue("Failed to update task");
    } catch (error: any) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await apiService.delete<any>(
        `${APIRoutes.TASKS.DELETE}/${id}`,
        true
      );
      if (response.status === 200) {
        return fulfillWithValue(id);
      }
      return rejectWithValue("Failed to delete task");
    } catch (error: any) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearTaskState: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      // state.task = {};
      // state.tasks = [];
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.message = null;
        state.tasks = [];
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.success = true;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Fetch task by ID
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.message = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.task = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Create task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.message = null;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.tasks.push(action.payload);
        state.message = "Task created successfully";
      })
      .addCase(createTask.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Update task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.message = null;
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.message = "Task updated successfully";
      })
      .addCase(updateTask.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.message = null;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.success = true;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        state.message = "Task deleted successfully";
      })
      .addCase(deleteTask.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { clearTaskState } = taskSlice.actions;

export default taskSlice.reducer;
