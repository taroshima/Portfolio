document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');
    let circles = [];

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Circle class
    class Circle {
        constructor(x, y, dx, dy, radius, color) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.radius = radius;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;

            this.draw();
        }
    }

    // Circle colors for different themes
    const circleColors = {
        light: [
            'rgba(255, 99, 132, 0.4)',    // Pink with 0.4 opacity
            'rgba(54, 162, 235, 0.5)',    // Blue with 0.5 opacity
            'rgba(255, 206, 86, 0.4)',    // Yellow with 0.4 opacity
            'rgba(75, 192, 192, 0.5)',    // Teal with 0.5 opacity
            'rgba(153, 102, 255, 0.4)'    // Purple with 0.4 opacity
        ],
        dark: [
            'rgba(255, 99, 132, 0.6)',    // Pink with 0.6 opacity
            'rgba(255, 206, 86, 0.6)',    // Yellow with 0.6 opacity
            'rgba(75, 192, 192, 0.7)',    // Teal with 0.7 opacity
            'rgba(153, 102, 255, 0.6)'    // Purple with 0.6 opacity
        ]
    };

    // Create circles
    function createCircles(theme) {
        circles = [];
        const colors = theme === 'dark' ? circleColors.dark : circleColors.light;
        
        for (let i = 0; i < 15; i++) {
            const radius = Math.random() * 80 + 40;
            const x = Math.random() * (canvas.width - radius * 2) + radius;
            const y = Math.random() * (canvas.height - radius * 2) + radius;
            const dx = (Math.random() - 0.5) * 2;
            const dy = (Math.random() - 0.5) * 2;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            circles.push(new Circle(x, y, dx, dy, radius, color));
        }
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        circles.forEach(circle => circle.update());
    }

    // Scroll to the container header content on page load
    const headerContent = document.querySelector('.container.header-content');
    if (headerContent) {
        headerContent.scrollIntoView({ behavior: 'smooth' });
    }
    
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.vertical-nav ul li');
    const navIndicator = document.querySelector('.nav-indicator');
    const sectionsContainer = document.querySelector('.sections-container');

    function updateNavigation() {
        let closestSection = sections[0];
        let minDistance = Math.abs(sections[0].getBoundingClientRect().top);
    
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top);
    
            if (distance < minDistance) {
                minDistance = distance;
                closestSection = section;
            }
        });
    
        const currentSection = closestSection.id;
    
        // Update nav items
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === currentSection) {
                item.classList.add('active');
    
                // Position nav indicator
                const itemRect = item.getBoundingClientRect();
                const navRect = navItems[0].closest('.vertical-nav').getBoundingClientRect();
                const navOffset = navRect.top; // Top of the navigation menu
    
                navIndicator.style.height = `${itemRect.height}px`; // Match the height of the nav item
                navIndicator.style.transform = `translateY(${itemRect.top - navOffset}px)`; // Adjust relative to nav menu
            }
        });
    }
    

    // Add click event to nav items for smooth scrolling
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.dataset.section;
            const section = document.getElementById(sectionId);
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Dark Mode Toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'dark-mode-toggle';
    document.body.appendChild(darkModeToggle);

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('dark-mode');
    if (savedDarkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = `
            <span>🌞</span>
            <span>Toggle Light Mode</span>
        `;
    } else {
        darkModeToggle.innerHTML = `
            <span>🌙</span>
            <span>Toggle Dark Mode</span>
        `;
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    
        // Save preference and update button text
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
            darkModeToggle.innerHTML = `
                <span>🌞</span>
                <span>Toggle Light Mode</span>
            `;
            createCircles('dark');
        } else {
            localStorage.setItem('dark-mode', 'disabled');
            darkModeToggle.innerHTML = `
                <span>🌙</span>
                <span>Toggle Dark Mode</span>
            `;
            createCircles('light');
        }
    });

    const initialTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    createCircles(initialTheme);
    animate();

    // GitHub Stats Fetching Function
    async function fetchGitHubStats() {
        const username = 'taroshima';
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

    // Markdown Editor Setup
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
        let html = marked.parse(markdownText, { breaks: true });
        let cleanHtml = DOMPurify.sanitize(html);
        markdownPreview.innerHTML = cleanHtml;
    }

    // Initial preview update
    updatePreview();

    // Listen for input events to update the preview in real-time
    markdownEditor.addEventListener('input', updatePreview);

    // Initial navigation setup
    updateNavigation();

    // Update navigation on scroll
    sectionsContainer.addEventListener('scroll', updateNavigation);
    window.addEventListener('resize', updateNavigation);

    // Call GitHub stats function
    fetchGitHubStats();

    // Ensure first section is active on load
    sections[0].scrollIntoView({ behavior: 'smooth' });
});



