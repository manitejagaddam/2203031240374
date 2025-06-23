import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function UrlShortenerForm() {
  const [urls, setUrls] = useState([{ originalUrl: '', customCode: '', validity: '' }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addInput = () => {
    if (urls.length < 5) setUrls([...urls, { originalUrl: '', customCode: '', validity: '' }]);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/shorten', { urls });
      setResults(response.data);
    } catch (err) {
      alert(err.response?.data?.error || 'Error shortening URLs.');
    }
  };

  return (
    <Box>
      {urls.map((url, idx) => (
        <Box key={idx} sx={{ mb: 2 }}>
          <TextField
            label="Original URL"
            fullWidth
            sx={{ mb: 1 }}
            value={url.originalUrl}
            onChange={(e) => handleChange(idx, 'originalUrl', e.target.value)}
          />
          <TextField
            label="Custom Code (optional)"
            fullWidth
            sx={{ mb: 1 }}
            value={url.customCode}
            onChange={(e) => handleChange(idx, 'customCode', e.target.value)}
          />
          <TextField
            label="Validity in minutes (optional, default 30)"
            type="number"
            fullWidth
            value={url.validity}
            onChange={(e) => handleChange(idx, 'validity', e.target.value)}
          />
        </Box>
      ))}

      {urls.length < 5 && <Button onClick={addInput} sx={{ mb: 2 }} variant="outlined">Add another URL</Button>}

      <Button onClick={handleSubmit} variant="contained" fullWidth>Shorten</Button>

      {results.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Results:</Typography>
          {results.map((res, i) => (
            <Box key={i} sx={{ mb: 1 }}>
              <Typography>Original: {res.originalUrl}</Typography>
              <Typography>Short URL: <a href={res.shortUrl} target="_blank">{res.shortUrl}</a></Typography>
              <Typography>Expires At: {new Date(res.expiry).toLocaleString()}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
