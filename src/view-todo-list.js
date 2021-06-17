function ViewToDoListPage(application) {

    this.application = application;
    this.todoList;

    this.getContent = () => {

        const todoId = application.getRequestParams()[0].value;

        const todoList = application.getStore().getTodoList(todoId);

        this.todoList = todoList;

        let listName;

        if (todoList) {
            listName = todoList.listName;
        } else {
            listName = "";
        }

        return `
            <div class="main">
                <div id="toEditListNameDiv">
                    <div style="display: inline-block;"><h2>${listName}</h2></div>
                    <div style="display: inline-block;"><a href="#" id="editTodoListName">Edit</a></div>
                </div>
                ${buildTodoListHtml(todoList)}
                <form style="margin-left: 20px;">
                    <input type="text" id="todoName" class="formInput" placeholder="New ToDo" style="font-style: italic; color: grey;"/>
                    <button type="submit" id="addTodoBtn">Add</button>
                </form>
            </div>
        `;
    };

    this.getPageName = () => {
        return "viewtodolist";
    };

    this.initialize = () => {

        document.getElementById("editTodoListName").addEventListener("click", (event) => {

            event.preventDefault();

            document.getElementById("toEditListNameDiv").innerHTML = `
                <br/>
                <form>
                    <input id="editedListName" type="text" value="${this.todoList.listName}" style="font-size: 20px; font-weight: bold; border-style: dotted;"/>
                    <img src="./done.jpg" id="saveEditedListNameBtn" style="height: 17px;"/>
                </form>
                <br/>
            `;
            
            document.getElementById("saveEditedListNameBtn").addEventListener("click", (event) => {

                const editedListName = document.getElementById("editedListName").value;

                this.todoList.listName = editedListName;
                this.application.getStore().updateToDoList(this.todoList);
                this.application.navigateTo(this.getPageName(), this.application.getRequestParams());
            });

        });

        document.getElementById("addTodoBtn").addEventListener("click", (event) => {

            event.preventDefault();

            const todoName = document.getElementById("todoName").value;

            this.application.getStore().addTodo(this.todoList, todoName);
            this.application.navigateTo(this.getPageName(), this.application.getRequestParams());
        });

        let cancelTodos = document.getElementsByClassName("cancel_todo");

        for (let cancelTodo of cancelTodos) {
            cancelTodo.addEventListener("click", (event) => {
                event.preventDefault();
                let todoItemId = event.target.attributes.href.value;
                this.application.getStore().cancelTodo(this.todoList.id, todoItemId);
                this.application.navigateTo(this.getPageName(), this.application.getRequestParams());
            });
        }

        let completeTodos = document.getElementsByClassName("complete_todo");

        for (let completeTodo of completeTodos) {
            completeTodo.addEventListener("click", (event) => {
                event.preventDefault();
                let todoItemId = event.target.attributes.href.value;
                this.application.getStore().completeTodo(this.todoList.id, todoItemId);
                this.application.navigateTo(this.getPageName(), this.application.getRequestParams());
            });
        }

        let reopenTodos = document.getElementsByClassName("reopen_todo");

        for (let reopenTodo of reopenTodos) {
            reopenTodo.addEventListener("click", (event) => {
                event.preventDefault();
                let todoItemId = event.target.attributes.href.value;
                this.application.getStore().reopenTodo(this.todoList.id, todoItemId);
                this.application.navigateTo(this.getPageName(), this.application.getRequestParams());
            });
        }

    };

    function buildTodoListHtml(todoList) {

        if (todoList && todoList.todos) {

            return `
                <ul>
                    ${
                        todoList.todos.map(list => 
                            {

                                let controlsHtml = "";

                                if (list.status == 'not completed') {
                                    controlsHtml = `
                                                &nbsp;<a class="cancel_todo" href="${list.id}">Cancel</a> 
                                                | 
                                                &nbsp;<a class="complete_todo" href="${list.id}">Complete</a>
                                                `;
                                } else {
                                    controlsHtml = `&nbsp;<a class="reopen_todo" href="${list.id}">Reopen</a> `;
                                }

                                return `
                                        <li>
                                            ${list.name},
                                            status: ${list.status}
                                            ${controlsHtml}
                                        </li>
                                        `;
                                        
                                }
                        )
                        .join()
                    }
                </ul>
                `;
        }

        return "";
    }
}