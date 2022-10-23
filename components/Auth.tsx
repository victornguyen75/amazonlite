import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface AuthProps {
  children: JSX.Element;
}

export const Auth = ({ children }: AuthProps): JSX.Element => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
};

Auth.displayName = "Auth";
