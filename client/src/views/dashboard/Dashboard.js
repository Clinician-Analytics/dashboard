import React, { useState } from "react";
import CalendarHeatmap from "../../components/visualizations/system/CalendarHeatmap";
import axios from "axios";
import { Button } from "@material-ui/core";
// import { getProfileByPNumber } from "../../actions/profile";

// const Dashboard = ({
//   getProfileByPNumber,
//   auth: { p_number },
//   profile: { profile, loading }
// }) => {
//   useEffect(() => {
//     getProfileByPNumber();
//   }, [getProfileByPNumber]);

//   return loading && profile == null

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
    const res = await axios.post("/clinician-test/");
    setData(res.data);
    console.log(data);
  };

  return (
    <div>
      <h1>Clinician View Test</h1>
      <Button variant="contained" color="secondary" onClick={handleGetData}>
        Get Individual Report
      </Button>
      <span>{loading ? "Loading Data..." : null}</span>
      {data ? (
        <>
          <h3>Total Call Volume by Day</h3>
          <CalendarHeatmap calendarData={data.heatmapData} />
        </>
      ) : null}
    </div>
  );
}
