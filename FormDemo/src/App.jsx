import { useState } from 'react'
import {useForm} from "react-hook-form"
import './App.css'
import {object, string, number} from "yup"
import {yupResolver} from "@hookform/resolvers/yup"


function App() {
  
const userSchema =object ({
    fname: string()
    .max(5, "cannot be more than 5 characters in length")
    .min(1, "cannot be less than 1 characters in length")
    .required("first name is required"),
    lname: string()
    .max(6, "cannot be more than 6 characters in length")
    .min(1, "cannot be less than 1 characters in length"),
    age: number()
    .positive("Must be positive")
    .lessThan(100, "Must be less than 100"),
    email: string()
    .email("Must be correct email format")
    .required("Email is required"),
    password: string()
    .max(12, "To many characters")
    .min(8,"Needs more characterss")
    
  });
  //destructure 

  const {register, setValue, handleSubmit, reset, formState:{errors}} = useForm({
  resolver: yupResolver(userSchema)
});



const onSubmit= (data)=> {
console.log(data);
reset();

};
const handleChange= (event) =>{
setValue (event.target.name, event.target.value)

}


  return (
    <>
    <form onSubmit= {handleSubmit(onSubmit)}>
    <label htmlFor="fname">First Name</label>
    <input type="text" {...register('fname')} id='fname'  onChange={handleChange}/>
    {errors.fname && <span> {errors.fname.message}</span>}
    <br />
    <label htmlFor="lname">Last Name</label>
    <input type="text" {...register('lname')} id='lname'  onChange={handleChange}/>
    {errors.lname && <span> {errors.lname.message}</span>}
    <br />
    <label htmlFor="Age">Age</label>
    <input type="number" {...register('age')} id='age'  onChange={handleChange}/>
    {errors.age && <span> {errors.age.message}</span>}
    <br />
    <label htmlFor="email">Email</label>
    <input type="text" {...register('email')} id='email'  onChange={handleChange}/>
    {errors.email && <span> {errors.email.message}</span>}
    <br />
    <label htmlFor="password">Password</label>
    <input type="password" {...register('password')} id='password'  onChange={handleChange}/>
    {errors.password && <span> {errors.password.message}</span>}
    <button type='submit'>Submit</button>
    </form>
    </>
  )
}

export default App
