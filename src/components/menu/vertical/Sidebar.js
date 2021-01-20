import React, { Component, useEffect } from "react";
import menuConfig from "../../../configs/horizontalMenuConfig";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import AccountMenu from "./AccountMenu";
import Notifications from "./Notifications";
import CompactMenu from "./components/CompactMenu";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ExpandMore from "@material-ui/icons/ExpandMore";

import Logo from "./Logo.js";

const useStyles = makeStyles((theme) => ({
  listItemIcon: {
    minWidth: "24px",
    marginRight: "16px",
  },
  listItemLight: {
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    paddingTop: "0.75rem",
    paddingBottom: "0.75rem",
    "&:hover": {
      background: "#edf2f7",
    },
    "&.active": {
      background: "#e2e8f0",
    },
  },
  listItemDark: {
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    paddingTop: "0.75rem",
    paddingBottom: "0.75rem",
    "&:hover": {
      background: "#2d3748",
    },
    "&.active": {
      background: "#000",
    },
  },
  listItemText: {
    marginBottom: "0px",
    marginTop: "0px",
    "& span": {
      fontSize: "13px",
    },
  },
  compactIcon: {
    "& span": {
      fontSize: "40px",
    },
  },
}));

const NavItem = (item) => {
  const classes = useStyles();
  const { tasks } = useSelector((state) => state.tasks);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setOpen(false);
    if (item.title.match(/\s/g)) {
      window.location.pathname.includes(
        item.title.substr(0, item.title.indexOf(" ")).toLowerCase()
      ) && setOpen(true);
    } else {
      window.location.pathname.includes(item.title.toLowerCase()) &&
        setOpen(true);
    }
    return () => {};
  }, [item]);

  return (
    <div>
      {item.navLink ? (
        <ListItem
          button
          component={NavLink}
          exact
          to={item.navLink}
          className={
            item.sidebarDark ? classes.listItemDark : classes.listItemLight
          }
        >
          <ListItemIcon className={classes.listItemIcon}>
            {item.icon}
          </ListItemIcon>

          <div className="flex-grow">
            <ListItemText
              primary={item.title}
              className={classes.listItemText}
            />
            {tasks.length > 0 && item.title === "Tasks" ? (
              <div className="font-base text-xs text-gray-500">
                {tasks.filter((task) => task.completed === false).length}{" "}
                remaining tasks
              </div>
            ) : (
              <div className="font-base text-xs text-gray-500">
                {item.desc && item.desc}
              </div>
            )}
          </div>

          {item.chip && <div>{item.chip}</div>}
        </ListItem>
      ) : (
        <div>
          <ListItem
            button
            onClick={handleClick}
            className={
              item.sidebarDark ? classes.listItemDark : classes.listItemLight
            }
          >
            <ListItemIcon className={classes.listItemIcon}>
              {item.icon}
            </ListItemIcon>
            <div className="flex-grow">
              <ListItemText
                primary={item.title}
                className={classes.listItemText}
              />
              <div className="font-base text-xs text-gray-500">
                {item.desc && item.desc}
              </div>
            </div>

            {item.chip && <div>{item.chip}</div>}
            {open ? <ExpandMore /> : <ChevronRight />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.pages.map((page, index) => {
                return (
                  <NavItem
                    {...page}
                    key={index}
                    sidebarDark={item.sidebarDark}
                  />
                );
              })}
            </List>
          </Collapse>
        </div>
      )}
    </div>
  );
};

class Sidebar extends Component {
  render() {
    let { collapsed, activeLayout, sidebarDark } = this.props;

    let sidebarClasses = classNames({
      "overflow-scroll": true,
      "bg-gray-900 shadow-xl": sidebarDark,
      "bg-white border-r": !sidebarDark,
      collapsed: collapsed,
    });

    let sidebarTopClasses = classNames({
      "w-full flex items-center pl-6 pr-6": true,
      "border-b": activeLayout === "basic",
    });

    let sidebarLogoWrapperClasses = classNames({
      "flex items-center flex-grow text-2xl font-semibold align-middle": true,
      "justify-around": activeLayout === "compact",
    });

    return (
      <aside className={sidebarClasses}>
        <div className={sidebarTopClasses} style={{ minHeight: "64px" }}>
          <div className={sidebarLogoWrapperClasses}>
            <Logo color={"#f60056"} theme={sidebarDark} layout={activeLayout} />
          </div>
          {activeLayout && activeLayout === "classy" && (
            <React.Fragment>
              <div className="align-middle">
                <Notifications />
              </div>

              <div className="align-middle">
                <AccountMenu />
              </div>
            </React.Fragment>
          )}
        </div>

        {activeLayout && activeLayout === "classy" && (
          <div className="mb-4 p-4 px-6">
            <img
              alt="avatar"
              src={require(`./../../../assets/images/avatars/avatar.jpg`)}
              className="rounded-full w-24 m-auto"
            />

            <div className="mt-4 text-center">
              <div
                className={`${sidebarDark ? "text-white" : "text-gray-500"}`}
              >
                Stefan Schmitz
              </div>
              <div
                className={`${sidebarDark ? "text-gray-500" : "text-gray-500"}`}
              >
                stefan.schmitz@company.com
              </div>
            </div>
          </div>
        )}

        {activeLayout === "compact" ? (
          <CompactMenu menuConfig={menuConfig} />
        ) : (
          <>
            {menuConfig.map((value, index) => (
              <div
                className={`${
                  index === 0 && activeLayout === "basic" ? "pt-8 pb-4" : "py-4"
                }`}
                key={index}
              >
                <h3 className="font-semibold font-xs text-indigo-500 uppercase px-6">
                  {value.name}
                </h3>
                <small className="text-gray-600 px-6">{value.desc}</small>
                <nav
                  className={`text-base pt-3 ${
                    sidebarDark ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  {value.pages.map((page, index) => {
                    return (
                      <NavItem
                        {...page}
                        key={index}
                        sidebarDark={sidebarDark}
                      />
                    );
                  })}
                </nav>
              </div>
            ))}
          </>
        )}
      </aside>
    );
  }
}

export default Sidebar;
