import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isPending, setIsPending] = useState(false);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    let now = new Date();
    let dateTime = now.toLocaleString();

    const blog = { title, body, author, dateTime };

    setIsPending(true);

    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(()=>{
      setTimeout(()=>{
        console.log("New Blog added");
        setIsPending(false);
        setTitle('');
        setBody('');
        setAuthor('mario');
        
        // history.go(-1);
        history.push('/');
      }, 1000)
    })
  }

  return (
    <div className='create'>
      <h2>Add a new Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title</label>
        <input 
          type="text"           
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Body</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog Author</label>
        <select 
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="mario">Mario</option>
          <option value="luigi">Luigi</option>
        </select>
        {!isPending 
          ? <button>Add Blog</button>
          : <button disabled className="gray">Adding...Please wait</button>
        }
      </form>
    </div>
  );
}

export default Create