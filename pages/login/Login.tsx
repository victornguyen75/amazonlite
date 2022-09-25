import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Layout } from "../../components";

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ email, password }) => {
    console.log(email, password);
  };

  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="w-full"
            autoFocus
            {...register("email", {
              required: "Please enter an email.",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter a valid email.",
              },
            })}
          />
          {errors.email && (
            <div className="text-red-500">{String(errors.email.message)}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="w-full"
            autoFocus
            {...register("password", {
              required: "Please enter a password.",
              minLength: {
                value: 6,
                message: "A password is more than 5 characters.",
              },
            })}
          />
          {errors.password && (
            <div className="text-red-500">
              {String(errors.password.message)}
            </div>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account? &nbsp;
          <Link href="/register">Register</Link>
        </div>
      </form>
    </Layout>
  );
}

Login.displayName = "Login";
