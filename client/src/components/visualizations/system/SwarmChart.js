import React from "react";
import { swarmData } from "../../../formData/swarmData";
import { ResponsiveSwarmPlot } from "@nivo/swarmplot";

export default function MyResponsiveSwarmPlot() {
  return (
    <div style={{ height: "600px " }}>
      <ResponsiveSwarmPlot
        data={swarmData}
        groups={["ALS", "BLS"]}
        value="volume"
        valueScale={{ type: "linear", min: 0, max: 1500 }}
        size={{ key: "price", values: [2, 8], sizes: [2, 6] }}
        forceStrength={4}
        simulationIterations={100}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.6], ["opacity", 0.5]]
        }}
        margin={{ top: 80, right: 100, bottom: 80, left: 100 }}
        axisTop={{
          orient: "top",
          tickSize: 10,
          tickPadding: 5,
          tickRotation: 0,
          legend: "group if vertical, price if horizontal",
          legendPosition: "middle",
          legendOffset: -46
        }}
        axisRight={{
          orient: "right",
          tickSize: 10,
          tickPadding: 5,
          tickRotation: 0,
          legend: "price if vertical, group if horizontal",
          legendPosition: "middle",
          legendOffset: 76
        }}
        axisBottom={{
          orient: "bottom",
          tickSize: 10,
          tickPadding: 5,
          tickRotation: 0,
          legend: "group if vertical, price if horizontal",
          legendPosition: "middle",
          legendOffset: 46
        }}
        axisLeft={{
          orient: "left",
          tickSize: 10,
          tickPadding: 5,
          tickRotation: 0,
          legend: "price if vertical, group if horizontal",
          legendPosition: "middle",
          legendOffset: -76
        }}
        motionStiffness={50}
        motionDamping={10}
      />
    </div>
  );
}
