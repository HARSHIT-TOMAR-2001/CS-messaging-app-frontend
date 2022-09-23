import { Button, Stack } from '@mui/material'
import React, { useState } from 'react'
import AgentLogin from '../component/modal/AgentLogin'
import AgentSignup from '../component/modal/AgentSignup'
import UserLogin from '../component/modal/UserLogin'
import UserSignup from '../component/modal/UserSignup'

function Home() {
    const [open1,setOpen1]=useState(false)
    const [open2,setOpen2]=useState(false)
    const [open3,setOpen3]=useState(false)
    const [open4,setOpen4]=useState(false)

    const handlemodal1=()=>{
        setOpen1(true);
    }
    const handlemodal2=()=>{
        setOpen2(true);
    }
    const handlemodal3=()=>{
        setOpen3(true);
    }
    const handlemodal4=()=>{
        setOpen4(true);
    }
  return (
    <Stack spacing={2} direction="row" justifyContent={"center"} alignItems={"center"} style={{width:"100%",height:"100vh"}}>
      <Button variant="contained" onClick={handlemodal1}>Sign up as user</Button>
      <Button variant="outlined" onClick={handlemodal2}>Login as user</Button>
      <Button variant="contained" onClick={handlemodal3}>Sign up as agent</Button>
      <Button variant="outlined" onClick={handlemodal4}>Login as agent</Button>
      <UserSignup open={open1} setOpen={setOpen1}/>
      <UserLogin  open={open2} setOpen={setOpen2}/>
      <AgentSignup open={open3} setOpen={setOpen3}/>
      <AgentLogin  open={open4} setOpen={setOpen4}/>
    </Stack>
  )
}

export default Home