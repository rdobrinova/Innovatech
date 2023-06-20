const buttons = {
    loadMore: document.getElementById('loadMoreButton'),
    backToTop: document.getElementById("backToTopButton")
};

const elementsForPosts = {
    postPerPage: 6,
    currentPage: 1,
    posts: null,
    postsCount: 0,
}

const loader = document.getElementById("loader");

getAllPosts();

function getAllPosts() {
    fetch("https://raw.githubusercontent.com/rdobrinova/Innovatech/main/datacontent")
        .then(res => res.json())
        .then(data => {

            elementsForPosts.posts = data.posts;
            elementsForPosts.postsCount = elementsForPosts.posts.length;

            if (elementsForPosts.postsCount < elementsForPosts.postPerPage) {
                displayPosts(elementsForPosts.postsCount);
                buttons.loadMore.style.display = "none";
            } else {
                displayPosts(elementsForPosts.currentPage * elementsForPosts.postPerPage);
            }

        }).catch(error => {
            console.log(error);
        })
}

// Function to display 6 posts per page + Load More button functionality
function displayPosts(postsToLoad) {
    let nextPagePosts;
    let startingIndex = (elementsForPosts.currentPage * elementsForPosts.postPerPage) - elementsForPosts.postPerPage;

    if (postsToLoad >= elementsForPosts.postsCount) {
        nextPagePosts = elementsForPosts.posts.slice(startingIndex, elementsForPosts.postsCount);
        buttons.loadMore.style.display = "none";
    } else {
        nextPagePosts = elementsForPosts.posts.slice(startingIndex, postsToLoad);
    }

    createCard(nextPagePosts);

    elementsForPosts.currentPage++;
};

// Function to create a card
function createCard(posts) {
    const blogCard = document.getElementById("blogCard");

    posts.forEach((post) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const image = document.createElement("img");
        image.src = post.coverImage;
        image.alt = "Blog Picture";
        image.id = "image";

        const totalContent = document.createElement("div");
        totalContent.classList.add("total-content");

        const title = document.createElement("h2");
        title.id = "title";
        title.textContent = post.title;

        const text = document.createElement("p");
        text.id = "text";
        text.textContent = post.text;

        const tags = document.createElement("div");
        tags.classList.add("tags");
        tags.innerHTML = post.tags.map(tag => `<span>#${tag}</span>`).join(", ");

        const icons = document.createElement("div");
        icons.classList.add("icons");

        const commentIcon = document.createElement("span");
        commentIcon.classList.add("comment-icon");
        commentIcon.textContent = "💬";

        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.addEventListener("click", () => {
            heart.classList.toggle("liked");
        });

        icons.appendChild(commentIcon);
        icons.appendChild(heart);

        totalContent.appendChild(title);
        totalContent.appendChild(text);
        totalContent.appendChild(tags);
        totalContent.appendChild(icons);

        card.appendChild(image);
        card.appendChild(totalContent);

        blogCard.appendChild(card);
    });

    blogCard.appendChild(buttons.loadMore);
}


// Back to top

// Show the "Back to Top" button when scrolling down
window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
        buttons.backToTop.style.display = "block";
    } else {
        buttons.backToTop.style.display = "none";
    }
});

// Scroll to the top of the page when the button is clicked
buttons.backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

buttons.loadMore.addEventListener('click', () => {
    loader.style.display = "block";
    displayPosts(elementsForPosts.currentPage * elementsForPosts.postPerPage);
    loader.style.display = "none";
});
