import { AxiosResponse } from "axios"
import jsCookie from "js-cookie"

import axiosMiddleware from "./axios.middleware"
import { API_VERSION } from "../enums/api-version.enum"
import { HTTP_METHOD } from "../enums/http-method.enum"

import { HOST, TOKEN_NAME } from "@/common/config/constants"



type Headers = Record<string, string>

type RequestOptions = {
  version?: string
  headers?: Headers
  endpoint: string
}

class HttpRequest {
  private controller: AbortController | null = null

  constructor(
    public version: string = API_VERSION.V1,
    public endpoint: string = "",
    public headers: Headers = {
      "Content-Type": "application/json",
    },
  ) {}

  public useToken(token?: string) {
    const authorizationToken = token || jsCookie.get(TOKEN_NAME)
    this.headers = {
      ...this.headers,
      ...(authorizationToken && {
        Authorization: `Bearer ${authorizationToken.replace("Bearer ", "")}`,
      }),
    }
  }

  protected configRequest({
    version = API_VERSION.V1,
    headers,
    endpoint,
  }: RequestOptions) {
    this.version = version
    if (headers) this.headers = headers
    this.endpoint = endpoint
  }

  protected async post<P, R>(data: P): Promise<AxiosResponse<R>> {
    this.useToken(jsCookie.get(TOKEN_NAME))
    this.controller = new AbortController()
    return axiosMiddleware.request({
      url: `${HOST}/api/${this.version}/${this.endpoint}`,
      method: HTTP_METHOD.POST,
      data,
      headers: this.headers,
      signal: this.controller?.signal,
    })
  }

  protected async get<R>(): Promise<AxiosResponse<R>> {
    this.useToken(jsCookie.get(TOKEN_NAME))
    this.controller = new AbortController()
    return axiosMiddleware.request({
      url: `${HOST}/api/${this.version}/${this.endpoint}`,
      method: HTTP_METHOD.GET,
      headers: this.headers,
      signal: this.controller?.signal,
    })
  }

  protected async getWithParams<P, R>(params: P): Promise<AxiosResponse<R>> {
    this.useToken(jsCookie.get(TOKEN_NAME))
    this.controller = new AbortController()
    return axiosMiddleware.request({
      url: `${HOST}/api/${this.version}/${this.endpoint}`,
      method: HTTP_METHOD.GET,
      params: params,
      headers: this.headers,
      signal: this.controller?.signal,
    })
  }

  protected put<P, R>(data: P): Promise<AxiosResponse<R>> {
    this.useToken(jsCookie.get(TOKEN_NAME))
    this.controller = new AbortController()
    return axiosMiddleware.request({
      url: `${HOST}/api/${this.version}/${this.endpoint}`,
      method: HTTP_METHOD.PUT,
      data,
      headers: this.headers,
      signal: this.controller?.signal,
    })
  }

  protected delete<R>(id?: string | number): Promise<AxiosResponse<R>> {
    this.useToken(jsCookie.get(TOKEN_NAME))
    this.controller = new AbortController()
    return axiosMiddleware.request({
      url: `${HOST}/api/${this.version}/${this.endpoint}/${id}`,
      method: HTTP_METHOD.DELETE,
      headers: this.headers,
      signal: this.controller?.signal,
    })
  }

  public async cancelPetition() {
    if (this.controller) {
      this.controller.abort()
    }
  }
}

export default HttpRequest
