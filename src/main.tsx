import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import App from './App';
import './index.css'
import { Provider } from 'jotai';
import { BrowserRouter } from 'react-router-dom'
import './utils/i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // 暫時關閉嚴格模式
  // <React.StrictMode>
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Provider>
        <CssBaseline />
        <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
  // </React.StrictMode>,
);