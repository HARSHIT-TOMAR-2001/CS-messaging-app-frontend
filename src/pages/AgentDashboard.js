import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AgentThreadModal from '../component/AgentThreadModal';

function AgentDashboard() {
    const [threads, setThreads] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedThread, setSelectedThread] = useState("");
    const navigate = useNavigate();

    const getActiveThreads = async () => {
        try {
            const agentId = JSON.parse(localStorage.getItem("isCSAuth")).agentId;
            const response = await axios.get(`https://css-messaging-app.herokuapp.com/api/agent/thread/assigned?agentId=${agentId}`, {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem("isCSAuth")).authToken
                }
            });
            if (response.status === 200) {
                setThreads(response.data.threadId);
                // console.log(response.data.active_threads);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleLogOut = async () => {
        localStorage.removeItem("isCSAuth");
        navigate('/', { replace: false });
    }  

    const handleOpenThread = (threadId) => {
        setOpen(true);
        setSelectedThread(threadId);
    }

    useEffect(() => {
        getActiveThreads();
    }, []);

  return (
    <Stack direction="column" spacing={2} sx={{
        padding:'3rem'
    }} >
        <Button onClick={handleLogOut} variant="outlined" sx={{
            position:'absolute',
            top:15,
            right:15
        }} >Logout</Button>
        <Typography variant="h3" >Assigned Threads</Typography>
        {
            threads?
                    <Stack  sx={{
                        border: '1px solid #f64d41',
                        padding:'1rem',
                        cursor:'pointer'
                    }} onClick={() => handleOpenThread(threads)} >
                        <Typography>Thread Id: {threads}</Typography>
                    </Stack>
                : "No active assigned thread,please reload and check the page after a while!"
        }
        <AgentThreadModal open={open} setOpen={setOpen} selectedThread={selectedThread} />
    </Stack>
  )
}

export default AgentDashboard