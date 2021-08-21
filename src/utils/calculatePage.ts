const calculatePage = ({
  offset,
  perPage,
}: {
  offset: number;
  perPage: number;
}): number => {
  if (perPage === 0) return 0;

  return Math.ceil(offset / perPage);
};

export default calculatePage;
