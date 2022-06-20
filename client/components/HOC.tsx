import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import { getMe } from "../store/actions/user";
import { setMe, setUserLoading } from "../store/slices/user";

const HOC: React.FC<{ className?: string }> = ({ children, className }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((store) => store.user);

  useEffect(() => {
    if (localStorage.getItem("token") && !user.id) {
      dispatch(setUserLoading(true));
      getMe()
        .then((user) => {
          if (user) dispatch(setMe(user));
          else router.push("/login");
        })
        .finally(() => {
          dispatch(setUserLoading(false));
        });
    } else if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, [dispatch, router, user]);

  return <main className={className}>{children}</main>;
};

export default HOC;
