import { useState, useEffect } from "react";
import Bookmark from "./Bookmark";
import axios from "axios"

function Bookmarks() {
  //TESTING: const [count, setCount] = useState(0);
  const [bookmarks, setBookmarks] = useState([]);
  const URL = process.env.REACT_APP_API_URL;

  //STEPS to get API, grab the api url and console.log the following from axios 
    //response you get from axios
    // response you get from response.data
    //figure out how to use the hook to get the response and get the bookmarks showing (three bookmarks)

  //useEffect will run everytime /bookmarks re-renders
  //By depending on empty array in second argument, useEffect hits when anything in array is changed or on initial render
  //
  useEffect(() => {
    // fetch(URL+"/bookmarks")
    //   .then((response) => { console.log(response); return response.json()})
    //   .then((data) => {
    //     console.log(data)
    //     setBookmarks(data)
    //   })

    //Unlike fetch, with axios we don't have to do response.json() and we're also given access to config, headers, request, status codes, etc. Plus most browsers support axios, whereas fetch has a lot errors between browsers
    //Fetch is also a good starting one because you don't have to install it. it's built into all modern browsers. 
    //We don't need to use async function here since we're using .then, but async/await is a great alternative!
    axios.get(URL+"/bookmarks")
      .then((response) => {
        console.log(response);
        console.log(response.data)
        setBookmarks(response.data)
      })
      
    //async/await is very new but similar to .then like so
    // const fetchData = async () => {
    //   const response = await axios.get(URL+"/bookmarks")
    //   setBookmarks(response.data);
    // }
    // fetchData()

    // TESTING: console.log("we hit the useEffect")
  }, [URL])

  return (
    <div className="Bookmarks">
      <section>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Take me there</th>
              <th>See this bookmark</th>
            </tr>
          </thead>
          {/*TESTING: <h1>{count}</h1>
          <button onClick={() => setCount(10)} >SET TO 10</button> */}
          <tbody>
            {bookmarks.map((bookmark, index) => {
              return <Bookmark key={index} bookmark={bookmark} index={index} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Bookmarks;
