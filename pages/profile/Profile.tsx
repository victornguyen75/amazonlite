import { useEffect } from "react";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Layout, useToast } from "components";
import { getError } from "utils";

export default function Profile(): JSX.Element {
  const { data: session } = useSession();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", session.user.name);
    setValue("email", session.user.email);
  }, [session.user, setValue]);

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.put("/api/auth/update", {
        name,
        email,
        password,
      });
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      toast.pushSuccess("Profile updated successfully.");

      if (result.error) {
        toast.pushError(result.error);
      }
    } catch (err) {
      toast.pushError(getError(err));
    }
  };

  return (
    <Layout title="Profile">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Update Profile</h1>

        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="name"
            className="w-full"
            autoFocus
            {...register("name", {
              required: "Please enter your name.",
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
            type="email"
            className="w-full"
            autoFocus
            {...register("email", {
              required: "Please enter your email.",
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
            {...register("password", {
              minLength: {
                value: 6,
                message: "The password should be more than 5 chars.",
              },
            })}
          />
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
            type="password"
            className="w-full"
            {...register("confirmPassword", {
              validate: (value) => value === getValues("password"),
              minLength: {
                value: 6,
                message: "The confirm password should be more than 5 chars.",
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
              <div className="text-red-500 ">Password do not match</div>
            )}
        </div>

        <div className="mb-4">
          <button className="primary-button">Update Profile</button>
        </div>
      </form>
    </Layout>
  );
}

Profile.auth = true;

Profile.displayName = "Profile";
