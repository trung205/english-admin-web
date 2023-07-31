import React, { useState, useCallback, useEffect, useContext } from "react";
import styles from "../../src/styles/lessons/Lessons.module.scss";
import DataTable from "react-data-table-component";
import Paper from "@mui/material/Paper";
import SortIcon from "@mui/icons-material/ArrowDownward";
import { ILessonFilter, LessonType } from "@interfaces/lesson/lesson.interface";
import lessonService from "src/services/lesson.service";
import { ConfirmContext } from "@definitions/confirm-context";
import { Button, Form } from "react-bootstrap";
import CustomModal from "@components/modal";
import { useRouter } from "next/router";
import routes from "constants/routes";
import { paginationComponentOptions } from "utils/constants";
import { debounce } from "utils/functions";

const listType = [
  {
    name: "Readings",
    type: LessonType.READING,
  },
  {
    name: "Listenings",
    type: LessonType.LISTENING,
  },
  {
    name: "Grammars",
    type: LessonType.GRAMMAR,
  },
];

const routesLesson = {
  LISTENING: routes.private.listenings,
  READING: routes.private.readings,
  GRAMMAR: routes.private.grammars,
};

const Lessons: React.FC = () => {
  const router = useRouter();
  const [pending, setPending] = useState(true);
  const [query, setQuery] = useState<ILessonFilter>({
    type: LessonType.READING,
    limit: 10,
  });
  const [lessons, setLessons] = useState<any>([]);
  const [lessonInfo, setLessonInfo] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const { handleShowConfirm }: any = useContext(ConfirmContext);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setLessonInfo(null);
    setShowModal(false);
  };

  const handleChangeType = (item: any) => {
    setQuery({ ...query, type: item.type });
  };

  const fetchDataLesson = useCallback(async () => {
    setPending(true);
    const lessons = await lessonService.getAll(query);
    setLessons(lessons.data.data.data);
    setTotalItems(lessons.data.data.totalItems);
    setPending(false);
  }, [query]);

  useEffect(() => {
    fetchDataLesson().catch(console.error);
  }, [fetchDataLesson]);

  const handleDeleteBtn = (e: any, cell: any) => {
    handleShowConfirm("Bạn có muốn tiếp tục không?", function () {
      submitDeleteLesson(cell);
    });
  };

  const submitDeleteLesson = async (lesson: any) => {
    try {
      setPending(true);
      await lessonService.removeLesson(lesson._id);
      fetchDataLesson();
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
  };

  const handleEditBtn = (e: any, cell: any) => {
    setIsEdit(true);
    setLessonInfo(cell);
    handleShowModal();
  };

  const handleInputEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLessonInfo((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSaveLesson = async () => {
    try {
      if (isEdit) {
        await lessonService.updateLesson(lessonInfo._id, {
          name: lessonInfo.name,
          title: lessonInfo.title,
        });
      } else {
        let body = { ...lessonInfo, type: query.type };
        await lessonService.createLesson(body);
      }
      fetchDataLesson();
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateBtn = () => {
    setIsEdit(false);
    handleShowModal();
  };

  const handleRowClicked = (row: any, event: any) => {
    if (query.type) router.push(routesLesson[query.type](row._id));
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
  }, 1000);

  const columns = [
    {
      name: "#",
      selector: (row: any, index: any) => index + 1,
    },
    {
      name: "Tên bài học",
      selector: "name",
      sortable: true,
    },
    {
      name: "Tiêu đề bài học",
      selector: "title",
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

  const renderBtnSave = () => {
    return (
      <Button variant="primary" onClick={handleSaveLesson}>
        Lưu
      </Button>
    );
  };

  return (
    <div className="d-flex flex-column min-vh-100">
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
              Thêm bài học<i className="bi bi-plus-square-dotted"></i>
            </button>
          </div>
        </div>
        <div>
          <ul className={styles.list_item}>
            {listType.map((item) => {
              return (
                <li
                  key={item.name}
                  className={`${
                    query.type === item.type ? styles.active : ""
                  } `}
                  onClick={() => handleChangeType(item)}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Paper className={styles.data_table}>
        <DataTable
          columns={columns}
          data={lessons}
          defaultSortField="name"
          sortIcon={<SortIcon />}
          pagination
          progressPending={pending}
          onRowClicked={handleRowClicked}
          highlightOnHover
          pointerOnHover
          paginationServer
          paginationComponentOptions={paginationComponentOptions}
          paginationTotalRows={totalItems}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
        />
      </Paper>
      <CustomModal
        showModal={showModal}
        onClose={handleCloseModal}
        title={isEdit ? "Chỉnh sửa thông tin bài học" : "Thông tin bài học"}
        footer={renderBtnSave()}
      >
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Tên bài học</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên bài học"
              defaultValue={lessonInfo?.name}
              name="name"
              onInput={handleInputEdit}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Tiêu đề bài học</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tiêu đề bài học"
              defaultValue={lessonInfo?.title}
              name="title"
              onInput={handleInputEdit}
            />
          </Form.Group>
        </Form>
      </CustomModal>
    </div>
  );
};

export default Lessons;
