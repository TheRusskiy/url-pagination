import { useRouter } from 'next/router';
import pushWithParams from './pushWithParams';
import calculateOffset from './calculateOffset';
import { PageInfo, UseUrlPaginationArgs } from './types';
import { useEffect } from 'react';
import useDidMount from './useDidMount';

export default function useUrlPagination({
  page: initialPage = 0,
  perPage: initialPerPage,
  includeHref = false,
  scrollToTop = false,
  pageKey = 'page',
  perPageKey = 'size',
  shallowNavigation = true,
}: UseUrlPaginationArgs): PageInfo {
  const didMount = useDidMount();
  const router = useRouter();
  const { query } = router;
  const page = query[pageKey]
    ? parseInt(query[pageKey] as string, 10) - 1
    : initialPage;
  const perPage = query[perPageKey]
    ? parseInt(query[perPageKey] as string, 10)
    : initialPerPage;
  const offset = calculateOffset(page, perPage);
  const onChange = async (newPage: number) =>
    pushWithParams(
      router,
      { [pageKey]: newPage + 1 },
      {
        shallow: shallowNavigation,
        scroll: scrollToTop,
      }
    );
  const onPerPageChange = async (newPerPage: number) =>
    pushWithParams(
      router,
      { [perPageKey]: newPerPage + 1 },
      {
        shallow: shallowNavigation,
      }
    );
  useEffect(() => {
    if (!didMount) return;

    onChange(initialPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPage]);
  useEffect(() => {
    if (!didMount) return;

    onPerPageChange(initialPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPerPage]);
  return {
    offset,
    perPage,
    page,
    onChange,
    onPerPageChange,
    pageKey,
    includeHref,
  };
}
