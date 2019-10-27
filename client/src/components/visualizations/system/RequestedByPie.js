import React from "react";
import { ResponsivePie } from "@nivo/pie";

export default function MyResponsivePie(props) {
  const { requestedBy } = props;
  return (
    <div style={{ height: "550px" }}>
      <ResponsivePie
        data={requestedBy}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        padAngle={0.7}
        colors={{ scheme: "set1" }}
        borderColor={{ from: "color", modifiers: [["darker", "0.2"]] }}
        radialLabelsSkipAngle={15}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={4}
        radialLabelsLinkColor={{ from: "color", modifiers: [] }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
}
