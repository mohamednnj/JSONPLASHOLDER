let section = document.querySelector('section');

getUsers().then(users => {
    let userContainer = document.createElement('div');
    userContainer.classList.add('userContainer');

    let logo = document.createElement('h1');
    logo.classList.add('logo');
    logo.innerHTML = 'SiRRiTUP';
    section.appendChild(logo);

    users.forEach(user => {
        userContainer.innerHTML += `
            <div class="user" id="${user.id}">
                <img src="https://i.pravatar.cc/150?u=${user.id}" alt="User Avatar" />
                <h2>${user.name}</h2>
            </div>
        `;
    })
    section.appendChild(userContainer);
});

let aside = document.querySelector('aside');

getPosts().then(posts => {
    let postsContainer = document.createElement('div');
    postsContainer.classList.add('postsContainer');

    posts.sort((a, b) => b.title.localeCompare(a.title)).forEach(post => {
        let postContainer = document.createElement('div');
        postContainer.classList.add('postContainer');

        getUser(post.userId).then(user => {
            const postContent = `
                <div class="user">
                    <img src="https://i.pravatar.cc/150?u=${post.userId}" alt="User Avatar" />
                    <h2>${user.username}</h2>
                </div>
                <h3>${post.title}</h3>
                <img class="postImage" src="https://i.pravatar.cc/150?u=${post.userId}" alt="User Avatar" />
                <p>${post.body}</p>
                <div class="iconContainer">
                    <i id="comment-${post.id}"> 
                        <img src="image/chat-balloon.png" alt="Comment" class="commentIcon" /> 
                    </i>
                    <i> 
                        <img src="image/thumbs-up.png" alt="Like" class="likeIcon" /> 
                    </i>
                </div>
            `;

            postContainer.innerHTML = postContent;

            let commentIcon = postContainer.querySelector(`#comment-${post.id}`);
            let commentsVisible = false;

            commentIcon.addEventListener('click', () => {
                if (commentsVisible) {
                    const existingComments = postContainer.querySelector('.commentsContainer');
                    if (existingComments) {
                        existingComments.remove();
                    }
                    commentsVisible = false;
                } else {
                    getComments(post.id).then(comments => {
                        const existingComments = postContainer.querySelector('.commentsContainer');
                        if (existingComments) {
                            existingComments.remove();
                        }

                        let commentsContainer = document.createElement('div');
                        commentsContainer.classList.add('commentsContainer');

                        comments.forEach(comment => {
                            commentsContainer.innerHTML += `
                                <div class="comment">
                                    <h4>${comment.name}</h4>
                                    <p>${comment.body}</p>
                                </div>
                            `;
                        });

                        postContainer.appendChild(commentsContainer);
                        commentsVisible = true;
                    });
                }
            });

            postsContainer.appendChild(postContainer);
        });
    });

    aside.appendChild(postsContainer);
});
