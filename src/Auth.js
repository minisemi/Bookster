import Cookies from 'universal-cookie';
var cookie = new Cookies();
class Auth {

    static authenticateUser(token) {
        cookie.set('token', token);
    }

    static checkIfAuthenticated() {
        return cookie.get('token') != null;
    }

    static getToken(){
        return cookie.get('token');
    }


    static deauthenticateUser() {
        console.log('Deauthenticating...')
        cookie.remove("token")
        console.log(cookie.get('token'))
    }


    static getToken() {
        return cookie.get('token');
        //return localStorage.getItem('token');
    }

}

export default Auth;