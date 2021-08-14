import type { NextPage } from 'next';
import Head from 'next/head';
import Pagination from '../components/Pagination';
import { usePagination, useUrlPagination } from 'url-pagination';
import useSWR from 'swr';

type Response = {
  results: string[];
  total: number;
};

const PaginationWithState = () => {
  const pagination = usePagination({ perPage: 6 });

  const { data, error } = useSWR<Response>(
    `/api/posts?offset=${pagination.offset}&limit=${pagination.perPage}`
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <h2 className="text-2xl mb-4">Pagination that uses state:</h2>
      <ul className="mb-2">
        {data.results.map((d, i) => (
          <li key={i} className="p-1 list-disc">
            {d}
          </li>
        ))}
      </ul>
      <Pagination total={data.total} {...pagination} />
    </div>
  );
};

const PaginationWithUrl = () => {
  const pagination = useUrlPagination({ perPage: 6, hotkeys: true });

  const { data, error } = useSWR<Response>(
    `/api/posts?offset=${pagination.offset}&limit=${pagination.perPage}`
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <h2 className="text-2xl mb-4">Pagination that uses state:</h2>
      <ul className="mb-2">
        {data.results.map((d, i) => (
          <li key={i} className="p-1 list-disc">
            {d}
          </li>
        ))}
      </ul>
      <Pagination total={data.total} {...pagination} />
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>url-pagination example</title>
        <meta name="description" content="url-pagination" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center mt-2">
        <div className="flex flex-col gap-10">
          <PaginationWithState />
          <PaginationWithUrl />
        </div>
      </main>
    </div>
  );
};

export default Home;
