import React from "react"
import FlexBetween from "components/FlexBetween"
import Header from "components/Header"
import { Box, useTheme, Button, Typography, useMediaQuery } from "@mui/material"
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material"
import { DataGrid } from "@mui/x-data-grid"
import BreakdownChart from "components/BreakdownChart"
import OverviewChart from "components/OverviewChart"
import { useGetDashboardStatsQuery } from "state/api"
import StatBox from "components/StatBox"

const Dashboard = () => {
  const theme = useTheme()
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)")
  const { data, isLoading } = useGetDashboardStatsQuery()

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ]

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Dashboard" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* COLUMN 1 */}

        <StatBox
          title="Total Customers"
          value={data && data.totalCustomers}
          increase="+09%"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300] }}
              fontSize="26px"
            />
          }
          description="Since last month"
        />
        <StatBox
          title="Sales Today"
          value={data && data.todayStats.totalSales}
          increase="+16%"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300] }}
              fontSize="26px"
            />
          }
          description="Since last month"
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          padding="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title="Monthly Sales"
          value={data && data.thisMonthStats.totalSales}
          increase="+03%"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300] }}
              fontSize="26px"
            />
          }
          description="Since last month"
        />
        <StatBox
          title="Yearly Sales"
          value={data && data.yearlySalesTotal}
          increase="+39%"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300] }}
              fontSize="26px"
            />
          }
          description="Since last month"
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": { border: "none" },
            "& .MuiDataGrid-cell": { borderBottom: "none" },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButtonText": {
              color: `theme.palette.secondary[200] !important`,
              borderTop: "none",
            },
          }}
        >
          {" "}
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales by category
          </Typography>
          <BreakdownChart isDashboard={true} />
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
