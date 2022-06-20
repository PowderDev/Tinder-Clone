import React, { useEffect, useState } from "react";
import { getAllTags, getMyExhibit } from "../../store/actions/exhibit";
import { Tag, Exhibit } from "../../types/exhibit";
import ExhibitForm from "./Form";

const Exhibit = () => {
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [myExhibit, setMyExhibit] = useState<Exhibit | null>(null);

  useEffect(() => {
    getMyExhibit().then((exhibit) => {
      if (exhibit) setMyExhibit(exhibit);
      getAllTags().then((tags) => {
        if (tags) setAllTags(tags);
      });
    });
  }, []);

  return <ExhibitForm allTags={allTags} myExhibit={myExhibit} />;
};

export default Exhibit;
