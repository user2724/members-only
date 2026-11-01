const { Client } = require("pg")

const SQL = `

CREATE TABLE IF NOT EXISTS users (

id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
first_name VARCHAR( 100 ), last_name VARCHAR( 100 ), email VARCHAR( 100 ) CONSTRAINT unique_email UNIQUE, password VARCHAR( 100 ), has_membership BOOLEAN DEFAULT FALSE, is_admin BOOLEAN DEFAULT FALSE

);


CREATE TABLE IF NOT EXISTS messages (

id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
message_text VARCHAR( 1000 ), author VARCHAR( 100 ), date DATE NOT NULL DEFAULT CURRENT_DATE

);
    
`;

/*const constraint = `
ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email)
`*/
// Create messages table


async function main() {
    console.log("...seeding")
    const client = new Client({
        connectionString: "postgresql://mattn:SQLisfun@localhost:5432/message_users"
    })

    await client.connect()
    await client.query(SQL)
    //await client.query(constraint)
    await client.end()
    console.log("done")
}
main()