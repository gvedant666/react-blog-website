import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false);
    const Navigate = useNavigate();

    
    const handleSubmit = (e) => {
        setIsPending(true);
        e.preventDefault();
        const blog = { title, body, author };
        console.log('New Blog:', blog);
        setTimeout(() => {
            fetch('http://localhost:8000/blogs', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(blog)
            }).then(() => {
                setIsPending(false);
                Navigate('/');
            });
        }, 1000);
        
        setTitle('');
        setBody('');
        setAuthor('');
    };

    return ( 
        <div className="create">
            <h1>Create a New Blog</h1>
            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
                
                <label>Blog Body:</label>
                <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                
                <label>Blog Author:</label>
                <input type="text" required value={author} onChange={(e) => setAuthor(e.target.value)} />
                
                {!isPending && <button type="submit">Add Blog</button>}
                {isPending && <button disabled>Adding Blog...</button>}
            </form>
        </div>
    );
};

export default Create;
