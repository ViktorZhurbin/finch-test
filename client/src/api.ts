export const fetchResponse = async (requestBody = {}) => {
    const encodedURI = window.encodeURI("http://localhost:4000/finch-test");
    const response = await fetch(encodedURI, {
        method: "POST",
        body: JSON.stringify(requestBody)
    });
    const data = await response.json();

    return data && data.body;
};
