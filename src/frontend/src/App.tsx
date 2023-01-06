import React, { useState } from "react"
import superjson from "superjson"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"

import { trpc } from "./utils/trpc"

function Content() {
  const query = trpc.api.hello.useQuery()
  console.log(query.data)
  return <div>Hello World!</div>
}

function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: "http://localhost:2022/trpc",
        }),
      ],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Content />
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App
