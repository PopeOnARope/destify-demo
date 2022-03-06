import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchDashboard } from "./dashboardAPI";

interface hotel {
  hotelName: string;
  hotelImage: string;
  hotelDescription: string;
}

interface room {
  roomName: string;
  roomType: string;
  travelStartDate: string;
  travelEndDate: string;
  remainingBalance: string;
  roomStatus: string;
  daysTillFinalPaymentDue: number;
}

interface group {
  groupName: string;
}

interface traveler {
  age: number;
}

export interface reservation {
  hotel: hotel[];
  room: room[];
  group: group[];
  travelers: traveler[];
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

function refineReservationData(reservation: reservation) {
  const { room, group, hotel, travelers } = reservation;
  const adults = travelers.filter((traveler) => traveler.age >= 18);
  const children = travelers.filter((traveler) => traveler.age < 18);
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
    adults,
    children
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
        state.rooms = action.payload.roomInfo.map((reservation: reservation) =>
          refineReservationData(reservation)
        );
      });
  },
});

export const selectDashboard = (state: RootState) => state.dashboard;

export default dashboardSlice.reducer;
