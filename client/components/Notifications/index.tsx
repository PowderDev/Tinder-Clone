import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsHeartFill, BsX, BsHeart, BsEnvelope } from "react-icons/bs";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import gsap from "gsap";
import { Notification } from "../../types/notification";
import {
  createNotification,
  deleteNotification,
  dislikeNotification,
} from "../../store/actions/notification";
import { useAppDispatch, useAppSelector } from "../../helpers/hooks";
import { useRouter } from "next/router";
import { createChat } from "../../store/actions/messenger";
import { setCurrentChat } from "../../store/slices/messenger";

interface Props {
  notifications: {
    my: Notification[];
    likedNotifs: Notification[];
  };
  setNotifications: (v: any) => void;
}

const NotificationsContainer: React.FC<Props> = ({ notifications, setNotifications }) => {
  const [liked, setLiked] = useState([] as Array<number>);
  const { currentChat } = useAppSelector((store) => store.messenger);
  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (notifications.likedNotifs) {
      setLiked((prev) => [...prev, ...notifications.likedNotifs.map((v) => v.fromId)]);
    }
  }, [notifications.likedNotifs]);

  let n = 1;

  const enter = (node: Element) => {
    gsap.fromTo(node, { x: n % 2 == 0 ? "100%" : "-100%" }, { duration: 1, x: 0 });
    n++;
  };

  const exit = (node: Element) => {
    gsap.to(node, { duration: 1, x: n % 2 == 0 ? "100%" : "-100%" });
    n--;
  };

  const like = async (n: Notification, v: boolean) => {
    if (v) {
      await createNotification(n.fromId);
      setLiked((prev) => [...prev, n.fromId]);
    } else {
      await dislikeNotification(n.id);
      setLiked((prev) => prev.filter((id) => id != n.fromId));
    }
  };

  const onDelete = async (id: number) => {
    await deleteNotification(id);
    setNotifications({
      my: notifications.my.filter((n) => n.id != id),
      likedNotifs: notifications.likedNotifs,
    });
  };

  const onEnvelopeClick = async (toId: number) => {
    const pd = [user.id, toId];
    if (!currentChat.id || !currentChat.participantIds.every((val) => pd.includes(val))) {
      const chat = await createChat(toId);
      if (chat) {
        dispatch(setCurrentChat(chat));
        router.push("/messenger");
      }
    } else {
      router.push("/messenger");
    }
  };

  return (
    <div className="md:w-[840px] md:mt-6 mt-12 m-auto overflow-y-auto h-[80vh] shadow-2xl rounded-md overflow-x-hidden">
      <TransitionGroup as="ul">
        {notifications.my &&
          notifications.my.map((n) => (
            <CSSTransition key={n.id} timeout={1000} onEnter={enter} onExit={exit}>
              <li className="border-1 border-gray-400 rounded flex w-full items-center justify-between px-4 md:px-10 mt-1">
                <Image src={n.from.photoURL} width={70} height={70} className="rounded-full" />
                <div className="flex flex-col sm:flex-row sm:gap-2 sm:text-bold text-lg">
                  <figure>{n.from.firstName}</figure>
                  <figure>
                    {n.from.lastName} {n.from.age}
                  </figure>
                </div>
                <div className="flex items-center gap-4">
                  {liked.includes(n.toId) ? (
                    <BsHeartFill
                      onClick={() => like(n, false)}
                      className="text-red-500 text-3xl active:scale-90 cursor-pointer"
                    />
                  ) : (
                    <BsHeart
                      onClick={() => like(n, true)}
                      className="text-red-500 text-3xl active:scale-90 cursor-pointer"
                    />
                  )}

                  <BsX
                    onClick={() => onDelete(n.id)}
                    className="text-slate-900-500 text-5xl cursor-pointer"
                  />
                  <BsEnvelope
                    onClick={() => onEnvelopeClick(n.fromId)}
                    className="text-blue-500 text-4xl cursor-pointer"
                  />
                </div>
              </li>
            </CSSTransition>
          ))}
      </TransitionGroup>
    </div>
  );
};

export default NotificationsContainer;
