export const postResponse = async (requestBody = {}) => {
    const encodedURI = window.encodeURI('/finch-test');
    const response = await fetch(encodedURI, {
        method: 'POST',
        body: JSON.stringify(requestBody),
    });
    const data = await response.json();

    if (data && data.success) {
        return true;
    }
};

export const postResponseRetry = async (
    requestBody = {},
    retryCount: number = 3
): Promise<boolean | undefined> => {
    try {
        return await postResponse(requestBody);
    } catch (error) {
        if (retryCount === 1) return false;
        return await postResponseRetry(requestBody, retryCount - 1);
    }
};
