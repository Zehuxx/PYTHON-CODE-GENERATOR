import programsApi from "../api/programsApi";

let getPrograms = () => {
    return programsApi.get('/').then((result) => {
        return { status: result?.status, data: result?.data.programs }
    }).catch((error) => {
        return { status: error.response?.status, msg: error.response?.data.Msg || "There was an error getting the programs." }
    });
}
  
let getProgramsByUid = (uid) => {
    return programsApi.get(`/${uid}/`).then((result) => {
        return { status: result?.status, data: result?.data.programs[0] }
    }).catch((error) => {
        return { status: error.response?.status, msg: error.response?.data.Msg || "There was an error getting the program." }
    });
}

let saveProgram = (body) => {
    return programsApi.post('/', body).then((result) => {
        return { status: result?.status }
    }).catch((error) => {
        return { status: error.response?.status, msg: error.response?.data.Msg || "An error occurred while saving the program." }
    });
}

let updateProgram = (uid, body) => {
    return programsApi.put(`/${uid}/`, body).then((result) => {
        return { status: result?.status }
    }).catch((error) => {
        return { status: error.response?.status, msg: error.response?.data.Msg || "An error occurred updating the program." }
    });
}

let deleteProgram = (uid) => {
    return programsApi.delete(`/${uid}/`).then((result) => {
        return { status: result?.status }
    }).catch((error) => {
        return { status: error.response?.status, msg: error.response?.data.Msg || "An error occurred while removing the program." }
    });
}

export {
    getPrograms,
    getProgramsByUid,
    saveProgram,
    updateProgram,
    deleteProgram
}