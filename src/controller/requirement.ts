import { ExtendsRequest } from '../typing'
import { ResponseWithJson } from '../utils'

export const getRequirement = async ({ params }: ExtendsRequest) => {
  const key = decodeURIComponent(params!.key)
  console.info('key', key)
  const res = await SNIPPETS_REQUIREMENT.get(key)
  return ResponseWithJson({ data: res !== null ? JSON.parse(res) : null })
}

export const setRequirement = async (req: ExtendsRequest) => {
  const data = await req.json()
  const key = decodeURIComponent(req.params!.key)
  console.info('key', key)
  console.info('data', data)

  await SNIPPETS_REQUIREMENT.put(key, JSON.stringify(data))
  return ResponseWithJson({ success: true }, 201)
}

export const removeRequirement = async (req: ExtendsRequest) => {
  const key = decodeURIComponent(req.params!.key)
  console.info('key', key)
  await SNIPPETS_REQUIREMENT.delete(key)
  return ResponseWithJson({ success: true }, 200)
}
