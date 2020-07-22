export function NOT_FOUND(response, message) {
    response.status(404).send({
        status: "AUTH_REJECTED",
        error: message
            ? message
            : 'Error de servidor'
    })
}
export function SERVER_ERROR(response, message) {
    response.status(500).send({
        status: "SERVER_ERROR",
        error: message
            ? message
            : 'Error de servidor'
    })
}

export function AUTH_REJECTED(response, message) {
    response.status(401).send({
        status: "AUTH_REJECTED",
        error: message
            ? message
            : 'Error de autenticacion'
    })
}

export function DUPLICATED(response, message) {
    response.status(400).send({
        status: "AUTH_REJECTED",
        error: message
            ? message
            : 'Error de servidor'
    })
}

export function WRITE_JSON(response, message) {
    response.status(200).json(message)
}

export function WRITE_DATA(response, data){
    response.status(200).json({
        status: "OK",
        data
    })
}

export function WRITE_OK(response){
    response.status(200).send({
        status: "OK"
    })
}
