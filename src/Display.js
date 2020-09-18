import { Button, Modal } from '@material-ui/core';
import React, { useState } from 'react';
import db from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './Display.css';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid lightgrey',
      boxShadow: theme.shadows[3],
      padding: theme.spacing(2, 4, 3),
    },
  }));




function Display(props) {
    const classes = useStyles();
    const [open,setOpen] = useState(false);
    const [editor, setEditor] = useState('');

    const delTo = (e) => {
        db.collection('arrays').doc(props.array.id).delete();
    }

    const updateArray = () => {
        db.collection('arrays').doc(props.array.id).set({
            array: editor,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        },
        {merge:true});
        setOpen(false);
    }




    return (
        <div className="loop">
        <Modal classname="display__modal"
        open={open}
        onClose={e => setOpen(false)}>
            <div className={classes.paper}>
                <h3 className="display__heading">Edit Your Entry</h3>
                <TextField className="display__input" placeholder={props.array.array} onChange={e => setEditor(e.target.value)} value={editor}
                id="outlined-basic" variant="outlined"> </TextField>
                <Button className="display__btn" variant="contained" color="secondary" onClick={updateArray}>Update</Button>
            </div>
        </Modal>
        <List>
            <ListItem className="loopTwo">
                <ListItemText> {props.array.array} </ListItemText>
                <EditIcon className="btn" variant="contained" color="primary" onClick={e => setOpen(true)}/>
                <DeleteOutlineIcon className="btn" variant="contained" color="secondary" onClick={delTo} type="submit"/>
            </ListItem>
        </List>
        </div>
    )
}

export default Display;