export const getTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
};