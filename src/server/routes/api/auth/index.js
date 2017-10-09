import express from 'express';

const router = express.Router();

router.get('/login', async (req, res) => {
  console.log(req, res); // eslint-disable-line no-console
});

router.get('/callback', async (req, res) => {
  console.log(req, res); // eslint-disable-line no-console
});
