/*
Treehouse Techdegree:
FSJS Project 2 - studentsList Pagination and Filtering
*/


/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/studentsList-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

// Storing itemsPerPage in a variable is useful if we want to increase this number in the future
const itemsPerPage = 9;
// Starting a fresh copy of students list. Later we will update this variable to reflect the search results
let studentsList = data;


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
// This function takes a page number as a parameter, and shows the corresponding page
function showPage(pageNumber) {
    // Calculating ending index first so that we can use it to calculate the starting index
    let endingIndex = pageNumber * itemsPerPage;
    // Then, calculating the starting index
    const startingIndex = endingIndex - itemsPerPage;
    // This if-statement is for the last page only where maybe there are less than number of items per page to be shown
    if (endingIndex > studentsList.length) {
        // Set it to the length of the students list
        endingIndex = studentsList.length;
    }
    // Selecting the ul of the student list so that we can append list items
    const ul = document.querySelector('.student-list');
    // Remove all list items to prepare the unordered list to be filled with new items
    ul.innerHTML = '';
    // This for loop will iterate from the starting index to the ending index
    for (let i = startingIndex; i < endingIndex; i++) {
        // Getting the corresponding student
        const student = studentsList[i];
        // Creating a new li element which we will append to it some children later
        const li = document.createElement('li');
        // Setting the class names
        li.className = 'student-item cf';
        // Creating a div to store the student details
        const studentDetailsDiv = document.createElement('div');
        // Setting the class name for this div
        studentDetailsDiv.className = 'student-details';
        // Creating a new img to store the avatar
        const img = document.createElement('img');
        // Setting the class name for the image
        img.className = 'avatar';
        // Setting the source
        img.src = student.picture.large;
        // Setting the alternative text
        img.alt = 'Profile Picture';
        // Appending the img to the student details div
        studentDetailsDiv.appendChild(img);
        // Creating an h3 tag to store the full name of the student
        const h3 = document.createElement('h3');
        // Setting its text content
        h3.textContent = `${student.name.first} ${student.name.last}`;
        // Appending the h3 to our div
        studentDetailsDiv.appendChild(h3);
        // Creating a new span to hold the email
        const email = document.createElement('span');
        // Setting its class name;
        email.className = 'email';
        // Setting its text content
        email.textContent = student.email;
        // Appending it to our div
        studentDetailsDiv.appendChild(email);
        // Appending the student details to the list item
        li.appendChild(studentDetailsDiv);
        // Creating another div to hold the join date
        const joinedDetailsDiv = document.createElement('div');
        // Creating a span to hold the date text
        const date = document.createElement('span');
        // Assigning its class name
        date.className = 'date';
        // Setting its text content
        date.textContent = `Joined ${student.registered.date}`;
        // Appending the date span to the div
        joinedDetailsDiv.appendChild(date);
        // Adding the div to the list item
        li.appendChild(joinedDetailsDiv);
        // Finally, the list item is ready to be appending to the unordered list
        ul.appendChild(li);
    }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
// This function adds the pages buttons to the footer based on the current page number.
// The current page number will be with a class name equals to active.
function addPagination(pageNumber) {
    // Getting the list element so that we can add the pages buttons
    const ul = document.querySelector('.link-list');
    // Reset its content
    ul.innerHTML = '';
    // Calculating the number of pages.
    // We used ceil function because maybe the quotient of the division is a float number
    const numberOfPages = Math.ceil(studentsList.length / itemsPerPage);
    // This for loop starts from 1 to number of pages inclusively
    for (let i = 1; i <= numberOfPages; i++) {
        // Creating a new li element
        const li = document.createElement('li');
        // Creating a new button
        const button = document.createElement('button');
        // Setting the type of the button
        button.type = 'button';
        // Setting the text content of the button
        button.textContent = `${i}`;
        // If the iterator is at the current page number, mark the page number as active
        if (i === pageNumber) {
            // As we have said in the previous comment, we mark the page number s active
            button.className = 'active';
        }
        // Appending the button to the list item
        li.appendChild(button);
        // Appending the list item to the unordered list
        ul.appendChild(li);
    }
    // This event listener is for the whole unordered list. However, we will only consider clicks on the list items.
    // The event listener will report the click to parent which is the unordered list through bubbling
    ul.addEventListener('click', (event) => {
        // Only consider clicks on the buttons
        if (event.target.tagName === 'BUTTON') {
            // Save the clicked button object
            const button = event.target;
            // Get the page number
            const pageNumber = parseInt(button.textContent);
            // Call show page to update the items
            showPage(pageNumber);
            // Call add pagination to mark the new page number as active
            addPagination(pageNumber);
        }
    });
}

// Getting the header to add the search field to it.
// I did not include an event listener to the search icon button
// because we will need it as we will update the list items immediately after writing any character.
const header = document.querySelector('.header');
// Creating a new label to label the search input field
const label = document.createElement('label');
// Adding the "for" attribute to the label. I got this command from w3schools.
label.htmlFor = 'search';
// Assigning the class name
label.className = 'student-search';
// Creating a new span
const span = document.createElement('span');
// Adding the text content to the span
span.textContent = 'Search by name';
// Appending the span to the label
label.appendChild(span);
// Creating a new input field which will hold the search field
const input = document.createElement('input');
// Assigning its id
input.id = 'search';
// Writing a placeholder to be shown when the text field is empty
input.placeholder = 'Search by name...';
// Appending the input field to the label
label.appendChild(input);
// Creating a new button which will contain the search icon. We will not add an event listener to this button
// because of what we have said before.
const button = document.createElement('button');
// Assigning the button type
button.type = 'button';
// Creating a new img to hold the search icon
const img = document.createElement('img');
// Assigning the img src attribute
img.src = 'img/icn-search.svg';
// Assigning the alternative text
img.alt = 'Search icon';
// Appending the img to the button
button.appendChild(img);
// Appending the button to the label
label.appendChild(button);
// Finally, we are ready to append the label to the header
header.appendChild(label);

// Creating an event listener to the text field of type "keyup"
input.addEventListener('keyup', () => {
    // Getting the value of the text field
    const name = input.value;
    // If it is empty, show all students
    if (name === '') {
        // Reset the studentsList variable to hold the whole list of objects
        studentsList = data;
        p.style.display = 'none';
    } else {
        // Else, we assign an empty list to the studentsList variable which will be filled with search results later.
        studentsList = [];
        // A for loop which will iterate through the list of objects
        for (let i = 0; i < data.length; i++) {
            // Saving the current student to a variable
            const student = data[i];
            // Using template literals to concatenate the first name and the last name. Then, convert it to upper case.
            // Converting the name to upper case will make the search case insensitive.
            const fullName = `${student.name.first} ${student.name.last}`.toUpperCase();
            // If the name includes a substring equals to the search phrase, append the student to our list.
            if (fullName.includes(name.toUpperCase())) {
                // Adding the student to the end of the queue
                studentsList.push(student);
            }
        }
        // Checking if there are no results
        if(studentsList.length === 0) {
            // Display "No results" message
            p.style.display = 'block';
        } else {
            // Hide the message to prepare the page for inserting list items
            p.style.display = 'none';
        }
    }
    // Showing page 1 of the search results
    showPage(1);
    // Showing the page numbers
    addPagination(1);
});

// Adding a new <p> tag to contain "No results", it will remain hidden until there are no results based on the search
// Selecting ".page" to insert the new <p> inside it
const page = document.querySelector('.page');
// Selecting ".student-list" to insert the new <p> before it
const ul = document.querySelector('.student-list');
// Creating the p element and configuring its style to be not shown by default and to be centered
const p = document.createElement('p');
p.textContent = 'No results';
p.style.display = 'none';
p.style.textAlign = 'center';
// Inserting the
page.insertBefore(p, ul);

// Call functions
// Showing page 1 of the search results
showPage(1);
// Showing the page numbers
addPagination(1);