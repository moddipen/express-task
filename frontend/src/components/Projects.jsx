import React, { Component } from "react";
import {
    Button,
    Table,
    Input,
    Row,
    Col,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from "reactstrap";
import { 
    loadStudents
} from "../services/StudentService";
import { loadProjects, getProject, deleteProject, updateProject, saveProject, searchProjects } from "../services/ProjectService";
import ProductModal from "../components/ProjectModal";

class Projects extends Component {

    constructor(props) {
        super(props)

        this.state = {
            projects: [],
            students: [],
            search: "",
            editModal: false,
            form: {
                id: "",
                name: "",
                description: "",
                repoUrl: "",
                liveUrl: "",
                studentId: ""
            },
            errors: []
        }
    }

    componentDidMount() {
        if (!localStorage.getItem('token')) {
            this.props.history.push("/login");
        } else {
            this.loadStudents();
            this.loadProjects();
        }
    }

    loadStudents = () => {
        loadStudents().then((result) => {
            this.setState({ students: result.data })
        }).catch(err => {            
            alert("Failed to load students")
        })
    };

    loadProjects = () => {
        loadProjects().then((result) => {
            this.setState({ projects: result.data })
        }).catch(err => {            
            alert("Failed to load projects")
        })
    };

    edit = project => {
        getProject(project.id).then((result) => {
            this.setState({
                form: result.data,
                editModal: true
            })
        }).catch(err => {
            alert("Failed to get project data")
        })
    }

    add = () => {
        this.setState({
            form: {
                name: "",
                description: "",
                repoUrl: "",
                liveUrl: "",
                studentId: ""
            },
            errors: [],
            editModal: true
        })
    }

    toggle = () => {
        this.setState({editModal: !this.state.editModal})
    }

    delete = project => {
        deleteProject(project.id).then((result) => {
            this.setState({ projects: result.data })
        }).catch(err => {
            alert("Failed to delete project data")
        })
    }

    handleSearchChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        });
    };

    search = () => {
        searchProjects(this.state.search).then((result) => {
            this.setState({ projects: result.data })
        }).catch(err => {
            alert("Failed to delete project data")
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
            updateProject(form, this.state.form.id).then((result) => {
                this.setState({ projects: result.data, editModal: false })
            }).catch(err => {
                this.setState({errors: err.data.errors})
            })
        } else {
            delete form.id;
            saveProject(form).then((result) => {
                this.setState({ projects: result.data, editModal: false })
            }).catch(err => {
                this.setState({errors: err.data.errors})
            })
        }   
    };

    render() {
        return (
            <React.Fragment>
                <h2>Projects</h2>
                <Row>
                    <Col md={6}><Button onClick={this.add}>+ Add</Button></Col>
                    <Col md={6}>
                        <InputGroup>
                            <Input value={this.state.search} placeholder="Search...." onChange={this.handleSearchChange} name="search" />
                            <InputGroupAddon addonType="append">
                            <Button onClick={this.search}>Search</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
                <br />
                <Table hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Repo Url</th>
                            <th>Live Url</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.projects.map((project, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{project.name}</td>
                                        <td>{project.repoUrl}</td>
                                        <td>{project.liveUrl}</td>
                                        <td>
                                            <Button onClick={() => this.edit(project)} color={"primary"}>Edit</Button>{" "}
                                            <Button onClick={() => this.delete(project)} color={"danger"}>Delete</Button>
                                        </td>
                                    </tr>
                                )  
                            })
                        }

                    </tbody>
                </Table>
                <ProductModal
                    formData={this.state.form} 
                    handleChange={this.handleChange} 
                    handleSubmit={this.handleSubmit} 
                    students={this.state.students}
                    toggle={this.toggle} errors={this.state.errors} modal={this.state.editModal} />
            </React.Fragment>
        );
    }
}

export default Projects;
