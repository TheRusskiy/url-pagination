import { useEffect, useState } from 'react';
import calculateOffset from './calculateOffset';
import { PageInfo, UseStatePaginationArgs } from './types';
import useDidMount from './useDidMount';

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
  const offset = calculateOffset(page, perPage);
  const onChange = (newPage: number) => {
    setPage(newPage);
    if (scrollToTop) {
      scrollToTopOfDocument();
    }
  };
  const onPerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
  };
  return {
    offset,
    page,
    perPage,
    onChange,
    onPerPageChange,
    includeHref: false,
  };
}
