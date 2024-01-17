import { NavLinks } from "@/constants";
import { fetchUser } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
  const {contact} = await fetchUser();
  return (
    <header className="w-full z-10 sticky top-0 bg-gray-950 text-white shadow-md h-16">
      <nav className="max-w-[1440px] mx-auto sm:px-16 px-6 h-full py-4 flex justify-between items-center">
        <>
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
            {contact? (
              <Link href={`/profile/${contact.id}`} key={contact.id} className="">
                My Profile
              </Link>
            ) : (
              <Link href={`/`} key="Sign In" className="">
                Sign In
              </Link>
            )}
          </ul>
        </>
      </nav>
    </header>
  );
};

export default Navbar;
