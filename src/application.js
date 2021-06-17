const application = new ApplicationController();

function User(email, password, firstname, lastname) {

    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;

    this.setEmail = (email) => {
        this.email = email;
    }

    this.setPassword = (password) => {
        this.password = password;
    }

    this.setFirstname = (firstname) => {
        this.firstname = firstname;
    }

    this.setLastname = (lastname) => {
        this.lastname = lastname;
    }
}

function ToDoList(id, listName, userEmail) {
    this.id = id;
    this.listName = listName;
    this.todos = [];
    this.userEmail = userEmail;
}

function ToDoItem(id, name) {
    this.id = id;
    this.name = name;
    this.status = 'not completed';
}

function Store() {

    this.updateLocalStorage = () => {
        const storeObjectSerialzied = JSON.stringify(this.state);
        window.localStorage.setItem('store', storeObjectSerialzied);
    }

    //read from local storage
    this.state = {
        loggedInUser: null,
        users: [],
        currentPageName: null,
        todoLists: [],
        requestParams: [],
    };

    this.setLoggedInUser = (user) => {
        this.state.loggedInUser = user;
    }

    this.getLoggedInUser = () => {
        return this.state.loggedInUser;
    }

    this.setRequestParams = (requestParams) => {
        this.state.requestParams = requestParams;
        this.updateLocalStorage();
    }

    this.getRequestParams = () => this.state.requestParams;

    this.addTodoList = (listName) => {
        
        let maxId = 0;

        for (let id in this.state.todoLists) {
            if (this.state.todoLists[id] && this.state.todoLists[id].id) {
                if (this.state.todoLists[id].id > maxId) {
                    maxId = this.state.todoLists[id].id;
                }
            }
        }

        const todoList = new ToDoList(maxId + 1, listName, this.state.loggedInUser.email);
        //this.state.todoLists = [];
        this.state.todoLists.push(todoList);
    }

    this.getCurrentPageName = () => this.state.currentPageName;

    this.setCurrentPageName = (currentPageName) => {
        this.state.currentPageName = currentPageName;
        this.updateLocalStorage();
    }
    
    this.pushTodoList = (todoList) => {
        this.state.todoLists.push(todoList);
        this.updateLocalStorage();
    }

    this.completeTodo = (todoListId, todoItemId) => {
        this.updateStatus(todoListId, todoItemId, "completed");
        this.updateLocalStorage();
    }

    this.cancelTodo = (todoListId, todoItemId) => {
        this.updateStatus(todoListId, todoItemId, "cancelled");
        this.updateLocalStorage();
    }

    this.reopenTodo = (todoListId, todoItemId) => {
        this.updateStatus(todoListId, todoItemId, "not completed");
        this.updateLocalStorage();
    }

    this.updateStatus = (todoListId, todoItemId, status) => {
        if (this.state.todoLists) {
            for (let todoList of this.getTodoLists()) {
                if (todoList.id === todoListId) {
                    if (todoList.todos) {
                        for (let todo of todoList.todos) {
                            if (todo.id == todoItemId) {
                                todo.status = status;
                            }
                        }
                    }
                }
            }
        }
    }

    this.addTodo = (toBeUpdatedTodoList, newTodoName) => {

        if (toBeUpdatedTodoList) {
        
            if (toBeUpdatedTodoList.todos) {

                let id = 1;

                for (let index in toBeUpdatedTodoList.todos) {
                    if (toBeUpdatedTodoList.todos[index].id > id) {
                        id = toBeUpdatedTodoList.todos[index].id;
                    }
                }

                toBeUpdatedTodoList.todos.push(new ToDoItem(id+1, newTodoName));

            } else {

                toBeUpdatedTodoList.todos = [];
                toBeUpdatedTodoList.todos.push(new ToDoItem(id, newTodoName));

            }

            for (let index in this.getTodoLists()) {
        
                if (this.getTodoLists()[index].id === toBeUpdatedTodoList.id) {
                    this.getTodoLists()[index] = toBeUpdatedTodoList;
                    this.updateLocalStorage();
                    break;
                }
        
            }
    
        }

    }
    
    this.getTodoList = (id) => {
        
        for (let index in this.getTodoLists()) {
            if (this.getTodoLists()[index].id == id) {
                return this.getTodoLists()[index];
            }
        }
        
        return null;
    }

    this.getTodoLists = () => {
        
        let userTodos = [];
        
        for (let todoList of this.state.todoLists) {
            if (this.state.loggedInUser && this.state.loggedInUser.email == todoList.userEmail) {
                userTodos.push(todoList);
            }
        }

        return userTodos;
    }

    this.signUpCustomer = (firstname, surname, email, password, isAgreedToTerms) => {

        if (!(firstname || surname || email || password || isAgreedToTerms)) {
            return {success: false, message: "One of the fields is empty! Please fill all of the fields!"};
        }

        if (!isAgreedToTerms) {
            return {success: false, message: "You need to agree to the terms of use"};
        }  

        if (this.state.users) {
            for (let user of this.state.users) {
                if (user.email == email) {
                    return {success: false, message: "This email is already used for another account"};
                }
            }
        } else {
            this.state.users = [];
        }

        const newUser = new User(email, password, firstname, surname);

        this.state.users.push(newUser);
        this.updateLocalStorage();

        return {success: true};
    }

    this.updateToDoList = (inputTodoList) => {

        if (this.state.todoLists) {
            for (let todoList of this.state.todoLists) {
                if (todoList.id == inputTodoList.id) {
                    todoList.name = inputTodoList.name;
                    this.updateLocalStorage();
                    return;
                }
            }
        }
    };

    this.updateUser = (loggedInUser) => {

        this.state.loggedInUser = loggedInUser;

        for (let user of this.state.users) {
            if (typeof user !== 'undefined') {
                if (user.email == loggedInUser.email) {
                    
                    user.password = loggedInUser.password;
                    user.firstname = loggedInUser.firstname;
                    user.lastname = loggedInUser.lastname;
                    
                    this.updateLocalStorage();
                    
                    return;
                }
            }
        }

    };
}

