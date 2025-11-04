import { HashRouter } from "react-router-dom"
import Layout from "#/components/common/Layout"
import { AppRoutes } from "#/routes"

function App() {
  return (
    <HashRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </HashRouter>
  )
}

export default App
