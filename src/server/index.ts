import { serverConfig } from "../config"
import { createServer } from "./server"

async function main() {
  const server = await createServer(serverConfig)

  server.start()
}

main()
