import app from './app';

app.listen(app.get('port'), () => {
  console.log('Server running on port %d', app.get('port'));
});
