import { upcomingEvent } from "../../../mockdata/event";
import { bannerBackGround } from "../../../assets";
import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import { MainTable, GroupChoosingButton } from "../../../components";
import { useQuery } from "react-query";
import { getUpcomingEvent, getAllEvent } from "../../../service/Event";
export function AdminHomePage() {
  const changingBtn = ["Upcoming", "All"];
  const [activeButton, setActiveButton] = useState(changingBtn[0]);
  const { data, error, isError, isLoading } = useQuery(
    activeButton === "Upcoming" ? ["Upcomingevents"] : ["events"],
    activeButton === "Upcoming" ? getUpcomingEvent : getAllEvent,
    { staleTime: 0 }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  let upcomingEventRender;
  try {
    upcomingEventRender = data.data.events.map(
      ({
        date,
        description,
        endHour,
        groupLabel,
        startHour,
        updated_at,
        user_id,
        created_at,
        ...rest
      }) => {
        return { ...rest };
      }
    );
  } catch {
    upcomingEventRender = data.data.map(
      ({
        date,
        description,
        endHour,
        groupLabel,
        startHour,
        updated_at,
        user_id,
        created_at,
        ...rest
      }) => {
        return { ...rest };
      }
    );
  }

  const upcomingEventsRows = [
    "Event",
    "Duration",
    "Location ",
    "Participants ",
  ];

  return (
    <div>
      <main className={styles.main}>
        <header
          style={{
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${bannerBackGround.bannerHomePage})`,
            minHeight: 418,
            color: "white",
            textAlign: "center",
            borderRadius: 10,
          }}
        >
          <h1
            style={{
              paddingTop: 158,
              fontFamily: "Montserrat",
              fontSize: 64,
              fontWeight: 700,
            }}
          >
            WELCOME TO G&D SYSTEM
          </h1>
        </header>
        <GroupChoosingButton
          style={{
            marginTop: 12,
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: 10,
            overflow: "hidden",
            width: "fit-content",
          }}
          changingBtn={changingBtn}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />
        <section className={styles.eventsSection}>
          <h2>
            {activeButton == "Upcoming" ? "Upcoming event" : "All Events"}
          </h2>
          <MainTable
            utilityRows={upcomingEventsRows}
            utilityData={upcomingEventRender}
            action={null}
          />
        </section>
      </main>
    </div>
  );
}
