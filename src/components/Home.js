import BlogList from './BlogList';
import useFetch from '../useFetch';

const Home = () => {
  
  // Fake data / UserList: 'http://jsonplaceholder.typicode.com/users')
  const {data: blogs, isPending, error} = useFetch('http://localhost:8000/blogs');

  return (    
    <div className="home">
      {isPending && <div>Loading...</div>}
      {error && <div className='red'>{error}</div>}
      {blogs && <BlogList blogs={blogs} title="All Blogs" />}      
    </div>
  );
}

export default Home;