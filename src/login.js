function LoginPage(application) {

    this.application = application;

    this.getPageName = () => {
        return "login";
    };

    this.getContent = () => {
        return `
            <h2>Login</h2>
            <form>
                <label>Login</label><br />
                <input type="text" id="email" class="formInput" /><br />
                <label>Password</label><br />
                <input type="password" id="password" class="formInput" /><br />
                <button type="submit" id="loginBtn" class="submit">Submit</button>
            </form>
        `;
    };

    this.initialize = () => {
        document.getElementById("loginBtn").addEventListener("click", (event) => {

            event.preventDefault();

            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;

            if (this.application.authenticate(email, password)) {
                this.application.navigateTo('dashboard');
            } else {
                this.application.header.showError("No such login/password pair");
            }
        });
    }
}