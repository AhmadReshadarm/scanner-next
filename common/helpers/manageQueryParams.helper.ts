const pushQueryParams = (data: { name: string; value: any }[]) => {
  const url = new URL(window.location as any);
  data.forEach(({ name, value }) => {
    if (!value) {
      url.searchParams.delete(name);
    } else if (Array.isArray(value)) {
      url.searchParams.delete(name);
      value.forEach((value) => {
        url.searchParams.append(name, value);
      });
    } else {
      url.searchParams.set(name, value);
    }
  });
  window.history.pushState({}, '', url);
  window.dispatchEvent(new Event('locationChange'));
};

const clearQueryParams = () => {
  window.history.pushState({}, '', window.location.pathname);
  window.dispatchEvent(new Event('locationChange'));
};

const getQueryParams = (
  searchString: string,
): {
  [k: string]: string;
} => {
  const urlSearchParams = new URLSearchParams(decodeURI(searchString));
  const entries = urlSearchParams.entries();
  const result = {};

  for (let entry of entries as any) {
    // each 'entry' is a [key, value]
    const key = entry[0];
    const val = entry[1];
    if (key in result) {
      result[key].push(val);
    } else {
      result[key] = [val];
    }
  }

  return result;
};

export { pushQueryParams, getQueryParams, clearQueryParams };
