// A single global tooltip element that can be reused
let globalSkillTooltip = null;

document.addEventListener('DOMContentLoaded', () => {
    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid && typeof skillsData !== 'undefined') {
        renderSkills(skillsData, skillsGrid);
    }

    // Create the global tooltip element once and append it to the body
    if (!document.getElementById('global-skill-tooltip')) {
        globalSkillTooltip = document.createElement('div');
        globalSkillTooltip.id = 'global-skill-tooltip';
        document.body.appendChild(globalSkillTooltip);
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

    // "AI Tools" 카테고리에만 특별한 ID를 부여합니다.
    if (categoryName === 'AI Tools') {
        card.id = 'ai-tools-card';
    }

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

    const iconContainer = document.createElement('span');
    iconContainer.className = 'skill-icon-container';

    const skillIcon = document.createElement('img');
    skillIcon.src = `images/icons/${icon}`;
    skillIcon.alt = name;
    skillIcon.className = 'skill-icon';

    // --- New Global Tooltip Event Listeners ---
    skillIcon.addEventListener('mouseenter', (event) => {
        if (!globalSkillTooltip) return;

        globalSkillTooltip.textContent = name;
        globalSkillTooltip.className = 'is-visible';

        const iconRect = event.target.getBoundingClientRect();
        const tooltipRect = globalSkillTooltip.getBoundingClientRect();

        let top = iconRect.top - tooltipRect.height - 10;
        const left = iconRect.left + (iconRect.width / 2) - (tooltipRect.width / 2);

        if (top < 10) {
            top = iconRect.bottom + 10;
            globalSkillTooltip.classList.add('positioned-below');
        }

        globalSkillTooltip.style.transform = `translate3d(${left}px, ${top}px, 0)`;
        document.body.appendChild(globalSkillTooltip);
    });

    skillIcon.addEventListener('mouseleave', () => {
        if (globalSkillTooltip) {
            globalSkillTooltip.className = '';
        }
    });

    iconContainer.appendChild(skillIcon);

    const skillDots = document.createElement('div');
    skillDots.className = 'skill-dots';
    for (let i = 0; i < 5; i++) {
        const dot = document.createElement('span');
        dot.className = i < level ? 'dot filled' : 'dot';
        skillDots.appendChild(dot);
    }

    item.append(iconContainer, skillDots);
    return item;
} 