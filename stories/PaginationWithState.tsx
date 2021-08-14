import usePagination from "../src/usePagination";

export type Props = {
  total: number
}

const PaginationWithState = ({ total }: Props) => {
  const pagination = usePagination({ perPage: 6, total });

  return (
    <div>
      <h2>Pagination that uses state:</h2>
      <button onClick={() => pagination.onChange(pagination.page - 1)}>Prev</button>
      <button onClick={() => pagination.onChange(pagination.page + 1)}>Next</button>
      <pre>
        {JSON.stringify(pagination, null, 2)}
      </pre>
    </div>
  );
};

export default PaginationWithState
