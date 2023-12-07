import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from "@mui/material/DialogContent";
import TrainingDialog from './TrainingDialog';

export default function AddTraining({ fetchTrainings }) {
  const [trainings, setTrainings] = useState({
    date: '',
    duration: '',
    activity: ''
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setTrainings({...trainings, [e.target.name]: e.target.value});
  }

  const saveTrainings = () => {
    const trainingUrl = data.links[0]["href"];
  
    if (!trainingUrl) {
      console.error("Training URL is missing.");
      return;
    }
  
    fetch(trainingUrl, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(trainings)
    })
      .then(response => {
        if (!response.ok)
          throw new Error("Error when updating training: " + response.statusText);
  
        return response.json();
      })
      .then(data => {
        fetchTrainings();
        handleClose();
      })
      .catch(err => console.error(err));
  }
  

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TrainingDialog trainings={trainings} handleChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveTrainings}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}