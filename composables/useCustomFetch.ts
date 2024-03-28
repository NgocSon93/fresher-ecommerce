import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'
import { useAuthStore } from '~/stores/auth.store'

interface ErrorType {
  errors: Record<string, string[]>
}

const ERROR_SEPARATOR = '_::_'

export function useCustomFetch<ResT, DataT = ResT>(url: string | (() => string), options: UseFetchOptions<ResT, DataT> = {}) {
  const token = useCookie('token').value || ''

  const config = useRuntimeConfig()

  const defaults: UseFetchOptions<ResT, DataT> = {

    baseURL: `${config.public.apiUrl}/api`,

    // set user token if connected
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},

    onResponse(_ctx) {
      if (_ctx.response.status === 401) {
        useCookie('token').value = null
        useAuthStore().setIsShowLoginPopup(true)
      }

      const hasError = !_ctx.response.status.toString().startsWith('2') || _ctx.response._data.status === 'error'

      if (hasError) {
        throw createError({
          statusCode: _ctx.response.status,
          statusMessage: _ctx.response._data.status,
          message: _ctx.response._data?.message || JSON.stringify(_ctx.response._data?.errors),
        })
      }
    },

    onResponseError(_ctx) {
      const statusCode = _ctx.response.status || 500
      const statusMessage = _ctx.response.statusText || ''
      const errorsMsg = (_ctx.response._data || {}) as ErrorType

      const errorEntries = Object.entries(errorsMsg.errors)

      const message = errorEntries.reduce((acc: string[], [key, value]) => {
        return [...acc, ...value.map(item => `${key} ${item}`)]
      }, [])

      throw createError({ statusCode, statusMessage, message: message.join(ERROR_SEPARATOR) })
    },
  }

  const params = defu(options, defaults)

  return useFetch(url, params)
}
