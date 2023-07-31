import React, { useState, useEffect, useCallback, useContext } from "react";
import DataTable from "react-data-table-component";
import Paper from "@mui/material/Paper";
import SortIcon from "@mui/icons-material/ArrowDownward";
import styles from "../../src/styles/users/Users.module.scss";
import userService from "src/services/user.service";
import CustomModal from "@components/modal";
import { Button, Form } from "react-bootstrap";
import { ConfirmContext } from "@definitions/confirm-context";
import { UserRoles } from "@interfaces/user/user.interface";
import { IFilterBase } from "@interfaces/index";
import { paginationComponentOptions } from "utils/constants";
import { debounce } from "utils/functions";

const ListRole = [
  {
    name: "Người dùng",
    role: UserRoles.USER,
  },
  {
    name: "Người quản lý",
    role: UserRoles.ADMIN,
  },
];

const Users: React.FC = () => {
  let [users, setUsers] = useState<any>([]);
  const [query, setQuery] = useState<IFilterBase>({
    limit: 10,
  });
  const [pending, setPending] = useState(true);
  const [userInfo, setUserInfo] = useState<any>();
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

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
    const dataUsers = await userService.getAllUser(query);
    setUsers(dataUsers.data.data.items);
    setTotalItems(dataUsers.data.data.totalItems);
    setPending(false);
  }, [query]);

  useEffect(() => {
    fetchDataUsers().catch(console.error);
  }, [fetchDataUsers]);

  const handleDeleteBtn = (e: any, cell: any) => {
    handleShowConfirm("Bạn có muốn tiếp tục không?", function () {
      submitDeleteUser(cell);
    });
  };

  const handleCreateBtn = () => {
    setIsEdit(false);
    setUserInfo({});
    handleShowModal();
  };

  const handleEditBtn = (e: any, cell: any) => {
    setIsEdit(true);
    setUserInfo(cell);
    handleShowModal();
  };

  const handleInputInfo = (e: any) => {
    const { value, name } = e.target;
    setUserInfo((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSaveInfo = async () => {
    try {
      if (isEdit) {
        await userService.updateUser(userInfo._id, {
          username: userInfo.username,
        });
      } else {
        await userService.createUser(userInfo);
      }
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

  const handlePageChange = (page: any) => {
    setQuery({ ...query, page });
  };

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setQuery({ ...query, limit: newPerPage, page });
  };

  const handleSearch = debounce((e: any) => {
    const { value, name } = e.target;
    setQuery((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  }, 500);

  const renderBtnSaveInfo = () => {
    return (
      <Button variant="primary" onClick={handleSaveInfo}>
        Lưu
      </Button>
    );
  };
  return (
    <div className="d-flex flex-column min-vh-100 mt-3">
      <div className={styles.tab_bar}>
        <div className={styles.header_tab_bar}>
          <div className={`input-group mb-3 ${styles.search_group}`}>
            <div className="input-group-prepend">
              <i className="bi bi-search h5"></i>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Amount (to the nearest dollar)"
              placeholder="Tìm kiếm ..."
              name="keyword"
              onChange={handleSearch}
            />
            <div className="input-group-append">
              <i className="bi bi-filter h4"></i>
            </div>
          </div>
          <div>
            <button
              className={`${styles.btn_create} btn`}
              onClick={handleCreateBtn}
            >
              Thêm người dùng<i className="bi bi-plus-square-dotted"></i>
            </button>
          </div>
        </div>
      </div>
      <Paper className={styles.data_table}>
        <DataTable
          columns={columns}
          data={users}
          defaultSortField="email"
          sortIcon={<SortIcon />}
          pagination
          paginationServer
          progressPending={pending}
          paginationComponentOptions={paginationComponentOptions}
          paginationTotalRows={totalItems}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
        />
      </Paper>
      <CustomModal
        showModal={showModalEdit}
        onClose={handleCloseModal}
        title={
          isEdit ? "Chỉnh sửa thông tin người dùng" : "Thông tin người dùng"
        }
        footer={renderBtnSaveInfo()}
      >
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Tên người dùng</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên người dùng"
              defaultValue={userInfo?.username}
              name="username"
              onInput={handleInputInfo}
              // Các xử lý sự kiện khi thay đổi tên người dùng
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              defaultValue={userInfo?.email}
              disabled={isEdit ? true : false} // Vô hiệu hóa trường email
              onInput={handleInputInfo}
            />
          </Form.Group>
          {!isEdit && (
            <Form.Group controlId="formEmail">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Mật khẩu"
                defaultValue={userInfo?.password}
                onInput={handleInputInfo}
              />
            </Form.Group>
          )}

          <Form.Group>
            <Form.Label>Vai trò</Form.Label>
            <select
              className="form-control"
              defaultValue={userInfo?.role}
              onChange={handleInputInfo}
              name="role"
            >
              <option>Vai trò</option>
              {ListRole.map((item) => {
                return (
                  <option value={item.role} key={item.role}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </Form.Group>
        </Form>
      </CustomModal>
    </div>
  );
};

export default Users;
