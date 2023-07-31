import React, { useState, useCallback, useEffect, useContext } from "react";
import styles from "../../../src/styles/grammars/Grammars.module.scss";
import DataTable from "react-data-table-component";
import Paper from "@mui/material/Paper";
import SortIcon from "@mui/icons-material/ArrowDownward";
import { ConfirmContext } from "@definitions/confirm-context";
import { Button, Form } from "react-bootstrap";
import CustomModal from "@components/modal";
import { useRouter } from "next/router";
import { cleanObject } from "utils/functions";
import ImageUpload from "@components/image-upload";
import {
  IGrammarFilter,
  IGrammarInfo,
  IGrammarUse,
} from "@interfaces/grammar/grammar.interface";
import grammarService from "src/services/grammar.service";
import { paginationComponentOptions } from "utils/constants";

const Grammars: React.FC = () => {
  const router = useRouter();
  const lessonId = router.query.grammarId as string;
  const [pending, setPending] = useState(true);
  const [query, setQuery] = useState<IGrammarFilter>({
    lessonId: "",
    limit: 10,
  });
  const [grammars, setGrammars] = useState<any>([]);
  const [grammarInfo, setGrammarInfo] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [imageURL, setImageURL] = useState<string>();
  const [listKnow, setListKnow] = useState<string[]>([]);
  const [listUse, setListUse] = useState<any>([]);
  const [totalItems, setTotalItems] = useState(0);

  const { handleShowConfirm }: any = useContext(ConfirmContext);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setGrammarInfo(null);
    setShowModal(false);
  };

  const fetchDataGrammar = useCallback(async () => {
    if (query.lessonId) {
      setPending(true);
      const grammars = await grammarService.getAll(query);
      setGrammars(grammars.data.data.items);
      setTotalItems(grammars.data.data.totalItems);
      setPending(false);
    }
  }, [query]);

  useEffect(() => {
    fetchDataGrammar().catch(console.error);
  }, [fetchDataGrammar]);

  useEffect(() => {
    setQuery({ ...query, lessonId });
  }, [router]);

  const handleDeleteBtn = (e: any, cell: any) => {
    handleShowConfirm("Bạn có muốn tiếp tục không?", function () {
      submitDeleteGrammar(cell);
    });
  };

  const submitDeleteGrammar = async (listening: any) => {
    try {
      setPending(true);
      await grammarService.removeGrammar(listening._id);
      fetchDataGrammar();
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
  };

  const handleEditBtn = (e: any, cell: any) => {
    setIsEdit(true);
    setGrammarInfo(cell);
    setListKnow(cell.know);
    setListUse(cell.use);
    handleShowModal();
  };

  const handleInputInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setGrammarInfo((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputKnow = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value, name } = e.target;
    const newListKnow: string[] = [...listKnow];

    newListKnow[index] = value;
    setListKnow(newListKnow);
  };

  const handleAddKnowBtn = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const newListKnow: string[] = [...listKnow];
    newListKnow.push("");
    setListKnow(newListKnow);
  };

  const handleRemoveKnowBtn = (
    e: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    e.preventDefault();
    const newListKnow: string[] = [...listKnow];
    newListKnow.splice(index, 1);
    setListKnow(newListKnow);
  };

  const handleInputUse = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value, name } = e.target;
    const newListUse: any[] = [...listUse];

    newListUse[index][name] = value;
    setListUse(newListUse);
  };

  const handleAddUseBtn = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const newListUse: any[] = [...listUse];
    newListUse.push({
      grammar: "",
      ex: "",
    });
    setListUse(newListUse);
  };

  const handleRemoveUseBtn = (
    e: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    e.preventDefault();
    const newListUse: string[] = [...listUse];
    newListUse.splice(index, 1);
    setListUse(newListUse);
  };

  const handleSaveGrammar = async () => {
    try {
      const cleanedObject = cleanObject<IGrammarInfo>(
        { ...grammarInfo },
        new IGrammarInfo()
      );
      let listUseClean = [];
      for (let use of listUse) {
        listUseClean.push(
          cleanObject<IGrammarUse>({ ...use }, new IGrammarUse())
        );
      }
      let body = {
        ...cleanedObject,
        image: imageURL,
        use: listUseClean,
        know: listKnow,
      };
      if (isEdit) {
        await grammarService.updateGrammar(grammarInfo._id, body);
      } else {
        body = { ...body, lessonId };
        await grammarService.createGrammar(body);
      }
      fetchDataGrammar();
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateBtn = () => {
    setGrammarInfo({});
    setListKnow([]);
    setListUse([]);
    setIsEdit(false);
    handleShowModal();
  };

  const handleImageUpload = (url: any) => {
    setImageURL(url);
  };

  const handlePageChange = (page: any) => {
    setQuery({ ...query, page });
  };

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setQuery({ ...query, limit: newPerPage, page });
  };

  const handleSearch = (e: any) => {
    const { value, name } = e.target;
    setQuery((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const columns = [
    {
      name: "#",
      selector: (row: any, index: any) => index + 1,
    },
    {
      name: "Tiêu đề",
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
      <Button variant="primary" onClick={handleSaveGrammar}>
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
          data={grammars}
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
            <Form.Label>Tiêu đề</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tiêu đề"
              defaultValue={grammarInfo?.title}
              name="title"
              onInput={handleInputInfo}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Mô tả</Form.Label>
            {listKnow.map((item, index) => {
              return (
                <div className={`${styles.input_group} mb-3`}>
                  <Form.Control
                    type="text"
                    placeholder="Nhập mô tả"
                    value={listKnow[index]}
                    name="know"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputKnow(e, index)
                    }
                  />
                  <button
                    className={`${styles.btn_remove} btn`}
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      handleRemoveKnowBtn(e, index);
                    }}
                  >
                    <i className="bi bi-dash h4"></i>
                  </button>
                </div>
              );
            })}

            <div className="d-flex justify-content-end mt-2">
              <button
                className={`${styles.btn_add} btn`}
                onClick={handleAddKnowBtn}
              >
                <i className="bi bi-plus h4"></i>
              </button>
            </div>
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Cách sử dụng</Form.Label>
            {listUse.map((item: any, index: number) => {
              return (
                <div className={`${styles.input_group} mb-3`}>
                  <div className="w-100">
                    <Form.Control
                      type="text"
                      placeholder="Nhập cách sử dụng"
                      value={listUse[index].grammar}
                      name="grammar"
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputUse(e, index)
                      }
                    />
                    <Form.Control
                      className="mt-1"
                      type="text"
                      placeholder="Nhập ví dụ"
                      value={listUse[index].ex}
                      name="ex"
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputUse(e, index)
                      }
                    />
                  </div>
                  <button
                    className={`${styles.btn_remove} btn`}
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      handleRemoveUseBtn(e, index);
                    }}
                  >
                    <i className="bi bi-dash h4"></i>
                  </button>
                </div>
              );
            })}
            <div className="d-flex justify-content-end mt-2">
              <button
                className={`${styles.btn_add} btn`}
                onClick={handleAddUseBtn}
              >
                <i className="bi bi-plus h4"></i>
              </button>
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Hình ảnh</Form.Label>
            <ImageUpload onImageUpload={handleImageUpload} />
          </Form.Group>
        </Form>
      </CustomModal>
    </div>
  );
};

export default Grammars;
