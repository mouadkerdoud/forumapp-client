import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';

import avatar from "../../../img/avatar.jpg"
import postImage from "../../../img/event.jpg"


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  icon: {
      fontSize: "25px"
  },

  chip:{
      width: "400px",
      fontSize:"18px",
      padding: "10px",
      backgroundColor: "#ddd",
      color:"#333"
  },

  chipCancel:{
    width: "400px",
    fontSize:"18px",
    padding: "10px",
    backgroundColor: "#ddd",
    color:"#333"
  },

  text:{
      color: "#333"
  }
}));

export default function RecipeReviewCard({event, attendEvent, deleteAttending, isAttended}) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        
        title={event.startDate.replace("T", " ")}
        subheader={event.eventName}
        subheaderTypographyProps={{color:"inherit"}}
      />
      <CardMedia
        className={classes.media}
        image={postImage}
      />
      <CardContent>
        <Typography className={classes.text} variant="body2"  component="p">
                            {event.eventDescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
            <Chip 
                className={isAttended ? classes.chipCancel : classes.chip} 
                clickable 
                icon={ isAttended ? <CloseIcon style={{ color: "red" }} className={classes.icon}/> : <StarBorderIcon style={{ color: "#333" }} className={classes.icon}/>} 
                label= {isAttended ? "Cancel attending" : "Attend"} 
                onClick={isAttended ? ()=>deleteAttending(event.eventId) : ()=>attendEvent(event.eventId)} 
            />
      </CardActions>
      
    </Card>
  );
}
