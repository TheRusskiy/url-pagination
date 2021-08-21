import ReactPaginate from 'react-paginate';
import ChevronLeftIcon from '../icons/ChevronLeftIcon';
import ChevronRightIcon from '../icons/ChevronRightIcon';
import cn from 'classnames';
import { calculatePage } from 'url-pagination';

export type Props = {
  total: number;
  onChange: (page: number) => void;
  page: number;
  perPage: number;
  includeHref: boolean;
  pageKey?: string;
  hrefBuilder?: (pageIndex: number) => string;
};

export default function Pagination({
  page,
  onChange,
  total,
  includeHref,
  perPage,
  hrefBuilder,
}: Props) {
  const pageCount = calculatePage({ offset: total, perPage });
  const hasPrev = page > 0;
  const hasNext = page + 1 < pageCount;
  const linkClassName =
    'relative inline-flex items-center border border-gray-300 bg-white text-sm font-medium hover:bg-blue-50 py-2 outline-none-mouse';
  return (
    <ReactPaginate
      activeClassName={cn('font-bold')}
      activeLinkClassName="bg-blue-100 font-bold"
      breakClassName="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hidden md:block"
      breakLabel="..."
      containerClassName="relative z-0 inline-flex rounded-md shadow-sm -space-x-px overflow-hidden"
      forcePage={page}
      hrefBuilder={includeHref ? hrefBuilder : undefined}
      marginPagesDisplayed={1}
      nextClassName={cn({ hidden: !hasNext })}
      nextLabel={<ChevronRightIcon />}
      nextLinkClassName={cn(linkClassName, 'text-gray-500 px-2 rounded-r-md')}
      onPageChange={({ selected }) => {
        onChange(selected);
      }}
      pageCount={pageCount}
      pageLinkClassName={cn(linkClassName, 'text-gray-700 px-4')}
      pageRangeDisplayed={2}
      previousClassName={cn({ hidden: !hasPrev })}
      previousLabel={<ChevronLeftIcon />}
      previousLinkClassName={cn(
        linkClassName,
        'text-gray-500 px-2 rounded-l-md'
      )}
    />
  );
}
