import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC";
import Navbar from "../../components/Navbar";
import NotificationsContainer from "../../components/Notifications";
import { getMyNotifications } from "../../store/actions/notification";
import { Notification } from "../../types/notification";

const Notifications = () => {
  const [notifications, setNotifications] = useState(
    {} as { my: Notification[]; likedNotifs: Notification[] }
  );

  useEffect(() => {
    getMyNotifications().then((notifs) => {
      if (notifs) setNotifications({ my: notifs.myNotifications, likedNotifs: notifs.liked });
    });
  }, []);

  return (
    <HOC>
      <Navbar />
      <NotificationsContainer setNotifications={setNotifications} notifications={notifications} />
    </HOC>
  );
};

export default Notifications;
