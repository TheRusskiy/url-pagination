import omit from 'lodash/omit';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import queryString from 'query-string';
import { NextRouter } from 'next/router';

export type Params = {
  [key: string]: string | number | string[] | number[];
};

const addParams = (
  router: NextRouter,
  params: Params,
  options: {
    pathname?: string;
  } = {}
): string => {
  const { query, pathname: routerPathname } = router;
  const newQuery = { ...query, ...params };
  const { pathname } = options;
  const actualPathname = pathname || routerPathname;
  const namedComponents = (actualPathname.match(/\[.+?\]/g) || []).map((m) => {
    // for some reason eslint think the regex is bad
    // eslint-disable-next-line
    return m.replace(/[\[\]]/g, '')
  });
  let result = actualPathname;
  namedComponents.forEach((namedComponent) => {
    result = result.replace(
      `[${namedComponent}]`,
      newQuery[namedComponent]?.toString() ?? ''
    );
  });

  let componentsFromOldRoute: string[] = [];
  if (routerPathname && pathname && pathname !== routerPathname) {
    componentsFromOldRoute = (routerPathname.match(/\[.+\]/) || []).map(
      (component) => {
        // for some reason eslint think the regex is bad
        // eslint-disable-next-line
      return component.replace(/[\[\]]/g, '')
      }
    );
  }
  const search = omit(newQuery, [
    ...namedComponents,
    ...componentsFromOldRoute,
  ]);
  const searchString = Object.keys(search).length
    ? `?${queryString.stringify(pickBy(search, identity))}` // remove empty keys
    : '';
  return `${result}${searchString}`;
};

export default addParams;
