import { NextRouter } from 'next/router';

import addParams, { Params } from './addParams';

export type TransitionOptions = {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
  pathname?: string;
};

const pushWithParams = (
  router: NextRouter,
  params: Params,
  options: TransitionOptions = {}
): Promise<boolean> => {
  const newPath = addParams(router, params, options);
  return router.push(newPath, undefined, options);
};

export default pushWithParams;
