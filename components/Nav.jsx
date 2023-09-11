"use client"; // hooks are client-side functionality, so the component needs to be marked as 'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const {data: session} = useSession()

  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [providers, setProviders] = useState(null);

  // sign in useffect
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">CommandLand</p>
      </Link>

      {/**Desktop navigation */}
      <div className="sm:flex hidden">
        {/**If user is logged in show a div with this elements: */}
        {session?.user ? (
          <div className="flex gap-5 md:gap-5">
            {/**Create post button */}
            <Link href="/create-prompt" className="black_btn">
              Crear Nuevo Post
            </Link>

            {/**Log out button */}
            <button type="button" onClick={signOut} className="outline_btn">
              Cerrar Sesión
            </button>

            {/**Profile image */}
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {/* If user is not logged in show a button to sign in: */}
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Iniciar Sesión
                </button>
              ))}
          </>
        )}
      </div>

      {/**Mobile navigation (only shown on sm) */}
      <div className="sm:hidden flex relative">
        {/**If user is logged in: */}
        {session?.user ? (
          <div className="flex">
            {/**Profile image */}
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              // sets the state of the dropdown menu to true/false, negating the previous state to switch it
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
            />
            {/**If toggleDropdown is true, render a div with user profile and create prompt links and lgout button */}
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Perfil de Usuario
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Crear Nuevo Post
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* If user is not logged in show a button to sign in: */}
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Iniciar Sesión
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
