import React from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import SettingsTwoToneIcon from "@material-ui/icons/SettingsTwoTone";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import LensTwoToneIcon from "@material-ui/icons/LensTwoTone";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import { history } from "../../../history";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#63728b",
    },
  },
});

const StyledButton = withStyles({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    borderRadius: 0,
    border: 0,
    color: "#27303f",
    height: 48,
    fontWeight: 400,
    padding: "0 18px",
    position: "relative",
  },
  label: {
    textTransform: "none",
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
    textAlign: "left",
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

export default function AccountMenu(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [status, setStatus] = React.useState("Online");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const color = () =>
    (status === "Online" && "#0e9f6e") ||
    (status === "Away" && "#ff5a1f") ||
    (status === "Busy" && "#f05252") ||
    (status === "Invisible" && "#97a6ba");

  return (
    <ThemeProvider theme={theme}>
      <div>
        <IconButton className="relative" onClick={handleClick}>
          <AccountCircleTwoToneIcon
            style={{
              color: props.color && props.color ? props.color : "#96a6ba",
            }}
          />
          <span
            className="w-2 absolute h-2 rounded-full"
            style={{
              bottom: "8px",
              right: "8px",
              backgroundColor: color(),
            }}
          ></span>
        </IconButton>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <div className="flex flex-col py-2">
            <div className="flex flex-col px-4 py-2" style={{ lineHeight: 1 }}>
              <span>Signed in as</span>
              <strong
                style={{ fontSize: "13px", marginTop: "6px" }}
                className="text-gray-800"
              >
                stefan.schmitz@company.com
              </strong>
            </div>

            <hr className="mt-2 mb-2" />

            <StyledButton
              startIcon={
                <AccountCircleTwoToneIcon
                  style={{ color: "#64738b", fontSize: 24 }}
                />
              }
            >
              Profile
            </StyledButton>

            <StyledButton
              startIcon={
                <SettingsTwoToneIcon
                  style={{ color: "#64738b", fontSize: 24 }}
                />
              }
            >
              Seetings
            </StyledButton>

            <StyledButton
              startIcon={
                <LensTwoToneIcon
                  style={{
                    color: color(),
                    fontSize: 24,
                  }}
                />
              }
            >
              <FormControl
                variant="outlined"
                className={classes.formControl}
                size="small"
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Status
                </InputLabel>
                <Select
                  onChange={handleChange}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={status}
                  label="Status"
                >
                  <MenuItem value={"Online"}>Online</MenuItem>
                  <MenuItem value={"Away"}>Away</MenuItem>
                  <MenuItem value={"Busy"}>Busy</MenuItem>
                  <MenuItem value={"Invisible"}>Invisible</MenuItem>
                </Select>
              </FormControl>
            </StyledButton>

            <hr className="mt-2 mb-2" />

            <StyledButton
              onClick={() => history.push("authentication/sign-in")}
              startIcon={
                <PowerSettingsNewIcon
                  style={{ color: "#64738b", fontSize: 24 }}
                />
              }
            >
              Sign out
            </StyledButton>
          </div>
        </Popover>
      </div>
    </ThemeProvider>
  );
}
