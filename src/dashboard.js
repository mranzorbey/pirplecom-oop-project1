function DashboardPage(application) {

    this.application = application;

    this.getContent = () => {
        
        const todoLists = application.getStore().getTodoLists();

        return `
            <div class='main'>
                <h2>ToDo Lists</h2>
                <ul>
                    ${
                        todoLists.map(todoList => 
                            `
                                <li>
                                    <a class='todolink' href='${todoList.id}'>
                                        ${todoList.listName}
                                    </a>
                                </li>
                            `
                            ).join('')
                    }
                </ul>
                <form><button id='gotoTodoListBtn'>Add TODO List</button></form>    
            </div>
            `;

        // let content = `
        //     <div class="main">
        //         <h2>ToDo Lists</h2>
        //         <ul>`;

        // const todoLists = application.getStore().getTodoLists();

        // for (let id in todoLists) {
        //     content += `<li>`;
        //     content += `<a class='todolink' href='` + todoLists[id].id + `'>`
        //     content += todoLists[id].listName
        //     content += `</a>`;
        //     content += `</li>`;
        // }

        // content += `
        //         </ul>
        //         <form><button id='gotoTodoListBtn'>Add TODO List</button></form>
        //     </div>`;

        // return content;
    };
    
    this.getPageName = () => {
        return "dashboard";
    };

    this.initialize = () => {

        const gotoTodoListBtn = document.getElementById("gotoTodoListBtn");

        gotoTodoListBtn.addEventListener("click", (event) => {
            event.preventDefault();
            application.navigateTo("createtodolist");
        });

        for (let element of document.getElementsByClassName("todolink")) {
            element.addEventListener("click", (event) => {
                event.preventDefault();
                application.navigateTo("viewtodolist", [{key: "id", value: event.target.attributes.href.value}]);
            });
        }
    };
}