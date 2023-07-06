import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";

// TABLES WITH MUI DATA GRID.
const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },

    {
      field: "registrarId",
      headerName: "Register ID",
    },
    {
      field: "name",
      headerName: "Name",
      cellClassName: "name-column--cell",
    },

    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "phone",
      headerName: "Phone Number",
    },

    {
      field: "email",
      headerName: "Email",
      flex: 2,
    },

    {
      field: "address",
      headerName: "Address",
      flex: 2,
    },

    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zipcode",
    },
  ];

  return (
    <Box m="20px">
      <Header title="CONTACTS" subTitle="List of Contacts" />
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
        }}
      >
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        ></DataGrid>
      </Box>
    </Box>
  );
};

export default Contacts;
