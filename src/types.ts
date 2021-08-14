export type PageInfo = {
  perPage: number;
  offset: number;
  onChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  page: number;
  includeHref: boolean;
  pageKey?: string;
};

type BasePaginationArgs = {
  page?: number;
  perPage: number;
  scrollToTop?: boolean;
  hotkeys?: boolean;
  total?: number;
};

export type UseStatePaginationArgs = BasePaginationArgs;

export type UseUrlPaginationArgs = BasePaginationArgs & {
  pageKey?: string;
  perPageKey?: string;
  includeHref?: boolean;
  shallowNavigation?: boolean;
};
