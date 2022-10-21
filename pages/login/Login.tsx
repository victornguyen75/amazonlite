import React, { useEffect } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Layout, useToast } from "../../components";
import { getError } from "../../utils";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const redirect = String(router.query.redirect || "/");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const toast = useToast();

  useEffect(() => {
    if (session?.user) {
      router.push(redirect);
    }
  }, [router, session, redirect]);

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        toast.pushError(result.error);
      }
    } catch (err) {
      console.error("Error: ", getError(err));
      toast.pushError(getError(err));
    }
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
