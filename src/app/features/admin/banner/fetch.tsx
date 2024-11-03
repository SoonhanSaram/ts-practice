const getTotal = async (url: string) => {
  const fetchOption = {
    method: "GET",
  };

  const response = await fetch(url, fetchOption);

  const result = response.json();

  return result;
};

const getList = async (url: string, offset: number, limit: number) => {
  const fetchOption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      offset: offset,
      limit: limit,
    }),
  };

  const response = await fetch(url, fetchOption);

  const result = response.json();

  return result;
};

const getDetail = async () => {
  const fetchOption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  };

  const response = await fetch();

  const result = response.json();

  return result;
};
