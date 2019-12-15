import React, { Component } from "react";
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
  Input,
  Alert
} from "reactstrap";
import { API_HOST } from "../config/config.dev";

class StudentModal extends Component {

  render() {
    return (
          <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
            <ModalHeader toggle={this.props.toggle}>Student</ModalHeader>
            <ModalBody>
                {
                    this.props.errors.length > 0 &&
                    <Alert color="danger">
                        <ul>
                            {
                                this.props.errors.map((err, index) => {
                                    return <li key={index}>{err.msg}</li>
                                })
                            }
                        </ul>
                    </Alert>
                }
              <Form>
                {
                    this.props.formData.id &&
                    <Row>
                        <Col>
                          <FormGroup>
                            <Label for="firstName">Click to change Profile</Label>
                            <img
                                  style={{width: "63px", cursor: "pointer"}}
                                  src={this.props.imagePreviewUrl ? this.props.imagePreviewUrl : this.props.formData.profile ? API_HOST+this.props.formData.profile : "/logo192.png"}
                                  alt="profile-img"
                                  className="rounded-circle"
                                  onClick={() => this.fileInput.click()}
                              />
                              <input
                                  style={{ display: "none" }}
                                  accept="image/png, image/ico, image/jpeg"
                                  ref={e => this.fileInput = e}
                                  type="file"
                                  onChange={this.props.uploadProfilePic}
                              />
                          </FormGroup>
                        </Col>
                    </Row>
                }
                <Row form>
                  <Col >
                    <FormGroup>
                      <Label for="firstName">Name</Label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        value={this.props.formData.name}
                        onChange={this.props.handleChange}
                        placeholder="Name"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col >
                    <FormGroup>
                      <Label for="firstName">Surname</Label>
                      <Input
                        type="text"
                        name="surname"
                        id="surname"
                        value={this.props.formData.surname}
                        onChange={this.props.handleChange}
                        placeholder="Surname"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col >
                    <FormGroup>
                      <Label for="firstName">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        value={this.props.formData.email}
                        onChange={this.props.handleChange}
                        placeholder="Email"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col >
                    <FormGroup>
                      <Label for="firstName">Date of birth</Label>
                      <Input
                        type="text"
                        name="dob"
                        id="dob"
                        value={this.props.formData.dob}
                        onChange={this.props.handleChange}
                        placeholder="DD/MM/YYYY"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.props.toggle}>
                cancel
              </Button>{" "}
              <Button color="primary" onClick={this.props.handleSubmit}>
                save
              </Button>
            </ModalFooter>
          </Modal>
      );
  }
};

export default StudentModal;
