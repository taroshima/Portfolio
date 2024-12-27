document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');
    let circles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

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

    const circleColors = {
        light: [
            'rgb(255, 99, 133)',    
            'rgb(54, 163, 235)',    
            'rgb(255, 207, 86)',    
            'rgb(75, 192, 192)',    
            'rgb(153, 102, 255)'    
        ],
        dark: [
            'rgba(255, 99, 132, 0.6)',    
            'rgba(255, 206, 86, 0.6)',    
            'rgba(75, 192, 192, 0.7)',    
            'rgba(153, 102, 255, 0.6)'    
        ]
    };

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

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        circles.forEach(circle => circle.update());
    }

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
    
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === currentSection) {
                item.classList.add('active');
    
                const itemRect = item.getBoundingClientRect();
                const navRect = navItems[0].closest('.vertical-nav').getBoundingClientRect();
                const navOffset = navRect.top; 
    
                navIndicator.style.height = `${itemRect.height}px`; 
                navIndicator.style.transform = `translateY(${itemRect.top - navOffset}px)`;
            }
        });
    }
    

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.dataset.section;
            const section = document.getElementById(sectionId);
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'dark-mode-toggle';
    document.body.appendChild(darkModeToggle);

    // Check saved preference or default to dark mode
    const savedDarkMode = localStorage.getItem('dark-mode');
    if (savedDarkMode === 'disabled') {
        document.body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = `
            <span>🌙</span>
            <span>Toggle Dark Mode</span>
        `;
        createCircles('light');
    } else {
        // Enable dark mode by default if no preference is saved
        document.body.classList.add('dark-mode');
        localStorage.setItem('dark-mode', 'enabled');
        darkModeToggle.innerHTML = `
            <span>🌞</span>
            <span>Toggle Light Mode</span>
        `;
        createCircles('dark');
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

    fetchGitHubStats();

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

    markdownEditor.value = defaultMarkdown;

    function updatePreview() {
        const markdownText = markdownEditor.value;
        let html = marked.parse(markdownText, { breaks: true });
        let cleanHtml = DOMPurify.sanitize(html);
        markdownPreview.innerHTML = cleanHtml;
    }

    updatePreview();

    markdownEditor.addEventListener('input', updatePreview);

    updateNavigation();

    sectionsContainer.addEventListener('scroll', updateNavigation);
    window.addEventListener('resize', updateNavigation);

    sections[0].scrollIntoView({ behavior: 'smooth' });
});



