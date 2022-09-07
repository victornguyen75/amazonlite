import { ReactNode, Fragment } from "react";
import Head from "next/head";
import Link from "next/link";

interface LayoutProps {
  title: string;
  children: ReactNode;
}

export const Layout = ({ title, children }: LayoutProps) => {
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
                <a className="p-2">Cart</a>
              </Link>
              <Link href="/login">
                <a className="p-2">Login</a>
              </Link>
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
