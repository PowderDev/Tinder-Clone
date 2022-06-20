import { useRouter } from "next/router";
import React from "react";
import ImageSlider from "react-simple-image-slider";
import { useAppDispatch, useAppSelector } from "../../helpers/hooks";
import { createChat } from "../../store/actions/messenger";
import { setCurrentChat } from "../../store/slices/messenger";
import Loading from "../Loading";
import chroma from "chroma-js";
import { BsX } from "react-icons/bs";

const CardDetails: React.FC<{ setOpen: (v: boolean) => void }> = ({ setOpen }) => {
  const { currentExhibit } = useAppSelector((store) => store.exhibit);
  const { user } = useAppSelector((store) => store.user);
  const { currentChat } = useAppSelector((store) => store.messenger);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onButtonClick = async () => {
    const pd = [user.id, currentExhibit.user.id];
    if (!currentChat.id || !currentChat.participantIds.every((val) => pd.includes(val))) {
      const chat = await createChat(currentExhibit.user.id);
      if (chat) {
        dispatch(setCurrentChat(chat));
        setOpen(false);
        router.push("/messenger");
      }
    } else {
      router.push("/messenger");
    }
  };

  return (
    <div className="card-description py-6 md:py-0">
      <BsX
        className="absolute top-2 right-2 text-5xl md:hidden z-40"
        onClick={() => setOpen(false)}
      />

      {!currentExhibit.id && <Loading height={100} width={100} />}
      {currentExhibit.id && (
        <>
          <ImageSlider
            images={currentExhibit.photoURLs}
            height={400}
            width={400}
            showBullets
            showNavs
            navMargin={0}
          />

          <div className="name">
            <figure>
              {currentExhibit.user.firstName} {currentExhibit.user.lastName}{" "}
              {currentExhibit.user.age}
            </figure>
            <button onClick={onButtonClick}>
              Text {currentExhibit.user.sex === "MALE" ? "him" : "her"}
            </button>
          </div>

          {currentExhibit.tags?.length > 0 && (
            <div className="tags">
              {currentExhibit.tags.map((tag) => (
                <figure
                  className={`${
                    chroma.contrast(tag.color, "#000") > 10 ? "text-black" : "text-white"
                  }`}
                  key={tag.id}
                  style={{ background: tag.color }}
                >
                  {tag.name}
                </figure>
              ))}
            </div>
          )}

          <p className="break-words mx-6">{currentExhibit.description}</p>
        </>
      )}
    </div>
  );
};

export default CardDetails;
