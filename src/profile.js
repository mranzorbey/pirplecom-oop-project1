function Profile(application) {

    this.application = application;
    this.loggedInUser;

    this.getContent = () => {

        this.loggedInUser = application.getStore().getLoggedInUser();

        if (!this.loggedInUser) {
            return "Not Authorized";
        }
        
        return `
            <div class="main">
                <div style="display: inline-block;"><h2>User Profile</h2></div>
                <form>
                    Email:
                    <span>${this.loggedInUser.email}</span><br/><br/>
                    Password:
                    <input id="passwordInput" type="text" value="${this.loggedInUser.password}" /><br/><br/>
                    Firstname:
                    <input id="firstnameInput" type="text" value="${this.loggedInUser.firstname}" /><br/><br/>
                    Lastname:
                    <input id="lastnameInput" type="text" value="${this.loggedInUser.lastname}" /><br/><br/>
                    <button id="updateProfileBtn" type="submit">Update</button>
                </form>
            </div>
            `;
    };

    this.getPageName = () => {
        return "profile";
    };

    this.initialize = () => {

        document.getElementById("updateProfileBtn").addEventListener("click", (event) => {

            event.preventDefault();

            this.loggedInUser.password = document.getElementById("passwordInput").value;
            this.loggedInUser.firstname = document.getElementById("firstnameInput").value;
            this.loggedInUser.lastname = document.getElementById("lastnameInput").value;

            this.application.getStore().updateUser(this.loggedInUser);
            application.header.showNotification("Updating user profile...");
            setTimeout(() => this.application.navigateTo(this.getPageName()), 1000);
        });

    };
}