import { ExtendsRequest } from '../typing'
import { ResponseWithJson } from '../utils'

export const getStorage = async ({ params }: ExtendsRequest) => {
  const key = decodeURIComponent(params!.key)
  const res = await SNIPPETS_STORAGE.get(key)
  return ResponseWithJson({ data: res })
}

export const setStorage = async (req: ExtendsRequest) => {
  const data = await req.json()
  const key = decodeURIComponent(req.params!.key)
  await SNIPPETS_STORAGE.put(key, JSON.stringify(data))
  return ResponseWithJson({ success: true }, 201)
}

export const removeStorage = async (req: ExtendsRequest) => {
  const key = decodeURIComponent(req.params!.key)
  await SNIPPETS_STORAGE.delete(key)
  return ResponseWithJson({ success: true }, 200)
}
