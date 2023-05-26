document.addEventListener("DOMContentLoaded",function()
{

    bookForm = document.querySelector("#book-form");
    bookForm.addEventListener("submit", function(e)
    {
        e.preventDefault();

        //get data from form fields
        bookTitle = document.querySelector("input[name='title']").value;
        authorName = document.querySelector("input[name='author']").value;
        pageNumber = document.querySelector("input[name='pages']").value;
        readStatus = document.querySelector("input[name='read']:checked").value
        
        bookForm.reset()
        //ADD TO MYLIBRARY ARRAY

    })

























})