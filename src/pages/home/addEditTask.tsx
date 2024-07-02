import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  clearTaskState,
  createTask,
  fetchTasks,
  updateTask,
} from "../../store/slices/taskSlice";
import { taskState } from "../../store/store";
import { toast } from "react-toastify";

const initialValues = {
  title: "",
  description: "",
  dueDate: "",
  status: "pending",
};
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  dueDate: Yup.date().required("Due date is required").nullable(),
  status: Yup.string().required(),
});

const AddEdit: React.FC<{
  showModal: boolean;
  hideModal: any;
  taskState: taskState;
}> = ({ showModal, hideModal, taskState }) => {
  const dispatch = useDispatch<any>();
  const {
    handleChange,
    values,
    handleSubmit,
    errors,
    touched,
    resetForm,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      console.log(values);
      const { dueDate } = values;
      const newTask = {
        ...values,
        // date: new Date(dueDate),
        date: dueDate,
      };
      if (taskState.task) {
        dispatch(updateTask({ id: taskState.task._id, data: newTask }));
      } else {
        dispatch(createTask({ data: newTask }));
      }
    },
  });

  useEffect(() => {
    const taskDetails = taskState.task;
    console.log(taskDetails);
    if (taskDetails) {
      setValues({
        title: taskDetails.title,
        description: taskDetails.description,
        status: taskDetails.status,
        dueDate: taskDetails.date?.split("T")[0],
      });
    }
  }, [taskState.task]);

  useEffect(() => {
    if (taskState.error && taskState.message) {
      toast.error(taskState.message);
    } else if (taskState.success && taskState.message) {
      toast.success(taskState.message);
      hideModal();
      resetForm();
      dispatch(fetchTasks());
    }
    dispatch(clearTaskState());
  }, [taskState.error, taskState.success, taskState.message]);

  return (
    <Modal
      show={showModal}
      onHide={hideModal}
      backdrop="static"
      keyboard={false}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel label="Title" className="mt-3">
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleChange}
              value={values.title}
              isInvalid={touched.title && !!errors.title}
            />
          </FloatingLabel>
          <FloatingLabel label="Description" className="mt-3">
            <Form.Control
              as="textarea"
              placeholder="Add description here"
              name="description"
              onChange={handleChange}
              value={values.description}
              isInvalid={touched.description && !!errors.description}
              style={{ height: "100px" }}
            />
          </FloatingLabel>
          <Row>
            <Col md="6">
              <FloatingLabel label="Due Date" className="mt-3">
                <Form.Control
                  type="date"
                  placeholder="Due Date"
                  name="dueDate"
                  onChange={handleChange}
                  value={values.dueDate}
                  isInvalid={touched.dueDate && !!errors.dueDate}
                />
              </FloatingLabel>
            </Col>
            <Col md="6">
              <FloatingLabel label="Status" className="mt-3">
                <Form.Select
                  name="status"
                  onChange={handleChange}
                  value={values.status}
                  isInvalid={touched.status && !!errors.status}
                >
                  <option>Select the status</option>
                  <option value="pending">Pending</option>
                  <option
                    value="completed"
                    selected={values.status == "completed"}
                  >
                    Completed
                  </option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" size="sm" variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddEdit;
