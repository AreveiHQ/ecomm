const { Client } = require('@elastic/elasticsearch');
const fs = require('fs')
  const esClient = new Client({
         node: 'https://arvecom.es.us-central1.gcp.cloud.es.io',
        // tls:{
        //         pfx:fs.readFileSync(`${__dirname}\\elastic-certificates.p12`),
        //         passphrase:'rishabh',
        //         rejectUnauthorized:false
        // },
        // auth:{
        // username:'elastic',
        // password:'rishabh'
        // },
        // auth:{
        // username:'elastic',
        // password:'X3CPcMGRTBRglteljQmdCfL9'
        // },
        cloud:{
                id:'arvEcom:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQ2MjU2YTQwZDM2YWY0MGU0OWM4MTcxNThkNzM2NjQ1ZCQ4YzEzMTQyZDQ1Njc0MDg1YTIwMjY1M2U0NTAzM2NlNg=='
        },
        auth:{
                apiKey:'cklaMzVaRUJtd25BQjZfaTV4Tzk6WjI3R19HTzZTNk9RM25WdmlLenk2Zw=='
        }
});

async function testConn(){
        try {
                const result = await esClient.ping();
                console.log("Elastic search Connected",result)
        } catch (error) {
                console.log("Elastic search not Connected",error)
        }
}
testConn();

module.exports = esClient