import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";
import Loader from "./Loader";
import { GraphQLError } from "graphql";

class BookDetails extends Component {
  constructor(props) {
    if (GraphQLError.book) {
      console.log("eee");
    }
    super(props);
    this.state = {
      loading: true,
    };
  }

  displayBookDetails() {
    const data = this.props.data;
    const { book } = this.props.data;

    if (data.loading) {
      return <Loader color="#fff" loading={this.state.loading} />;
    }

    if (book) {
      return (
        <div>
          <h1>{book.name}</h1>
          <div>Genre: {book.genre}</div>
          <hr />
          <div
            style={{
              background: `rgba(255, 255, 255, 0.3)`,
              padding: "10px 20px",
              margin: "8px",
            }}
          >
            <h2>Author Information</h2>
            <div>Name: {book.author.name}</div>
            <div>Age: {book.author.age}</div>
          </div>
          <div
            style={{
              background: `rgba(255, 255, 255, 0.3)`,
              padding: "10px 20px",
              margin: "8px",
            }}
          >
            <h2>Related Books</h2>
            <div>
              {book.author.books.map((book) => {
                return (
                  <div style={{ margin: "8px" }} key={book.id}>
                    {book.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return <div id="book-details">{this.displayBookDetails()}</div>;
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId,
      },
    };
  },
})(BookDetails);
