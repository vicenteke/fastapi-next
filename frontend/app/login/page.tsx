import LoginForm from "@/components/LoginForm";

export default function Page() {
  return (
  <div style={{ display: 'flex', height: 'calc(100vh - 52px)', width: '100vw', alignItems: 'center' }}>
    <div className="container is-fluid">
      <div className="columns is-centered">
        <div className="column is-half-desktop is-12-mobile">
          <div className="card">
            <div className="card-content">
              <div className="content">
                <h2>Login</h2>
                <LoginForm redirect />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

