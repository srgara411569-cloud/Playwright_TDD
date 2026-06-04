import { Client } from 'pg';
import config from '../../config/config.json' with {type: 'json'};

export class DBCommons {

    async getData(query: string): Promise<Array<Object>> {

        //Create a new client instance configuration to connect with the database. 
        const dbConfig = new Client({
            host: config.db.host,
            port: config.db.port,
            user: config.db.username,
            password: config.db.password,
            database: config.db.database
        })

        //Connect with the database with above connection details. 
        await dbConfig.connect();

        //Execute the query and get the data. 
        const data = await dbConfig.query(query);

        //Close the database connection. 
        await dbConfig.end();

        //Return all the records received from the database table. 
        return data.rows;

    }

}

let db = new DBCommons();
const query = "SELECT * FROM CATEGORY";
const data = await db.getData(query);
console.log(data[0]["tc_name"]);