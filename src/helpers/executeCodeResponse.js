import executeCodeApi from "../api/executeCodeApi";

let executeCodeResponse = (script) => {
    let data = {
        "clientId": process.env.VUE_APP_JDOODLE_CLIENT_ID,
        "clientSecret": process.env.VUE_APP_JDOODLE_CLIENT_SECRET,
        "script": script,
        "language": "python3",
        "versionIndex": "4"
    }

    return executeCodeApi.post('/execute', data).then((result) => {
        return { status: result?.status, data: result?.data }
    }).catch((error) => {
        return { status: error?.status }
    });

}

export default executeCodeResponse
