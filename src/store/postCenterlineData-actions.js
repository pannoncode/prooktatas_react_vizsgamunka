export const postData = (url, method, data) => {
  const sendRequest = async () => {
    const response = await fetch(url, {
      method: method ? method : "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Sikertelen beküldés");
    }
  };

  try {
    sendRequest();
  } catch (error) {
    console.log(error.message);
  }
};
