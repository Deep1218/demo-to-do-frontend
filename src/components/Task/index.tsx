import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Badge, Form } from "react-bootstrap";
import "./index.css";
interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  date: any;
  onCompleted: any;
}
const Task: React.FC<Task> = ({
  id,
  title,
  description,
  status,
  date,
  onCompleted,
}) => {
  const getDynamicalClass = () => {
    switch (status) {
      case "pending":
        return "border-warning";
      case "completed":
        return "border-success";
    }
  };
  const getStatus = () => {
    switch (status) {
      case "pending":
        return (
          <Badge className="position-absolute status-badge" bg="warning">
            {status}
          </Badge>
        );
      case "completed":
        return (
          <Badge className="position-absolute status-badge" bg="success">
            {status}
          </Badge>
        );
    }
  };
  return (
    <div
      className={
        "align-items-center border d-flex justify-content-evenly rounded-3 shadow shadow-sm mt-4 " +
        getDynamicalClass()
      }
    >
      {status !== "completed" && (
        <Form.Check onChange={onCompleted} aria-label="option 1" />
      )}
      <div className="w-75 py-2 position-relative">
        <h6 className="text-truncate">{title}</h6>
        <p className="text-truncate">{description}</p>
        <span className="text-muted small-text">
          Due Date:{" "}
          {new Date(date).toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </span>
        {getStatus()}
      </div>
      <div className="d-flex flex-column align-items-center">
        {status !== "completed" && (
          <FontAwesomeIcon
            className="border border-2 fa-trash-can my-1 p-2 rounded actions edit"
            icon={faEdit}
          />
        )}
        <FontAwesomeIcon
          className="border border-2 my-1 p-2 rounded actions delete"
          icon={faTrashAlt}
        />
      </div>
    </div>
  );
};

export default Task;
