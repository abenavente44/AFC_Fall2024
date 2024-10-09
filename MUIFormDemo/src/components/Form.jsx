import * as React from 'react';
import Box from '@mui/material/Box';
import {TextField, Button, Stack} from '@mui/material';
import {yupResolver} from "@hookform/resolvers/yup"
import{object, string, number} from "yup"
import { useForm } from 'react-hook-form';


export default function Form() {

const person = {}
const personSchema= object({
  first_name: string()
  .required("Must have a first name")
  .min(2),
  last_name: string()
  .required("Must have a first name")
  .min(2)
  }) 
const {register, handleSubmit, reset, setValue, watch, formState:{errors}} = useForm({
  resolver: yupResolver(personSchema)

});


const handleChange = (e) => {
 setValue (e.target.name, e.target.value)
 //let fname = watch('first_name')
 console.log(watch('first_name'));
 console.log(watch());
}
const onSubmit = (data) =>{
console.log(data)
let JSONData = JSON.stringify(data)
let options = {
  method: 'POST',
  body: JSONData
}
axios.request(options)
.then()
.catch()
console.log(JSONData)
reset();
}

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
      onSubmit = {handleSubmit(onSubmit)}
    >
      {/* input here */}
      <TextField id="outlined-basic" label="First Name" variant="outlined" {...register("first_name")} onChange ={handleChange}
      helperText = {errors.first_name && <span>{errors.first_name.message}</span>} errors= {errors.first_name != undefined}
      />
      <TextField id="outlined-basic" label="Last Name" variant="outlined" {...register("last_name")} onChange ={handleChange}
      helperText = {errors.last_name && <span>{errors.last_name.message}</span>} errors= {errors.last_name != undefined}
      />
      <Stack direction="row" spacing={2}>
      <Button type= "submit" variant="contained" color="success">
        Submit
      </Button>
      <Button onClick ={ ()=> reset()}  variant="contained" color="error">
        Reset
      </Button>
    </Stack>
    </Box>
  );
}