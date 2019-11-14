import React, { useState } from "react";
import { Button } from "@material-ui/core";
import CalendarHeatmapClinician from "../components/visualizations/clinician/CalendarHeatmapClinician";
import CallVolumeByUnit from "../components/visualizations/system/CallVolumeByUnit";
import SupportSignBar from "../components/visualizations/clinician/SupportSignBar";
import axios from "axios";

export default function ClinicianView() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleGetData = async () => {
    handleLoading();
    const res = await axios.post("/clinicians/report");
    setData(res.data);
    console.log(data);
  };

  return (
    <div className="div-a">
      <h1>Clinician Analytics</h1>
      {/* <TextField id="pNumber" name="pNumber" onChange={handleChange} /> */}
      <Button variant="contained" color="secondary" onClick={handleGetData}>
        Get Annual Reports
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
          <CalendarHeatmapClinician calendarData={data.heatmapData_all} />
          <h2>Total Call Volume by Unit 2019</h2>
          <p>
            The bar chart displays the total call volume by the unit you worked
            in 2019.
          </p>
          <CallVolumeByUnit callVolumeByUnit={data.callVolumeByUnitData_19} />
          <h2>Support Sign 2019</h2>
          <p>
            The bar chart displays the signs and symptoms your patients
            exhibited in 2019. Categories with less than 3 patients were
            removed.
          </p>
          <SupportSignBar support_signs={data.support_signs} />
        </>
      ) : null}
    </div>
  );
}
