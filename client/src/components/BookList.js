import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";
import Loader from "./Loader";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      loading: true,
    };
  }
  displayBooks() {
    let data = this.props.data;
    if (data.loading) {
      return <Loader color="#9D2857" loading={this.state.loading} />;
    }
    return data.books.map((book) => {
      return (
        <li
          onClick={(e) => {
            this.setState({ selected: book.id });
          }}
          key={book.id}
        >
          {book.name}
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
