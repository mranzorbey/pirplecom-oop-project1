function CreateToDoListPage(application) {

    this.application = application;

    this.getContent = () => {
        return `
            <div class="main">
                <h2>Create ToDo List</h2>
                <form style="margin-left: 20px;">
                    <input id="create_todo_list_name" placeholder="New ToDo Name" style="font-style: italic; color: grey;" />
                    <button type="submit" id="createTodoListBtn">Create</button>
                </form>
            </div>
        `;
    };

    this.getPageName = () => {
        return "createtodolist";
    };

    this.initialize = () => {
        
        const submitBtn = document.getElementById("createTodoListBtn");

        submitBtn.addEventListener("click", (event) => {
            
            event.preventDefault();

            const inputField = document.getElementById("create_todo_list_name");
            
            application.getStore().addTodoList(inputField.value);
            application.header.showNotification("ToDo list added...");
            
            submitBtn.disabled = true;
            
            setTimeout(() => application.navigateTo("dashboard"), 1500);
        });
        
    };
}