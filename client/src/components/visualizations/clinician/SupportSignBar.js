import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const barSettings = {
  theme: {
    fontSize: "14px",
    textColor: "black",
    fontWeight: "900"
  }
};

export default function SupportSignBar(props) {
  const { support_signs } = props;
  return (
    <div style={{ height: "600px" }}>
      {support_signs ? (
        <ResponsiveBar
          data={support_signs}
          keys={["count"]}
          indexBy="_id"
          margin={{ top: 50, right: 50, bottom: 50, left: 350 }}
          theme={barSettings.theme}
          padding={0.3}
          layout="horizontal"
          colors={{ scheme: "dark2" }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Count",
            legendPosition: "middle",
            legendOffset: 32
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,

            legendPosition: "middle",
            legendOffset: -40
          }}
          labelSkipWidth={16}
          labelSkipHeight={16}
          labelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "center",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      ) : null}
    </div>
  );
}
