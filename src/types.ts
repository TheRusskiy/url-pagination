export type PageInfo = {
  perPage: number;
  offset: number;
  onChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  page: number;
  includeHref: boolean;
  pageKey?: string;
};

export type UseStatePaginationArgs = {
  page?: number;
  perPage: number;
  scrollToTop?: boolean;
  initialPage?: number;
};

export type UseUrlPaginationArgs = {
  page?: number;
  perPage: number;
  scrollToTop?: boolean;
  pageKey?: string;
  perPageKey?: string;
  includeHref?: boolean;
  shallowNavigation?: boolean;
};
