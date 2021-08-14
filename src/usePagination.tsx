import { useState } from 'react';
import calculateOffset from './calculateOffset';
import { PageInfo, UseStatePaginationArgs } from './types';

function scrollToTopOfDocument() {
  const main = document.body;
  if (main && main.scrollTo) {
    main.scrollTo(0, 0);
  }
}

export default function usePagination({
  perPage,
  initialPage = 0,
  scrollToTop = false,
}: UseStatePaginationArgs): PageInfo {
  const [page, setPage] = useState<number>(initialPage);
  const offset = calculateOffset(page, perPage);
  const onChange = (newPage: number) => {
    setPage(newPage);
    if (scrollToTop) {
      scrollToTopOfDocument();
    }
  };
  return {
    offset,
    perPage,
    page,
    onChange,
    includeHref: false,
  };
}
