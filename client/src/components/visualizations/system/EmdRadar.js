import React from "react";
import { ResponsiveRadar } from "@nivo/radar";
import { radarData } from "../../../formData/nextradarData";

const radarSettings = {
  theme: {
    fontSize: "14px",
    textColor: "black",
    fontWeight: "900"
  }
};

export default function CallTypeRadar() {
  // const { radarData } = props;
  return (
    <div style={{ height: "400px" }}>
      <ResponsiveRadar
        data={radarData}
        keys={["ALS", "BLS"]}
        indexBy="disposition"
        maxValue="auto"
        margin={{ top: 70, right: 80, bottom: 60, left: 80 }}
        theme={radarSettings.theme}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: "color" }}
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={30}
        enableDots={true}
        dotSize={10}
        dotColor={{ theme: "background" }}
        dotBorderWidth={2}
        dotBorderColor={{ from: "color" }}
        enableDotLabel={false}
        dotLabel="value"
        dotLabelYOffset={-12}
        colors={{ scheme: "category10" }}
        fillOpacity={0.05}
        blendMode="normal"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        isInteractive={true}
        legends={[
          {
            anchor: "top-left",
            direction: "column",
            translateX: -50,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: "#999",
            symbolSize: 16,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000"
                }
              }
            ]
          }
        ]}
      />
    </div>
  );
}
