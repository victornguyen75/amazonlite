import React from "react";
import Link from "next/link";

import { Layout } from "../../components";

export default function Login() {
  return (
    <Layout title="Login">
      <form className="mx-auto max-w-screen-md">
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="w-full outline outline-1"
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="w-full outline outline-1"
            autoFocus
          />
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
