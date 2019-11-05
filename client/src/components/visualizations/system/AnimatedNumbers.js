import React from "react";
import prettyBytes from "pretty-bytes";
import AnimatedNumber from "react-animated-number";

export default function AnimatedNumbers(props) {
  const { CalendarStat18 } = props;
  return (
    <div style={{ marginTop: 50 }}>
      {CalendarStat18 ? (
        <AnimatedNumber
          style={{
            transition: "0.8s ease-out",
            fontSize: 48,
            transitionProperty: "background-color, color, opacity"
          }}
          frameStyle={perc => (perc === 100 ? {} : { opacity: 0.25 })}
          duration={300}
          value={CalendarStat18}
          component="text"
          formatValue={n => prettyBytes(n)}
        />
      ) : null}
    </div>
  );
}
