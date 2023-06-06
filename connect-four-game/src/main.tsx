import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux/es/exports'
import storeReducer from './components/store.ts'

const store = configureStore({
  reducer: {
    user: storeReducer
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
      <App />
    </Provider>
)
