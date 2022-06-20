import React, { useState } from "react";
import Image from "next/image";
import UserAvatar from "./UserAvatar";
import { useAppSelector } from "../../helpers/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsBell, BsList } from "react-icons/bs";

const Navbar = () => {
  const { user } = useAppSelector((store) => store.user);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <nav className="h-[10vh]">
      <ul>
        <Link href={"/"} passHref>
          <li className="nav__logo cursor-pointer">
            <Image
              src="https://vectorified.com/image/tinder-logo-vector-6.png"
              width="100"
              height="60"
              alt=""
            />
            <figure>Tinder</figure>
          </li>
        </Link>
        <li className="nav__right-side">
          <div className="hidden sm:block">
            {router.pathname !== "/my/exhibit" && (
              <Link href={"/my/exhibit"} passHref>
                <button className="nav__button bg-purple-800">My Exhibit</button>
              </Link>
            )}
            {router.pathname !== "/messenger" && (
              <Link href={"/messenger"} passHref>
                <button className="nav__button">Messenger</button>
              </Link>
            )}
            {router.pathname !== "/my/notifications" && (
              <Link href={"/my/notifications"} passHref>
                <button className="nav__button">
                  <BsBell />
                </button>
              </Link>
            )}
          </div>
          <BsList className="text-4xl ml-6 sm:hidden" onClick={() => setOpen(!open)} />
          <div
            className={`sm:hidden dropdown top-12 z-30 !py-0 left-2/4 ${open ? "block" : "hidden"}`}
          >
            {router.pathname !== "my/exhibit" && (
              <Link href={"/my/exhibit"} passHref>
                <button className="nav__button w-full bg-purple-800 dropdown__item">
                  My Exhibit
                </button>
              </Link>
            )}
            {router.pathname !== "/messenger" && (
              <Link href={"/messenger"} passHref>
                <button className="nav__button w-full mt-2 dropdown__item">Messenger</button>
              </Link>
            )}
            {router.pathname !== "/my/notifications" && (
              <Link href={"/my/notifications"} passHref>
                <button className="nav__button w-full mt-2 dropdown__item">
                  <BsBell className="m-auto" />
                </button>
              </Link>
            )}
          </div>
          {user.id && <UserAvatar user={user} />}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
