import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table
} from "reactstrap";

const ProjectList = props => {
  return (
      <Modal className="modal-lg" isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Student Projects</ModalHeader>
        <ModalBody>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Repo URL</th>
                        <th>Live URL</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.projects.map((project, index) => {
                            return (
                                <tr key={index}>
                                    <td>{project.name}</td>
                                    <td>{project.repoUrl}</td>
                                    <td>{project.liveUrl}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
  );
};

export default ProjectList;
