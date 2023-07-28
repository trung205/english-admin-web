import React, { useState, useCallback, useEffect, useContext } from "react";
import styles from "../../../src/styles/readings/Readings.module.scss";
import DataTable from "react-data-table-component";
import Paper from "@mui/material/Paper";
import SortIcon from "@mui/icons-material/ArrowDownward";
import { ILessonFilter, LessonType } from "@interfaces/lesson/lesson.interface";
import { ConfirmContext } from "@definitions/confirm-context";
import { Button, Form } from "react-bootstrap";
import CustomModal from "@components/modal";
import { useRouter } from "next/router";
import { cleanObject } from "utils/functions";
import {
  IReadingFilter,
  IReadingInfo,
} from "@interfaces/reading/reading.interface";
import readingService from "src/services/reading.service";
import ImageUpload from "@components/image-upload";

const Readings: React.FC = () => {
  const router = useRouter();
  const lessonId = router.query.readingId as string;
  const [pending, setPending] = useState(true);
  const [query, setQuery] = useState<IReadingFilter>({
    lesson: "",
  });
  const [readings, setReadings] = useState<any>([]);
  const [readingInfo, setReadingInfo] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const { handleShowConfirm }: any = useContext(ConfirmContext);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setReadingInfo(null);
    setShowModal(false);
  };

  //   const handleChangeType = (item: any) => {
  //     setQuery({ ...query, type: item.type });
  //   };

  const fetchDataReading = useCallback(async () => {
    if (query.lesson) {
      setPending(true);
      const readings = await readingService.getAll(query);
      setReadings(readings.data.data.data);
      setPending(false);
    }
  }, [query]);

  useEffect(() => {
    fetchDataReading().catch(console.error);
  }, [fetchDataReading]);

  useEffect(() => {
    setQuery({ ...query, lesson: lessonId });
  }, [router]);

  const handleDeleteBtn = (e: any, cell: any) => {
    handleShowConfirm("Bạn có muốn tiếp tục không?", function () {
      submitDeleteReading(cell);
    });
  };

  const submitDeleteReading = async (listening: any) => {
    try {
      setPending(true);
      await readingService.removeReading(listening._id);
      fetchDataReading();
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
  };

  const handleEditBtn = (e: any, cell: any) => {
    setIsEdit(true);
    setReadingInfo(cell);
    handleShowModal();
  };

  const handleInputInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setReadingInfo((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSaveReading = async () => {
    try {
      const cleanedObject = cleanObject<IReadingInfo>(
        { ...readingInfo },
        new IReadingInfo()
      );
      let body = { ...cleanedObject };
      if (isEdit) {
        await readingService.updateReading(readingInfo._id, body);
      } else {
        body = { ...body, lesson: lessonId };
        await readingService.createReading(body);
      }
      fetchDataReading();
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateBtn = () => {
    setReadingInfo({});
    setIsEdit(false);
    handleShowModal();
  };

  const handleImageUpload = (url: any) => {
    setImageURL(url);
    console.log(url, "handleImageUpload");
  };

  const columns = [
    {
      name: "#",
      selector: (row: any, index: any) => index + 1,
    },
    {
      name: "Từ vựng",
      selector: "word",
      sortable: true,
    },
    {
      name: "Ý nghĩa",
      selector: "translateWord",
      sortable: true,
    },
    {
      name: "Phát âm",
      selector: "pronunciation",
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
      <Button variant="primary" onClick={handleSaveReading}>
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
          data={readings}
          defaultSortField="question"
          sortIcon={<SortIcon />}
          pagination
          progressPending={pending}
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
            <Form.Label>Từ vựng</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập từ vựng"
              defaultValue={readingInfo?.word}
              name="word"
              onInput={handleInputInfo}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Nghĩa từ vựng</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập nghĩa từ vựng"
              defaultValue={readingInfo?.translateWord}
              name="translateWord"
              onInput={handleInputInfo}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Cách phát âm</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập cách phát âm"
              defaultValue={readingInfo?.pronunciation}
              name="pronunciation"
              onInput={handleInputInfo}
            />
          </Form.Group>
          <div>
            {imageURL && <img src={imageURL} alt="Uploaded" />}
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>
        </Form>
      </CustomModal>
    </div>
  );
};

export default Readings;
