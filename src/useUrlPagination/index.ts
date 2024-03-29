import { useRouter } from 'next/router';
import pushWithParams from '../utils/pushWithParams';
import calculateOffset from '../utils/calculateOffset';
import { PageInfo, UseUrlPaginationArgs } from '../types';
import { useEffect } from 'react';
import useDidMount from '../utils/useDidMount';
import useHotKey from '../utils/useHotKey';
import isPageValid from '../utils/isPageValid';
import useHrefBuilder from '../utils/useHrefBuilder';

export default function useUrlPagination({
  page: initialPage = 0,
  perPage: initialPerPage,
  includeHref = false,
  scrollToTop = false,
  pageKey = 'page',
  perPageKey = 'size',
  shallowNavigation = true,
  hotkeys = false,
  total,
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
  const offset = calculateOffset({ page, perPage });

  const onChange = (newPage: number) => {
    if (!isPageValid(newPage, perPage, total)) return;

    return pushWithParams(
      router,
      { [pageKey]: newPage + 1 },
      {
        shallow: shallowNavigation,
        scroll: scrollToTop,
      }
    );
  };
  const onPerPageChange = (newPerPage: number) =>
    pushWithParams(
      router,
      { [perPageKey]: newPerPage },
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

  useHotKey(
    ['ArrowLeft', 'PageUp'],
    () => {
      const newPage = page - 1;

      onChange(newPage);
    },
    hotkeys
  );

  useHotKey(
    ['ArrowRight', 'PageDown'],
    () => {
      const newPage = page + 1;

      onChange(newPage);
    },
    hotkeys
  );

  const hrefBuilder = useHrefBuilder({ pageKey });

  return {
    offset,
    perPage,
    page,
    onChange,
    onPerPageChange,
    pageKey,
    includeHref,
    hrefBuilder,
  };
}
