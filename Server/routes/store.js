import express from "express"
import getAllStores from "../controllers/storeControllers/getAllStores.js" 

import FilterStores from "../controllers/storeControllers/filterStores.js" 
import GetStoreInfo from "../controllers/storeControllers/getStoreInfo.js" 

import registerStoreUser from "../controllers/storeControllers/addStoreUser.js"
import LoginStore from "../controllers/storeControllers/checkCredentialsStore.js"

const route = express.Router() 

// Route to get all the stores from the database.
// route.get("/get-stores", getAllStores) 

// Route to get the info of a store by searching with the id.
route.post("/get-store-info", GetStoreInfo) 

// Route to get stores depending on a string name.
route.post("/search-stores", FilterStores) 

route.put("/register-store-user", registerStoreUser)

route.post("/login", LoginStore)

export default route 