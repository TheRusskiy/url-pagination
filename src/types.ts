export type PageInfo = {
  perPage: number;
  offset: number;
  onChange: (page: number) => void;
  page: number;
  includeHref: boolean;
  pageKey?: string;
};

export type UseStatePaginationArgs = {
  perPage: number;
  scrollToTop?: boolean;
  initialPage?: number;
};

export type UseUrlPaginationArgs = {
  perPage: number;
  scrollToTop?: boolean;
  pageKey?: string;
  includeHref?: boolean;
};
