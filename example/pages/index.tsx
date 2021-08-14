import type { NextPage } from 'next';
import Head from 'next/head';
import Pagination from '../components/Pagination';
import { usePagination, useUrlPagination } from 'url-pagination';

const Home: NextPage = () => {
  const statePagination = usePagination({ perPage: 6 });
  const urlPagination = useUrlPagination({ perPage: 6 });
  const total = 100;
  return (
    <div>
      <Head>
        <title>url-pagination example</title>
        <meta name="description" content="url-pagination" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center mt-2">
        <div className="flex flex-col">
          <div className="mb-10">
            <h2>Pagination that uses state:</h2>
            <Pagination total={total} {...statePagination} />
          </div>

          <div>
            <h2>Pagination that uses url to persist state:</h2>
            <Pagination total={total} {...urlPagination} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
