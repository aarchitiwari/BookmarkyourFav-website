let tog = document.querySelector('.save');
let inp = document.querySelector('.inp');
let container = document.querySelector('.container');
let db;
let bookmarkElements = []; // Array to store created bookmark elements

// Open or create a database
const request = window.indexedDB.open("Bookmarks", 1);

request.onerror = function() {
    console.log("Error opening database:", request.error);
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    let store = db.createObjectStore("Websites", { keyPath: "id", autoIncrement: true });
    store.createIndex("urlIndex", "url", { unique: true });
};

request.onsuccess = function() {
    db = request.result;
    console.log("Database opened successfully!");

    // Display existing bookmarks on page load
    displayBookmarks();
};

function displayBookmarks() {
    let transaction = db.transaction(["Websites"], "readonly");
    let store = transaction.objectStore("Websites");
    let request = store.getAll();

    request.onsuccess = function(event) {
        let bookmarks = event.target.result;

        // Loop through the bookmarks and create HTML elements for each one
        bookmarks.forEach(function(bookmark) {
            let element = createBookmarkElement(bookmark);
            bookmarkElements.push(element); // Store the created element
        });
    };

    request.onerror = function(event) {
        console.error("Error fetching bookmarks:", event.target.error);
    };
}

function createBookmarkElement(bookmark) {
    let card = document.createElement('div');
    card.classList.add('card', 'add');
    let pic = document.createElement('div');
    pic.classList.add('pic');
    let img = document.createElement('img');
    img.classList.add('img');
    img.setAttribute('src', "https://cdn.pixabay.com/photo/2022/09/25/23/06/flowers-7479351_1280.png");
    let link = document.createElement("div");
    link.classList.add('link');
    let myanchor = document.createElement('a');
    myanchor.classList.add('linkin');
    myanchor.setAttribute('href', bookmark.url);
    myanchor.innerHTML = bookmark.url;
    let btn = document.createElement('button');
    btn.innerText = "Remove Website";
    btn.addEventListener('click', function() {
        removeBookmark(bookmark.id);
        card.remove();
    });

    link.appendChild(myanchor);
    pic.appendChild(img);
    card.appendChild(pic);
    card.appendChild(link);
    card.appendChild(btn);
    container.appendChild(card);

    return card; // Return the created element
}

function removeBookmark(id) {
    let transaction = db.transaction(["Websites"], "readwrite");
    let store = transaction.objectStore("Websites");
    store.delete(id);
}
let i = 0;
tog.addEventListener("click", () => {
    if (inp.value == '') {
        return;
    }

    let transaction = db.transaction(["Websites"], "readwrite");
    let store = transaction.objectStore("Websites");
    i++;
    let newItem = { id: i, url: inp.value };
    let newRequest = store.add(newItem);

    newRequest.onsuccess = function() {
        console.log("Successfully Data Stored!");
        inp.value = ''; // Clear the input field after storing the data
        createAndDisplayBookmark(newItem); // Create and display the new bookmark element
    };

    newRequest.onerror = function(event) {
        console.error("Error in storing:", event.target.error);
    };
});

function createAndDisplayBookmark(bookmark) {
    let element = createBookmarkElement(bookmark);
    bookmarkElements.push(element); // Store the created element
}
