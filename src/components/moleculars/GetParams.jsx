const getParams = (params) => {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  let paramsValues = {};
  for (let i = 0; i < params.length; i++) {
    paramsValues = {
      ...paramsValues,
      [params[i]]: searchParams.get(params[i]),
    };
  }

  return paramsValues;
};

export { getParams };
