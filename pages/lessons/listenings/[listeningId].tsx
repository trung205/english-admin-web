import React, { useState, useCallback, useEffect, useContext } from "react";
import styles from "../../../src/styles/listenings/Listenings.module.scss";
import DataTable from "react-data-table-component";
import Paper from "@mui/material/Paper";
import SortIcon from "@mui/icons-material/ArrowDownward";
import { ILessonFilter, LessonType } from "@interfaces/lesson/lesson.interface";
import { ConfirmContext } from "@definitions/confirm-context";
import { Button, Form } from "react-bootstrap";
import CustomModal from "@components/modal";
import { useRouter } from "next/router";
import { IListeningFilter } from "@interfaces/listening/listening.interface";
import listeningService from "src/services/listening.service";

const Listenings: React.FC = () => {
  const router = useRouter();
  const lessonId = router.query.listeningId as string;
  console.log(lessonId);
  const [pending, setPending] = useState(true);
  const [query, setQuery] = useState<IListeningFilter>({
    lesson: "",
  });
  const [listenings, setListenings] = useState<any>([]);
  const [listeningInfo, setListeningInfo] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { handleShowConfirm }: any = useContext(ConfirmContext);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setListeningInfo(null);
    setShowModal(false);
  };

  //   const handleChangeType = (item: any) => {
  //     setQuery({ ...query, type: item.type });
  //   };

  const fetchDataListening = useCallback(async () => {
    if (query.lesson) {
      setPending(true);
      const listenings = await listeningService.getAll(query);
      setListenings(listenings.data.data.data);
      setPending(false);
    }
  }, [query]);

  useEffect(() => {
    fetchDataListening().catch(console.error);
  }, [fetchDataListening]);

  useEffect(() => {
    setQuery({ ...query, lesson: lessonId });
  }, [router]);

  const handleDeleteBtn = (e: any, cell: any) => {
    handleShowConfirm("Bạn có muốn tiếp tục không?", function () {
      submitDeleteListening(cell);
    });
  };

  const submitDeleteListening = async (listening: any) => {
    try {
      setPending(true);
      await listeningService.removeListening(listening._id);
      fetchDataListening();
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
  };

  const handleEditBtn = (e: any, cell: any) => {
    setIsEdit(true);
    setListeningInfo(cell);
    handleShowModal();
  };

  //   const handleInputEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { value, name } = e.target;
  //     setLessonInfo((prevValues: any) => ({
  //       ...prevValues,
  //       [name]: value,
  //     }));
  //   };

  //   const handleSaveLesson = async () => {
  //     try {
  //       if (isEdit) {
  //         await lessonService.updateLesson(lessonInfo._id, {
  //           name: lessonInfo.name,
  //           title: lessonInfo.title,
  //         });
  //       } else {
  //         let body = { ...lessonInfo, type: query.type };
  //         await lessonService.createLesson(body);
  //       }
  //       fetchDataLesson();
  //       handleCloseModal();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const handleCreateBtn = () => {
  //     setIsEdit(false);
  //     handleShowModal();
  //   };

  const columns = [
    {
      name: "#",
      selector: (row: any, index: any) => index + 1,
    },
    {
      name: "Câu hỏi",
      selector: "question",
      sortable: true,
    },
    {
      name: "Câu trả lời",
      selector: "answer",
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

  //   const renderBtnSave = () => {
  //     return (
  //       <Button variant="primary" onClick={handleSaveLesson}>
  //         Lưu
  //       </Button>
  //     );
  //   };

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
            />
            <div className="input-group-append">
              <i className="bi bi-filter h4"></i>
            </div>
          </div>
          <div>
            <button
              className={`${styles.btn_create} btn`}
              //   onClick={handleCreateBtn}
            >
              Thêm câu hỏi<i className="bi bi-plus-square-dotted"></i>
            </button>
          </div>
        </div>
      </div>
      <Paper className={styles.data_table}>
        <DataTable
          columns={columns}
          data={listenings}
          defaultSortField="question"
          sortIcon={<SortIcon />}
          pagination
          progressPending={pending}
        />
      </Paper>
      {/* <CustomModal
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
      </CustomModal> */}
    </div>
  );
};

export default Listenings;
