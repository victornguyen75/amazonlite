import { useEffect } from "react";
import axios from "axios";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Layout, useToast } from "components";
import { getError } from "utils";

export default function Register(): JSX.Element {
  const { data: session } = useSession();
  const router = useRouter();
  const redirect = String(router.query.redirect || "/");

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const toast = useToast();

  useEffect(() => {
    if (session?.user) {
      router.push(redirect);
    }
  }, [router, session, redirect]);

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.pushError(result.error);
      }
    } catch (err) {
      toast.pushError(getError(err));
    }
  };

  return (
    <Layout title="Create Account">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Create Account</h1>
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            className="w-full"
            autoFocus
            {...register("name", {
              required: "Please enter a name.",
            })}
          />
          {errors.name && (
            <div className="text-red-500">{String(errors.name.message)}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="w-full"
            type="email"
            {...register("email", {
              required: "Please enter an email.",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter a valid email.",
              },
            })}
          ></input>
          {errors.email && (
            <div className="text-red-500">{String(errors.email.message)}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="w-full"
            type="password"
            autoFocus
            {...register("password", {
              required: "Please enter a password.",
              minLength: {
                value: 6,
                message: "The password should be more than 5 chars.",
              },
            })}
          ></input>
          {errors.password && (
            <div className="text-red-500 ">
              {String(errors.password.message)}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            className="w-full"
            type="password"
            {...register("confirmPassword", {
              required: "Please re-enter your password",
              validate: (value) => value === getValues("password"),
              minLength: {
                value: 6,
                message: "The re-entered password should be more than 5 chars.",
              },
            })}
          />
          {errors.confirmPassword && (
            <div className="text-red-500 ">
              {String(errors.confirmPassword.message)}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === "validate" && (
              <div className="text-red-500 ">The passwords do not match.</div>
            )}
        </div>

        <div className="mb-4 ">
          <button className="primary-button">Register</button>
        </div>
      </form>
    </Layout>
  );
}

Register.displayName = "Register";
