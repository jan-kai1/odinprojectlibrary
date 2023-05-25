document.addEventListener("DOMContentLoaded", function()
{
    myLibrary =[]
    libraryButtonList = []
    class Book
    {
        constructor(title,author,pages,read)
        {
            this.title = title;
            this.author=author;
            this.pages=pages;
            this.read = false;
        }
    
        info() 
        {
            console.log(`Title : ${this.title} Author ${this.author} Pages:${this.pages} Read: ${this.read}`)
        }
    }
    //https://keepingupwiththepenguins.com/reading-list-page-count-classic-and-best-seller-books-from-shortest-to-longest/
    
    thirtyNineSteps = new Book('The Thirty-Nine Steps','John Buchan', 138);
    myLibrary.push(thirtyNineSteps);
    murphy = new Book('Murphy', 'Samuel Beckett', 158);
    myLibrary.push(murphy);
    let bookTable = document.querySelector("#booktable");
    if (!bookTable)
    {
        console.log("NO TABLE")
    }
    for (book of myLibrary)
    {
        let bookRow = document.createElement("tr")
        //create a row in table
        for (key in book)
        {

            keyInfo = document.createElement("td");
            if (key == "read")
            {
                if (book[key]===false)
                {
                    keyInfo.textContent = "Unread";
                }
                else{
                    keyInfo.textContent = "Read";
                }
            }
            else
            {  
                keyInfo.textContent = book[key];
                
            }
            bookRow.appendChild(keyInfo);
        }
        // add a button to the row
        buttonCell = document.createElement("td");
        readButton = document.createElement("button");
        readButton.setAttribute("value", book['title']);
        readButton.setAttribute("id", book['title']);
        readButton.textContent = "Read?"
        //add button to list for event listeners
        libraryButtonList.push(readButton);
        buttonCell.appendChild(readButton);
        bookRow.appendChild(buttonCell);
        bookTable.appendChild(bookRow);
    }

    

});
