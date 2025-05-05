class ApiResponse {
    constructor(data=null,statusCode,message){
        this.data=data,
        this.statusCode=statusCode,
        this.message = message
    }
}

export default ApiResponse;