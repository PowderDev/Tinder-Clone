import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import CardDetails from "./CardDetails";
import { Dialog } from "@headlessui/react";
import { useAppDispatch } from "../../helpers/hooks";
import { getExhibitById } from "../../store/actions/exhibit";
import { setCurrentExhibit } from "../../store/slices/exhibit";
import gsap from "gsap";
import { Exhibit } from "../../types/exhibit";

interface Props {
  exhibits: Exhibit[];
}

const CardList: React.FC<Props> = ({ exhibits }) => {
  const [open, setOpen] = useState(false);
  const [detailsId, setDetailsId] = useState<null | number>(null);
  const dispatch = useAppDispatch();
  const modalRef = useRef({} as HTMLDivElement);

  useEffect(() => {
    if (open && modalRef.current) {
      gsap.fromTo(modalRef.current, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1 });
    }
  }, [open]);

  useEffect(() => {
    if (detailsId) {
      getExhibitById(detailsId).then((details) => {
        if (details) dispatch(setCurrentExhibit(details));
      });
    }
  }, [detailsId, dispatch]);

  const onSetDetailsId = (id: number) => {
    setDetailsId(id);
    setOpen(true);
  };

  const onClose = async () => {
    if (open && modalRef.current) {
      await gsap.to(modalRef.current, { scale: 0.7, opacity: 0 });
      setOpen(false);
    }
  };

  return (
    <>
      <div className="card-list-container">
        <div className="card-list">
          {exhibits &&
            exhibits.map(({ user, id }) => (
              <Card setDetailsId={onSetDetailsId} user={user} id={id} key={id} />
            ))}
        </div>
        <div className="hidden sm:block ">
          <p>Double click to see details</p>
          <p>{"❌<<< SWIPE >>>💘"}</p>
        </div>
      </div>
      <Dialog ref={modalRef} open={open} onClose={onClose} className="card-modal">
        <Dialog.Overlay />
        <CardDetails setOpen={setOpen} />
      </Dialog>
    </>
  );
};

export default CardList;
