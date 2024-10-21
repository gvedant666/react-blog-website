import BlogList from "./Blog-list";
import Fetchdata from "./FetchData";

const Home = () => {
    const {blogs, isLoading, isErr} = Fetchdata('http://localhost:8000/blogs');
    return ( 
        <div className="home">
            {isLoading && <div>Loading...</div>}
            {isErr && <div style={{color:"red", fontSize : "100px"}}>Error</div>}
            {blogs && <BlogList blog = {blogs} />}
        </div>
    );
}
 
export default Home;