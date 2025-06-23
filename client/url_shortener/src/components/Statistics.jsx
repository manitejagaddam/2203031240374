import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Divider } from '@mui/material';

export default function Statistics() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/stats').then(res => setStats(res.data));
  }, []);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Statistics</Typography>
      {stats.map((item, idx) => (
        <Box key={idx} sx={{ mb: 3 }}>
          <Typography>Short URL: <a href={item.shortUrl} target="_blank">{item.shortUrl}</a></Typography>
          <Typography>Original URL: {item.originalUrl}</Typography>
          <Typography>Expires: {new Date(item.expiry).toLocaleString()}</Typography>
          <Typography>Total Clicks: {item.clicks}</Typography>
          {item.clickDetails.length > 0 && (
            <Box sx={{ pl: 2 }}>
              <Typography>Click Details:</Typography>
              {item.clickDetails.map((click, i) => (
                <Typography key={i} variant="body2">• {click.time} | Origin: {click.origin}</Typography>
              ))}
            </Box>
          )}
          <Divider sx={{ my: 1 }} />
        </Box>
      ))}
    </Box>
  );
}
