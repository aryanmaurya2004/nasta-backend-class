import express from 'express'
import { usersRouter } from './users/route.mjs'
import { menuRouter } from './menu/route.mjs' 
const app = express()
const port = 3000

app.use(express.json())

app.use("/users", usersRouter)
app.use("/menus", menuRouter)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 
