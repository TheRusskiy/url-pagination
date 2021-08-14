import { RouterContext } from 'next/dist/shared/lib/router-context'
import type { NextRouter } from 'next/dist/shared/lib/router/router'
import * as queryString from "querystring"

const notImplemented = (..._args: any): any => {
  throw new Error("Can't be called")
}

const fakeRouter: NextRouter = {
  query: {},
  route: '',
  pathname: '',
  asPath: '',
  basePath: '',
  isLocaleDomain: false,
  isPreview: false,
  push: function (url) {
    this.query = queryString.parse(url.toString().slice(1))
    return Promise.resolve(true)
  },
  replace: notImplemented,
  reload: notImplemented,
  back: notImplemented,
  prefetch: notImplemented,
  beforePopState: notImplemented,
  events: {
    on: notImplemented,
    off: notImplemented,
    emit: notImplemented
  },
  isFallback: false,
  isReady: true,
  locales: [],
  locale: 'en-us',
  defaultLocale: 'en-us',
}

export default function FakeRouterContext({ children }: { children: any }) {
  const router: NextRouter = {
    ...fakeRouter
  }
  return (
    <RouterContext.Provider value={router}>
      { children }
    </RouterContext.Provider>
  )
}
