import { Button, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { sendRegisterData } from "../Services/register";
import { Link, useNavigate } from "react-router-dom";
import { schema } from "../Schema/RegisterSchema";

export default function RegisterPage() {

  const [ apiError , setApiError] = useState(null);

  const [loading, setLoading] = useState(false);
  
  const { handleSubmit , register , formState } = useForm( {
      defaultValues:{ name: '', email:'', password:'', rePassword:'', dateOfBirth:'', gender:'' } , 
      resolver: zodResolver(schema) ,
      mode: 'onBlur'
  } )

  const navigate = useNavigate();

  async function signUp( values ) {
    setLoading(true);
    const response = await sendRegisterData( values );

    if ( response.error ) {
      setApiError( response.error );
    }
    else {
      navigate('/Login');
    }
    setLoading(false);
  }

  return (
    <div className="w-[95%] md:w-xl mx-auto min-h-screen flex justify-center items-center">

      <div className="w-full bg-white py-10 px-6 rounded-2xl shadow-2xl">

        <h2 className="text-2xl mb-4">Register Page</h2>

        <form onSubmit={ handleSubmit(signUp) } className="flex flex-col gap-4">
          {/* ...register('name' ) return > name + onblur + onchange + reference */}
          {/* errorMessage={formState.errors.name?.message > To Display Error Message From Zod ( if ) it`s invalid isInvalid={Boolean(formState.errors.name?.message)} */}
          <Input variant="bordered" label="Name" { ...register('name' ) } errorMessage={formState.errors.name?.message} isInvalid={Boolean(formState.errors.name?.message)} labelPlacement="outside" type="text" />
          <Input variant="bordered" label="Email" {...register('email')} errorMessage={formState.errors.email?.message} isInvalid={Boolean(formState.errors.email?.message)} labelPlacement="outside" type="email" />
          <Input variant="bordered" label="Password" {...register('password')} errorMessage={formState.errors.password?.message} isInvalid={Boolean(formState.errors.password?.message)} labelPlacement="outside" type="password" />
          <Input variant="bordered" label="RePassword" {...register('rePassword')} errorMessage={formState.errors.rePassword?.message} isInvalid={Boolean(formState.errors.rePassword?.message)} labelPlacement="outside" type="password" />

          <div className="flex gap-3 flex-nowrap justify-center items-center">
          <Input variant="bordered" label="DateOfBirth" {...register('dateOfBirth')} errorMessage={formState.errors.dateOfBirth?.message} isInvalid={Boolean(formState.errors.dateOfBirth?.message)} labelPlacement="outside" type="date" />
          <Select variant="bordered" className="" labelPlacement="outside-top" {...register('gender')} errorMessage={formState.errors.gender?.message} isInvalid={Boolean(formState.errors.gender?.message)} label="Select Your Gender" placeholder="Example : Male">
          <SelectItem key={'male'}>Male</SelectItem>
          <SelectItem key={'female'}>Female</SelectItem>
          </Select>
          </div>

          { apiError && <p className="text-red-500 text-center"> { apiError } </p> }

          <Button isLoading={loading} type="submit" className="bg-primary-500 text-white">Register</Button>
          <p>if you have an account <Link to={"/Login"} className="text-blue-500">Login</Link></p>
        </form>

      </div>

    </div>
  );
}
