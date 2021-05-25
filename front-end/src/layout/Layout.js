import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";


function Layout() {
  return (
    <div className="container-fluid">
      <div className="row min-vh-100 flex-md-row">
        <div className="bg-dark fixed-bottom side-bar">
          <Menu />
        </div>
        <div className="col ml-md-5 bg-dark">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;