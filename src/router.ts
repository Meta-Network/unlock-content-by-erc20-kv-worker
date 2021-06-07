import { Router } from 'itty-router'
import {
  getRequirement,
  removeRequirement,
  setRequirement,
} from './controller/requirement'
import {
  getSecretKey,
  removeSecretKeyFor,
  setSecretKeyFor,
} from './controller/secretKeyStorage'
import { getStorage, removeStorage, setStorage } from './controller/storage'
import { requireAuth } from './middleware/requireAuth'
import { ExtendsRequest } from './typing'
import { ResponseWithJson } from './utils'

// Create a new router
const router = Router()

/*
Our index route, a simple hello world.
*/
router.get('/', () => {
  return new Response(
    'Hello, world! This is the root page of your Worker template.',
  )
})

router.get('/SNIPPETS_STORAGE/:key', requireAuth, getStorage)
router.put('/SNIPPETS_STORAGE/:key', requireAuth, setStorage)
router.delete('/SNIPPETS_STORAGE/:key', requireAuth, removeStorage)

/**
 * IPFS hash => 解锁的需求 数据
 */
router.get('/SNIPPETS_REQUIREMENT/:key', requireAuth, getRequirement)
router.put('/SNIPPETS_REQUIREMENT/:key', requireAuth, setRequirement)
router.delete('/SNIPPETS_REQUIREMENT/:key', requireAuth, removeRequirement)

/**
 * IPFS hash => 解密内容需要的私钥
 */
router.get('/SnippetToKey/:key', requireAuth, getSecretKey)
router.put('/SnippetToKey/:key', requireAuth, setSecretKeyFor)
router.delete('/SnippetToKey/:key', requireAuth, removeSecretKeyFor)

/*
  This is the last route we define, it will match anything that hasn't hit a route we've defined
  above, therefore it's useful as a 404 (and avoids us hitting worker exceptions, so make sure to include it!).
  Visit any page that doesn't exist (e.g. /foobar) to see it in action.
*/
router.all('*', () => new Response('404, not found', { status: 404 }))

export default router
