import { ExtendsRequest } from '../typing'
import { ResponseWithJson } from '../utils'

export const getSecretKey = async ({ params }: ExtendsRequest) => {
  const key = decodeURIComponent(params!.key)
  const res = await SnippetToKey.get(key)
  return ResponseWithJson({ data: res })
}

export const setSecretKeyFor = async (req: ExtendsRequest) => {
  const data = await req.json()
  const key = decodeURIComponent(req.params!.key)
  const res = await SnippetToKey.put(key, data)
  return ResponseWithJson({ data: res }, 201)
}

export const removeSecretKeyFor = async (req: ExtendsRequest) => {
  const key = decodeURIComponent(req.params!.key)
  const res = await SnippetToKey.delete(key)
  return ResponseWithJson({ data: res }, 200)
}
