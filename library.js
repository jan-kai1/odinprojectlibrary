//check if session data has library
if (sessionStorage.getItem("myLibrary")){
    myLibrary = JSON.parse(sessionStorage.getItem("myLibrary"))
    console.log("libray found")
}
else
{
    myLibrary = []
}
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
    murphy = new Book('Murphy','Samuel Beckett', 158);
    if (myLibrary.length == 0)
    {
        myLibrary.push(thirtyNineSteps);
        myLibrary.push(murphy)
    }
    else if (myLibrary.length != 0)
    {
        for (book of myLibrary)
    {
        if (book['title'] != thirtyNineSteps['title'])
        {
            continue;
        }
        else if(book['title'] == thirtyNineSteps['title'])
        {
            console.log("duplicate found")
            break;
        }
        else
        {
            myLibrary.push(thirtyNineSteps)
            console.log("thirty nine added")
        }

    }
    for (book of myLibrary)
    {
        if (book['title'] != murphy['title'])
        {
            continue;
        }
        else if(book['title'] == murphy['title'])
        {
            console.log("duplicate found")
            break;
        }
        else
        {
            myLibrary.push(murphy)
            console.log("murphy added")
        }

    }
    }
    
    
   loadTable(myLibrary, bookTable)
   
  
});


//create function that loads table
//TODO FIX ISSUE WITH BUTTON LIST KEEP ADDING MORE BUTTONS ON REFRESH
loadTable = function(library, table)
{   
    libraryButtonList=[];
    deleteButtonList = [];
    
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
        readButtonCell = document.createElement("td");
        readButton = document.createElement("button");
        readButton.setAttribute("value", book['title']);
        readButton.setAttribute("id", book['title']);
        readButton.textContent = "Read?"

        //delete button cell
        deleteButtonCell = document.createElement("td");
        deleteButton = document.createElement("button");
        deleteButton.setAttribute("value" , book['title']);
        deleteButton.setAttribute("id",book['title']);
        deleteButton.textContent = "Delete?"


        //add button to list for event listeners
        //reset button list
        if (deleteButtonList.includes(deleteButton) == false)
        {
            deleteButtonList.push(deleteButton);
        }
        if (libraryButtonList.includes(readButton) == false)
        {
            libraryButtonList.push(readButton);
        }
        //need to readd event listeners
        
        readButtonCell.appendChild(readButton);
        deleteButtonCell.appendChild(deleteButton)
        bookRow.appendChild(readButtonCell);
        bookRow.appendChild(deleteButtonCell);
        table.appendChild(bookRow);
    }

    //create list of buttons for the table
    readButtonEventListeners(libraryButtonList, table, library)
    deleteButtonEventListener(deleteButtonList, table, library)
    //add library list to sessiondata
    jsonLibrary = JSON.stringify(library);
    sessionStorage.setItem('myLibrary', jsonLibrary);
   
}

function readButtonEventListeners(buttonlist,table,library)
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

function deleteButtonEventListener(buttonlist,table,library)
{
    for(button of buttonlist)
    {
        button.addEventListener("click", function()
        {

            searchTitle = this.getAttribute("value")
            for (let i = 0; i < library.length; i++)
            {
                if (library[i]['title'] == searchTitle)
                {
                    library.splice(i,1);
                   
                }
            }
            table.innerHTML = "";
            loadTable(library,table);
        })
    }
}