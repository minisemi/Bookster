import Cookies from 'universal-cookie';
var cookie = new Cookies();
class Auth {

    static authenticateUser(token, email) {
        cookie.set('token', token);
        cookie.set('email', email)
            console.log(cookie.get('email'))

    }

    static checkIfAuthenticated() {

        return cookie.get('token') != null;
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