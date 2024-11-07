async function requeteAjax(method, url, data = null, headers = {}, callback = null){
    try {
        const options = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            body: data ? JSON.stringify(data) : null
        };

        const response = await fetch(url, options);
        const result = await response.json();

        if (response.ok) {
            if (callback) callback(result);
        } else {
            throw new Error(`Erreur ${response.status}: ${result.error || response.statusText}`);
        }
    } catch (error) {
        console.error("Erreur AJAX:", error.message);
    }
}
