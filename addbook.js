document.addEventListener("DOMContentLoaded",function()
{
    myLibrary= JSON.parse(sessionStorage.getItem('myLibrary'));

    bookForm = document.querySelector("#book-form");
    bookForm.addEventListener("submit", function(e)
    {
        e.preventDefault();

        //get data from form fields
        bookTitle = document.querySelector("input[name='title']").value;
        authorName = document.querySelector("input[name='author']").value;
        numberOfPages = document.querySelector("input[name='pages']").value;
        readStatus = document.querySelector("input[name='read']:checked").value
        
        bookForm.reset()
        //ADD TO MYLIBRARY ARRAY
        //create an object to add
        newBook = 
        {
            'title':bookTitle,
            'author':authorName,
            'pages': numberOfPages,
            'read': Boolean(readStatus)
        }
        myLibrary.push(newBook);
        //add to the session data
        newLibrary = sessionStorage.setItem("myLibrary", JSON.stringify(myLibrary));
        alert("added to library");
        //refresh library lsit
        myLibrary= JSON.parse(sessionStorage.getItem('myLibrary'));
    })


    






















})