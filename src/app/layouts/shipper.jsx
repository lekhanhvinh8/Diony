import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./common/Navbars/Navbar";
import Sidebar from "./sidebar";
import routes from "../../routes";
import styles from "./jss/material-dashboard-react/layouts/adminStyle";
import bgImage from "./images/sidebar-2.jpg";
import logo from "./images/reactlogo.png";
import { loadCategories } from "../store/entities/categories";
import { loadSelectProperties } from "../store/entities/selectProperties";
import { useDispatch } from "react-redux";
import { initializeGird } from "../store/ui/categoriesPage";
import { loadTypingProperties } from "../store/entities/typingProperties";

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/shipper") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/shipper" to="/shipper/toPickup" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Shipper({ ...rest }) {
  const dispatch = useDispatch();

  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image] = React.useState(bgImage);
  const [color] = React.useState("blue");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  React.useEffect(() => {
    //initialize some states
    const asyncFunc = async () => {};

    asyncFunc();

    window.addEventListener("resize", resizeFunction);
  }, [mainPanel]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"Diony"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />

        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes}</div>
        </div>
      </div>
    </div>
  );
}
