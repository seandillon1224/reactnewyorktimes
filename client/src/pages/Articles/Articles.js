import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import SearchBtn from "../../components/SearchBtn";
import AddBtn from "../../components/AddBtn";
import API, {queryNYTimes} from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Articles extends Component {
    
  // Setting our component's initial state
  state = {
    articles: [],
    title: "",
    author: "",
    synopsis: "",
    newArticles: [],
    results: [],
    search: [],
    begin: "",
    end: ""
        
  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadArticles();
    console.log(this.state.articles)
    // this.loadNewArticles();

  }

  search = (query, begin, end) => {
      console.log(begin)
      console.log(end)
        queryNYTimes(query, begin, end)
        .then(results => { 
           this.setState({ results: [results] })
         })
        //   .catch(err => console.log(err));
  }

  componentDidUpdate() {
      console.log(this.state.articles)
      console.log('updated')
  }
  // Loads all books  and sets them to this.state.books
  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data })
        
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteArticle = id => {
    API.deleteArticles(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  addArticle = id => {
      console.log(id)
      API.saveArticles({
          title: id.headline.main,
          date: id.pub_date,
          url: id.web_url
      })
      .then(res => this.loadArticles())
      .catch(err => console.log(err))
  }

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state.search)
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
      API.saveBook({
        title: this.state.title,
        date: this.state.date,
        url: this.state.url
      })
        .then(res => this.loadArticles())
        .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Search Results</h1>
            </Jumbotron>
            {this.state.results.length ? (
              <List>
                {this.state.results[0].map((article, index )=> {
                  return (
                    <ListItem key={index}>
                      <a href={"/article/" + article._id}>
                        <strong>
                          <div>Headline: {article.headline.main}</div>
                          <div>Url: {article.web_url}</div>
                          <div>Publish Date: {article.pub_date}</div>
                        </strong>
                      </a>
                      <AddBtn onClick={() => this.addArticle(article)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
            </Col>
        </Row>
        <Row>
          <Col size = "md-12">
          <SearchBtn onClick={() => this.search(this.state.search, this.state.begin, this.state.end)}/>
          <Input
                value={this.state.search}
                onChange={this.handleInputChange}
                name="search"
                placeholder="Search"
              />
         <Input
                value={this.state.begin}
                onChange={this.handleInputChange}
                name="begin"
                placeholder="Begin Date"
              />
          <Input
                value={this.state.end}
                onChange={this.handleInputChange}
                name="end"
                placeholder="End Date"
              />
          </Col>  
        </Row>
    <Row>
    <Col size = "md-12">
    <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => {
                  return (
                    <ListItem key={article._id}>
                      <a href={"/article/" + article._id}>
                        <strong>
                          <div>Headline: {article.title}</div>
                          <div>Url: {article.url}</div>
                          <div>Publish Date: {article.date}</div>
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
            </Col>
    </Row>
      </Container>
    );
  }
}

export default Articles;
