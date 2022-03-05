import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchDashboard } from "./dashboardAPI";

export interface room {
  hotel: any;
  room: any;
  group: any;
}

export interface dashboardState {
  rooms: any;
  status: "idle" | "loading" | "failed";
}

const initialState: dashboardState = { rooms: [], status: "loading" };

export const loadDashboard = createAsyncThunk(
  "dashboard/fetchDashboard",
  async () => {
    const response = await fetchDashboard();
    return response;
  }
);

function refineRoomData(selectedRoom: room) {
  const { room, group, hotel } = selectedRoom;
  const {
    roomName,
    roomType,
    travelStartDate,
    travelEndDate,
    remainingBalance,
    roomStatus,
    daysTillFinalPaymentDue,
  } = room[0];
  const { groupName } = group[0];
  const { hotelName, hotelImage, hotelDescription } = hotel[0];
  return {
    roomName,
    groupName,
    hotelName,
    roomType,
    travelStartDate,
    travelEndDate,
    hotelImage,
    booked: roomStatus === "Active",
    remainingBalance,
    roomStatus,
    daysTillFinalPaymentDue,
    paymentStatus: daysTillFinalPaymentDue ? "Balance Due" : "Past Due",
    hotelDescription,
  };
}

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadDashboard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadDashboard.fulfilled, (state, action) => {
        state.status = "idle";
        state.rooms = action.payload.roomInfo.map((room: room) =>
          refineRoomData(room)
        );
      });
  },
});

export const selectDashboard = (state: RootState) => state.dashboard;

export default dashboardSlice.reducer;
