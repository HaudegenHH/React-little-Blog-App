import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";


import useFetch from "../useFetch";

const BlogDetails = () => {
  const {id} = useParams(); // destructuring the named param from path (e.g) "/blogs/42"
  
  const {data: blog, isPending, error} = useFetch(`http://localhost:8000/blogs/${id}`);
  const history = useHistory();

  const handleDelete = () => {
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: 'DELETE'
    }).then(() => {
      history.push('/');
    })
  }

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <div className="subtitle">
            <small><i>Written by <strong>{blog.author}</strong></i></small>
            <small>Added: {blog.dateTime}</small>
          </div>
          <hr />
          <div>{blog.body}</div>
          <button onClick={handleDelete}>Delete</button>
        </article>
      )}
    </div>
  )
}

export default BlogDetails;