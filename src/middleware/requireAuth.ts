import { ResponseWithJson } from "../utils"

export const requireAuth = (request: Request) => {
  const authorization = request.headers.get('Authorization')
    if (!authorization || authorization !== `Bearer b83fddef-fce4-46f1-b103-690de11fd51d`) {
      return ResponseWithJson({ message: 'Not Authenticated' }, 401)
    }
  }