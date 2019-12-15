import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Alert,
  Input
} from "reactstrap";

const ProjectModal = props => {
  return (
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Project</ModalHeader>
        <ModalBody>
            {
                props.errors.length > 0 &&
                <Alert color="danger">
                    <ul>
                        {
                            props.errors.map((err) => {
                                return <li>{err.msg}</li>
                            })
                        }
                    </ul>
                </Alert>
            }
          <Form>
            <Row form>
              <Col>
                <FormGroup>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={props.formData.name}
                    onChange={props.handleChange}
                    placeholder="Name"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col>
                <FormGroup>
                  <Label>Description</Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    value={props.formData.description}
                    onChange={props.handleChange}
                    placeholder="Description"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col>
                <FormGroup>
                  <Label>Repo Url</Label>
                  <Input
                    type="text"
                    name="repoUrl"
                    id="repoUrl"
                    value={props.formData.repoUrl}
                    onChange={props.handleChange}
                    placeholder="Repo Url"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col>
                <FormGroup>
                  <Label>Live Url</Label>
                  <Input
                    type="text"
                    name="liveUrl"
                    id="liveUrl"
                    value={props.formData.liveUrl}
                    onChange={props.handleChange}
                    placeholder="Live Url"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col>
                <FormGroup>
                  <Label>Student</Label>
                  <select className="form-control" onChange={props.handleChange}>
                    {
                      props.students.map(student => {
                      return <option selected={student.id == props.formData.studentId} value={student.id}>{student.name}</option>
                      })
                    }
                  </select>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.toggle}>
            cancel
          </Button>{" "}
          <Button color="primary" onClick={props.handleSubmit}>
            save
          </Button>
        </ModalFooter>
      </Modal>
  );
};

export default ProjectModal;
