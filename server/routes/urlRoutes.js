import express from 'express';
import { nanoid } from 'nanoid';
import urlStore from '../models/urlStore.js';

const router = express.Router();

router.get('/stats', (req, res) => {
  const stats = [];
  for (const [code, data] of urlStore.entries()) {
    stats.push({
      shortUrl: `http://localhost:5000/${code}`,
      originalUrl: data.originalUrl,
      expiry: data.expiry,
      clicks: data.clicks,
      clickDetails: data.clickDetails,
    });
  }
  res.json(stats);
});



router.post('/shorten', (req, res) => {
  const urls = req.body.urls;
  if (!Array.isArray(urls) || urls.length === 0 || urls.length > 5) {
    return res.status(400).json({ error: 'Provide between 1 to 5 URLs.' });
  }

  const result = urls.map(({ originalUrl, customCode, validity }) => {
    if (!originalUrl) return { error: 'Original URL is required.' };

    const code = customCode || nanoid(6);
    const expiry = Date.now() + (validity || 30) * 60 * 1000;

    urlStore.set(code, {
      originalUrl,
      expiry,
      clicks: 0,
      clickDetails: [],
    });

    return { originalUrl, shortUrl: `http://localhost:5000/${code}`, expiry };
  });

  res.json(result);
});


router.get('/:code', (req, res) => {
  const code = req.params.code;
  const data = urlStore.get(code);

  if (!data) return res.status(404).send('Short URL not found.');
  if (Date.now() > data.expiry) return res.status(410).send('Link expired.');

  data.clicks++;
  data.clickDetails.push({ time: new Date().toISOString(), origin: req.get('origin') || 'unknown' });

  res.redirect(data.originalUrl);
});

export default router;
