import {Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateModal from '../component/modal/CreateModal';

function Dashboard() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleCreateThread = () => {
        setOpen(true);
    }

    const handleActiveThread = () => {
        navigate('/active-threads');
    }

    const handleLogout = () => {
        localStorage.removeItem("isCSAuth");
        navigate('/', { replace:true });
    }

    return (
        <>
            <Stack sx={{
                width: '100%',
                height: '100vh'
            }} direction="column" justifyContent="center" alignItems="center" spacing={2} >
                <Button sx={{
                    top:10,
                    right:10,
                    position:'absolute'
                }} onClick={handleLogout} variant="contained">Logout</Button>
                <Button onClick={handleCreateThread} variant="outlined" >Create Thread</Button>
                <Button onClick={handleActiveThread} variant="contained" >Active Threads</Button>
            </Stack>
            <CreateModal open={open} setOpen={setOpen} />
        </>
    )
}

export default Dashboard;