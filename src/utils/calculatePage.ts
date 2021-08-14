const calculatePage = (total: number, perPage: number): number => {
  if (perPage === 0) return 0;

  return Math.ceil(total / perPage);
};

export default calculatePage;
