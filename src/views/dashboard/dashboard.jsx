import React, { useEffect, useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// core components
import GridItem from "../../app/layouts/common/Grid/GridItem";
import GridContainer from "../../app/layouts/common/Grid/GridContainer";
import Table from "../../app/layouts/common/Table";
import Tasks from "../../app/layouts/common/Tasks";
import CustomTabs from "../../app/layouts/common/CustomTabs";
import Danger from "../../app/layouts/common/Typography/Danger";
import Card from "../../app/layouts/common/Card/Card";
import CardHeader from "../../app/layouts/common/Card/CardHeader";
import CardIcon from "../../app/layouts/common/Card/CardIcon";
import CardBody from "../../app/layouts/common/Card/CardBody";
import CardFooter from "../../app/layouts/common/Card/CardFooter";
import PeopleIcon from "@mui/icons-material/People";

import { bugs, website, server } from "../../app/variables/general";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "../../app/variables/charts";

import styles from "../../app/layouts/jss/material-dashboard-react/views/dashboardStyle";
import RevenueChart from "./../revenueStatistic/revenueChart";
import { Box } from "@mui/material";
import { getDashboardInfo } from "../../app/services/revenueService";
import { formatMoney } from "../../app/utils/formatMoney";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  const [data, setData] = useState({
    totalProducts: 0,
    totalSeller: 0,
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
  });

  useEffect(() => {
    const asyncFunc = async () => {
      const {
        totalProducts,
        totalSeller,
        totalRevenue,
        totalOrders,
        totalCustomers,
      } = await getDashboardInfo();

      setData({
        totalProducts,
        totalSeller,
        totalRevenue,
        totalOrders,
        totalCustomers,
      });
    };

    asyncFunc();
  }, []);

  const {
    totalProducts,
    totalSeller,
    totalRevenue,
    totalOrders,
    totalCustomers,
  } = data;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>
                  <SmartphoneIcon />
                </Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Tổng sản phẩm</p>
              <h3 className={classes.cardTitle}>{totalProducts}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                {/* <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Get more space
                </a> */}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Tổng người bán</p>
              <h3 className={classes.cardTitle}>{totalSeller}</h3>
            </CardHeader>
            <CardFooter stats>
              {/* <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div> */}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <PeopleIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Tổng người mua</p>
              <h3 className={classes.cardTitle}>{totalCustomers}</h3>
            </CardHeader>
            <CardFooter stats>
              {/* <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div> */}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>
                  <NoteAddIcon />
                </Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Tổng đơn hàng</p>
              <h3 className={classes.cardTitle}>{totalOrders}</h3>
            </CardHeader>
            <CardFooter stats>
              {/* <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div> */}
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={6} md={12}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <AttachMoneyIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Tổng doanh thu</p>
              <h3 className={classes.cardTitle}>
                {formatMoney(totalRevenue) + "đ"}
              </h3>
            </CardHeader>
            <CardFooter stats>
              {/* <div className={classes.stats}>
                <Update />
                Just Updated
              </div> */}
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <Box>
        <RevenueChart />
      </Box>
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer> */}
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                ),
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer> */}
    </div>
  );
}
