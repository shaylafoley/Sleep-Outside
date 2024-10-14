const baseURL = "http://server-nodejs.cit.byui.edu:3000/";

function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Bad Response");
    }
}

export default class ExternalServices {
    constructor() {
        // No category needed for product details
    }
  
    // Fetch data for a specific product by its ID
    async findProductById(id) {
        try {
            const response = await fetch(`${baseURL}product/${id}`);
            const data = await convertToJson(response);
            return data.Result; // Ensure this returns the expected product data structure
        } catch (error) {
            console.error("Error fetching product by ID:", id, error);
            throw error; // Rethrow error for further handling
        }
    }

    // Fetch data for a specific category
    async getData(category) {
        try {
            const response = await fetch(`${baseURL}products/search/${category}`);
            const data = await convertToJson(response);
            return data.Result; // Ensure this matches your API response structure
        } catch (error) {
            console.error("Error fetching data for category:", category, error);
            throw error; // Rethrow error for further handling
        }
    }

    // Checkout process
    async checkout(payload) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        };
        try {
            return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
        } catch (error) {
            console.error("Error during checkout:", error);
            throw error; // Rethrow error for further handling
        }
    }
}
