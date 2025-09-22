const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

const categories = [
  { slug: 'for-her', name: 'For Her' },
  { slug: 'for-him', name: 'For Him' },
  { slug: 'birthday', name: 'Birthday' },
  { slug: 'anniversary', name: 'Anniversary' }
];

const ruleBasedGifts = {
  'for-her': [
    { id: 'candle', name: 'Scented Candle', description: 'Calming fragrances' },
    { id: 'scarf', name: 'Silk Scarf', description: 'Elegant accessory' }
  ],
  'for-him': [
    { id: 'watch', name: 'Analog Watch', description: 'Classic style' },
    { id: 'wallet', name: 'Leather Wallet', description: 'Everyday essential' }
  ],
  birthday: [
    { id: 'cake', name: 'Custom Cake', description: 'Sweet celebration' },
    { id: 'balloons', name: 'Party Balloons', description: 'Festive decor' }
  ],
  anniversary: [
    { id: 'flowers', name: 'Bouquet of Flowers', description: 'Timeless romance' },
    { id: 'dinner', name: 'Dinner for Two', description: 'Special evening' }
  ]
};

app.get('/api/health', (_, res) => res.json({ ok: true }));

app.get('/api/categories', (_, res) => res.json(categories));

app.get('/api/categories/:slug/gifts', (req, res) => {
  const slug = req.params.slug;
  const gifts = ruleBasedGifts[slug] || [];
  res.json(gifts);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Gigil API running on :${PORT}`);
  });
}

module.exports = app;
