import React, { FC } from "react";
import { Resolver, useForm } from "react-hook-form";
import sha256 from "fast-sha256";

type FormValues = {
  email: string;
  password: string;
};

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: any) => {
    const password = sha256(data.password);
  };
  return (
    <div className="">
      <div id="spy" className="bg-spy h-full w-1/2">
        nie wchodzi mi obrazek
      </div>
      <div className="flex flex-col flex-end justify-center items-center h-full">
        <h1 className="text-l h-1/4">Tajniacy</h1>
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email")} placeholder="email" />
            <input {...register("password")} placeholder="password" />
            <button type="submit">zaloguj</button>
          </form>
        </div>
        <div>
          <button>zarejestruj się</button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
