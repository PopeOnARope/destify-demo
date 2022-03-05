import {
  Cancel,
  DepartureBoard,
  EditLocationSharp,
  ManageAccounts,
  Paid,
  People,
  WorkOutline,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { blue, green, grey, pink, purple, red } from "@mui/material/colors";

const sections = [
  {
    title: "Trip Management",
    links: [
      {
        title: "My Trips",
        detail: "View and manage your travel",
        icon: <WorkOutline />,
        color: green[500],
      },
      {
        title: "Manage Transfers",
        detail: "Book or modify transport",
        icon: <DepartureBoard />,
        color: blue[500],
      },
      {
        title: "Make a payment",
        detail: "View and edit payment history",
        icon: <Paid />,
        color: green[500],
      },
      {
        title: "Modify my reservation",
        detail: "Review policies and cancel",
        icon: <EditLocationSharp />,
        color: purple[500],
      },
      {
        title: "Cancel my reservation",
        detail: "Review policies and cancel",
        icon: <Cancel />,
        color: red[500],
      },
    ],
  },
  {
    title: "Account Management",
    links: [
      {
        title: "My Profile",
        detail: "View and manage your account info",
        icon: <ManageAccounts />,
        color: "#28a",
      },
      {
        title: "Guests",
        detail: "View and invite to dashboard",
        icon: <People />,
        color: "#28a",
      },
    ],
  },
  {
    title: "Support Center",
    links: [
      {
        title: "FAQs",
        detail: "View frequently asked questions",
        icon: <ManageAccounts />,
        color: "#28a",
      },
      {
        title: "Contact Guest Services",
        detail: "We're here for you! send us a message",
        icon: <People />,
        color: "#28a",
      },
    ],
  },
];

const SideMenu: React.FC = () => (
  <Box>
    <Box sx={{ padding: "1rem", bgcolor: "#28a", color: "white" }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: blue[500] }}>AN</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="John Pope"
          secondary="fakejohnpope@gmail.com"
          primaryTypographyProps={{ fontWeight: "bold", fontSize: "1.25rem" }}
          secondaryTypographyProps={{ color: "white" }}
        />
      </ListItem>
    </Box>
    {sections.map((section, idx) => (
      <Box
        sx={
          idx < sections.length - 1
            ? {
                borderBottom: `1px solid ${grey[500]}`,
                marginBottom: "1rem",
                padding: "1rem",
              }
            : { padding: "1rem" }
        }
      >
        <Typography sx={{ color: grey[500] }}>{section.title}</Typography>
        <List>
          {section.links.map((link) => (
            <ListItem sx={{ paddingLeft: "0" }}>
              <ListItemAvatar sx={{ color: link.color }}>
                {link.icon}
              </ListItemAvatar>
              <ListItemText primary={link.title} secondary={link.detail} />
            </ListItem>
          ))}
        </List>
      </Box>
    ))}
  </Box>
);

export default SideMenu;
