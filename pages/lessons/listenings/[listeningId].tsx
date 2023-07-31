import React, { useState, useCallback, useEffect, useContext } from "react";
import styles from "../../../src/styles/listenings/Listenings.module.scss";
import DataTable from "react-data-table-component";
import Paper from "@mui/material/Paper";
import SortIcon from "@mui/icons-material/ArrowDownward";
import { ConfirmContext } from "@definitions/confirm-context";
import { Button, Form } from "react-bootstrap";
import CustomModal from "@components/modal";
import { useRouter } from "next/router";
import {
  IListeningFilter,
  IListeningInfo,
  ListeningType,
} from "@interfaces/listening/listening.interface";
import listeningService from "src/services/listening.service";
import { cleanObject, debounce } from "utils/functions";
import { paginationComponentOptions } from "utils/constants";

const Listenings: React.FC = () => {
  const router = useRouter();
  const lessonId = router.query.listeningId as string;
  const [pending, setPending] = useState(true);
  const [query, setQuery] = useState<IListeningFilter>({
    lessonId: "",
    limit: 10,
  });
  const [listenings, setListenings] = useState<any>([]);
  const [listeningInfo, setListeningInfo] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [listWord, setListWord] = useState<string[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const { handleShowConfirm }: any = useContext(ConfirmContext);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setListeningInfo(null);
    setShowModal(false);
  };

  const fetchDataListening = useCallback(async () => {
    if (query.lessonId) {
      setPending(true);
      const listenings = await listeningService.getAll(query);
      setListenings(listenings.data.data.items);
      setTotalItems(listenings.data.data.totalItems);
      setPending(false);
    }
  }, [query]);

  useEffect(() => {
    fetchDataListening().catch(console.error);
  }, [fetchDataListening]);

  useEffect(() => {
    setQuery({ ...query, lessonId });
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

  const handleInputInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setListeningInfo((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputWord = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value, name } = e.target;
    const newListWord: string[] = [...listWord];

    newListWord[index] = value;
    setListWord(newListWord);
  };

  const handleAddWordBtn = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const newListWord: string[] = [...listWord];
    newListWord.push("");
    setListWord(newListWord);
  };

  const handleRemoveWordBtn = (
    e: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    e.preventDefault();
    const newListWord: string[] = [...listWord];
    newListWord.splice(index, 1);
    setListWord(newListWord);
  };

  const handleSaveListening = async () => {
    try {
      const cleanedObject = cleanObject<IListeningInfo>(
        { ...listeningInfo },
        new IListeningInfo()
      );
      let body = { ...cleanedObject, words: listWord };
      if (isEdit) {
        await listeningService.updateListening(listeningInfo._id, body);
      } else {
        body = { ...body, lessonId, type: ListeningType.SELECT_WORD };
        await listeningService.createListening(body);
      }
      fetchDataListening();
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateBtn = () => {
    setListeningInfo({});
    setListWord([]);
    setIsEdit(false);
    handleShowModal();
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

  const renderBtnSave = () => {
    return (
      <Button variant="primary" onClick={handleSaveListening}>
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
        title={isEdit ? "Chỉnh sửa thông tin câu hỏi" : "Thông tin câu hỏi"}
        footer={renderBtnSave()}
      >
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Câu hỏi</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập câu hỏi"
              defaultValue={listeningInfo?.question}
              name="question"
              onInput={handleInputInfo}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Đáp án</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập đáp án"
              defaultValue={listeningInfo?.answer}
              name="answer"
              onInput={handleInputInfo}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Đáp án đầy đủ</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập đáp án đầy đủ"
              defaultValue={listeningInfo?.rawAnswer}
              name="rawAnswer"
              onInput={handleInputInfo}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Lựa chọn</Form.Label>
            {listWord.map((item, index) => {
              return (
                <div className={`${styles.input_group_word} mb-3`}>
                  <Form.Control
                    type="text"
                    placeholder="Nhập lựa chọn"
                    value={listWord[index]}
                    name="word"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputWord(e, index)
                    }
                  />
                  <button
                    className={`${styles.btn_remove_word} btn`}
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      handleRemoveWordBtn(e, index);
                    }}
                  >
                    <i className="bi bi-dash h4"></i>
                  </button>
                </div>
              );
            })}
            {listWord.length < 4 && (
              <div className="d-flex justify-content-end mt-2">
                <button
                  className={`${styles.btn_add_word} btn`}
                  onClick={handleAddWordBtn}
                >
                  <i className="bi bi-plus h4"></i>
                </button>
              </div>
            )}
          </Form.Group>
        </Form>
      </CustomModal>
    </div>
  );
};

export default Listenings;
