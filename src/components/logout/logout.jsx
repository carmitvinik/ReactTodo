import userService from '../../services/userService';

const Logout = () => {
    userService.logout();
    window.location = "/";
    return null;
}

export default Logout;