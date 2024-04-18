window.addEventListener("load", function() {
    this.document.getElementById("list").addEventListener("click", function() {
        fetch("/api/list", {
            method: "POST"
        }).then(response => response.json()).then(data => {
            let list = document.getElementById("list_result");
            list.textContent = "";
            for(let key in data)
            {
                list.textContent += `${key}: ${data[key]}\n`;
            }
        });
    });

    this.document.getElementById("search").addEventListener("click", function() {
        let query = document.getElementById("student_id_search").value;
        fetch("/api/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        }).then(response => response.json()).then(data => {
            let search_result = document.getElementById("search_result");
            search_result.textContent = "";
            if(data.success)
            {
                search_result.textContent = `Hello, ${data.Name}`;
            }
            else
            {
                search_result.textContent = data.message;
            }
        });
    });

    this.document.getElementById("new").addEventListener("click", function() {
        let id = document.getElementById("student_id_new").value;
        let name = document.getElementById("student_name_new").value;
        fetch("/api/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, name })
        }).then(response => response.json()).then(data => {
            let add_result = document.getElementById("add_result");
            add_result.textContent = data.message;
        });
    });

    this.document.getElementById("delete").addEventListener("click", function() {
        let id = document.getElementById("student_id_delete").value;
        fetch("/api/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        }).then(response => response.json()).then(data => {
            let delete_result = document.getElementById("delete_result");
            delete_result.textContent = data.message;
        });
    });
});