import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="div-a">
      <h1 className="large text-primary">Welcome to Quality Insights</h1>
      <p>
        This platform takes YOUR raw data generated through the EHR into
        meaningful and actionable information.{" "}
      </p>
      <p>
        Click on the clinician icon to view personalized analytics and the EMS
        icon to view system analytics.
      </p>
      <div className="gallery">
        <ul>
          <li>
            <Link to="/clinician-view">
              <img src="images/paramedic_icon.png" alt="clinician_logo" />
            </Link>
          </li>
        </ul>
        <div className="gallery">
          <ul>
            <li>
              <Link to="/system-view">
                <img src="images/temp_logo.png" alt="system_logo" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
