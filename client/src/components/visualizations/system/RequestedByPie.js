import React from "react";
import { ResponsivePie } from "@nivo/pie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export default function MyResponsivePie(props) {
  const { requestedByData } = props;
  return (
    <div style={{ height: "425 px" }}>
      {requestedByData ? (
        <ResponsivePie
          data={requestedByData}
          margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
          pixelRatio={1}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ scheme: "paired" }}
          borderColor={{ from: "color", modifiers: [["darker", 0.6]] }}
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={6}
          radialLabelsTextColor="#333333"
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={16}
          radialLabelsLinkHorizontalLength={24}
          radialLabelsLinkStrokeWidth={1}
          radialLabelsLinkColor={{ from: "color" }}
          slicesLabelsSkipAngle={10}
          slicesLabelsTextColor="#333333"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10
            }
          ]}
          fill={[
            {
              match: {
                id: "Home Health Care Provider"
              },
              id: "dots"
            },
            {
              match: {
                id: "Other"
              },
              id: "dots"
            },
            {
              match: {
                id: "Family"
              },
              id: "dots"
            },
            {
              match: {
                id: ""
              },
              id: "dots"
            },
            {
              match: {
                id: "Physician"
              },
              id: "lines"
            },
            {
              match: {
                id: "Law Enforcement"
              },
              id: "lines"
            },
            {
              match: {
                id: "Other Healthcare Provider"
              },
              id: "lines"
            },
            {
              match: {
                id: "NH Staff"
              },
              id: "lines"
            },
            {
              match: {
                id: "Fire Department"
              },
              id: "lines"
            },
            {
              match: {
                id: "Bystander"
              },
              id: "lines"
            },
            {
              match: {
                _id: "Patient"
              },
              id: "lines"
            }
          ]}
          legends={[
            {
              anchor: "right",
              direction: "column",
              translateX: 140,
              itemWidth: 60,
              itemHeight: 14,
              itemsSpacing: 2,
              symbolSize: 14,
              symbolShape: "circle"
            }
          ]}
        />
      ) : null}
    </div>
  );
}
