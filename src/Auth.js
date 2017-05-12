import Cookies from 'universal-cookie';
var cookie = new Cookies();
class Auth {

    static authenticateUser(token) {
        cookie.set('token', token);
    }

    static checkIfAuthenticated() {
        if (cookie.get('token') !== "unauthorized"){
            console.log("Wie authenticated! with cookie" + cookie.get('token'))
        } else console.log("nope")
        return cookie.get('token') !== "unauthorized";
    }

    static getToken(){
        return cookie.get('token');
    }


    static deauthenticateUser() {
        console.log('Deauthenticating...')
        cookie.set('token', "unauthorized");
        //localStorage.removeItem('token');
    }


    static getToken() {
        return cookie.get('token');
        //return localStorage.getItem('token');
    }

}

export default Auth;