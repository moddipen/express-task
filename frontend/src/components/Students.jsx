import React, { Component } from "react";
import {
    Button,
    Table
} from "reactstrap";
import { 
    loadStudents, 
    deleteStudent, 
    updateStudent, 
    saveStudent, 
    uploadProfile, 
    getProjects,
    getStudent
} from "../services/StudentService";
import StudentModal from "../components/StudentModal";
import ProjectList from "./ProductList";

class Students extends Component {

    constructor(props) {
        super(props)

        this.state = {
            students: [],
            editModal: false,
            projectModal: false,
            imagePreviewUrl: "",
            form: {
                id: "",
                name: "",
                email: "",
                dob: "",
                surname: "",
                profile: ""
            },
            projects: [],
            errors: []
        }
    }

    componentDidMount() {
        if (!localStorage.getItem('token')) {
            this.props.history.push("/login");
        } else {
            this.loadStudents();
        }
    }

    loadStudents = () => {
        loadStudents().then((result) => {
            this.setState({ students: result.data })
        }).catch(err => {            
            alert("Failed to load students")
        })
    };

    edit = student => {
        getStudent(student.id).then((result) => {
            this.setState({
                form: result.data,
                editModal: true
            })
        }).catch(err => {
            alert("Failed to get student data")
        })
    }

    add = () => {
        this.setState({
            form: {
                name: "",
                email: "",
                dob: "",
                surname: ""
            },
            errors: [],
            editModal: true
        })
    }

    toggle = () => {
        this.setState({editModal: !this.state.editModal})
    }

    projectToggle = () => {
        this.setState({projectModal: !this.state.projectModal})
    }

    delete = student => {
        deleteStudent(student.id).then((result) => {
            this.setState({ students: result.data })
        }).catch(err => {
            alert("Failed to delete student data")
        })
    }

    projects = student => {
        getProjects(student.id).then((result) => {
            this.setState({
                projects: result.data,
                projectModal: true
            })
        }).catch(err => {
            alert("Failed to get student data")
        })
    }

    handleChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
        form: { ...this.state.form, [name]: value }
        });
    };

    handleSubmit = () => {
        let form = this.state.form;
        if (this.state.form.id) {
            updateStudent(form, this.state.form.id).then((result) => {
                this.setState({ students: result.data, editModal: false })
            }).catch(err => {
                this.setState({errors: err.data.errors})
            })
        } else {
            delete form.id;
            saveStudent(form).then((result) => {
                this.setState({ students: result.data, editModal: false })
            }).catch(err => {
                this.setState({errors: err.data.errors})
            })
        }   
    };

    uploadProfilePic = e => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
        this.setState({
            imagePreviewUrl: reader.result
        });
        }
        reader.readAsDataURL(file);

        const payloadData = new FormData();
        payloadData.append("profile", file);
        uploadProfile(
            payloadData,
            this.state.form.id
        ).then((result) => {
            alert("File uploaded.")
        }).catch(err => {
            alert("File upload failed.")
        });
    };

    render() {
        return (
            <React.Fragment>
                <h2>Students</h2>
                <Button onClick={this.add}>+ Add</Button>
                <br />
                <Table hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>DOB</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.students.map((student, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{student.name}</td>
                                        <td>{student.surname}</td>
                                        <td>{student.email}</td>
                                        <td>{student.dob}</td>
                                        <td>
                                            <Button onClick={() => this.edit(student)} color={"primary"}>Edit</Button>{" "}
                                            <Button onClick={() => this.delete(student)} color={"danger"}>Delete</Button>{" "}
                                            <Button onClick={() => this.projects(student)} color={"info"}>Projects</Button>
                                        </td>
                                    </tr>
                                )  
                            })
                        }

                    </tbody>
                </Table>
                <ProjectList
                 projects={this.state.projects} 
                 toggle={this.projectToggle} modal={this.state.projectModal} />
                <StudentModal
                 imagePreviewUrl={this.state.imagePreviewUrl}
                 formData={this.state.form} 
                 handleChange={this.handleChange} 
                 handleSubmit={this.handleSubmit} 
                 uploadProfilePic={this.uploadProfilePic} 
                 toggle={this.toggle} errors={this.state.errors} modal={this.state.editModal} />
            </React.Fragment>
        );
    }
}

export default Students;
