function SignUpPage(application) {
    
    this.application = application;

    this.getContent = () => {
        return `
            <h2>Sign Up</h2>
            <form>
                <label>Firstname</label><br />
                <input type="text" id="firstname" class="formInput" /><br />
                <label>Surname</label><br />
                <input type="text" id="surname" class="formInput" /><br />
                <label>Login</label><br />
                <input type="text" id="email" class="formInput" /><br />
                <label>Password</label><br />
                <input type="password" id="password" class="formInput" /><br /><br />
                <input type="checkbox" value="yes" id="agree_to_terms" style="height: 10px;"><label for="agree_to_terms">I agree to the Terms of Use</label><br/>
                <button type="submit" id="loginBtn" class="submit">Submit</button>
            </form>
        `;
    };

    this.getPageName = () => {
        return "signup";
    };

    this.initialize = () => {

        document.getElementById("loginBtn").addEventListener("click", (event) => {
            
            event.preventDefault();
            
            const firstname = document.getElementById("firstname").value;
            const surname = document.getElementById("surname").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const agreeToTerms = document.getElementById("agree_to_terms").checked;

            const signUpResult = this.application.getStore().signUpCustomer(firstname, surname, email, password, agreeToTerms);

            if (!signUpResult.success) {
                application.header.showError(signUpResult.message);
            } else {
                application.header.showNotification("Congradulations, your sign up is completed!");

                setTimeout(() => {
                    application.navigateTo("login");
                }, 1500);
            }

        });
    };
}