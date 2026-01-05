import { Button, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { sendLoginData } from "../Services/login";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const schema = zod.object({

  email: zod.string().nonempty("Email is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , 'Invalid email address' ) ,
  password: zod.string().nonempty("Password is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/ , 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character.' ),
  
})





export default function LoginPage() {

  const [ apiError , setApiError] = useState(null);

  const [loading, setLoading] = useState(false);

  const { setisLogged } = useContext(AuthContext);


  
  const { handleSubmit , register , formState } = useForm( {
      defaultValues:{ email:'', password:'' } , 
      resolver: zodResolver(schema) , 
      mode: 'onBlur'
  } )

  const navigate = useNavigate();

  async function signIn( values ) {
    setLoading(true);
    const response = await sendLoginData( values );

    if ( response.error ) {
      setApiError( response.error );
    }
    else {
      localStorage.setItem('userToken' , response.token );
      setisLogged( true );
      navigate('/');
    }
    setLoading(false);
  }

  return (
    <div className="w-[95%] md:w-xl mx-auto min-h-screen flex justify-center items-center">

      <div className="mx-auto bg-white py-10 px-6 rounded-2xl shadow-2xl">

        <h2 className="text-2xl mb-4">login Page</h2>

        <form onSubmit={ handleSubmit(signIn) } className="flex flex-col gap-4">

          <Input variant="bordered" label="Email" {...register('email')} errorMessage={formState.errors.email?.message} isInvalid={Boolean(formState.errors.email?.message)} labelPlacement="outside" type="email" />
          <Input variant="bordered" label="Password" {...register('password')} errorMessage={formState.errors.password?.message} isInvalid={Boolean(formState.errors.password?.message)} labelPlacement="outside" type="password" />
          

          { apiError && <p className="text-red-500 text-center"> { apiError } </p> }

          <Button isLoading={loading} type="submit" className="bg-primary-500 text-white">Login</Button>
          <p>if you haven`t an account <Link to={"/register"} className="text-blue-500">SignUp</Link></p>
        </form>

      </div>

    </div>
  );
}
