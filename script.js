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
            <span> Dark </span>
        `;
        createCircles('light');
    } else {
        // Enable dark mode by default if no preference is saved
        document.body.classList.add('dark-mode');
        localStorage.setItem('dark-mode', 'enabled');
        darkModeToggle.innerHTML = `
            <span>🌞</span>
            <span> Light </span>
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
                <span> Light </span>
            `;
            createCircles('dark');
        } else {
            localStorage.setItem('dark-mode', 'disabled');
            darkModeToggle.innerHTML = `
                <span>🌙</span>
                <span> Dark </span>
            `;
            createCircles('light');
        }
    });

    const initialTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    createCircles(initialTheme);
    animate();

    updateNavigation();

    sectionsContainer.addEventListener('scroll', updateNavigation);
    window.addEventListener('resize', updateNavigation);

    sections[0].scrollIntoView({ behavior: 'smooth' });
});

// skills-chart.js
document.addEventListener('DOMContentLoaded', function() {
    // Define your skills
    const skills = [
        { name: "Python", level: 90, category: "programming" },
        { name: "Java", level: 85, category: "programming" },
        { name: "C++", level: 80, category: "programming" },
        { name: "R", level: 70, category: "programming" },
    
        { name: "Pandas", level: 80, category: "libraries" },
        { name: "Scikit-learn", level: 80, category: "libraries" },
        { name: "TensorFlow", level: 65, category: "libraries" },

        { name: "Microsoft Office", level: 85, category: "tools" },
        { name: "Canva", level: 80, category: "tools" },
        { name: "Figma", level: 70, category: "tools" },
    
        { name: "Analytical Skills", level: 90, category: "Misc" },
        { name: "Problem-Solving", level: 85, category: "Misc" },
        { name: "Communication", level: 100, category: "Misc" },
    
        
    ];
    
    
    // Get the container element
    const container = document.getElementById('skills-chart-container');
    
    // Create filter buttons
    const categories = [...new Set(skills.map(skill => skill.category))];
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'skills-filters';
    
    categories.forEach(category => {
      const button = document.createElement('button');
      button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      button.className = 'filter-button';
      button.dataset.category = category;
      
      // Add active class to 'all' button by default
      if (category === 'programming') {
        button.classList.add('active');
      }
      
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-button').forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Filter skills
        renderSkills(this.dataset.category);
      });
      
      filtersContainer.appendChild(button);
    });
    
    container.appendChild(filtersContainer);
    
    // Create skills container
    const skillsContainer = document.createElement('div');
    skillsContainer.className = 'skills-list';
    container.appendChild(skillsContainer);
    
    // Function to render skills based on selected category
    function renderSkills(category = 'programming') {
        // Clear skills container
        skillsContainer.innerHTML = '';
        
        // Filter skills
        const filteredSkills = skills.filter(skill => skill.category === category);
        
        // Render skills
        filteredSkills.forEach(skill => {
          const skillElement = document.createElement('div');
          skillElement.className = 'skill-item';
          
          const skillHeader = document.createElement('div');
          skillHeader.className = 'skill-header';
          
          const skillName = document.createElement('span');
          skillName.className = 'skill-name';
          skillName.textContent = skill.name;
          
          const skillLevel = document.createElement('span');
          skillLevel.className = 'skill-level';
          skillLevel.textContent = `${skill.level}%`;
          
          skillHeader.appendChild(skillName);
          skillHeader.appendChild(skillLevel);
          
          const skillBar = document.createElement('div');
          skillBar.className = 'skill-bar';
          
          const skillProgress = document.createElement('div');
          skillProgress.className = 'skill-progress';
          skillProgress.style.width = '0%'; // Start at 0 for animation
          skillProgress.style.backgroundColor = getSkillColor(skill.level);
          
          // Add hover effect with description
          const skillDescription = document.createElement('div');
          skillDescription.className = 'skill-description';
          skillDescription.textContent = getSkillDescription(skill.level);
          
          skillBar.appendChild(skillProgress);
          skillElement.appendChild(skillHeader);
          skillElement.appendChild(skillBar);
          skillElement.appendChild(skillDescription);
          
          skillsContainer.appendChild(skillElement);
          
          // Animate progress bar after a small delay
          setTimeout(() => {
            skillProgress.style.width = `${skill.level}%`;
          }, 100);
        });
      }
    // Helper function to get color based on skill level
    function getSkillColor(level) {
      if (level >= 90) return '#10b981'; // Emerald
      if (level >= 80) return '#0ea5e9'; // Sky
      if (level >= 70) return '#6366f1'; // Indigo
      if (level >= 60) return '#8b5cf6'; // Violet
      return '#ec4899'; // Pink
    }
    
    // Helper function to get description based on skill level
    function getSkillDescription(level) {
      if (level >= 90) return 'Expert';
      if (level >= 80) return 'Advanced';
      if (level >= 70) return 'Proficient';
      if (level >= 60) return 'Intermediate';
      return 'Beginner';
    }
    
    // Initial render
    renderSkills();
  });


