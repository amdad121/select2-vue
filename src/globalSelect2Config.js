// Define a global variable to store the global options
let globalSelect2Options = {};

// Function to set global options
export const setGlobalSelect2Options = (options) => {
    globalSelect2Options = options;
};

// Function to get global options
export const getGlobalSelect2Options = () => {
    return globalSelect2Options;
};
