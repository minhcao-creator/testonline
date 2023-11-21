/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import './sb-admin-2.css';
import './sb-admin-2.min.css';
const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<App />);
