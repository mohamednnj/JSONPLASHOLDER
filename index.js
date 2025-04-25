// Constants
const API = {
    AVATAR_URL: 'https://i.pravatar.cc/150',
    ICONS: {
        COMMENT: 'image/chat-balloon.png',
        LIKE: 'image/thumbs-up.png'
    }
};

// Main UI Class
class SocialFeedUI {
    constructor() {
        this.section = document.querySelector('section');
        this.aside = document.querySelector('aside');
        this.initializeUI();
    }

    async initializeUI() {
        try {
            await this.renderHeader();
            await this.renderUsersList();
            await this.renderPosts();
        } catch (error) {
            this.showError('Failed to initialize the application', error);
        }
    }

    showError(message, error) {
        console.error(error);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = `${message}: ${error.message}`;
        document.body.prepend(errorDiv);
    }

    async renderHeader() {
        const logo = document.createElement('h1');
        logo.classList.add('logo');
        logo.textContent = 'SiRRiTUP';
        this.section.appendChild(logo);
    }

    async renderUsersList() {
        try {
            const users = await getUsers();
            const userContainer = document.createElement('div');
            userContainer.classList.add('userContainer');

            const usersHTML = users.map(user => this.createUserCard(user)).join('');
            userContainer.innerHTML = usersHTML;

            // Add click handlers for user cards
            userContainer.addEventListener('click', (e) => {
                const userCard = e.target.closest('.user');
                if (userCard) {
                    this.handleUserCardClick(userCard.id);
                }
            });

            this.section.appendChild(userContainer);
        } catch (error) {
            this.showError('Failed to load users', error);
        }
    }

    createUserCard(user) {
        return `
            <div class="user" id="${user.id}" data-user-id="${user.id}">
                <img src="${API.AVATAR_URL}?u=${user.id}" alt="${user.name}'s Avatar" 
                     loading="lazy" onerror="this.src='image/default-avatar.png'"/>
                <h2>${this.sanitizeHTML(user.name)}</h2>
            </div>
        `;
    }

    async renderPosts() {
        try {
            const posts = await getPosts();
            const postsContainer = document.createElement('div');
            postsContainer.classList.add('postsContainer');

            // Sort posts and add loading indicator
            const sortedPosts = posts.sort((a, b) => b.title.localeCompare(a.title));

            for (const post of sortedPosts) {
                const postElement = await this.createPostElement(post);
                postsContainer.appendChild(postElement);
            }

            this.aside.appendChild(postsContainer);
        } catch (error) {
            this.showError('Failed to load posts', error);
        }
    }

    async createPostElement(post) {
        const postContainer = document.createElement('div');
        postContainer.classList.add('postContainer');

        try {
            const user = await getUser(post.userId);
            postContainer.innerHTML = this.createPostContent(post, user);

            // Add interaction handlers
            this.setupPostInteractions(postContainer, post);

            return postContainer;
        } catch (error) {
            this.showError(`Failed to load post ${post.id}`, error);
            return postContainer;
        }
    }

    createPostContent(post, user) {
        return `
            <div class="user">
                <img src="${API.AVATAR_URL}?u=${post.userId}" alt="${user.username}'s Avatar" 
                     loading="lazy" onerror="this.src='image/default-avatar.png'"/>
                <h2>${this.sanitizeHTML(user.username)}</h2>
            </div>
            <h3>${this.sanitizeHTML(post.title)}</h3>
            <img class="postImage" src="${API.AVATAR_URL}?u=${post.userId}" 
                 alt="Post Image" loading="lazy" onerror="this.src='image/default-post.png'"/>
            <p>${this.sanitizeHTML(post.body)}</p>
            <div class="iconContainer">
                <i class="comment-icon" data-post-id="${post.id}"> 
                    <img src="${API.ICONS.COMMENT}" alt="Comment" class="commentIcon" /> 
                    <span class="comment-count">0</span>
                </i>
                <i class="like-icon" data-post-id="${post.id}"> 
                    <img src="${API.ICONS.LIKE}" alt="Like" class="likeIcon" />
                    <span class="like-count">0</span>
                </i>
            </div>
        `;
    }

    setupPostInteractions(postContainer, post) {
        const commentIcon = postContainer.querySelector('.comment-icon');
        const likeIcon = postContainer.querySelector('.like-icon');
        const likeCount = postContainer.querySelector('.like-count');
        let commentsVisible = false;
        let isLiked = false;

        // Comments toggle
        commentIcon.addEventListener('click', () => this.handleCommentsToggle(postContainer, post.id, commentsVisible));

        // Like functionality
        likeIcon.addEventListener('click', () => {
            isLiked = !isLiked;
            likeIcon.classList.toggle('liked', isLiked);
            likeCount.textContent = isLiked ? '1' : '0';
        });
    }

    async handleCommentsToggle(postContainer, postId, commentsVisible) {
        const existingComments = postContainer.querySelector('.commentsContainer');
        if (existingComments) {
            existingComments.remove();
            return;
        }

        try {
            const comments = await getComments(postId);
            const commentsContainer = document.createElement('div');
            commentsContainer.classList.add('commentsContainer');

            commentsContainer.innerHTML = comments.map(comment => `
                <div class="comment">
                    <h4>${this.sanitizeHTML(comment.name)}</h4>
                    <p>${this.sanitizeHTML(comment.body)}</p>
                </div>
            `).join('');

            postContainer.appendChild(commentsContainer);
        } catch (error) {
            this.showError('Failed to load comments', error);
        }
    }

    // Security: Prevent XSS
    sanitizeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    handleUserCardClick(userId) {
        // Filter posts by user
        const posts = document.querySelectorAll('.postContainer');
        posts.forEach(post => {
            const postUserId = post.querySelector('.user').dataset.userId;
            post.style.display = postUserId === userId ? 'block' : 'none';
        });
    }
}

// Initialize the application
// document.addEventListener('DOMContentLoaded', () => {
//     new SocialFeedUI();
// });
SocialFeedUI();
