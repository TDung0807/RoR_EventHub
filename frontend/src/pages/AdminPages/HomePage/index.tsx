import { upcomingEvent } from "../../../mockdata/event";
import { bannerBackGround } from "../../../assets";
import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import { MainTable } from "../../../components";
import { useQuery } from "react-query";
import { getUpcomingEvent } from "../../../service/Event";
export function AdminHomePage() {
  const { data, error, isError, isLoading } = useQuery(
    ["events"],
    getUpcomingEvent
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
        <section className={styles.eventsSection}>
          <h2>Upcoming event</h2>
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
