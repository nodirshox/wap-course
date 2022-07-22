window.onload = function() {
    updateHistory();
}

function addTask() {
    let task = document.getElementById("task-name").value;
    if (task.length === 0) {
        alert("Please enter text");
        return;
    }
    task = task.trim();

    let history = localStorage.getItem("list");
    if (history == null) {
        history = "";
    }
    history = task + "\r\n" + history;
    localStorage.setItem("list", history);

    // update textarea value
    updateHistory();

    // clear input
    document.getElementById("task-name").value = "";
}

function clearTask() {
    let historyList = document.getElementById("history-list");
    historyList.value = "";
    // TODO: remove from localStorage
    localStorage.removeItem("list");
}

function updateHistory() {
    let history = document.getElementById("history-list");
    history.value = localStorage.getItem("list");
}