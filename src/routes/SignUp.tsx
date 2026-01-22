import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { useState } from "react";

type Inputs = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  birthDate: string;
  phoneNumber: string;
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [loading, setLoading] = useState(false);

  const redirect = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setRegisterError(false);
    setLoading(true);
    fetch("http://localhost:8080/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Register failed.");
        } else {
          redirect("/");
        }
      })
      .catch(() => setRegisterError(true))
      .finally(() => setLoading(false));
  };

  return (
    <div className="relative w-full h-full min-h-screen flex justify-center items-center bg-brand-dark">
      <div className="px-20 my-2 flex flex-col justify-center items-center rounded-2xl outline-2 bg-surface-dark outline-brand-dark">
        <Link
          to={"/"}
          className="absolute top-0 left-0 p-2 m-2 rounded-2xl text-xl outline-2 hover:cursor-pointer hover:bg-surface-dark outline-surface-darker text-gray-800 bg-surface"
          aria-label="Go back"
        >
          <IoIosArrowBack />
        </Link>
        <h1 className="my-4 text-4xl font-bold text-gray-800">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-100 flex flex-col text-md text-surface">
            <p className="pl-2 py-2 font-semibold text-gray-800">First Name:</p>
            <input
              className="w-full p-1 rounded-md outline-2 text-gray-800 outline-surface-darker bg-white"
              {...register("firstName")}
            />
            <p className="pl-2 py-2 font-semibold text-gray-800">Last Name: </p>
            <input
              className="w-full p-1 rounded-md outline-2 text-gray-800 outline-surface-darker bg-white"
              {...register("lastName")}
            />
            <p className="pl-2 py-2 font-semibold text-gray-800">Username: *</p>
            {errors.username && (
              <span className="text-center mb-2 bg-red-950">
                {errors.username.message}
              </span>
            )}
            <input
              className="w-full p-1 rounded-md outline-2 text-gray-800 outline-surface-darker bg-white"
              {...register("username", {
                required: "This field is required.",
                minLength: {
                  value: 4,
                  message: "Username must be between 4 and 20 characters.",
                },
                maxLength: {
                  value: 20,
                  message: "Username must be between 4 and 20 characters.",
                },
              })}
            />
            <p className="pl-2 py-2 font-semibold text-gray-800">Email: *</p>
            {errors.email && (
              <span className="text-center mb-2 bg-red-950">
                {errors.email.message}
              </span>
            )}
            <input
              className="w-full p-1 rounded-md outline-2 text-gray-800 outline-surface-darker bg-white"
              type="email"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email.",
                },
              })}
            />
            <p className="pl-2 py-2 font-semibold text-gray-800">Password: *</p>
            {errors.password && (
              <span className="text-center mb-2 bg-red-950">
                {errors.password.message}
              </span>
            )}
            <div className="relative">
              <input
                className="w-full p-1 rounded-md outline-2 text-gray-800 outline-surface-darker bg-white"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "This field is required.",
                  minLength: {
                    value: 8,
                    message: "Password must be between 8 and 20 characters.",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be between 8 and 20 characters.",
                  },
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/,
                    message:
                      "Must include uppercase or lowercase, number and special character",
                  },
                })}
              />
              <button
                className="absolute right-1 top-1 p-1 hover:cursor-pointer rounded-md bg-gray-800"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                <FaEye />
              </button>
            </div>
            <p className="pl-2 py-2 font-semibold text-gray-800">Birth Date:</p>
            {errors.birthDate && (
              <span className="text-center my-2 bg-red-950">
                {errors.birthDate.message}
              </span>
            )}
            <input
              className="w-full p-1 pr-2 rounded-md outline-2 text-gray-800 outline-surface-darker bg-white"
              type="date"
              {...register("birthDate", {
                validate: {
                  isValid: (value) => {
                    const currentYear = new Date().getFullYear();
                    const birthDateYear = new Date(value).getFullYear();

                    const maxYearsOld = currentYear - 100;
                    /*const minYearsOld = currentYear - 18;

                    if (
                      birthDateYear > minYearsOld ||
                      birthDateYear < maxYearsOld
                    ) {
                      return "Age must be between 18 and 100";
                    }*/

                    if (
                      birthDateYear > currentYear ||
                      birthDateYear < maxYearsOld
                    ) {
                      return "Invalid date.";
                    }

                    return true;
                  },
                },
              })}
            />
            <p className="pl-2 py-2 font-semibold text-gray-800">
              Phone Number:
            </p>
            {errors.phoneNumber && (
              <span className=" text-center bg-red-950">
                {errors.phoneNumber.message}
              </span>
            )}
            <input
              className="w-full p-1 rounded-md outline-2 text-gray-800 outline-surface-darker bg-white"
              {...register("phoneNumber", {
                pattern: {
                  value:
                    /^\+?[(]?[0-9]{3}[)]?[-\s\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                  message: "Invalid phone number.",
                },
              })}
            />
            {loading ? (
              <p className="self-center py-2 px-4 m-8 text-md font-semibold text-gray-800">
                Loading...
              </p>
            ) : (
              <div className="w-full flex flex-col justify-center items-center my-8">
                {registerError && (
                  <p className="mb-2 w-full text-center bg-red-950 text-white">
                    There was an error. Please try again later.
                  </p>
                )}
                <button
                  className="w-full py-2 px-4 rounded-2xl text-md outline-2 font-semibold hover:cursor-pointer hover:bg-brand outline-brand-dark bg-brand-light text-white"
                  type="submit"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
