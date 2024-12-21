const goToNextPage =
  (nPages: number, currentPage: number, setCurrentPage: any) => () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
const goToPrevPage = (currentPage: number, setCurrentPage: any) => () => {
  if (currentPage !== 1) setCurrentPage(currentPage - 1);
};

export { goToNextPage, goToPrevPage };
