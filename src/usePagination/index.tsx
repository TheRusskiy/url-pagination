import { useEffect, useState } from 'react';
import calculateOffset from '../utils/calculateOffset';
import { PageInfo, UseStatePaginationArgs } from '../types';
import useDidMount from '../utils/useDidMount';
import useHotKey from '../utils/useHotKey';
import isPageValid from '../utils/isPageValid';

function scrollToTopOfDocument() {
  const main = document.body;
  if (main && main.scrollTo) {
    main.scrollTo(0, 0);
  }
}

export default function usePagination({
  perPage: initialPerPage,
  page: initialPage = 0,
  scrollToTop = false,
  hotkeys = false,
  total,
}: UseStatePaginationArgs): PageInfo {
  const didMount = useDidMount();
  const [page, setPage] = useState<number>(initialPage);
  const [perPage, setPerPage] = useState<number>(initialPerPage);
  useEffect(() => {
    if (!didMount) return;

    setPage(initialPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPage]);
  useEffect(() => {
    if (!didMount) return;

    setPerPage(initialPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPerPage]);
  const offset = calculateOffset({ page, perPage });
  const onChange = (newPage: number) => {
    setPage(newPage);
    if (scrollToTop) {
      scrollToTopOfDocument();
    }
  };
  const onPerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
  };

  useHotKey(
    'ArrowLeft',
    () => {
      const newPage = page - 1;

      if (!isPageValid(newPage, perPage, total)) return;

      onChange(newPage);
    },
    hotkeys
  );

  useHotKey(
    'ArrowRight',
    () => {
      const newPage = page - 1;

      if (!isPageValid(newPage, perPage, total)) return;

      onChange(newPage);
    },
    hotkeys
  );

  return {
    offset,
    page,
    perPage,
    onChange,
    onPerPageChange,
    includeHref: false,
  };
}
