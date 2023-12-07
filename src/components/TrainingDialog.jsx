import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";

function TrainingDialog({ trainings, handleChange }) {
  return (
    <DialogContent>
      <TextField
        margin="dense"
        label="Date"
        name="date"
        fullWidth
        variant="standard"
        value={trainings.date}
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        label="Duration"
        name="duration"
        fullWidth
        variant="standard"
        value={trainings.duration}
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        label="Activity"
        name="activity"
        fullWidth
        variant="standard"
        value={trainings.activity}
        onChange={handleChange}
      />
    </DialogContent>
  );
}

export default TrainingDialog;
