import { useRouter } from 'next/router'
import addParams from './addParams'

export type HrefBuilder = (pageIndex: number) => string

export default function useHrefBuilder({ pageKey }: { pageKey: string }): HrefBuilder {
  const router = useRouter()
  return (pageIndex: number) => addParams(router, { [pageKey]: pageIndex })
}
