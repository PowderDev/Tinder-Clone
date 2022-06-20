import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import CardList from "../components/CardList";
import { getMyFeed } from "../store/actions/exhibit";
import HOC from "../components/HOC";
import { Exhibit } from "../types/exhibit";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const [exhibits, setExhibits] = useState([] as Exhibit[]);
  const { userLoading } = useAppSelector((store) => store.user);

  useEffect(() => {
    if (!userLoading) {
      getMyFeed().then((feed) => {
        if (feed) setExhibits(feed);
      });
    }
  }, [dispatch, userLoading]);

  return (
    <HOC className="h-[100vh] overflow-hidden">
      <Navbar />
      <CardList exhibits={exhibits} />
    </HOC>
  );
};

export default Home;
