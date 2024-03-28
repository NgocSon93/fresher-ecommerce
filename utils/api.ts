import { useCustomFetch } from '~/composables/useCustomFetch'

export class Api {
  protected configs: HttpRequestInit
  protected headers: Headers

  constructor() {
    this.headers = new Headers()
    this.headers.append('Access-Control-Allow-Origin', '*')

    this.configs = this.onBeforeSend({
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: this.headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer-when-downgrade',
    })
  }

  /**
   * Initial common configs request
   * @param configs HttpRequestInit
   * @returns HttpRequestInit
   */
  protected onBeforeSend(configs: HttpRequestInit): HttpRequestInit {
    // const userAuth = useCookie('token')
    // if (userAuth.value)
    //   configs.headers.append('Authorization', `Bearer ${userAuth.value}`)

    return configs
  }

  public async get<T>(uri: string) {
    const { data, pending, error, refresh } = await useCustomFetch<T>(uri, {
      method: 'GET',
    })

    return { data, pending, error, refresh }
  }

  public async post<T>(uri: string, body: any = null) {
    const { data, pending, error, refresh } = await useCustomFetch<T>(uri, {
      method: 'POST',
      body,
    })

    return { data, pending, error, refresh }
  }

  public async put<T>(uri: string, body: any = null) {
    const { data, pending, error, refresh } = await useCustomFetch<T>(uri, {
      method: 'PUT',
      body,
    })

    return { data, pending, error, refresh }
  }

  public async patch<T>(uri: string, body: any = null) {
    const { data, pending, error, refresh } = await useCustomFetch<T>(uri, {
      method: 'PATCH',
      body,
    })

    return { data, pending, error, refresh }
  }

  public async delete<T>(uri: string) {
    const { data, pending, error, refresh } = await useCustomFetch<T>(uri, {
      method: 'DELETE',
    })

    return { data, pending, error, refresh }
  }
}

export type HttpRequestInit = RequestInit & { headers: Headers }
