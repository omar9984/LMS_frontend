import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
export default function LandingPage() {
  return (
    <div>
      <h1>this will be a general landing page</h1>
      <img src="https://lh3.googleusercontent.com/RWxnQPbPDhfh_POW0HQiadnzIkL9tI6_HCtD2hU_h0uwvHSKNdk3qm-PFPQSnuzr0RwUxXGd-3Pb4CQFPEguip8KE6KSj7jxBd7X=w1296-v1" />
    </div>
  );
}
