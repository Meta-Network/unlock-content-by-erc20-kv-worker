import { ExtendsRequest } from '../typing'
import { ResponseWithJson } from '../utils'

export const getOwnerOf = async ({ params }: ExtendsRequest) => {
  const hash = decodeURIComponent(params!.hash)
  const owner = await SNIPPETS_OWNER.get(hash)
  return ResponseWithJson({ owner })
}

export const setOwnerOf = async (req: ExtendsRequest) => {
  const requestBody = await req.json()
  const hash = decodeURIComponent(req.params!.hash)

  await SNIPPETS_OWNER.put(hash, requestBody.owner)

  return ResponseWithJson({ success: true }, 201)
}
