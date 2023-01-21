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
    <div className="flex flex-row flex-end h-screen w-screen">
      <div id="spy" className="flex h-full w-1/2" />
      <div className="flex flex-col flex-end justify-center items-center h-full w-1/2 gap-2">
        <h1 className="text-7xl h-1/4">TAJNIACY</h1>
        <div className="w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center gap-8"
          >
            <div className="flex justify-center w-full gap-10">
              <input
                {...register("email")}
                placeholder="email"
                className="w-56 text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-myWhite focus:border-myBlack"
              />
              <input
                {...register("password")}
                placeholder="password"
                className="w-56 text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-myWhite focus:border-myBlack"
              />
            </div>
            <button
              type="submit"
              className=" w-24 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              zaloguj
            </button>
          </form>
        </div>
        <div>
          <button className="inline-block align-baseline font-bold text-sm text-pink-500 hover:text-pink-800">
            zarejestruj się
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
