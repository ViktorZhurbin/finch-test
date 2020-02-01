export const postResponse = async (requestBody = {}) => {
    const encodedURI = window.encodeURI('/api/finch-test');
    const response = await fetch(encodedURI, {
        method: 'POST',
        body: JSON.stringify(requestBody),
    });
    const data = await response.json();

    if (data && data.success) {
        return true;
    }
};

const waitMs = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const postResponseRetry = async (
    requestBody = {},
    retryCount: number = 3
): Promise<boolean | undefined> => {
    try {
        return await postResponse(requestBody);
    } catch (error) {
        if (retryCount === 1) return false;
        await waitMs(2000);
        return await postResponseRetry(requestBody, retryCount - 1);
    }
};
