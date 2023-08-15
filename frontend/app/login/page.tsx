import LoginForm from "@/components/LoginForm";
import Columns from "@/components/Columns";
import Column from "@/components/Column";

export default function Page() {
  return (
  <div style={{ display: 'flex', height: 'calc(100vh - 52px)', width: '100vw', alignItems: 'center' }}>
    <div className="container is-fluid">
      <Columns center>
        <Column size={['half-desktop', '12-mobile']}>
          <div className="card">
            <div className="card-content">
              <div className="content">
                <h2>Login</h2>
                <LoginForm redirect />
              </div>
            </div>
          </div>
        </Column>
      </Columns>
    </div>
  </div>
  )
}

