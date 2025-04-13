import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { greet } from '../../server/t2-g5-iic3585/pkg/t2_g5_iic3585'

function App() {

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + WebAssembly + Rust</h1>
      <p>{greet("wena los chiquillossss")}</p>
    </>
  )
}

export default App
