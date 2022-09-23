import React,{ useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function CreateModal({ open, setOpen }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [message,setMessage] = useState("");

  const handleCreate = async () => {
    try {
      const data = {
        message:message,
        userId: JSON.parse(localStorage.getItem("isCSAuth")).userId
      }
      const response = await axios.post('https://css-messaging-app.herokuapp.com/api/user/create/thread', data, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("isCSAuth")).authToken
        }
      });
      if(response.status === 200) {
          alert("✅Thread created successfully!");
          handleClose();
      } 
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" sx={{
            marginBottom:'1rem'
          }} >Create thread</Typography>
          <Stack direction="column" spacing={1} >
            <TextField value={message} onChange={(e) => setMessage(e.target.value)} id="outlined-basic" type="text" label="Message" variant="outlined" />
            <Button onClick={handleCreate} variant="contained" >Create</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}