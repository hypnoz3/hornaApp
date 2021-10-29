if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const Raid = require('./models/raid');

const dbUrl = process.env.DB_URL

const proge = 'https://raider.io/api/v1/guilds/profile?region=eu&realm=Twisting-nether&name=Horna&fields=raid_progression';

getProgress(proge);

async function getProgress(url) {
  const res = await fetch(url);
  const data = await res.json();
  const { raid_progression} = data
  const insertRaid = async() => {
    await Raid.findOneAndUpdate({
        title: "Sanctum Of Domination"
    },
    {
     $set: {
        progress: raid_progression['sanctum-of-domination'].summary
     }
     
    })
    console.log('Process Done!')
  }
  insertRaid().then(() => {
    mongoose.connection.close();
})
console.log('Connection Closed')
}


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

  
 
  
  
  
  
  
  
  




