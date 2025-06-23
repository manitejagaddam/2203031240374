import { Routes, Route, Link } from 'react-router-dom';
import { Container, Button, Typography } from '@mui/material';
import UrlShortenerForm from './components/UrlShortenerForm';
import Statistics from './components/Statistics';

export default function App() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      <Button component={Link} to="/" variant="contained" sx={{ mr: 2 }}>Shorten URLs</Button>
      <Button component={Link} to="/stats" variant="contained">Statistics</Button>

      <Routes>
        <Route path="/" element={<UrlShortenerForm />} />
        <Route path="/stats" element={<Statistics />} />
      </Routes>
    </Container>
  );
}
