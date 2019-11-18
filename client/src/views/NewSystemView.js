import React, { useState } from "react";
import CalendarHeatmap from "../components/visualizations/system/CalendarHeatmap";
import CallTypeRadar from "../components/visualizations/clinician/CallTypeRadar";
import AreaBumpChart from "../components/visualizations/system/AreaBumpChart";
import TimeAreaBumpChart from "../components/visualizations/system/TimeAreaBumpChart";
import EmdRadar from "../components/visualizations/system/EmdRadar";
import LineChart from "../components/visualizations/system/LineChart";
import ShiftChart from "../components/visualizations/system/ShiftChart";
import TimeUnit from "../components/visualizations/system/TimeUnit";
import axios from "axios";
import { Button } from "@material-ui/core";

export default function SystemData(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const heatGetData = async () => {
    handleLoading();
    const res = await axios.post("/incidents/heatmap_all");
    setData(res.data);
    console.log(data);
  };

  return (
    <div className="div-a">
      <h1>Orange County EMS Analytics</h1>
      <Button variant="contained" color="secondary" onClick={heatGetData}>
        Annual Operational
      </Button>
      <span>{loading ? "Loading Data..." : null}</span>
      {data ? (
        <>
          <h2>Total Call Volume by Day</h2>
          <p>
            The time series heat map displays the call volume per day. Days with
            higher call volume are displayed with a darker color.
          </p>
          <p>
            The month starts at the top left and going vertically (down). Use
            the mouseover function to see more details.
          </p>
          <CalendarHeatmap calendarData={data.heatmapData_all} />
          <h2>Total Call Volume by Unit</h2>
          <p>
            The line chart below shows the total call volume by unit from
            Quarter 1 of 2018 through Quarter 3 of 2019
          </p>
          <LineChart />
          <h2>Total Call Volume by Unit Over a 24 hour Period (2019)</h2>
          <p>
            The sankey chart displays the rank of the unit by call in volume in
            so far in 2019 over a 24 hour period. The units are ranked on the
            y-axis with the width of the sankey displaying the total call
            volume.Use the tooltip for more details.
          </p>
          <TimeAreaBumpChart />
          <h2>Ranking of Unit by Total Call Volume</h2>
          <p>
            The sankey chart displays the rank of the unit by total call volume
            quarterly from 2018-present. Use the tooltip for more details.
          </p>
          <AreaBumpChart />
          <h2>Total Call Volume by Shift</h2>
          <p>
            The line chart below shows the total call volume by shift from
            Quarter 1 of 2018 through Quarter 3 of 2019
          </p>
          <ShiftChart />
          <h2>Average Time of Call with Patient Contact Only</h2>
          <p>
            Displays the average time (minutes) of calls where patient contact
            was made.
          </p>
          <TimeUnit />
          <h2>Radar Chart</h2>
          <p>
            Displays a comparison of a patients' disposition (ALS/BLS) with the
            provider chosen primary impression (i.e. chest pain). Includes the
            top 8 primary impressions, data from 2018-present, and excludes
            blanks.
          </p>
          <CallTypeRadar />
          <p>
            Displays a comparison of a patients' disposition (ALS/BLS) with the
            EMD Complaint (i.e. Fall).Includes the top 8 EMD codes, includes
            data from 2018-present, and excludes blanks.
          </p>
          <EmdRadar />
        </>
      ) : null}
    </div>
  );
}
