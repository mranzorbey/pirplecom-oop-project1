# pirplecom-oop-project1
To me objects are a pretty good way to structure data model of your app, give your team the same vocabulary. Depending on the instrument/programming language OOP also provides certain rules/guidelines to ease team's life. JS uses very lightwaight approach to OOP unlike Java or C#. No such things as interfaces, field access modifiers, inheritance rules etc. - which is good in its own way. What I do like about OOP in JS is that every container is an object which is in turn is a simple json - so passing jsons back and forth, parsing, defining needs less mappers/converters/parsers etc. It is hard to say which approach functional or event-driven requires OOP less, to me objects are equally good for the most types of programming. To me, it depends more on how you structure your app and the restrictions you have on the environment, memory and so forth. One can use objects in some app built with functional oriented programming in mind to build rules that react on specific object creation/desctruction/change and in event-driven app one could use objects to store event info and build a pipeline to stream and data. So, it is either I did not understand the question or I am not qualified to answer it :) I would appreciate it if can send me your answer to that question :)

As an example of an app that would greatly benefit from OOP structure - ToDo App. Below I presented a structure for that kind of app. Having a structure of that kind makes app really transparent to every developer. It is also easy to think of object's functions and to group them under the same types of objects and helps to write well structured tech docs.

The flow of the app is pretty straightforward and can be easilty described using object names from the below pseudocode. Here is the sample user story that uses vocabulary from the model below. I presented here single User Story (not too structured though) just for the demonstartion purpose.

**US-01: User sign up**

_Condition:_ 

As a user of ToDo list app I want to create personal account. I open welcome page and follow "sign me up" link, which redirects me to sign up page which renders html form. After I fill all the fields on this form I clicks Sign Up button and if everything is fine with the input data I provided (i.e. username is not occupied, password is correct, email provided is fine) - app redirects me to the Dashboard page.

_Technical flow:_

1. Load page http://someurl/myapp/index.html which initiates the app by constructing Application object
2. If AuthenticationService.isLoggedIn() returns false create an instance of WelcomePage with init() method and load page with the overloaded getContent() method which renders navigation pane into "root" div of index page
3. If AuthenticationService.isLoggedIn() returns true create an instance of DashboardPage with init() method and load page with the overloaded getContent() method which renders list of ToDoLists into "root" div of index page
4. On the WelcomePage if user clicked on "sign me up" link create SignUpPage object and load page content with the overloaded getContent() method which renders a form into "root" div
5. On the SignUpPage if user clicked on Sign Up button create user with UserService.createUser() method and if successful route user to dashboard page by calling HttpRouter.navigateTo("DashboardPage")
6. If HttpRouter.navigateTo("DashboardPage") is called create object of DashboardPage and load page content with the overloaded getContent() method which renders a form into "root" div

Here is the pseudocode for the project I did earliner in the course, my source code is a bit different - below pseudocode makes much more sense. If I would write it again I think I would stick with that approach below:

	User(email, password, firstname, lastname) constructor
		email: user email
		password: user password hash
		firstname: user firstname
		lastname: user lastname

	ToDoList(id, listName, todos[], ownerEmail) constructor
		this.id: unique list identifier
		this.listName: name of the list
		this.todos: an array of ToDoItem objects
		this.ownerEmail: text - user email address
		this.updateToDoList(todoListInfo): updates todo object 

	ToDoItem(id, name, status) constructor
		this.id: unique number
		this.name: text
		this.status: text
		this.updateStatus(status)
		this.completeToDo()
		this.cancelToDo()
		this.reopenToDo()	

	StoreService() constructor
		this.addLoggedUserEntry(user)
		this.getLoggedUserEntry()
		this.removeLoggedUserEntry(user)

		this.setCurrentRequestParamsEntry(params)
		this.getCurrentRequestParamsEntry()
		this.removeCurrentRequestParamsEntry(params)

		this.addToDoListEntry(listName)
		this.getToDoListEntry()
		this.removeToDoListEntry(listName)
		this.updateToDoListEntry(todolist)

		this.getCurrentPageNameEntry()
		this.setCurrentPageNameEntry(pageName)
		this.removeCurrentPageEntry(pageName)

		this.addUserEntry(user)
		this.getUserEntry(username)
		this.removeUserEntry(user)
		this.updateUser(user)

	UsersService(storeService, authenticatorService) constructor
		this.storeService: StoreService
		this.authenicatorService: AuthenticationService
		this.storeService: StoreService
		this.createUser(user)
		this.updateUser(user)
		this.getUser()

	ToDoListsService(storeService, authenticatorService) constructor
		this.storeService: StoreService
		this.authenicatorService: AuthenticationService
		this.createToDoList()
		this.updateToDoList()
		this.getToDoList()
		...

	Application(storeService, authenicatorService, routerService, todoListService, usersService) constructor //reads data from the local storage and creates storeService, authenicatorService, routerService objects
		this.storeService: StoreService
		this.authenticatorService: AuthenticationService
		this.routerService: RouterService
		this.todoListService: ToDoListsService
		this.usersService: UsersService

	HttpRouter(authenticatorService) constructor
		authenicatorService: AuthenticationService

	HttpRouter
		getRequestParams(): returns [] of all the request params
		navigateTo(pageName): checks routing rules and loads *Page if there is such a route

	AuthenticationService(storeService) constructor
		this.authenticate()
		this.logout()
		this.isLoggedIn(): returns true/false
		this.getLoggedInUser(): returns User object

	PageFactory
		this.getInstance(pageName, applicationService): *Page

	Page(application) constructor: //since all pages need a construtor that takes one argument "applicationService", let's make it available for all *Page objects
		this.application: Application

	Page.prototype: //prototype is needed here since we are 
		this.getContent(): returns html block
		this.getPageName(): return name of the page
		this.init(): initalize the page, all the events and transitions

	WelcomePage.prototype extends from Page.prototype and redefines getContent(), getPageName(), init()

	LoginPage.prototype extends from Page.prototype and redefines getContent(), getPageName(), init()

	SignUpPage.prototype extends from Page.prototype and redefines getContent(), getPageName(), init()

	CreateToDoListPage.prototype extends from Page.prototype and redefines getContent(), getPageName(), init()

	DashboardPage.prototype extends from Page.prototype and redefines getContent(), getPageName(), init()

	ProfilePage.prototype extends from Page.prototype and redefines getContent(), getPageName(), init()

	ViewToDoListPage.prototype extends from Page.prototype and redefines getContent(), getPageName(), init()
