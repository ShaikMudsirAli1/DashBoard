import { Box, useTheme, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";

// TABLES WITH MUI DATA GRID.
const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },

    {
      field: "name",
      headerName: "Name",
      cellClassName: "name-column--cell",
    },

    {
      field: "phone",
      headerName: "Phone Number",
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },

    {
      field: "cost",
      headerName: "Cost",
      renderCell: (params) => {
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>;
      },
    },

    {
      field: "date",
      headerName: "Date",
    },
  ];

  return (
    <Box m="20px">
      <Header title="INVOICES" subTitle="List of Invoices" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        // FIND DATAGRID COMPOENENT CLASSES AND ADD CUSTOM PROPERTIES.
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          // GRID TOOLBAR PROVIDE COLUMNS, FILTERS, DENSITE, EXPORT.
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important `,
          },
          "& .MuiCheckbox-roots": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={mockDataInvoices}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        ></DataGrid>
      </Box>
    </Box>
  );
};

export default Invoices;
