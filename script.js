const resultsDOM = document.querySelector('#results');
const nameDOM = document.querySelector('#name');

window.addEventListener('DOMContentLoaded', () => {
  getUsers();
});

function getUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
      // console.log(data); 
      let users = data.map(user => {
       return `
        <tr class='user single-user' data-ID="${user.id}">
          <td>${user.name}</td>
        </tr>
       `;
      }).join('')
      // console.log(users);
      nameDOM.innerHTML = users;
      nameDOM.addEventListener('click', e => {        
        getUserId(e);
      })
    }). catch(error => {
      console.log(error);
    })   
}

function getUserId(e) {
  const singleUser = e.target.parentElement;
  console.log(singleUser);
  if(singleUser.classList.contains('single-user')) {
    const postId = singleUser.getAttribute('data-id');    
    getPosts(postId)
  }

}

function getPosts(postId) {
  fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then(response => response.json())
    .then(data => {
      // console.log(data); 
      getAllPosts(data)
    }). catch(error => {
      console.log(error);
    })   
}

function getAllPosts(data) {
  let result = ''
  data.forEach(post => {
    result += `
      <div class="single-post" data-userID="${post.id}">
        <h3>${post.name}</h3>
        <p>${post.body}</p>
      </div>
    `
    resultsDOM.innerHTML = result;
  })
}

// Set date
const date = document.querySelector('#date');
date.innerHTML = new Date().getFullYear();