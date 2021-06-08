import { ExtendsRequest } from '../typing'
import { ResponseWithJson } from '../utils'

export const getSecretKey = async ({ params }: ExtendsRequest) => {
  const key = decodeURIComponent(params!.key)
  const res = await SnippetToKey.get(key)
  if (!res) return ResponseWithJson({ data: null })
  return ResponseWithJson({ data: JSON.parse(res) })
}

export const setSecretKeyFor = async (req: ExtendsRequest) => {
  const data = await req.json()
  const key = decodeURIComponent(req.params!.key)
  await SnippetToKey.put(key, JSON.stringify(data))
  return ResponseWithJson({ success: true }, 201)
}

export const removeSecretKeyFor = async (req: ExtendsRequest) => {
  const key = decodeURIComponent(req.params!.key)
  await SnippetToKey.delete(key)
  return ResponseWithJson({ success: true }, 200)
}
