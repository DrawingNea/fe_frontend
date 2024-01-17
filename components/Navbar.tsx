"use client";
import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const userId = localStorage.getItem("contact-id");
  return (
    <header className="w-full z-10 sticky top-0 bg-gray-950 text-white shadow-md">
      <nav className="max-w-[1440px] mx-auto sm:px-16 px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/vercel.svg"
            width={115}
            height={43}
            alt="logo"
            className="object-contain invert"
          />
        </Link>
        <ul className=" flex gap-7 text-small items-center">
          {NavLinks.map((link) => (
            <Link href={link.href!} key={link.key} className="">
              {link.text}
            </Link>
          ))}
          {userId ? (
            <Link href={`/profile/${userId}`} key={userId} className="">
              My Profile
            </Link>
          ) : (
            <Link href={`/`} key="Sign In" className="">
              Sign In
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
