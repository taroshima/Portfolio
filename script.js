document.addEventListener('DOMContentLoaded', () => {
    // Vertical Navigation Setup
    const navItems = document.querySelectorAll('.vertical-nav li');
    const sections = document.querySelectorAll('.section');
    const navIndicator = document.querySelector('.nav-indicator');

    // Function to set active section
    function setActiveSection(targetSectionId) {
        // Remove active class from all sections and nav items
        sections.forEach(section => section.classList.remove('active'));
        navItems.forEach(item => item.classList.remove('active'));

        // Find and activate target section
        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Find and activate corresponding nav item
        const targetNavItem = document.querySelector(`.vertical-nav li[data-section="${targetSectionId}"]`);
        if (targetNavItem) {
            targetNavItem.classList.add('active');
            
            // Position nav indicator
            const itemTop = targetNavItem.offsetTop;
            const itemHeight = targetNavItem.offsetHeight;
            navIndicator.style.transform = `translateY(${itemTop}px)`;
            navIndicator.style.height = `${itemHeight}px`;
        }
    }

    // Navigation click events
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            setActiveSection(sectionId);
        });
    });

    // Initial setup
    setActiveSection('header');

    // Dark Mode Toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'dark-mode-toggle';
    darkModeToggle.innerHTML = `
        <span>🌓</span>
        <span>Toggle Dark Mode</span>
    `;
    document.body.appendChild(darkModeToggle);

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('dark-mode');
    if (savedDarkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    // Dark mode toggle functionality
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save preference
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            localStorage.setItem('dark-mode', 'disabled');
        }
    });

    // GitHub Stats Fetching Function (from previous implementation)
    async function fetchGitHubStats() {
        const username = 'taroshima'; // Replace with actual GitHub username
        try {
            // Fetch user profile
            const profileResponse = await fetch(`https://api.github.com/users/${username}`);
            const profileData = await profileResponse.json();

            // Fetch repositories
            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
            const reposData = await reposResponse.json();

            // Get the container
            const statsContainer = document.getElementById('github-stats-container');
            
            // Clear loading message
            statsContainer.innerHTML = '';

            // Create widget
            const githubWidget = document.createElement('div');
            githubWidget.classList.add('github-widget');
            githubWidget.innerHTML = `
                <div class="github-profile">
                    <img src="${profileData.avatar_url}" alt="GitHub Avatar">
                    <div class="github-info">
                        <h3>${profileData.name || username}</h3>
                        <p><strong>Bio:</strong> ${profileData.bio || 'No bio available'}</p>
                        <div class="github-stats">
                            <span>📍 Location: ${profileData.location || 'Not specified'}</span>
                            <span>👥 Followers: ${profileData.followers}</span>
                            <span>📦 Repositories: ${profileData.public_repos}</span>
                        </div>
                    </div>
                </div>
                <div class="top-repos">
                    <h4>Top Repositories:</h4>
                    <ul>
                        ${reposData
                            .sort((a, b) => b.stargazers_count - a.stargazers_count)
                            .slice(0, 5)
                            .map(repo => `
                                <li>
                                    <a href="${repo.html_url}" target="_blank" class="github-repo-link">
                                        ${repo.name} 
                                        <span class="repo-stats">
                                            ⭐ ${repo.stargazers_count} 
                                            | 🍴 ${repo.forks_count}
                                        </span>
                                    </a>
                                </li>
                            `).join('')}
                    </ul>
                </div>
            `;
            
            // Add the widget to the GitHub stats container
            statsContainer.appendChild(githubWidget);
        } catch (error) {
            const statsContainer = document.getElementById('github-stats-container');
            statsContainer.innerHTML = `
                <p>Unable to load GitHub statistics. 
                   ${error.message ? `Error: ${error.message}` : 'Please try again later.'}</p>
            `;
            console.error('GitHub API Error:', error);
        }
    }

    // Call GitHub stats function
    fetchGitHubStats();
});


const skillsTree = {
    "Technical Skills": {
        "Programming Languages": ["Python", "Java", "C++", "R"],
        "Libraries & Frameworks": ["Pandas", "Scikit-learn", "TensorFlow"],
    },
    "Soft Skills": ["Analytical Skills", "Problem-Solving", "Communication"],
    "Tools": ["Microsoft Office", "Canva"],
};







const defaultMarkdown = `# Skills
- **Technical Skills**
  - Programming Languages
    - Python
    - Java
    - C++
    - R
  - Libraries & Frameworks
    - Pandas
    - Scikit-learn
    - TensorFlow
- **Soft Skills**
  - Analytical Skills
  - Problem-Solving
  - Communication
- **Tools**
  - Microsoft Office
  - Canva
`;

const markdownEditor = document.getElementById('markdown-editor');
const markdownPreview = document.getElementById('markdown-preview');



// Set default content in the editor
markdownEditor.value = defaultMarkdown;

// Function to update the preview in real-time
function updatePreview() {
    const markdownText = markdownEditor.value;

    // Parse the markdown text using marked.js
    let html = marked.parse(markdownText, { breaks: true });

    // Sanitize the HTML using DOMPurify to prevent any malicious content
    let cleanHtml = DOMPurify.sanitize(html);

    // Set the sanitized HTML to the preview area
    markdownPreview.innerHTML = cleanHtml;
}

// Initial preview update
updatePreview();

// Listen for input events to update the preview in real-time
markdownEditor.addEventListener('input', updatePreview);
