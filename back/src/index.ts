import app from './server'
import { PORT } from './config/envs'
import "reflect-metadata"
import { AppDataSource } from './config/data-source'

AppDataSource.initialize()
.then(()=>{
      console.log('Database connected...')
      app.listen(PORT, ()=>{
            console.log(`server listening on port ${PORT}`)
      })
})
.catch((error)=>console.log(error))

