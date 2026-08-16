import { Link } from 'react-router-dom'

function ErrorPage() {
    return (
        <main className="page error-page">
            <section className="error-card">
                <h1>Page not found</h1>

                <p>The requested page does not exist.</p>

                <Link to="/">Return to the application</Link>
            </section>
        </main>
    )
}

export default ErrorPage
