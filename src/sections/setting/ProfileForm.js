import React, { useCallback, useState } from 'react'
import * as Yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup";
import { Link as RouterLink } from 'react-router-dom';
import FormProvider from '../../components/hook-form/FormProvider'
import { RHFTextField } from '../../components/hook-form'
import { Alert, Button, IconButton, InputAdornment, Link, Stack } from '@mui/material';
import { Eye, EyeSlash } from 'phosphor-react';

const ProfileForm = () => {
    const LoginSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        about: Yup.string().required("About is required"),
        avatarUrl: Yup.string().required("Avatar is required").nullable(true),
      });
    
      const defaultValues = {
        name: "LeoDas",
        about: "Badass-u mah"
      };
    
      const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
      });
    
      const {
        reset,
        watch,
        control,
        setValue,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful},
      } = methods;
    
    const values=watch()
    const handleDrop = useCallback((acceptedFiles)=>{
        const file=acceptedFiles[0];
        const newFile = Object.assign(file,{
            preview:URL.createObjectURL(file)
        })
        if(file){
        setValue("avatarUrl",newFile,{shouldValidate:true});
    }
    },[setValue])

    

    const onSubmit = async(data)=>{
        try{
            console.log("Data:",data);
            //submit
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
        <Stack spacing={3}>
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        
        <RHFTextField name="name" label="Name" helperText={"This name is visibile to your contacts"}/>

        <RHFTextField name="about" label="About" multiline rows={3} maxRows={5}/>

        </Stack>
       <Stack direction={"row"} justifyContent={"end"}>
        <Button color="primary" size="lar ge" type="submit" variant="outlined">Save</Button>
       </Stack>
    </Stack>
    </FormProvider>
  )
}

export default ProfileForm