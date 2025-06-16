const apiUrl = "http://127.0.0.1:5000/api";

// let apiData = JSON.parse(sessionStorage.getItem('apiData')) || [];
let apiData = [];
async function fetchData(endpoint = "messages") {
    try {
        const response = await axios.get(`${apiUrl}/${endpoint}`);
        apiData = response.data;
        sessionStorage.setItem('apiData', JSON.stringify(apiData));
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

// window.addEventListener('load', () => {
//     fetchData('messages')
//         .then(data => {
//             console.log("Data fetched successfully:", data);
//         })
//         .catch(error => {
//             console.error("Failed to fetch data:", error);
//         });
// }
// );

export {
    apiUrl,
    apiData,
    fetchData
}