import jsCookie from "js-cookie"

import { TOKEN_DOMAIN, TOKEN_EXPIRES, TOKEN_NAME } from "@/common/config/constants"

export const login = (token: string) =>
  jsCookie.set(TOKEN_NAME, token, {
    domain: TOKEN_DOMAIN,
    sameSite: "Lax",
    secure: true,
    expires: +TOKEN_EXPIRES,
  })

export const logout = () => {
  jsCookie.remove(TOKEN_NAME, {
    domain: TOKEN_DOMAIN,
    sameSite: "Lax",
    secure: true,
    expires: 0,
  })
}
