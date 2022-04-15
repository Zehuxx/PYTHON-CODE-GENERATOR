import executeCodeApi from "../api/executeCodeApi";


const executeCodeResponse = async(script) =>{
    let resp = {}
    let data = {
        "clientId": process.env.VUE_APP_JDOODLE_CLIENT_ID,
        "clientSecret": process.env.VUE_APP_JDOODLE_CLIENT_SECRET,
        "script":script,
        "language":"python3",
        "versionIndex":"4"
    }

    await executeCodeApi.post('/execute',data).then((result) => {
        resp = result.data
    }).catch((err) => {
        console.log(err);
    });
    
    return resp

}

export default executeCodeResponse
