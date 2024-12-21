export const handleHistory = (productId: any) => {
  const history = localStorage.getItem('history');

  if (history) {
    const historyDestringefied = JSON.parse(history);
    const newHistory: any = [];
    for (let i = 0; i < historyDestringefied.length; i++) {
      if (productId != historyDestringefied[i]) {
        newHistory[0] = productId;
      }
      if (newHistory[0] != historyDestringefied[i]) {
        newHistory.push(historyDestringefied[i]);
      }
    }

    localStorage.setItem('history', JSON.stringify([...newHistory]));
  }
  if (!history) {
    localStorage.setItem('history', JSON.stringify([productId]));
  }
};
