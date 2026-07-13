import './App.css'

function App() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="display-6 fw-bold">OctoFit Tracker</h1>
              <p className="lead text-muted">
                A modern multi-tier fitness tracking experience for teams and individuals.
              </p>
              <ul className="list-group list-group-flush mt-4">
                <li className="list-group-item">User profiles and authentication</li>
                <li className="list-group-item">Activity logging and leaderboards</li>
                <li className="list-group-item">Workout suggestions and team management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
