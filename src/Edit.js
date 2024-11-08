import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FetchData from './FetchData';

const Edit = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const { blogs: Blog, isLoading, isErr } = FetchData(`http://localhost:8000/blogs/${id}`);

    useEffect(() => {
        if (Blog) {
            setTitle(Blog.title);
            setBody(Blog.body);
            setAuthor(Blog.author);
        }
    }, [Blog]);

    const handleEdit = (e) => {
        e.preventDefault();
        setIsPending(true);

        const updatedBlog = { title, body, author };

        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedBlog),
        })
        .then(() => {
            setIsPending(false);
            navigate('/');
        })
        .catch((err) => {
            setIsPending(false);
            console.error('Error updating blog:', err);
        });
    };

    return (
        <div className="edit">
            <h1>Editing the Blog</h1>
            {isLoading && <p>Loading...</p>}
            {isErr && <p style={{ color: 'red' }}>{isErr}</p>}
            {!isLoading && !isErr && (
                <form onSubmit={handleEdit}>
                    <label>Blog Title:</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    
                    <label>Blog Body:</label>
                    <textarea
                        required
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                    
                    <label>Blog Author:</label>
                    <input
                        type="text"
                        required
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    
                    {!isPending && <button type="submit">Edit Blog</button>}
                    {isPending && <button disabled>Editing...</button>}
                </form>
            )}
        </div>
    );
};

export default Edit;
