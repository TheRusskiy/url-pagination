export default function isPageValid(
  page: number,
  perPage: number,
  total?: number
) {
  if (page < 0) return false;

  if (!total) return true;

  const maxPage = Math.ceil(total / perPage) - 1; // 0 indexed

  return page <= maxPage;
}
