import { Link } from "react-router-dom";

const BlogList = (props) => {
    const blogs = props.blog;
    return ( 
        <div className="blog-preview">
            {blogs.map(blog => (
                <div className="each-blog-preview" key={blog.id}>
                    <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none' }}>
                        <h2> {blog.title}</h2>
                        <p >Written by {blog.author}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}
 
export default BlogList;