import 'dotenv/config';
import app from './app';
import { PORT } from './config/index.config';

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
