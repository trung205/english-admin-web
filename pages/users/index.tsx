import React from "react";
import DataTable from "react-data-table-component";
import Paper from "@mui/material/Paper";
import SortIcon from "@mui/icons-material/ArrowDownward";
import movies from "./movies";
import styles from "../../src/styles/users/Users.module.scss";


const Users: React.FC = () => {

  const columns = [
    {
      name: "#",
      selector: (row: any, index: any) => index + 1,
    },
    {
      name: "Title",
      selector: "title",
      sortable: true,
    },
    {
      name: "Directior",
      selector: "director",
      sortable: true,
    },
    {
      name: "Runtime (m)",
      selector: "runtime",
      sortable: true,
    },
    {
      name: "",
      button: true,
      cell: (cell: any) => {
        return (
          <button className="btn btn-danger" onClick={(e) => handleDeleteBtn(e, cell)}>
            <i className="bi bi-trash"></i> Xóa
          </button>
        );
      },
    },
    {
      name: "",
      button: true,
      cell: () => {
        return (
          <button className="btn btn-info">
            <i className="bi bi-pen"></i> Sửa
          </button>
        );
      },
    },
  ];

  const handleDeleteBtn = (e: any, cell: any) => {
    console.log(cell, "handleDeleteBtn")
  }
  return (
    <div className="d-flex flex-column min-vh-100 mt-3">
      <Paper className={styles.data_table}>
        <DataTable
          columns={columns}
          data={movies}
          defaultSortField="title"
          sortIcon={<SortIcon />}
          pagination
        />
      </Paper>
    </div>
  );
};

export default Users;
