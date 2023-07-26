import React, { useState, useEffect, useCallback, useContext } from "react";
import DataTable from "react-data-table-component";
import Paper from "@mui/material/Paper";
import SortIcon from "@mui/icons-material/ArrowDownward";
import styles from "../../src/styles/users/Users.module.scss";
import userService from "src/services/user.service";
import CustomModal from "@components/modal";
import { Button, Form } from "react-bootstrap";
import { ConfirmContext } from "@definitions/confirm-context";

const Users: React.FC = () => {
  let [users, setUsers] = useState<any>();
  let [query, setQuery] = useState({});
  const [pending, setPending] = useState(true);
  const [userEdit, setUserEdit] = useState<any>();
  const [showModalEdit, setShowModalEdit] = useState(false);
  const { handleShowConfirm }: any = useContext(ConfirmContext);

  const columns = [
    {
      name: "#",
      selector: (row: any, index: any) => index + 1,
    },
    {
      name: "Tên người dùng",
      selector: "username",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "",
      button: true,
      cell: (cell: any) => {
        return (
          <button
            className="btn btn-danger"
            onClick={(e) => handleDeleteBtn(e, cell)}
          >
            <i className="bi bi-trash"></i> Xóa
          </button>
        );
      },
    },
    {
      name: "",
      button: true,
      cell: (cell: any) => {
        return (
          <button
            className="btn btn-info"
            onClick={(e) => handleEditBtn(e, cell)}
          >
            <i className="bi bi-pen"></i> Sửa
          </button>
        );
      },
    },
  ];

  const handleShowModal = () => {
    setShowModalEdit(true);
  };

  const handleCloseModal = () => {
    setShowModalEdit(false);
  };

  const fetchDataUsers = useCallback(async () => {
    setPending(true);
    const dataUsers = await userService.getAllUser();
    setUsers(dataUsers.data.data);
    setPending(false);
  }, []);

  useEffect(() => {
    fetchDataUsers().catch(console.error);
  }, [fetchDataUsers]);

  const handleDeleteBtn = (e: any, cell: any) => {
    handleShowConfirm("Bạn có muốn tiếp tục không?", function () {
      submitDeleteUser(cell);
    });
  };

  const handleEditBtn = (e: any, cell: any) => {
    setUserEdit(cell);
    handleShowModal();
  };

  const handleInputEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserEdit((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSaveEdit = async () => {
    try {
      await userService.updateUser(userEdit._id, {
        username: userEdit.username,
      });
      fetchDataUsers();
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const submitDeleteUser = async (user: any) => {
    try {
      setPending(true);
      await userService.removeUser(user._id);
      fetchDataUsers();
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
  };

  const renderBtnSaveEdit = () => {
    return (
      <Button variant="primary" onClick={handleSaveEdit}>
        Lưu
      </Button>
    );
  };
  return (
    <div className="d-flex flex-column min-vh-100 mt-3">
      <Paper className={styles.data_table}>
        <DataTable
          columns={columns}
          data={users}
          defaultSortField="email"
          sortIcon={<SortIcon />}
          pagination
          progressPending={pending}
        />
      </Paper>
      <CustomModal
        showModal={showModalEdit}
        onClose={handleCloseModal}
        title="Chỉnh sửa thông tin người dùng"
        footer={renderBtnSaveEdit()}
      >
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Tên người dùng</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên người dùng"
              defaultValue={userEdit?.username}
              name="username"
              onInput={handleInputEdit}
              // Các xử lý sự kiện khi thay đổi tên người dùng
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              defaultValue={userEdit?.email}
              disabled // Vô hiệu hóa trường email
            />
          </Form.Group>
        </Form>
      </CustomModal>
    </div>
  );
};

export default Users;
