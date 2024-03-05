const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    db: {
      host: "db4free.net",
      user: 'valetestval',
      password: 'missisipi3885(',
      database: 'valetest'
    }    
  },
  e2e: {
    baseUrl: 'https://sqlverifier-staging-08050d656f7a.herokuapp.com',
    setupNodeEvents(on, config) {
      on('task', {
        queryDb: (query) => {
          return queryTestDb (query, config)
        }
      })
    },
  },
});
const mysql = require ('mysql')
function queryTestDb (query, config) {
  const connection = mysql.createConnection(config.env.db)
  connection.connect()
  return new Promise ((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else {
        connection.end()
        return resolve(results)
      }
    })
  })
}

