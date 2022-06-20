import Image from "next/image";
import React, { useRef } from "react";
import TinderCard from "react-tinder-card";
import { createNotification } from "../../store/actions/notification";
import { User } from "../../types/user";
import { BsArrowLeft, BsArrowRight, BsExclamation } from "react-icons/bs";

interface Props {
  id: number;
  user: User;
  setDetailsId: (id: number) => void;
}

interface CardRef {
  swipe: (v: string | undefined) => Promise<void>;
  restoreCard: () => Promise<void>;
}

const Card: React.FC<Props> = ({ user, setDetailsId, id }) => {
  const cardRef = useRef({} as CardRef);

  const onSwipe = async (dir: string) => {
    if (dir === "right") {
      await createNotification(user.id);
    }
  };

  const controlButtonHandler = (dir?: string) => {
    if (dir) {
      cardRef.current.swipe(dir);
    } else {
      setDetailsId(id);
    }
  };

  return (
    <>
      <TinderCard ref={cardRef} preventSwipe={["up", "down"]} onSwipe={onSwipe}>
        <div onDoubleClick={() => setDetailsId(id)} className="card">
          <Image src={user.photoURL} width={500} height={500} className="rounded-t-3xl bg-cover" />
          <figure className="text-center text-2xl">
            {user.firstName} {user.lastName} {user.age}
          </figure>
        </div>
      </TinderCard>
      <div className="flex items-center justify-around sm:justify-between mt-10">
        <button
          onClick={() => controlButtonHandler("left")}
          className="p-4 rounded-full bg-red-500 active:scale-90"
        >
          <BsArrowLeft className="text-4xl" />
        </button>
        <button
          onClick={() => controlButtonHandler()}
          className="p-4 rounded-full bg-blue-500 active:scale-90"
        >
          <BsExclamation className="text-5xl" />
        </button>
        <button
          onClick={() => controlButtonHandler("right")}
          className="p-4 rounded-full bg-green-500 active:scale-90"
        >
          <BsArrowRight className="text-4xl" />
        </button>
      </div>
    </>
  );
};

export default Card;
