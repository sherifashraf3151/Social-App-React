import * as zod from "zod";
export const schema = zod.object({
  name: zod.string().nonempty("Name is required").min( 3 , 'Name must be at least 3 characters long' ).max(15 , 'Name must be at most 15 characters long' ) ,
  email: zod.string().nonempty("Email is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , 'Invalid email address' ) ,
  password: zod.string().nonempty("Password is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/ , '"Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character."' ),
  rePassword: zod.string().nonempty(),
  dateOfBirth: zod.coerce.date('Date of birth is Required').refine( (value)=> {
    const now = new Date().getFullYear();
    const birth = value.getFullYear();
    const age = now - birth;
    return age >= 18 && age <= 100;
  } , { message: "You must be at least 18 years old" } ) ,
  gender: zod.string().nonempty("Gender is required")
}).refine( (data)=> data.password === data.rePassword , { message: "Passwords do not match" , path: ['rePassword'] } ); 

