require('dotenv').config()
const app = require('express')()
const axios = require('axios')
const TwitterClient = require('twitter-api-client').TwitterClient

const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

app.get('/twitter/:query', function (req, res) {
    const query = req.params.query

    twitterClient.tweets.search({
        q: query
    }).then((response) => {
        res.send(response)
    }).catch((err) => {
        console.error(err)
        res.status(500).send('An error occurred, please try again later.')
    })
});

app.get('/instagram/:query', function (req, res) {
    const query = req.params.query

    axios.get('https://www.instagram.com/explore/tags/' + query + '/?__a=1')
        .then((response) => {
            res.send(response.data)
        })
        .catch((err) => {
            console.error(err)
            res.status(500).send('An error occurred, please try again later.')
        })
})

app.get('/tumblr/:query', function (req, res) {
    const query = req.params.query

    axios.get('https://api.tumblr.com/v2/tagged?tag=' + query + '&api_key=' + process.env.TUMBLR_CONSUMER_KEY)
        .then((response) => {
            res.send(response.data)
        })
        .catch((err) => {
            console.error(err)
            res.status(500).send('An error occurred, please try again later.')
        })
})

app.get('/pinterest/:query', function (req, res) {
    const query = req.params.query

    axios.get('https://www.googleapis.com/customsearch/v1?key=' + process.env.CUSTOM_SEARCH_API_KEY + 
        '&cx=' + process.env.CUSTOM_SEARCH_CX + '&q=' + query)
        .then((response) => {
            res.send(response.data.items)
        })
        .catch((err) => {
            console.error(err)
            res.status(500).send('An error occurred, please try again later.')
        })
})

app.listen(3000, function () {
    console.log("started server for social search!")
})