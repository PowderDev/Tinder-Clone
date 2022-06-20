import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAppDispatch } from "../../helpers/hooks";
import { logout } from "../../store/actions/auth";
import { clearMe } from "../../store/slices/user";
import { User } from "../../types/user";

const UserAvatar: React.FC<{ user: User }> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onLogout = async () => {
    await logout();
    dispatch(clearMe());
    router.push("/login");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="block h-14 w-14 rounded-full overflow-hidden focus:outline-none"
      >
        <Image width="50" height="50" src={user.photoURL} alt="" />
      </button>
      <div className={`dropdown ${open ? "block" : "hidden"} z-30`}>
        <div className="dropdown__item">Change Avatar</div>
        <div className="dropdown__item" onClick={onLogout}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default UserAvatar;
