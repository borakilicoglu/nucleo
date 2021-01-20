import React, { useEffect, useContext } from "react";
import { ContextLayout } from "../../utility/context/Layout";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import SettingsTwoToneIcon from "@material-ui/icons/SettingsTwoTone";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import HelpIcon from "@material-ui/icons/Help";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles({
  paper: {
    background: "#f1f5f9",
    width: 320,
  },
  label: {
    fontSize: 14,
  },
});

export default function Customizer() {
  const classes = useStyles();

  const [theme, setTheme] = React.useState();

  const contextLayout = useContext(ContextLayout);
  useEffect(() => {
    setTheme(contextLayout.state.activeTheme);
  }, [contextLayout]);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <ContextLayout.Consumer>
      {(context) => {
        return (
          <div className="fixed right-0" style={{ top: "50%" }}>
            <React.Fragment key={"right"}>
              <button
                onClick={toggleDrawer("right", true)}
                className="bg-red-600 p-3"
              >
                <SettingsTwoToneIcon
                  style={{ color: "#fff" }}
                  className="animate-spin"
                />
              </button>
              <Drawer
                classes={{ paper: classes.paper }}
                anchor={"right"}
                open={state["right"]}
                onClose={toggleDrawer("right", false)}
              >
                <div className="flex flex-row items-center px-6 py-6 border-b">
                  <SettingsTwoToneIcon style={{ color: "#64738b" }} />
                  <h2 className="text-md font-semibold tracking-wide ml-3">
                    SETTINGS
                  </h2>
                </div>

                <div className="flex flex-col px-6 border-b py-6">
                  <h2 className="mb-3 text-xs font-medium text-gray-600 tracking-widest">
                    THEME
                  </h2>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="gender"
                      name="theme"
                      value={theme}
                      onChange={(event) =>
                        context.switchTheme(event.target.value)
                      }
                    >
                      <div>
                        <FormControlLabel
                          classes={{
                            label: classes.label,
                          }}
                          value="auto"
                          control={<Radio />}
                          label="Auto"
                        />
                        <Tooltip title="Automatically sets theme based on user's operating system's color scheme preference using 'prefer-color-scheme' media query.">
                          <IconButton aria-label="help">
                            <HelpIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </div>
                      <FormControlLabel
                        classes={{
                          label: classes.label,
                        }}
                        value="dark"
                        control={<Radio />}
                        label="Dark"
                      />
                      <FormControlLabel
                        classes={{
                          label: classes.label,
                        }}
                        value="light"
                        control={<Radio />}
                        label="Light"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="flex flex-col p-6">
                  <h2 className="mb-3 text-xs font-medium text-gray-600 tracking-widest">
                    LAYOUT
                  </h2>
                  {[
                    "empty",
                    "basic",
                    "classic",
                    "classy",
                    "compact",
                    // "dense",
                    // "futuristic",
                    // "thin",
                    // "centered",
                    // "enterprise",
                    // "material",
                    // "modern",
                  ].map((layout, index) => (
                    <button
                      key={index}
                      className="mb-6"
                      onClick={() => context.switchLayout(layout)}
                    >
                      {theme && (
                        <img
                          className={`p-1 border-4 rounded-sm text-primary bg-white ${
                            context.state.activeLayout === layout
                              ? "border-indigo-500"
                              : null
                          }`}
                          src={require(`./../../assets/images/demo/layouts/nucleo-${layout}-${theme}.png`)}
                          alt="Empty Layout"
                        />
                      )}
                      <h4 className="mt-2 text-xs font-semibold text-gray-600 tracking-wide capitalize">
                        {layout}
                      </h4>
                    </button>
                  ))}
                </div>
              </Drawer>
            </React.Fragment>
          </div>
        );
      }}
    </ContextLayout.Consumer>
  );
}
