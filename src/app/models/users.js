export const getUser = (id, url = null) => new Promise(async (resolve, reject) => {

    if (url == null) {
        url = process.env.APP_URL + "api/user"
    }

    const opt = {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response = await fetch(url, opt);

    const json = await response.json();

    if (!response.ok) {
        reject({ success: false, message: json?.message || "Unable to complete the request" });
    }

    resolve({ success: true, user: json.user });
})