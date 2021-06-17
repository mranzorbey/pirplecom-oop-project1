function Header(application) {

    this.application = application;

    this.showNotification = (msg) => {
        
        this.showNotificationMessage(msg, "green");
    }

    this.showError = (msg) => {
        
        this.showNotificationMessage(msg, "red");
    }

    this.showNotificationMessage = (msg, backgroundColor) => {
        
        let element = document.getElementById("notification_area");

        if (element) {
            element.style.backgroundColor = backgroundColor;
            element.style.color = "white";
            element.innerHTML = msg;
        }
    }

    this.getContent = () => {
        
        let result = "";

        if (this.application.getStore().getLoggedInUser()) {

            result = `
                <div>
                    <a class='header_link' href='dashboard'>Dashboard</a>&nbsp;&nbsp;|&nbsp;
                    <a class='header_link' href='profile'>Account Settings</a>&nbsp;&nbsp;|&nbsp;
                    <a class='header_link' href='signout'>Log Out</a>
                </div>
                `;

        } else if (this.application.getStore().getCurrentPageName() == 'login' || !this.application.getStore().getCurrentPageName()) {

            result = `
                <div>
                    <a class='header_link' href='welcome'>Welcome</a>&nbsp;&nbsp;|&nbsp;
                    <a class='header_link' href='signup'>Sign Up</a>
                </div>
                `;

        } else if (this.application.getStore().getCurrentPageName() == 'signup') {

            result = `
                <div>
                <a class='header_link' href='welcome'>Welcome</a>&nbsp;&nbsp;|&nbsp;
                    <a class='header_link' href='login'>Login</a>
                </div>
                `;

        }

        return `${result} <div id="notification_area"></div>`
    }

    this.initialize = () => {
        
        for (let element of document.getElementsByClassName("header_link")) {

            element.addEventListener("click", (event) => {

                event.preventDefault();

                let pageName = event.target.attributes.href.value;

                if (pageName !== 'signout') {
                    this.application.navigateTo(pageName);
                } else {
                    this.application.logout();
                    this.application.navigateTo(null);
                }
            });

        }
    }
}