function ApplicationController() {

    this.header = null;

    this.getStore = () => this.store;

    this.getRequestParams = () => this.store.getRequestParams();

    this.authenticate = (login, password) => {
        
        if (this.authenticator.authenticate(login, password)) {
            return true;
        } else {
            return false;
        }
    }

    this.logout = () => {
        this.authenticator.logout();
    }

    this.initialize = () => {

        let savedStoreSerialized = window.localStorage.getItem('store');

        this.store = new Store();

        if (savedStoreSerialized) {
             this.store.state = JSON.parse(savedStoreSerialized);
        } 

        // this.store.state.users = [];
        // this.store.state.users[0] = new User("test@login.com", "123", "John", "Carter");
        
        this.pageFactory = new PageFactory(this); 
        this.authenticator = new Authenticator(this.store);
    }

    this.navigateTo = (pageName, requestParams) => {
        this.store.setRequestParams(requestParams);
        this.store.setCurrentPageName(pageName);
        this.loadCurrentPage();
    }

    this.loadCurrentPage = () => {

        let noLoginPages = ["signup","login","welcome"];
        
        if (!noLoginPages.includes(this.store.getCurrentPageName())) {
            if (!this.store.getLoggedInUser()) {
                this.store.setCurrentPageName("welcome");
            }
        }

        const headerPage = new Header(this); 

        this.header = headerPage;

        const bodyPage = this.pageFactory.getInstance(this.store.getCurrentPageName());

        const content = headerPage.getContent() + bodyPage.getContent();

        document.body.innerHTML = content;

        headerPage.initialize();
        bodyPage.initialize();
    }
}

function Authenticator(store) {

    this.store = store;

    this.authenticate = (login, password) => {

        for (let user of this.store.state.users) {
            if (typeof user !== 'undefined') {
                if (user.email === login && user.password === password) {
                    this.store.setLoggedInUser(user);
                    return true;
                }
            }
        }

        return false;
    }

    this.logout = () => {
        this.store.setLoggedInUser(null);
        this.store.setCurrentPageName(null);
    }
}

function PageFactory(application) {

    this.application = application;

    this.getInstance = (pageToBuild) => {

        pages = [
            new WelcomePage(this.application),
            new CreateToDoListPage(this.application),
            new DashboardPage(this.application),
            new LoginPage(this.application), 
            new SignUpPage(this.application), 
            new ViewToDoListPage(this.application),
            new Profile(this.application),
        ];

        for (let page of pages) {
            if (page.getPageName() === pageToBuild) {
                return page;
            }
        }

        return new WelcomePage(this.application);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    application.initialize();
    application.loadCurrentPage();
});
