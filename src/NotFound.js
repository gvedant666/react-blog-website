import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found">
            <p>That page cannot be found</p>
            <Link to="/">Back to the homepage...</Link> {/* Use Link component for navigation */}
        </div>
    );
}

export default NotFound;
