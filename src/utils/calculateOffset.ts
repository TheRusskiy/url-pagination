const calculateOffset = ({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}): number => {
  return page * perPage;
};

export default calculateOffset;
