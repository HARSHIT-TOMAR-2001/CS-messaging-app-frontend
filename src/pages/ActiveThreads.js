import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ThreadModal from '../component/ThreadModal';

function ActiveThreads() {

    const [threads, setThreads] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedThread, setSelectedThread] = useState("");
    const navigate = useNavigate();

    const getActiveThreads = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem("isCSAuth")).userId;
            const response = await axios.get(`https://css-messaging-app.herokuapp.com/api/user/active/threads?userId=${userId}`, {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem("isCSAuth")).authToken
                }
            });
            if (response.status === 200) {
                setThreads(response.data.active_threads);
                // console.log(response.data.active_threads);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleGoTo = async () => {
        navigate('/dashboard', { replace: false });
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
            <Button onClick={handleGoTo} variant="outlined" sx={{
                position:'absolute',
                top:15,
                right:15
            }} >Go to dashboard</Button>
            <Typography variant="h3" >Active Threads</Typography>
            {
                threads.length > 0 ?
                threads.map((thread, index) => {
                    return (
                        <Stack key={thread._id} sx={{
                            border: '1px solid #f64d41',
                            padding:'1rem',
                            cursor:'pointer'
                        }} onClick={() => handleOpenThread(thread._id)} >
                            <Typography>Thread Id: {thread._id}</Typography>
                        </Stack>
                    )
                }) : "No active threads."
            }
            <ThreadModal open={open} setOpen={setOpen} selectedThread={selectedThread} />
        </Stack>
    )
}

export default ActiveThreads;