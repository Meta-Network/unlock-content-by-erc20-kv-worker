import { Router } from 'itty-router'
import { requireAuth } from "./middleware/requireAuth";
import { ResponseWithJson } from './utils';

// Create a new router
const router = Router()

class ExtendsRequest extends Request {
  params?: Record<string, any>;
}

/*
Our index route, a simple hello world.
*/
router.get("/", () => {
  return new Response("Hello, world! This is the root page of your Worker template.")
})

router.get('/SNIPPETS_STORAGE/:key', requireAuth, ({ params }) => {
  const key = decodeURIComponent(params!.key)
  const res = SNIPPETS_STORAGE.get(key)
  return ResponseWithJson({ data: res })
})

router.put('/SNIPPETS_STORAGE/:key', requireAuth, async (req: ExtendsRequest) => {
  const data = await req.json()
  const key = decodeURIComponent(req.params!.key)
  SNIPPETS_STORAGE.put(key, JSON.stringify(data));
  return ResponseWithJson({ success: true }, 201)
})

router.delete('/SNIPPETS_STORAGE/:key', requireAuth, async (req) => {
  const key = decodeURIComponent(req.params!.key)
  SNIPPETS_STORAGE.delete(key);
  return ResponseWithJson({ success: true }, 200)
})

router.get('/SnippetToKey/:key', requireAuth, ({ params }) => {
  const key = decodeURIComponent(params!.key)
  const res = SnippetToKey.get(key)
  return ResponseWithJson({ data: res })
})

router.put('/SnippetToKey/:key', requireAuth, async (req: ExtendsRequest) => {
  const data = await req.json()
  const key = decodeURIComponent(req.params!.key)
  const res = SnippetToKey.put(key, data);
  return ResponseWithJson({ data: res }, 201)
})

router.delete('/SnippetToKey/:key', requireAuth, async (req) => {
  const key = decodeURIComponent(req.params!.key)
  const res = SnippetToKey.delete(key);
  return ResponseWithJson({ data: res }, 200)
})


/*
  This is the last route we define, it will match anything that hasn't hit a route we've defined
  above, therefore it's useful as a 404 (and avoids us hitting worker exceptions, so make sure to include it!).
  Visit any page that doesn't exist (e.g. /foobar) to see it in action.
*/
router.all("*", () => new Response("404, not found", { status: 404 }))


export default router;