import { upcomingEvent } from "../../../mockdata/event";
import { bannerBackGround } from "../../../assets";
import React, { useEffect, useState } from "react";
import styles from "./UserPage.module.scss";
import { MainTable } from "../../../components";
import { useQuery } from "react-query";
import { getEventsByUserId } from "../../../service/Event";
import { useAccountAuthetication } from "../../../store";

export function UserHomePage() {
  const userId = useAccountAuthetication((state) => state.userId);
  const { data, error, isError, isLoading } = useQuery(
    ["events", userId],
    getEventsByUserId
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const upcomingEventsRows = [
    "Event",
    "Duration",
    "Location ",
    "Participants ",
  ];
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
  return (
    <div>
      <main className={styles.main}>
        <header
          style={{
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
            WELCOME TO CEH SYSTEM
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
