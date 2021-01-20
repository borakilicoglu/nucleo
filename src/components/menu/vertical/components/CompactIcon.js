import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    "& span": {
      fontSize: "40px",
    },
  },
});

export default function CompactIcon(props) {
  const classes = useStyles();
  return <span className={classes.root}>{props.children}</span>;
}
