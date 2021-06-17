function WelcomePage(application) {

    this.application = application;

    this.getPageName = () => {
        return "welcome";
    };

    this.getContent = () => {
        return `
            <h2>TODO App</h2>
            <div>This super puper app lets you capture your everyday todo lists and keep your mind clear</div>
            <form>
                <button type="submit" id="gotoLoginPageBtn" class="submit">Login In</button>
                <button type="submit" id="gotoSignupPageBtn" class="submit">Sign Up</button>
            </form>
        `;
    };

    this.initialize = () => {

        document.getElementById("gotoLoginPageBtn").addEventListener("click", (event) => {
            event.preventDefault();
            this.application.navigateTo('login');
        });

        document.getElementById("gotoSignupPageBtn").addEventListener("click", (event) => {
            event.preventDefault();
            this.application.navigateTo('signup');
        });

    }
}