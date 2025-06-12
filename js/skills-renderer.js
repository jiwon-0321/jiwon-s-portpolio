document.addEventListener('DOMContentLoaded', () => {
    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid && typeof skillsData !== 'undefined') {
        renderSkills(skillsData, skillsGrid);
    }
});

function renderSkills(data, container) {
    container.innerHTML = ''; // 기존 콘텐츠 초기화

    for (const category in data) {
        const categoryCard = createCategoryCard(category, data[category]);
        container.appendChild(categoryCard);
    }
}

function createCategoryCard(categoryName, skills) {
    const card = document.createElement('div');
    card.className = 'skill-category glass-card';

    const header = document.createElement('div');
    header.className = 'glass-card-header';

    const title = document.createElement('h3');
    title.textContent = categoryName;

    const list = document.createElement('div');
    list.className = 'skills-list';

    skills.forEach(skill => {
        const skillItem = createSkillItem(skill.name, skill.icon, skill.level);
        list.appendChild(skillItem);
    });

    card.append(header, title, list);
    return card;
}

function createSkillItem(name, icon, level) {
    const item = document.createElement('div');
    item.className = 'skill-item';

    const skillName = document.createElement('span');
    skillName.className = 'skill-name';

    const skillIcon = document.createElement('img');
    skillIcon.src = `images/icons/${icon}`;
    skillIcon.alt = name;
    skillIcon.className = 'skill-icon';

    skillName.append(skillIcon, document.createTextNode(name));

    const skillDots = document.createElement('div');
    skillDots.className = 'skill-dots';

    for (let i = 0; i < 5; i++) {
        const dot = document.createElement('span');
        dot.className = i < level ? 'dot filled' : 'dot';
        skillDots.appendChild(dot);
    }

    item.append(skillName, skillDots);
    return item;
} 