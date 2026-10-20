const { Client } = require("pg")

const SQL = `

CREATE TABLE IF NOT EXISTS users (

id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
first_name VARCHAR( 100 ), last_name VARCHAR( 100 ), email VARCHAR( 100 ), password VARCHAR( 100 ), has_membership BOOLEAN DEFAULT FALSE

);

INSERT INTO users (first_name, last_name, email, password, has_membership) 
VALUES 
    ('John', 'Smith', 'john_smith@gmail.com', '1234', FALSE)

`;
// Create messages table


async function main() {
    console.log("...seeding")
    const client = new Client({
        connectionString: "postgresql://mattn:SQLisfun@localhost:5432/message_users"
    })

    await client.connect()
    await client.query(SQL)
    await client.end()
    console.log("done")
}
main()