import { Router } from 'itty-router'
import { validateAndReturn } from "./recover";

// Create a new router
const router = Router()

/*
Our index route, a simple hello world.
*/
router.get("/", () => {
  return new Response("Hello, world! This is the root page of your Worker template.")
})

router.post('/decrypt', validateAndReturn)

/*
  This is the last route we define, it will match anything that hasn't hit a route we've defined
  above, therefore it's useful as a 404 (and avoids us hitting worker exceptions, so make sure to include it!).
  Visit any page that doesn't exist (e.g. /foobar) to see it in action.
*/
router.all("*", () => new Response("404, not found", { status: 404 }))


export default router;