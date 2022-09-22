const express = require('express');
const app = express()
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.json())

const {Octokit} = require('@octokit/core');
const octokit = new Octokit({auth : 'yourtoken'});

app.get('/', (request, response) => {
    response.status(200).render('index')
})

app.post('/getUser', (request, response) => {
    let country = request.body.country,
        page = request.body.page || 1;
    async function getUser() { 
        let query = '?q=' + encodeURIComponent('location:'+country)+'&page='+page;
        await octokit.request('GET /search/users'+query, {})
            .then((value) => {
                response.send({
                    value : value,
                    isError : false
                })
            })
            .catch((err) => {
                response.send({isError : true})
                console.log(err)
            })
    }
    getUser()
})

app.listen(3000)
