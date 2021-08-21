import useUrlPagination from "../src/useUrlPagination";


export type Props = {
  total: number
}





const PaginationWithUrl = ({ total }: Props) => {
  const pagination = useUrlPagination({ perPage: 6, total });

  return (
    <div>
      <h2>Pagination that uses url:</h2>
      <button onClick={() => pagination.onChange(pagination.page - 1)}>Prev</button>
      <button onClick={() => pagination.onChange(pagination.page + 1)}>Next</button>
      <pre>
        {JSON.stringify(pagination, null, 2)}
      </pre>
    </div>
  );
};

export default PaginationWithUrl
