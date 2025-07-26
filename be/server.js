
const app = require('./app');

if (process.env.NODE_ENV !== 'production' || process.env.NODE_ENV ==undefined) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}


module.exports = app;
