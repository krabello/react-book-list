import React, { Component } from "react";
import { graphql } from "react-apollo";
import compose from "lodash.flowright";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      genre: null,
      authorId: null,
      fields: {},
      errors: {},
    };
  }

  displayAuthors() {
    var data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading authors</option>;
    } else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Name Cannot be empty";
    }
    if (!fields["genre"]) {
      formIsValid = false;
      errors["genre"] = "Genre Cannot be empty";
    }
    if (!fields["authorId"]) {
      formIsValid = false;
      errors["authorId"] = "Author Cannot be empty";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  submitForm(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      this.props.addBookMutation({
        variables: {
          name: this.state.name,
          genre: this.state.genre,
          authorId: this.state.authorId,
        },
        refetchQueries: [{ query: getBooksQuery }],
      });
    }
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            onChange={(e) => {
              this.setState({ name: e.target.value });
            }}
          />
          <div></div>
          <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={(e) => {
              this.setState({ genre: e.target.value });
            }}
          />
          <div></div>
          <span style={{ color: "red" }}>{this.state.errors["genre"]}</span>
        </div>
        <div className="field">
          <label>Author:</label>
          <select
            onChange={(e) => {
              this.setState({ authorId: e.target.value });
            }}
          >
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
          <div></div>
          <span style={{ color: "red" }}>{this.state.errors["authorId"]}</span>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
