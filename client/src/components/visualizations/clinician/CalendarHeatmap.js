import React, { useState, useEffect } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import axios from "axios";
// import { calendarData } from "../../../formData/calendarData"

export default function CalendarHeatmap() {
  const [calendarData, setCalendarData] = useState(null)

  useEffect(() => {
    const handleGetData = async () => {
      const res = await axios.post("/reports/annual-reports")
      setCalendarData(res.data.heatmapData)
      console.log(res.data.heatmapData)
      console.log(calendarData)
    }
    handleGetData()
  }, [])

  return (
    <div style={{ height: "350px" }}>
    {calendarData ?
      <ResponsiveCalendar
        data={calendarData}
        from="2019-01-01"
        to="2019-12-31"
        emptyColor="#eeeeee"
        colors={["#A4A4A4", "#E1F2FF", "#91D1FF", "#42B0FF", "#0482DD", "#002F50"]}
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
