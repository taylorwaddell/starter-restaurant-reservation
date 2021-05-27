import React from "react";
import { Link } from "react-router-dom";

import "./Menu.css";

function Menu() {
  return (
    <nav className="navibar">
      <ul className="navibar-navi">
        <li className="navi-item">
          <Link className="navi-link" to="/dashboard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fa-primary fa-secondary"
              style={{
                fill: "rgba(108, 117, 125, 1)",
                transform: "",
                msFilter: "",
              }}
            >
              <g className="fa-group">
                <path
                  fill="currentColor"
                  className="fa-primary"
                  d="M4 13h6c.552 0 1-.447 1-1V4c0-.553-.448-1-1-1H4C3.448 3 3 3.447 3 4v8C3 12.553 3.448 13 4 13zM3 20c0 .553.448 1 1 1h6c.552 0 1-.447 1-1v-4c0-.553-.448-1-1-1H4c-.552 0-1 .447-1 1V20zM13 20c0 .553.447 1 1 1h6c.553 0 1-.447 1-1v-7c0-.553-.447-1-1-1h-6c-.553 0-1 .447-1 1V20zM14 10h6c.553 0 1-.447 1-1V4c0-.553-.447-1-1-1h-6c-.553 0-1 .447-1 1v5C13 9.553 13.447 10 14 10z"
                ></path>
                <path
                  fill="currentColor"
                  className="fa-secondary"
                  d="M4 13h6c.552 0 1-.447 1-1V4c0-.553-.448-1-1-1H4C3.448 3 3 3.447 3 4v8C3 12.553 3.448 13 4 13zM3 20c0 .553.448 1 1 1h6c.552 0 1-.447 1-1v-4c0-.553-.448-1-1-1H4c-.552 0-1 .447-1 1V20zM13 20c0 .553.447 1 1 1h6c.553 0 1-.447 1-1v-7c0-.553-.447-1-1-1h-6c-.553 0-1 .447-1 1V20zM14 10h6c.553 0 1-.447 1-1V4c0-.553-.447-1-1-1h-6c-.553 0-1 .447-1 1v5C13 9.553 13.447 10 14 10z"
                ></path>
              </g>
            </svg>
            <span className="link-text">Dashboard</span>
          </Link>
        </li>
        <li className="navi-item">
          <Link className="navi-link" to="/search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fa-primary fa-secondary"
              style={{
                fill: "rgba(108, 117, 125, 1)",
                transform: "",
                msFilter: "",
              }}
            >
              <g className="fa-group">
                <path
                  fill="currentColor"
                  className="fa-primary"
                  d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"
                ></path>
                <path
                  fill="currentColor"
                  className="fa-primary"
                  d="M11.412,8.586C11.791,8.966,12,9.468,12,10h2c0-1.065-0.416-2.069-1.174-2.828c-1.514-1.512-4.139-1.512-5.652,0 l1.412,1.416C9.346,7.83,10.656,7.832,11.412,8.586z"
                ></path>
                <path
                  fill="currentColor"
                  className="fa-secondary"
                  d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"
                ></path>
                <path
                  fill="currentColor"
                  className="fa-secondary"
                  d="M11.412,8.586C11.791,8.966,12,9.468,12,10h2c0-1.065-0.416-2.069-1.174-2.828c-1.514-1.512-4.139-1.512-5.652,0 l1.412,1.416C9.346,7.83,10.656,7.832,11.412,8.586z"
                ></path>
              </g>
            </svg>
            <span className="link-text">Search</span>
          </Link>
        </li>
        <li className="navi-item">
          <Link className="navi-link" to="/reservations/new">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fa-primary fa-secondary"
              style={{
                fill: "rgba(108, 117, 125, 1)",
                transform: "",
                msFilter: "",
              }}
            >
              <g className="fa-group">
                <path
                  fill="currentColor"
                  className="fa-primary"
                  d="M6.012,18H19h1h1v-1v-2V4c0-1.103-0.897-2-2-2H6C4.794,2,3,2.799,3,5v3v6v3v2c0,2.201,1.794,3,3,3h15v-2H6.012 C5.55,19.988,5,19.806,5,19S5.55,18.012,6.012,18z M8,9h3V6h2v3h3v2h-3v3h-2v-3H8V9z"
                ></path>
                <path
                  fill="currentColor"
                  className="fa-secondary"
                  d="M6.012,18H19h1h1v-1v-2V4c0-1.103-0.897-2-2-2H6C4.794,2,3,2.799,3,5v3v6v3v2c0,2.201,1.794,3,3,3h15v-2H6.012 C5.55,19.988,5,19.806,5,19S5.55,18.012,6.012,18z M8,9h3V6h2v3h3v2h-3v3h-2v-3H8V9z"
                ></path>
              </g>
            </svg>
            <span className="link-text">Reservation</span>
          </Link>
        </li>
        <li className="navi-item">
          <Link className="navi-link" to="/tables/new">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fa-primary fa-secondary"
              style={{
                fill: "rgba(108, 117, 125, 1)",
                transform: "",
                msFilter: "",
              }}
            >
              <g className="fa-group">
                <path
                  fill="currentColor"
                  className="fa-primary"
                  d="M4,22h12v-2H4V8H2v12C2,21.103,2.897,22,4,22z"
                ></path>
                <path
                  fill="currentColor"
                  className="fa-primary"
                  d="M20,2H8C6.897,2,6,2.897,6,4v12c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2V4C22,2.897,21.103,2,20,2z M18,11h-3v3h-2v-3 h-3V9h3V6h2v3h3V11z"
                ></path>
                <path
                  fill="currentColor"
                  className="fa-secondary"
                  d="M4,22h12v-2H4V8H2v12C2,21.103,2.897,22,4,22z"
                ></path>
                <path
                  fill="currentColor"
                  className="fa-secondary"
                  d="M20,2H8C6.897,2,6,2.897,6,4v12c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2V4C22,2.897,21.103,2,20,2z M18,11h-3v3h-2v-3 h-3V9h3V6h2v3h3V11z"
                ></path>
              </g>
            </svg>
            <span className="link-text">Table</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
