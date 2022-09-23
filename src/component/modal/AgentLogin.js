import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField,Stack } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UserLogin({open,setOpen}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = {
        email:email,
        password:password
      }
      const response = await axios.post('https://css-messaging-app.herokuapp.com/api/agent/signin', data);
      if(response.status === 200) {
        alert("✅Logged in successfully!!");
        localStorage.setItem("isCSAuth", JSON.stringify({ 
          authToken: response.data.agent.authToken,
            agentId: response.data.agent.agentId
        }));
        handleClose();
        navigate('/assigned-thread', { replace: true });
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong!!");
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
          }} >Sign in as user</Typography>
          <Stack direction="column" spacing={1} >
            <TextField value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" type="email" label="Email" variant="outlined" />
            <TextField value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" type="password" label="password" variant="outlined" />
            <Button onClick={handleLogin} variant="contained" >Log in</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}