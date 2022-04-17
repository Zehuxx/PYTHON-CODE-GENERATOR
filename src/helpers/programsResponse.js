import programsApi from "../api/programsApi";

let getPrograms = () => {
    return programsApi.get('/').then((result) => {
        return { status: result?.status, data: result?.data.programs }
    }).catch((error) => {
        return { status: error.response?.status, msg: error.response?.data.Msg }
    });
}
  
let getProgramsByUid = (uid) => {
    return programsApi.get(`/${uid}/`).then((result) => {
        return { status: result?.status, data: result?.data.programs[0] }
    }).catch((error) => {
        return { status: error.response?.status, msg: error.response?.data.Msg }
    });
}

let saveProgram = (body) => {
    return programsApi.post('/', body).then((result) => {
        return { status: result?.status }
    }).catch((error) => {
        return { status: error.response?.status, msg: error.response?.data.Msg }
    });
}

let updateProgram = (uid, body) => {
    return programsApi.put(`/${uid}/`, body).then((result) => {
        return { status: result?.status }
    }).catch((error) => {
        return { status: error.response?.status, msg: error.response?.data.Msg }
    });
}

let deleteProgram = (uid) => {
    return programsApi.delete(`/${uid}/`).then((result) => {
        return { status: result?.status }
    }).catch((error) => {
        return { status: error.response?.status, msg: error.response?.data.Msg }
    });
}

export {
    getPrograms,
    getProgramsByUid,
    saveProgram,
    updateProgram,
    deleteProgram
}