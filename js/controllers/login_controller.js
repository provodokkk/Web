import { LoginModel }   from '../models/login_model.js';
import { LoginView }    from '../views/login_view.js';

import { setEmptyCurrentUser }  from '../user.js';

class LoginController {
    constructor() {
        setEmptyCurrentUser();

        document.getElementById('form').addEventListener('submit', e => {
            e.preventDefault();

            const email         = document.getElementById('email');
            const password      = document.getElementById('password');

            const emailValue    = email.value;
            const passwordValue = password.value;

            const loginView     = new LoginView();

            const showError     = loginView.showError;
            const showSuccess   = loginView.showSuccess;

            let loginModel      = new LoginModel(email, password, emailValue, passwordValue, showError, showSuccess);

            const dataValid     = loginModel.validateInputs(email, password, emailValue, passwordValue);

            if(dataValid) {
                const userExist = loginModel.checkUser(emailValue, passwordValue);
                
                if(userExist) {
                    loginModel.openNextTab();
                }
            }
        });
    }
}

new LoginController();