const app = require('./server/server');

app.listen(app.get('port'), () => {
    console.log(`Running on port::${app.get('port')}`);
});