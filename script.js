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
        `;
        createCircles('light');
    } else {
        // Enable dark mode by default if no preference is saved
        document.body.classList.add('dark-mode');
        localStorage.setItem('dark-mode', 'enabled');
        darkModeToggle.innerHTML = `
            <span>🌞</span>
        `;
        createCircles('dark');
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
            darkModeToggle.innerHTML = `
                <span>🌞</span>
            `;
            createCircles('dark');
        } else {
            localStorage.setItem('dark-mode', 'disabled');
            darkModeToggle.innerHTML = `
                <span>🌙</span>
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

document.addEventListener('DOMContentLoaded', function() {
    // Define your skills
    const skills = [
        // Programming Languages
        { name: "Python", level: 90, category: "Programming Languages" },
        { name: "Java", level: 85, category: "Programming Languages" },
        { name: "C++", level: 80, category: "Programming Languages" },
        { name: "R", level: 70, category: "Programming Languages" },
        { name: "SQL", level: 75, category: "Programming Languages" },
    
        // Frameworks & Libraries
        { name: "Pandas", level: 80, category: "Frameworks & Libraries" },
        { name: "NumPy", level: 80, category: "Frameworks & Libraries" },
        { name: "Scikit-learn", level: 80, category: "Frameworks & Libraries" },
        { name: "TensorFlow", level: 60, category: "Frameworks & Libraries" },
        { name: "Streamlit", level: 75, category: "Frameworks & Libraries" },
        { name: "Matplotlib", level: 70, category: "Frameworks & Libraries" },
        { name: "Seaborn", level: 65, category: "Frameworks & Libraries" },
    
        // Tools & Platforms
        { name: "Microsoft Office", level: 85, category: "Tools & Platforms" },
        { name: "Canva", level: 80, category: "Tools & Platforms" },
        { name: "Git", level: 80, category: "Tools & Platforms" },
        { name: "GitHub", level: 85, category: "Tools & Platforms" },
        { name: "Jupyter Notebook", level: 90, category: "Tools & Platforms" },
        { name: "Google Colab", level: 85, category: "Tools & Platforms" },
        { name: "Microsoft Planetary Computer", level: 70, category: "Tools & Platforms" },
        { name: "Arduino", level: 60, category: "Tools & Platforms" },
        { name: "Power BI", level: 30, category: "Tools & Platforms" },
    
        // AI/ML
        { name: "Machine Learning", level: 85, category: "AI/ML" },
        { name: "Unsupervised Learning", level: 80, category: "AI/ML" },
        { name: "Deep Learning", level: 60, category: "AI/ML" },
        { name: "LLM Prompt Engineering", level: 75, category: "AI/ML" },
        { name: "Data Preprocessing", level: 90, category: "AI/ML" },
    
        // Soft Skills
        { name: "Communication", level: 100, category: "Soft Skills" },
        { name: "Analytical Thinking", level: 90, category: "Soft Skills" },
        { name: "Problem Solving", level: 85, category: "Soft Skills" },
        { name: "Team Collaboration", level: 90, category: "Soft Skills" },
        { name: "Public Speaking", level: 85, category: "Soft Skills" },
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
      
      if (category === 'Programming Languages') {
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
    function renderSkills(category = 'Programming Languages') {
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
          
          const skillDescription = document.createElement('div');
          skillDescription.className = 'skill-description';
          skillDescription.textContent = getSkillDescription(skill.level);
          
          skillBar.appendChild(skillProgress);
          skillElement.appendChild(skillHeader);
          skillElement.appendChild(skillBar);
          skillElement.appendChild(skillDescription);
          
          skillsContainer.appendChild(skillElement);
          
          setTimeout(() => {
            skillProgress.style.width = `${skill.level}%`;
          }, 100);
        });
      }

    function getSkillColor(level) {
      if (level >= 90) return '#10b981'; 
      if (level >= 80) return '#0ea5e9'; 
      if (level >= 70) return '#6366f1'; 
      if (level >= 60) return '#8b5cf6'; 
      return '#ec4899'; // Pink
    }
    
    function getSkillDescription(level) {
      if (level >= 90) return 'Expert';
      if (level >= 80) return 'Advanced';
      if (level >= 70) return 'Proficient';
      if (level >= 60) return 'Intermediate';
      return 'Beginner';
    }
    
    renderSkills();
  });


  document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let hasMoved = false;

    // Helper function to prevent click if dragged
    function suppressClickOnce(el) {
        const handler = (e) => {
            e.stopImmediatePropagation(); // Stop other click handlers
            e.preventDefault();
            el.removeEventListener('click', handler, true);
        };
        el.addEventListener('click', handler, true);
    }

    darkModeToggle.addEventListener('mousedown', (e) => {
        isDragging = true;
        hasMoved = false;
        offsetX = e.clientX - darkModeToggle.getBoundingClientRect().left;
        offsetY = e.clientY - darkModeToggle.getBoundingClientRect().top;
        darkModeToggle.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            hasMoved = true;
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            const maxX = window.innerWidth - darkModeToggle.offsetWidth;
            const maxY = window.innerHeight - darkModeToggle.offsetHeight;
            darkModeToggle.style.left = `${Math.min(Math.max(0, x), maxX)}px`;
            darkModeToggle.style.top = `${Math.min(Math.max(0, y), maxY)}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging && hasMoved) suppressClickOnce(darkModeToggle);
        isDragging = false;
        darkModeToggle.style.cursor = 'grab';
    });

    // Touch support
    darkModeToggle.addEventListener('touchstart', (e) => {
        isDragging = true;
        hasMoved = false;
        const touch = e.touches[0];
        offsetX = touch.clientX - darkModeToggle.getBoundingClientRect().left;
        offsetY = touch.clientY - darkModeToggle.getBoundingClientRect().top;
    });

    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            hasMoved = true;
            const touch = e.touches[0];
            const x = touch.clientX - offsetX;
            const y = touch.clientY - offsetY;
            const maxX = window.innerWidth - darkModeToggle.offsetWidth;
            const maxY = window.innerHeight - darkModeToggle.offsetHeight;
            darkModeToggle.style.left = `${Math.min(Math.max(0, x), maxX)}px`;
            darkModeToggle.style.top = `${Math.min(Math.max(0, y), maxY)}px`;
            e.preventDefault(); // prevent scrolling while dragging
        }
    }, { passive: false });
    document.addEventListener('touchend', () => {
        if (isDragging && hasMoved) suppressClickOnce(darkModeToggle);
        isDragging = false;
    });
});
