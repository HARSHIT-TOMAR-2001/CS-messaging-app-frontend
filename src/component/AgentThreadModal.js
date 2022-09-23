import React,{ useEffect, useState } from 'react';
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
    width: '30%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  };

function AgentThreadModal({ open, setOpen, selectedThread }) {

    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const [messages,setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState("");
  
    const getMessages = async () => {
      try {
        const response = await axios.get(`https://css-messaging-app.herokuapp.com/api/agent/thread/messages?threadId=${selectedThread}`, {
          headers: {
              Authorization: JSON.parse(localStorage.getItem("isCSAuth")).authToken
          }
        });
        if(response.status === 200) {
           console.log(response.data);
            setMessages(response.data.messages);
        } 
      } catch (err) {
        console.log(err);
      }
    }
    
    const handleSend = async () => {
      try {
          const data = {
              threadId:selectedThread,
              message:userMessage
          }
          const response = await axios.post(`https://css-messaging-app.herokuapp.com/api/agent/create/message`,data, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem("isCSAuth")).authToken
            }
          });
          if(response.status === 200) {
              setUserMessage("");
             getMessages();
          } 
        } catch (err) {
          console.log(err);
        }
    }
  
    const handleRefresh = () => {
      getMessages();
    }
  
    // const handleClosed = async () => {
    //   try {
    //       const data = {
    //           threadId:selectedThread,
    //       }
    //       const response = await axios.post(`https://css-messaging-app.herokuapp.com/api/user/thread/closed`,data, {
    //         headers: {
    //             Authorization: JSON.parse(localStorage.getItem("isCSAuth")).authToken
    //         }
    //       });
    //       if(response.status === 200) {
    //           alert("✅Thread closed successfully, please reload the page!!");
    //           handleClose();
    //       } 
    //     } catch (err) {
    //       console.log(err);
    //       alert(err.response.data.msg);
    //     }
    // }
  
  
    useEffect(() => {
      if(selectedThread) getMessages();
    },[selectedThread]);
  
  return (
    <div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
          <Typography>Thread Id: {selectedThread}</Typography>
          <Stack sx={{
              width:'100%',
              height:'400px',
              border:'1px solid #000',
              marginTop:'1rem',
              padding:'1rem',
              overflowY:'auto',
          }} >
              {
                  messages.length > 0 ?
                  messages.map((msg,index) => {
                      return (
                          <Typography key={index} >{msg.isUserQuery ? "Customer: ": "You: "} {msg.message}</Typography>
                      )
                  })
                  : "Loading..."
              }
          </Stack>
          <Stack direction="row" sx={{
              width:'100%',
              margin:'1rem auto'
          }}>
              <TextField value={userMessage} onChange={(e) => setUserMessage(e.target.value)} sx={{ width:'80%' }} id="standard-basic" label="Standard" variant="standard" />
              <Button onClick={handleSend} variant="contained">Send</Button>
          </Stack>
          <Stack direction="row" spacing={2} sx={{
              width:'100%',
              margin:'1rem auto'
          }}>
              <Button onClick={handleRefresh} variant="contained">Refresh</Button>
          </Stack>
      </Box>
    </Modal>
  </div>
  )
}

export default AgentThreadModal