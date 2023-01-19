import { Box } from "@mui/material"
import BreakdownChart from "components/BreakdownChart"
import Header from "components/Header"
import React from "react"

const Breakdown = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Breakdown" subtitle="Breakdown of sales by category" />
      <Box mt="40px" height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  )
}

export default Breakdown
