import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap";

interface Task {
  id: string;
  title: string;
  description: string;
  status: number | string;
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
    // TODO add logic
    return "border-warning";
  };
  const getStatus = () => {
    // TODO add logic
    return (
      <Badge className="position-absolute status-badge" bg="warning">
        {status}
      </Badge>
    );
  };
  return (
    <>
      <div
        className={
          "align-items-center border d-flex justify-content-evenly rounded-3 " +
          getDynamicalClass()
        }
      >
        <Form.Check onChange={onCompleted} aria-label="option 1" />
        <div className="w-75 py-2 position-relative">
          <h6>{title}</h6>
          <p>{description}</p>
          <span>{date}</span>
          {getStatus()}
        </div>
        <div className="d-flex flex-column align-items-center">
          <FontAwesomeIcon
            className="border border-2 fa-trash-can my-1 p-2 rounded actions edit"
            icon={faEdit}
          />
          {(status !== "completed" || !status) && (
            <FontAwesomeIcon
              className="border border-2 my-1 p-2 rounded actions delete"
              icon={faTrashAlt}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Task;
