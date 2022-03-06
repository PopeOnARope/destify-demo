import React, { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { loadDashboard, selectDashboard } from "./dashboardSlice";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import { blue, green, grey, teal } from "@mui/material/colors";
import {
  CheckCircleOutlined,
  EditLocation,
  ErrorOutlined,
  Paid,
  MoreVert,
  MeetingRoom,
  ExpandMore,
  MonetizationOnOutlined,
  Person,
  Cancel,
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
    adults,
    children,
  } = selectedRoom;

  const handleSelectRoom = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedRoomIdx(newValue);
  };

  return (
    <>
      <Tabs
        onChange={handleSelectRoom}
        value={selectedRoomIdx}
        variant="scrollable"
      >
        {rooms.map((room: object, idx: number) => (
          <Tab
            label={`Room ${idx + 1}`}
            id={`simple-tab-${idx}`}
            aria-controls={`simple-tab-${idx}`}
            sx={{
              textTransform: "none",
            }}
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
            <MeetingRoom />
          </Avatar>
        </Box>
        <Box sx={{ textAlign: "left" }}>
          <Typography variant="h6" sx={{ fontSize: "1rem" }}>
            {roomName}
          </Typography>
          {[
            groupName,
            `${hotelName} -  ${roomType}`,
            `${travelStartDate} - ${travelEndDate}`,
          ].map((string) => (
            <Typography
              variant="caption"
              display={"block"}
              sx={{ color: grey[800] }}
            >
              {string}
            </Typography>
          ))}
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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            color={teal[500]}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <span
              style={{
                marginRight: "1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              {" "}
              <EditLocation />
              Modify
            </span>{" "}
            <MonetizationOnOutlined /> Make Payment
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ textAlign: "left" }}>
            <Typography align="left">Guests in this Room</Typography>
            <Box sx={{ padding: "1rem 0", borderBottom: `1px solid ${grey[500]}` }}>
              {adults.map((a: object, idx: number) => (
                <Chip
                  variant="outlined"
                  color="success"
                  icon={<Person />}
                  label={`Adult ${idx + 1}`}
                />
              ))}
              {children.map((a: object, idx: number) => (
                <Chip
                  variant="outlined"
                  color="success"
                  icon={<Person />}
                  label={`Child ${idx + 1}`}
                />
              ))}
            </Box>
              <Box sx={{padding: '1rem 0'}}>
                  <Chip color="error" label="Cancel Room" icon={<Cancel />} />
              </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Dashboard;
