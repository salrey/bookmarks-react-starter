import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BookmarkNewForm() {
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_API_URL;
  const [bookmark, setBookmark] = useState({
    name: "",
    url: "",
    category: "",
    isFavorite: false,
    description: "",
  });

  const handleTextChange = (event) => {
    setBookmark({ ...bookmark, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setBookmark({ ...bookmark, isFavorite: !bookmark.isFavorite });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // axios.post(`${URL}/bookmarks`, bookmark)
    // .then(() => navigate("/bookmarks"))
    // OR Call a function with bookmark
    addBookmark(bookmark)
    // OR if missing navigate in the function 
    // .then(() => navigate("/bookmarks"))
  };

  // OR have the axios in a function that you can call in handleSubmit 
  const addBookmark = (newBookmark) => {
    axios.post(`${URL}/bookmarks`, newBookmark)
    .then(() => navigate("/bookmarks"))
  }
  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={bookmark.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Website"
          required
        />
        <label htmlFor="url">URL:</label>
        <input
          id="url"
          type="text"
          pattern="http[s]*://.+"
          required
          value={bookmark.url}
          placeholder="http://"
          onChange={handleTextChange}
        />
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          type="text"
          name="category"
          value={bookmark.category}
          placeholder="educational, inspirational, ..."
          onChange={handleTextChange}
        />
        <label htmlFor="isFavorite">Favorite:</label>
        <input
          id="isFavorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={bookmark.isFavorite}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={bookmark.description}
          onChange={handleTextChange}
          placeholder="Describe why you bookmarked this site"
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default BookmarkNewForm;
