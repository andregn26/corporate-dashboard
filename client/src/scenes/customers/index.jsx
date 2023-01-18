import React from "react"
import { Box, useTheme } from "@mui/material"
import Header from "components/Header"
import { DataGrid } from "@mui/x-data-grid"
import { useGetCustomersQuery } from "state/api"

const Customers = () => {
  const theme = useTheme()
  const { data, isLoading } = useGetCustomersQuery()
  console.log("🚀 ~ file: index.jsx:10 ~ Customers ~ data", data)

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Customers" subtitle="See your list of products" />
    </Box>
  )
}

export default Customers
