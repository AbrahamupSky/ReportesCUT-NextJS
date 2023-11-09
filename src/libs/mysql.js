import mysql from 'serverless-mysql'

export const conn = mysql({
  config: {
    host: 'localhost',
    user: 'root',
    password: 'Cfroot19-',
    port: 3306,
    database: 'cutdb'
  }
})