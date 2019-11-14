import React from "react";
import { ResponsiveCalendar } from "@nivo/calendar";

const calendarSettings = {
  theme: {
    fontSize: "18px",
    textColor: "black",
    fontWeight: "900"
  }
};

export default function CalendarHeatmap(props) {
  const { calendarData } = props;

  return (
    <div style={{ height: "450px" }}>
      {calendarData ? (
        <ResponsiveCalendar
          data={calendarData}
          from="2019-01-01"
          to="2019-12-31"
          emptyColor="#eeeeee"
          colors={[
            "#FFFFFF",
            "#E1F2FF",
            "#91D1FF",
            "#42B0FF",
            "#0482DD",
            "#002F50"
          ]}
          maxValue={60}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          theme={calendarSettings.theme}
          yearSpacing={40}
          monthBorderWidth={1}
          monthBorderColor="#808080"
          dayBorderWidth={4}
          dayBorderColor="#ffffff"
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: "right-to-left"
            }
          ]}
        />
      ) : null}
    </div>
  );
}
