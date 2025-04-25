# SiRRiTUP Social Feed

A modern social media feed application that displays user profiles and posts with interactive features. The application fetches data from JSONPlaceholder API and presents it in a sleek, dark-themed interface.

## Features

- **User Profiles Section**
  - Display of user avatars and names
  - Smooth hover effects on user cards
  - Custom scrollable user container

- **Posts Feed**
  - Sorted posts with user information
  - Post title and content display
  - User avatars for each post
  - Interactive comment system
  - Like button functionality
  - Expandable comments section

## Technical Stack

- **Frontend**
  - HTML5
  - CSS3 (with modern features like flexbox and gradients)
  - JavaScript (ES6+)
  
- **Dependencies**
  - Axios (via CDN) - Promise based HTTP client
  
- **API**
  - JSONPlaceholder API for mock data

## Design

The application features a modern dark theme with:
- Gradient backgrounds (`#141e30` to `#243b55`)
- Responsive layout
- Custom scrollable containers
- Interactive hover effects
- Smooth transitions and animations

## Getting Started

1. Clone the repository:

2. Open `index.html` in your web browser

That's it! The application will load and start fetching data from the JSONPlaceholder API.

## API Integration

The application integrates with JSONPlaceholder API endpoints:
- `/users` - Fetch user profiles
- `/posts` - Retrieve posts
- `/posts/{id}/comments` - Get comments for specific posts

## Project Structure

- `index.html` - Main HTML structure
- `style.css` - Styling and layouts
- `app.js` - API integration and data fetching
- `index.js` - DOM manipulation and event handling
- `image/` - Directory containing application icons

## Browser Support

The application works best in modern browsers that support:
- ES6+ JavaScript
- Modern CSS features (Flexbox, CSS Grid, Gradients)
- Fetch API

## Contributing

Feel free to submit issues and enhancement requests.


