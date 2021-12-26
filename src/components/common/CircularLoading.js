import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
const centerStyle = {
  display: "flex",
  minHeight: "500px",
  alignItems: "center",
  justifyContent: "Center",
};
export default function CircularUnderLoad() {
  return (
    <div style={centerStyle}>
      <CircularProgress disableShrink />;
    </div>
  );
}
