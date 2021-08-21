# url-pagination

This project has 2 goals:
  * provide utilities to compute pagination params inside your React components
  * persist pagination params as a part of URL so a page can be reloaded and linked to (currently we support Next.js router).

## See it in action

Live example:
[https://url-pagination.vercel.app](https://url-pagination.vercel.app)

Code of the example:
[example/pages/index.tsx](https://github.com/TheRusskiy/url-pagination/blob/master/example/pages/index.tsx)

## Getting started

In your shell:
```bash
    yarn add next-url-pagination
    # or
    npm install next-url-pagination
```

In your component:

```typescript jsx
// ...
import { useUrlPagination } from 'url-pagination';

function MyComponent () {
  const pagination = useUrlPagination({ perPage: 6 });

  // use a data fetching library of your choice
  const { data, error } = useSWR<Response>(
    `/some-api/posts?offset=${pagination.offset}&limit=${pagination.perPage}`
  );
  
  return (
    <>
      <PostsList posts={data.posts}/>
      <MyPagination total={data.total} page={pagination.page} onChange={pagination.onChange}  />
    </>
  )
}
```

If you want to keep pagination in React state instead of URL, instead of `useUrlPagination` use `usePagination`.

### useUrlPagination
`useUrlPagination(args: UseUrlPaginationArgs): PageInfo` has the following signature:

``` typescript
// pass to useUrlPagination
type UseUrlPaginationArgs = {
  perPage: number; // number of records per page
  page?: number = 0; // specify initial page or make the component controlled (if the value changes) 
  scrollToTop?: boolean = false; // scroll page to the top upon navigation
  hotkeys?: boolean = false; // use left/right arrows and page up/down to navigation through pagination
  total?: number; // specify total records, optional, but recommended, without it hotkey pagination won't know when the last page is reached
  pageKey?: string = 'page'; // under what key the current page is going to appear in URL
  perPageKey?: string 'size'; // under what key the page size is going to appear in URL
  shallowNavigation?: boolean = true; // if true performs shallow Next.js router navigation upon changes
  includeHref?: boolean = false; // this argument is passed through to returned results
}
```

``` typescript
// get as a result
type PageInfo = {
  perPage: number; // size of the page, how many records each page contains
  offset: number; // what's the offset from the start
  page: number; // current page, maybe seen as redundant because there's `offset`, but different APIs use different params, it's here for convenience
  onChange: (page: number) => void; // function to call when a page changes
  onPerPageChange: (perPage: number) => void;  // function to call when a page size changes
  pageKey: string; // see UseUrlPaginationArgs, passed through without changes
  hrefBuilder: (pageIndex: number) => string; // call this function to build a new URL path based on page number
  includeHref: boolean; // passed through from arguments
}
```

### usePagination

`usePagination(args: UsePaginationArgs): PageInfo` has the following signature (`PageInfo` is the same as for `UseUrlPaginationArgs`):

``` typescript
// pass to usePagination
type UsePaginationArgs = {
  perPage: number; // number of records per page
  page?: number = 0; // specify initial page or make the component controlled (if the value changes) 
  scrollToTop?: boolean = false; // scroll page to the top upon navigation
  hotkeys?: boolean = false; // use left/right arrows and page up/down to navigation through pagination
  total?: number; // specify total records, optional, but recommended, without it hotkey pagination won't know when the last page is reached
}
```

### calculatePage

Utility to return the current page index based on offset and page size

```typescript
calculatePage = ({
  offset: number;
  perPage: number;
}): number
```

### Pagination component

The "presentation" component is not included in this library, because it's likely going to look very different in each app, however, you can find an example implementation at [example/components/Pagination/index.tsx](https://github.com/TheRusskiy/url-pagination/blob/master/example/components/Pagination/index.tsx)

### Tree shaking

To enable tree shaking and save some space you can import functions like so:
```typescript
import useUrlPagination from 'url-pagination/useUrlPagination';
import usePagination from 'url-pagination/usePagination';
// ...
```
