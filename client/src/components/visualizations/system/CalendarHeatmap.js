import React from "react";
import { ResponsiveCalendar } from "@nivo/calendar";

export default function CalendarHeatmap(props) {
  const { calendarData } = props

  return (
    <div style={{ height: "375px" }}>
    {calendarData ?
      <ResponsiveCalendar
        data={calendarData}
        from="2019-01-01"
        to="2019-12-31"
        emptyColor="#eeeeee"
        colors={["#E1F2FF", "#E1F2FF", "#91D1FF", "#42B0FF", "#0482DD", "#002F50"]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
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
      : null}
    </div>
  );
}
