import {AppDataSource} from "@/db/ormconfig";

AppDataSource.initialize().then(() => {
    console.log("AppDataSource initialized");
}).catch((error) => {
    console.log("AppDataSource failed to initialize");
    console.log(error);
});