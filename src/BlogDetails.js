import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Fetchdata from "./FetchData";

const BlogDetails = () => {
    const { id } = useParams();
    const { blogs: Blog, isLoading, isErr } = Fetchdata('http://localhost:8000/blogs/' + id);
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();

    const handleDelete = () => {
        setDeleting(true);
        setTimeout(() => {
            fetch('http://localhost:8000/blogs/' + id, {
                method: 'DELETE'
            })
            .then(() => {
                console.log('Blog Deleted');
                setDeleting(false);
                navigate('/');
            })
            .catch((error) => {
                console.error('Error deleting the blog:', error);
                setDeleting(false);
            });
        }, 1000);
    };

    const handleEdit = () => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className="BlogDetails">
            <div className="title">
                {isLoading && <div>Loading...</div>}
                {isErr && <div style={{ color: "red", fontSize: "50px" }}>Blog not found :(</div>}
                {Blog && (
                    <article>
                        <h2>{Blog.title}</h2>
                        <p>Written by {Blog.author}</p>
                        <div>{Blog.body}</div>
                    </article>
                )}
                <div className="buttons">
                    {!deleting && <button onClick={handleDelete}>Delete</button>}
                    {deleting && <button disabled>Deleting...</button>}
                    <button onClick={handleEdit}>Edit</button>
                </div>
            </div>
        </div>
    );
}

export default BlogDetails;
