myLibrary =[]
libraryButtonList = []

document.addEventListener("DOMContentLoaded", function()
{
    const bookTable = document.querySelector("#booktable");
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
    
   loadTable(myLibrary, bookTable)
   
  
});


//create function that loads table
//TODO FIX ISSUE WITH BUTTON LIST KEEP ADDING MORE BUTTONS ON REFRESH
loadTable = function(library, table)
{   
    libraryButtonList=[];
    
    if (!table)
    {
        console.log("NO TABLE")
    }
    for (book of library)
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
        //reset button list
        
        if (libraryButtonList.includes(readButton) == false)
        {
            libraryButtonList.push(readButton);
        }
        //need to readd event listeners
        buttonCell.appendChild(readButton);
        bookRow.appendChild(buttonCell);
        table.appendChild(bookRow);
    }

    //create list of buttons for the table
    buttonEventListeners(libraryButtonList, table, library)
    
   
}

function buttonEventListeners(buttonlist,table,library)
{   
    for (button of buttonlist)
    {
        button.addEventListener("click", function()
        {
            //change the value of .read in the table
            searchTitle = this.getAttribute("value");
            //search for the title inside the myLibrary array
            for (book of library)
            {
                if (book['title'] == searchTitle)
                {
                    //change book read status
                    if (book['read'] == false)
                    {
                        book['read'] = true;
                    }
                    else
                    {
                        book['read'] = false;
                    }
                }
            }
            //TODO REFRESH THE TABLE
            // DELETE INNER HTML OR 
            table.innerHTML= "";
            loadTable(library,table);
 
 
        });
    }

}