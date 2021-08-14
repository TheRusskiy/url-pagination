import { useRouter } from 'next/router';
import pushWithParams from './pushWithParams';
import calculateOffset from './calculateOffset';
import { PageInfo, UseUrlPaginationArgs } from './types';

export default function useUrlPagination({
  perPage,
  includeHref = false,
  scrollToTop = false,
  pageKey = 'page',
}: UseUrlPaginationArgs): PageInfo {
  const router = useRouter();
  const { query } = router;
  const page = query[pageKey] ? parseInt(query[pageKey] as string, 10) - 1 : 0;
  const offset = calculateOffset(page, perPage);
  const onChange = async (newPage: number) =>
    pushWithParams(
      router,
      { [pageKey]: newPage + 1 },
      {
        shallow: true,
        scroll: scrollToTop,
      }
    );
  return {
    offset,
    perPage,
    page,
    onChange,
    pageKey,
    includeHref,
  };
}
