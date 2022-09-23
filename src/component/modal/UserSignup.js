import React,{ useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

export default function UserSignup({ open, setOpen }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const data = {
        name: name,
        email: email,
        password: password
      }
      const response = await axios.post('https://css-messaging-app.herokuapp.com/api/user/register', data);
      if(response.status === 200) {
          alert("✅User logged in successfully!");
          localStorage.setItem("isCSAuth", JSON.stringify({ 
            authToken: response.data.token,
            userId: response.data.userId
          }));
          handleClose();
          navigate('/dashboard', { replace:true });
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
          }} >Sign up as user</Typography>
          <Stack direction="column" spacing={1} >
            <TextField value={name} onChange={(e) => setName(e.target.value)} id="outlined-basic" type="text" label="Name" variant="outlined" />
            <TextField value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" type="email" label="Email" variant="outlined" />
            <TextField value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" type="password" label="password" variant="outlined" />
            <Button onClick={handleRegister} variant="contained" >Register</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}