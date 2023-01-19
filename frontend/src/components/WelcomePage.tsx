import React, {FC} from "react";
import { Resolver, useForm } from "react-hook-form";
import sha256 from "fast-sha256"


type FormValues = {
  email: string;
  password: string;
}

// const resolver: Resolver<FormValues> = async (values) => {
//   return {
//     values: values.firstName ? values : {},
//     errors: !values.firstName
//       ? {
//           firstName: {
//             type: 'required',
//             message: 'This is required.',
//           },
//         }
//       : {},
//   };
// };

const WelcomePage: FC = () => {
  

  const { register, handleSubmit, formState: {errors} } = useForm<FormValues>();


  const onSubmit = (data: any) => {
    const password = sha256(data.password)
  };
  return (
    <div>
      <h1 className="text-l">Tajniacy</h1>
      <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} placeholder="email"/>

      <input {...register("password")} placeholder="password" />
      <button type="submit">zaloguj</button>
    </form>
      </div>
      <div>
        <button>
          zarejestruj się
        </button>
      </div>
    </div>
  );
};
 
export default WelcomePage;