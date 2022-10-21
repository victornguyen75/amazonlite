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
import { useSession } from "next-auth/react";

import { Store, Product } from "../utils";

interface LayoutProps {
  title: string;
  children: ReactNode;
}

export const Layout = ({ title, children }: LayoutProps) => {
  const { status, data: session } = useSession();

  const { state } = useContext(Store);
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

  const Username = useMemo(() => {
    if (status === "loading") {
      return "Loading";
    } else if (session?.user) {
      return session.user.name;
    } else {
      return (
        <Link href="/login">
          <a className="p-2">Login</a>
        </Link>
      );
    }
  }, [status, session]);

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
              <a className="text-lg font-bold">amazonlite</a>
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
              {Username}
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
