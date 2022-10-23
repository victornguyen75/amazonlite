import {
  useState,
  useEffect,
  useMemo,
  useContext,
  ReactNode,
  Fragment,
} from "react";
import Head from "next/head";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Cookies from "js-cookie";

import { UserMenu } from "components";
import { Store, Product } from "utils";

interface LayoutProps {
  title: string;
  children: ReactNode;
}

export const Layout = ({ title, children }: LayoutProps) => {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(
      cart.items.reduce(
        (total: number, item: Product) => total + item.cartCount,
        0
      )
    );
  }, [cart.items]);

  const handleLogout = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  return (
    <Fragment>
      <Head>
        <title>{title ? title + "- amazonlite" : "amazonlite"} </title>
        <meta name="description" content="E-Commerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <a className="text-2xl font-black">amazonlite</a>
            </Link>
            <div>
              <Link href="/cart">
                <a className="p-2">
                  Cart
                  {cartCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </a>
              </Link>
              <UserMenu
                status={status}
                user={session?.user}
                handleLogout={handleLogout}
              />
            </div>
          </nav>
        </header>
        <main className="container px-4 mt-4 mb-auto mr-auto ml-0">
          {children}
        </main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © 2022 amazonlite</p>
        </footer>
      </div>
    </Fragment>
  );
};

Layout.displayName = "Layout";
