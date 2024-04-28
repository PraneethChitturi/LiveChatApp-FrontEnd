import { Link, Stack, Typography } from '@mui/material'
import { CaretLeft } from 'phosphor-react'
import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import NewPasswordForm from '../../sections/auth/NewPasswordForm'

const NewPassword = () => {
  return (
    <>
        <Stack spacing={2} sx={{mb:5,position:"relative"}}>
            <Typography variant="h3" paragraph>
                Reset Password
            </Typography>

            <Typography sx={{color:"text.secondary",mb:5}}>
                Please set your New Password
            </Typography>
            <NewPasswordForm />
            <Link to="/auth/login" component={RouterLink} color="inherit" variant="subtitle2" sx={{mt:3,mx:"auto",alignItems:"center",display:"inline-flex"}}>
                <CaretLeft/>
                Return to Sign in
            </Link>
        </Stack>
    </>
  )
}

export default NewPassword