import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function BookmarkEditForm() {
  const URL = process.env.REACT_APP_API_URL;
  const { index } = useParams();
  const navigate = useNavigate();

  const [bookmark, setBookmark] = useState({
    name: "",
    url: "",
    category: "",
    description: "",
    isFavorite: false,
  });

  const handleTextChange = (event) => {
    setBookmark({ ...bookmark, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setBookmark({ ...bookmark, isFavorite: !bookmark.isFavorite });
  };

  useEffect(() => {
    axios.get(`${URL+"/bookmarks/"+index}`)
    .then((response) => setBookmark(response.data))
  }, [URL, index]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // What should we do when the user presses the submit button?
      // - make a PUT request
      // - render a specific component when we update one resource, we should got to that resource's detail page
      // Make a PUT request at this url and update the request.body with this new bookmark
      axios.put(`${URL+"/bookmarks/"+index}`, bookmark)
      .then(() => navigate(`/bookmarks/${index}`))
      // .catch((e) => console.warn("catch", c)))
  };
  return (
    <div className="Edit">
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
      <Link to={`/bookmarks/${index}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default BookmarkEditForm;
