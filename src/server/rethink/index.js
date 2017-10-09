import r from "rethinkdb";
import config from "../../../config";

async function main() {
  const conn = await r
    .connect({
      host: config.rethink.host,
      port: config.rethink.port,
      db: config.rethink.db,
      username: config.rethink.username,
      password: config.rethink.password,
      timeout: 5000
    })
    .catch(error =>
      console.log(
        `An error occured while trying to connect to the RethinkDB database. Error: ${error}`
      )
    );
  console.log(conn);
}

main();

// export default main;
