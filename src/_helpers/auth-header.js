export function authHeader(isImage) {
    //return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('userData'));

    if(user && user.token) {
        //check if the request is passing image instead json data
        //if yes then we can send jwt token only
        if(isImage != null && isImage) {
            return {
                'Authorization' : 'Bearer' + user.token
            }
        } else {
            return {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + user.token
            };
        }
    } else {

    }
}