fetch("../../DataBase/jsonformatter.json")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        printPosts(data.posts);
    }).catch(function (error) {
        console.log(error);
    }).finally(function () {
        console.log("Finally block is executed")
    })


function printPosts(posts) {
    let ul = document.getElementById("result");
    let html = "";
    for (let post of posts) {
        html += `<div><img src="${post.coverImage}"/></div>`
        html += `<div><b>Title:</b> ${post.title}</div>`
        html += `<div><b>Text:</b> ${post.text}</div>`
        html += `<div><b>Tags:</b> ${post.tags}</div>`
    }
    ul.innerHTML = html;
}
