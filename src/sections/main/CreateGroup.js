import React from 'react'
import {Dialog,Slide,DialogTitle,DialogContent,Stack,Typography,Button} from '@mui/material';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup";
import FormProvider from '../../components/hook-form/FormProvider';
import { RHFTextField } from '../../components/hook-form';
import RHFAutocomplete from '../../components/hook-form/RHFAutocomplete';

const MEMBERS=["Name 1","Name 2","Name 3"];
const Transition = React.forwardRef(function Transition(
    props,
    ref
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const CreateGroupForm = ({handleClose})=>{
    const NewGroupSchema = Yup.object().shape({
        title:Yup.string().required("Title is Required"),
        members:Yup.array().min(2,"Must have atleast 2 members"),
    })

    const defaultValues ={
        title:"", 
        member:[],
    }
    
    const methods = useForm({
        resolver: yupResolver(NewGroupSchema),
        defaultValues,
    })

    const {
        reset,
        watch,
        setError,
        handleSubmit,
        formState: { errors,isSubmitting,isSubmitSuccessful,isValid},
      } = methods;

    const onSubmit=async(data)=>{
        try{

        }
        catch(error){
            console.log("Error:",error)
        }
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <RHFTextField name="title" label="title" />
                <RHFAutocomplete 
                    name="members" 
                    label="members" 
                    multiple 
                    freeSolo 
                    options={MEMBERS.map((option)=>option)}
                    ChipProps={{size:'medium'}}
                />
                <Stack spacing={2} direction="row" alignItems={"center"} justifyContent={"end"}>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        Create
                    </Button>
                </Stack>
            </Stack>
        </FormProvider>
    )

}

const CreateGroup = ({open,handleClose}) => {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} TransitionComponent={Transition} keepMounted sx={{p:4}}>
        {/*Title*/}
        <DialogTitle sx={{mb:3}}>Create New Group</DialogTitle>
        {/*Content*/}
        <DialogContent>
           <CreateGroupForm handleClose={handleClose}/>
        </DialogContent>
    </Dialog>
  )
}

export default CreateGroup