import React, { useState } from 'react'
import * as Yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup";
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import FormProvider from '../../components/hook-form/FormProvider'
import { RHFTextField } from '../../components/hook-form'
import { Alert, Button, IconButton, InputAdornment, Link, Stack } from '@mui/material';
import { Eye, EyeSlash } from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { NewPassword } from '../../redux/slices/auth';

const NewPasswordForm = () => {
    const [queryParameters] = useSearchParams();
    const [showPassword,setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const NewPasswordSchema = Yup.object().shape({
        password: Yup.string().required("Password must be at least 6 characters"),
        passwordConfirm: Yup.string().required("Password is required").oneOf([Yup.ref('password'),null],'Password must match'),
      });
    
      const defaultValues = {
        password: "",
        passwordConfirm: "",
      };
    
      const methods = useForm({
        resolver: yupResolver(NewPasswordSchema),
        defaultValues,
      });
    
      const {
        reset,
        setError,
        handleSubmit,
        formState: { errors },
      } = methods;
      
    const onSubmit = async(data)=>{
        try{
            console.log(data,queryParameters.get("token"));
            //submit
            dispatch(NewPassword({...data,token:queryParameters.get("token")}));
        } catch(error){
            console.log(error);
            reset()
            setError("afterSubmit",{
                ...error,
                message:error.message
            })
        }
    }
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        
        <RHFTextField name="password" label="New Password" type={showPassword?"text":"password"} InputProps={{
            endAdornment:(<InputAdornment>
                <IconButton onClick={()=>{
                    setShowPassword(!showPassword)
                }}>
                    {showPassword? <Eye></Eye>:<EyeSlash/>}
                </IconButton>
            </InputAdornment>)}}/>

        <RHFTextField name="passwordConfirm" label="Confirm Password" type={showPassword?"text":"password"} InputProps={{
            endAdornment:(<InputAdornment>
                <IconButton onClick={()=>{
                    setShowPassword(!showPassword)
                }}>
                    {showPassword? <Eye></Eye>:<EyeSlash/>}
                </IconButton>
            </InputAdornment>)}}/>

        <Button fullWidth color="inherit" size="large" type="submit" variant="contained" sx={{bgcolor:"text.primary",color:(theme)=>theme.palette.mode==="light"?"common.white":"grey.800",
        '&:hover':{
            bgcolor:"text.primary",
            color: (theme)=>theme.palette.mode==="light"?"common.white":"grey.800"
        }}}>Change Password</Button>
        </Stack>


    </FormProvider>
  )
}

export default NewPasswordForm