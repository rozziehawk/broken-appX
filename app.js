const express = require('express');
//let axios = require('axios');
//var app = express();
const axios = require('axios')
const USER_API = "https://api.github.com/users"
const app = express();


app.use(express.json());

app.get('/', function(req, res) {
  return res.send('Hello World!');
});
/*=====================================================*/
app.post('/', async function(req, res, next) {
 
  try {
      
      let promises = req.body.developers.map((d) => 
        axios.get(`${USER_API}/${d}`)
      );

      let results = await Promise.all(promises);

      

      let out = results.map((r) => ({ 
        name: r.data.name, 
        bio: r.data.bio 
      }));
     return res.json(out);
   
   
  } catch(err) {
    return next(err);
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
