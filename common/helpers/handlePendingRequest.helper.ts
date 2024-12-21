const handlePending = (state: { loading: boolean }) => {
  state.loading = true;
};

const handleChangePending = (state: { saveLoading: boolean }) => {
  state.saveLoading = true;
};

export { handleChangePending, handlePending };
