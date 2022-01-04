import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import Axios from "axios";
import { Grid,Paper,Typography,TextField,Button,makeStyles,Checkbox,FormControlLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: "100%",
    margin:"5px",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5]
  },
  input: {
    display: "none",
  }
}));
function createURL(attachmentPath){
  if(attachmentPath.startsWith("http")) return attachmentPath;
  return "http://localhost:8080/"+attachmentPath
}
const initialItem = {
  name:"",
  attachmentURL:"",
  currentFile: ""
}

export default function ActivitiesTab({courseId}) {
  
  const classes = useStyles();
  const [getActivities, setActivities] = useState([]);
  const [checked, setChecked] = useState(true);
  const [currentItem, setCurrentItem] = useState(initialItem);
  const [selectedFile, setSelectedFile] = useState(null);
  const [txtErrorMessage, settxtErrorMessage] = useState("");

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const AddNew = async () => {
    let formData = new FormData();
    
    formData.append("name", currentItem.name);
    if(currentItem.name=="" || (currentItem.attachmentURL=="" && selectedFile==null))
    {
      settxtErrorMessage("Please fill all data");
      return;
    }
    if(checked){
      formData.append("attachmentPath", currentItem.attachmentURL);
    }else{
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
    }

    Axios({
      method: "post",
      url: `http://localhost:8080/instructor/add_syllabus/${courseId}`,
      data: formData,
      headers: {
        Authorization: localStorage.getItem("auth_jwt_token"), //the token is a variable which holds the token
      },
    })
      .then((res) => {
        console.log("Response of AddNew  ", res);
        setCurrentItem(initialItem)
        setSelectedFile(null)
        settxtErrorMessage("");
        fetchActivities();
      })
      .catch((err) => {
        settxtErrorMessage("Can't add Activity");
        console.log(err)
      });
  };

  const fetchActivities = async () => {
    Axios({
      method: "get",
      url: `http://localhost:8080/course/get/${courseId}`,
      headers: {
        Authorization: localStorage.getItem("auth_jwt_token"), //the token is a variable which holds the token
      },
      data: JSON.stringify({}),
    })
    .then((res) => {
        settxtErrorMessage("");
        Axios({
          method: "get",
          url: `http://localhost:8080/course/get_many_activities`,
          params:{
            ids: res.data.syllabus.join(",")
          },
          headers: {
            Authorization: localStorage.getItem("auth_jwt_token"), //the token is a variable which holds the token
          },
          data: JSON.stringify({}),
        })
        .then((result) =>{
            setActivities(result.data)
            settxtErrorMessage("");
          })
          .catch((err)=>{
            settxtErrorMessage("Can't get Activities");
            console.log(err)
          })
      })
      .catch((err) => {
          settxtErrorMessage("Can't get course");
          console.log(err)
      });
  };
  useEffect(() => {
    fetchActivities();
  }, []);
  return(
  
  <Grid container xs={12} spacing={3}>
      <Grid item xs={6}>
        <TextField
          name="name"
          label="Activity Name"
          placeholder="write name here"
          variant="outlined"
          required
          onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
          error={txtErrorMessage !== ""}
          helperText={txtErrorMessage !== "" ? txtErrorMessage : " "}
        />
      </Grid>
      <Grid item xs={6}>
        <Button
          size="meduim"
          className={classes.button}
          variant="contained"
          color="primary"
          error={txtErrorMessage !== ""}
          helperText={txtErrorMessage !== "" ? txtErrorMessage : " "}
          onClick={(e) => {
            AddNew();
          }}>Publish
        </Button>
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleCheck} />}
          label={checked?"unCheck to add file":"check to attach url"}
        />
      </Grid>
      <Grid item xs={4}>
      <TextField
          name="url"
          label="video url"
          placeholder="add url here"
          variant="outlined"
          disabled={!checked}
          onChange={(e) => setCurrentItem({ ...currentItem, attachmentURL: e.target.value })}
        />
      </Grid>
      <Grid item xs={4}>
        <input
          accept="files/*"
          className={classes.input}
          id="contained-button-file"
          type="file"
          onChange={(e) => {
            if (e.target.files.length) {
              setSelectedFile(e.target.files[0]);
              setCurrentItem({ ...currentItem, currentFile: e.target.files[0].name })
              e.target.value = null
            }
          }}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary"
            className={classes.button}
            disabled={checked}
            component="span" >
            Attach
          </Button>
          {currentItem.currentFile}
        </label>
      </Grid>
      
      <Grid item xs={12}>
    {/**/}
    <List className={classes.root}>
      {getActivities && getActivities.length > 0 ? (
        getActivities.map((activity,index)=>{
          return(
              <Paper className={classes.paper}>
                <ListItem key={index}>
                  <ListItemText
                    primary={activity.name}
                    secondary={<a href={createURL(activity.attachmentPath)} target="_blank" rel="nonreferrer">attachment</a>}
                  />
                </ListItem>
              </Paper>
          )
        })
      ):(
        <Typography>No Activities found</Typography>
      )}
    </List>
    </Grid>
  </Grid>
  ) 
}
