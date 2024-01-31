const port = process.env.PORT || 3000; 

module.exports = {
    swaggerDefinition:{
        swagger: "2.0",
        info:{
            "title": "API Proyecto FoodCentral",
            "description":"API CRUD, para proyecto FoodCentral",
            "version":"1.0.0",
            "servers": ["http://localhost:"+port]
        }
    },
    apis:["src/routes/*.js"]
}