import axios from "axios";

export default {
  // Gets all books



// Export an object with a "search" method that searches the Giphy API for the passed query

  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the book with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the book with the given id
  deleteArticles: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a book to the database
  saveArticles: function(articleData) {
    return axios.post("/api/articles", articleData);
  },
  getNewArticles: function() {
    return axios.get("/api/articles/articles")
  }
};

export const queryNYTimes = (query, begin, end) => {

  return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", { 
    params: { 
      'api-key': "710062e5c867491f91232ffb408137fc",
      'q': query,
      "begin_date": begin.toString(),
      "end_date": end.toString(),
      'fl': "web_url, pub_date, headline"
    }})
    .then((results) => {
      return results.data.response.docs
    })




}
