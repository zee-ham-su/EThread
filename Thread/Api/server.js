const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const checkOutRoutes = require('./routes/checkOutRoutes');
const path = require('path');

require('dotenv').config();

const connectDB = require('./mondb.js');
connectDB();

app.use(bodyParser.json());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/checkouts', checkOutRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to TechThread Rest API using MongoDB, ExpressJs!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('TechThread app listening ${port}!');
});
