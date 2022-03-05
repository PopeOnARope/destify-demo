import React, { useEffect, useState } from "react";
import MoreVert from "@mui/icons-material/MoreVert";

import DoorIcon from "@mui/icons-material/MeetingRoom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { loadDashboard, selectDashboard } from "./dashboardSlice";
import {
  Avatar,
  Box,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import {
  CheckCircleOutlined,
  ErrorOutlined,
  Paid,
} from "@mui/icons-material";

const Dashboard: React.FC = () => {
  const data = useAppSelector(selectDashboard);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadDashboard());
  }, [dispatch]);

  const { rooms } = data;

  const [selectedRoomIdx, setSelectedRoomIdx] = useState(0);

  const selectedRoom = data && data.rooms.length && data.rooms[selectedRoomIdx];

  if (!rooms.length || data.status === "loading") return <div>loading...</div>;

  const {
    roomName,
    groupName,
    hotelName,
    roomType,
    travelStartDate,
    travelEndDate,
    hotelImage,
    booked,
    daysTillFinalPaymentDue,
    paymentStatus,
    remainingBalance,
    hotelDescription,
  } = selectedRoom;

  const handleSelectRoom = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedRoomIdx(newValue);
  };

  return (
    <>
      <Tabs onChange={handleSelectRoom} value={selectedRoomIdx}>
        {rooms.map((room: object, idx: number) => (
          <Tab
            label={`Room ${idx + 1}`}
            id={`simple-tab-${idx}`}
            aria-controls={`simple-tab-${idx}`}
          />
        ))}
      </Tabs>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "0.75fr 3fr 0.5fr",
          padding: "1rem 0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.25rem",
          }}
        >
          <Avatar sx={{ bgcolor: blue[500], color: blue[900] }}>
            <DoorIcon />
          </Avatar>
        </Box>
        <Box sx={{ textAlign: "left" }}>
          <Typography variant="h6">{roomName}</Typography>
          <Typography variant="caption" display={"block"}>
            {groupName}
          </Typography>
          <Typography variant="caption" display={"block"}>
            {hotelName} - {roomType}
          </Typography>
          <Typography variant="caption" display={"block"}>
            {travelStartDate} - {travelEndDate}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.25rem",
          }}
        >
          <IconButton>
            <MoreVert />
          </IconButton>
        </Box>
      </Box>

      <CardMedia
        component="img"
        height="194"
        image={hotelImage}
        alt="hotel image"
      />
      <CardContent
        sx={{ display: "flex", alignItems: "left", padding: "0.5rem" }}
      >
        <Chip
          variant="outlined"
          color={booked ? "success" : "error"}
          icon={booked ? <CheckCircleOutlined /> : <ErrorOutlined />}
          label={booked ? "Booked" : "Not Booked"}
          sx={{ marginRight: "0.75rem" }}
        />
        <Chip
          variant="outlined"
          color={daysTillFinalPaymentDue ? "secondary" : "error"}
          icon={<Paid />}
          label={`${paymentStatus} - $${remainingBalance}`}
        />
      </CardContent>
      <CardContent>
        <Typography variant="body1" sx={{ fontSize: "0.75rem" }}>
          {hotelDescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </>
  );
};

export default Dashboard;
