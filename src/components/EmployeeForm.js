import React from "react";
import "./EmployeeForm.css";

class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      title: "",
      department: "",
      errors: {},
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validate = () => {
    const { name, email, title, department } = this.state;
    const errors = {};

    if (!name.trim()) errors.name = "Name is required.";
    if (!email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!title.trim()) errors.title = "Job title is required.";
    if (!department.trim()) errors.department = "Department is required.";

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.validate()) return;

    const { name, email, title, department } = this.state;

    // Step 7: log to the console per the manual
    console.log("New Employee:", { name, email, title, department });

    // Example: if a parent passes onCreate, notify it
    if (this.props.onCreate) {
      this.props.onCreate({ name, email, title, department });
    }

    // Reset form
    this.setState({
      name: "",
      email: "",
      title: "",
      department: "",
      errors: {},
    });
  };

  render() {
    const { name, email, title, department, errors } = this.state;

    return (
      <section className="employee-form__wrapper">
        <h1 className="employee-form__heading">New Employee</h1>

        <form className="employee-form" onSubmit={this.handleSubmit} noValidate>
          <div className="employee-form__group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={this.handleChange}
              aria-describedby="nameHelp"
              required
            />
            <small id="nameHelp" className="hint">e.g., Jane Doe</small>
            {errors.name && <p className="error" role="alert">{errors.name}</p>}
          </div>

          <div className="employee-form__group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={this.handleChange}
              aria-describedby="emailHelp"
              required
            />
            <small id="emailHelp" className="hint">Use a company email if available.</small>
            {errors.email && <p className="error" role="alert">{errors.email}</p>}
          </div>

          <div className="employee-form__group">
            <label htmlFor="title">Job Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={this.handleChange}
              required
            />
            {errors.title && <p className="error" role="alert">{errors.title}</p>}
          </div>

          <div className="employee-form__group">
            <label htmlFor="department">Department</label>
            <input
              id="department"
              name="department"
              type="text"
              value={department}
              onChange={this.handleChange}
              required
            />
            {errors.department && <p className="error" role="alert">{errors.department}</p>}
          </div>

          <div className="employee-form__actions">
            <button type="submit" className="btn btn--primary">Add Employee</button>
          </div>
        </form>
      </section>
    );
  }
}

export default EmployeeForm;
