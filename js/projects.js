document.addEventListener('DOMContentLoaded', function() {
    // DOM 요소 참조
    const projectGrid = document.getElementById('project-grid');
    const projectListSection = document.getElementById('project-list-section');
    const projectDetailSection = document.getElementById('project-detail-section');
    const backButton = document.getElementById('back-button');
    const projectTitle = document.getElementById('project-title');
    const projectMetadata = document.getElementById('project-metadata');
    const projectGallery = document.getElementById('project-gallery');
    const projectDescription = document.getElementById('project-description');
    const materialsGrid = document.getElementById('materials-grid');
    
    // URL 파라미터를 가져오는 함수
    function getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
    
    // 프로젝트 목록 초기화
    function initializeProjectList() {
        // 기존 목록 비우기
        projectGrid.innerHTML = '';
        
        // 각 프로젝트 데이터를 순회하며 카드 생성
        projectsData.forEach((project, index) => {
            // 프로젝트 카드 요소 생성
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.setAttribute('data-category', project.category);
            projectCard.setAttribute('data-id', project.id);
            
            // 카드 내용 설정
            projectCard.innerHTML = `
                <div class="project-img">
                    <img src="${project.thumbnail}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p class="project-category">${project.category.charAt(0).toUpperCase() + project.category.slice(1)}</p>
                    <p class="project-year">${project.year}</p>
                    <p class="project-description">${project.description}</p>
                    <a href="javascript:void(0);" class="view-project" data-project-id="${project.id}">View Project</a>
                </div>
            `;
            
            // 카드를 그리드에 추가
            projectGrid.appendChild(projectCard);
        });
        
        // 상세 페이지 버튼에 이벤트 리스너 추가
        addProjectDetailListeners();
    }
    
    // 프로젝트 상세 페이지 이벤트 리스너 추가
    function addProjectDetailListeners() {
        // View Project 버튼에 이벤트 리스너 추가
        document.querySelectorAll('.view-project').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const projectId = this.getAttribute('data-project-id');
                showProjectDetail(projectId);
                
                // URL 업데이트 (히스토리 관리)
                const url = new URL(window.location);
                url.searchParams.set('project', projectId);
                window.history.pushState({}, '', url);
            });
        });
        
        // 프로젝트 이미지에도 이벤트 리스너 추가
        document.querySelectorAll('.project-img img').forEach(img => {
            img.addEventListener('click', function() {
                const projectCard = this.closest('.project-card');
                const projectId = projectCard.getAttribute('data-id');
                
                showProjectDetail(projectId);
                
                // URL 업데이트 (히스토리 관리)
                const url = new URL(window.location);
                url.searchParams.set('project', projectId);
                window.history.pushState({}, '', url);
            });
            
            // 마우스 커서 변경으로 클릭 가능함을 표시
            img.style.cursor = 'pointer';
        });
    }
    
    // 프로젝트 필터링 설정
    function setupProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        // 모든 필터 버튼에 클릭 이벤트 추가
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const selectedFilter = this.getAttribute('data-filter');
                console.log(`필터 클릭됨: ${selectedFilter}`);
                
                // 버튼 활성화 상태 설정
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // 프로젝트 필터링 수행
                filterProjects(selectedFilter);
            });
        });
        
        // 필터링 함수
        function filterProjects(filter) {
            // 프로젝트 카드 요소들 가져오기
            const projects = document.querySelectorAll('.project-card');
            
            if (projects.length === 0) {
                return;
            }
            
            // 각 프로젝트에 대해 필터 적용
            let visibleCount = 0;
            projects.forEach(project => {
                const category = project.getAttribute('data-category');
                const projectId = project.getAttribute('data-id');
                
                if (filter === 'all' || category === filter) {
                    // 보여야 할 프로젝트
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'translateY(0)';
                    }, 10);
                    visibleCount++;
                } else {
                    // 숨겨야 할 프로젝트
                    project.style.opacity = '0';
                    project.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                }
            });
        }
        
        // 페이지 로드 시 모든 프로젝트를 보여주기 위해 'all' 필터 선택
        setTimeout(() => {
            console.log('초기 필터 설정 (all)');
            const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
            if (allFilterBtn) {
                allFilterBtn.click();
            } else {
                console.error('All 필터 버튼을 찾을 수 없습니다');
                // 버튼이 없는 경우 직접 필터링 실행
                filterProjects('all');
            }
        }, 100);
    }
    
    // 프로젝트 상세 정보 표시
    function showProjectDetail(projectId) {
        // 프로젝트 ID로 데이터 찾기
        const project = projectsData.find(p => p.id === projectId);
        
        if (!project) {
            console.error('Project not found:', projectId);
            return;
        }
        
        // 프로젝트 제목 설정
        projectTitle.textContent = project.title;
        
        // 메타데이터 설정
        projectMetadata.innerHTML = `
            <div class="metadata-item">
                <span class="metadata-label">Location</span>
                <span class="metadata-value">${project.location}</span>
            </div>
            <div class="metadata-item">
                <span class="metadata-label">Area</span>
                <span class="metadata-value">${project.area}</span>
            </div>
            <div class="metadata-item">
                <span class="metadata-label">Year</span>
                <span class="metadata-value">${project.year}</span>
            </div>
            <div class="metadata-item">
                <span class="metadata-label">Client</span>
                <span class="metadata-value">${project.client}</span>
            </div>
        `;
        
        // 갤러리 설정
        projectGallery.innerHTML = '';
        project.gallery.forEach((item, itemIndex) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = item.isMain ? 'gallery-item main' : 'gallery-item sub';
            
            const dayNightToggle = document.createElement('button');
            dayNightToggle.className = 'day-night-toggle';
            dayNightToggle.innerHTML = '<i class="fas fa-moon"></i>'; 
            dayNightToggle.setAttribute('data-current-mode', 'day');
            dayNightToggle.setAttribute('title', '밤 이미지 보기');

            const imgElement = document.createElement('img');
            console.log(`[갤러리 아이템 ${itemIndex}] 초기 이미지(낮):`, item.imageDay);
            imgElement.src = item.imageDay; 
            imgElement.alt = item.caption;
            imgElement.loading = item.isMain ? 'eager' : 'lazy';
            imgElement.style.transition = 'opacity 0.2s ease-in-out'; // JS에서 직접 트랜지션 설정

            imgElement.onload = () => {
                console.log(`[갤러리 아이템 ${itemIndex}] 이미지 로드 성공:`, imgElement.src);
                imgElement.style.opacity = '1'; // 로드 성공 시 확실히 보이게
            };
            imgElement.onerror = () => {
                console.error(`[갤러리 아이템 ${itemIndex}] 이미지 로드 실패:`, imgElement.src);
                imgElement.alt = '이미지 로드 실패: ' + item.caption; // 에러 메시지 표시
            };

            const captionElement = document.createElement('div');
            captionElement.className = 'gallery-caption';
            captionElement.textContent = item.caption;

            galleryItem.appendChild(imgElement);
            galleryItem.appendChild(captionElement);
            
            if (item.imageNight && item.imageNight !== item.imageDay) {
                console.log(`[갤러리 아이템 ${itemIndex}] 낮/밤 토글 버튼 추가됨. 밤 이미지:`, item.imageNight);
                galleryItem.appendChild(dayNightToggle);
            } else {
                console.log(`[갤러리 아이템 ${itemIndex}] 밤 이미지가 없거나 낮과 동일하여 토글 버튼 추가 안 함.`);
            }
            
            projectGallery.appendChild(galleryItem);

            if (item.imageNight && item.imageNight !== item.imageDay) {
                dayNightToggle.addEventListener('click', (e) => {
                    e.stopPropagation(); 
                    const currentMode = dayNightToggle.getAttribute('data-current-mode');
                    const targetImage = galleryItem.querySelector('img');
                    console.log(`[토글 클릭 ${itemIndex}] 현재 모드: ${currentMode}, 클릭된 이미지:`, targetImage);

                    // 이미지 전환 전 opacity를 0으로 (페이드 아웃)
                    targetImage.style.opacity = '0';

                    setTimeout(() => {
                        if (currentMode === 'day') {
                            console.log(`[토글 클릭 ${itemIndex}] 밤 이미지로 변경 시도:`, item.imageNight);
                            targetImage.src = item.imageNight;
                            // onload/onerror는 imgElement에 이미 연결되어 있음
                            dayNightToggle.innerHTML = '<i class="fas fa-sun"></i>';
                            dayNightToggle.setAttribute('data-current-mode', 'night');
                            dayNightToggle.setAttribute('title', '낮 이미지 보기');
                            if (targetImage._magnifierData && targetImage._magnifierData.lens && targetImage._magnifierData.lens.classList.contains('active')) {
                                const lens = targetImage._magnifierData.lens;
                                lens.style.backgroundImage = `url('${item.imageNight}')`;
                                console.log(`[토글 클릭 ${itemIndex}] 돋보기 배경 밤 이미지로 업데이트`);
                            }
                        } else {
                            console.log(`[토글 클릭 ${itemIndex}] 낮 이미지로 변경 시도:`, item.imageDay);
                            targetImage.src = item.imageDay;
                            dayNightToggle.innerHTML = '<i class="fas fa-moon"></i>';
                            dayNightToggle.setAttribute('data-current-mode', 'day');
                            dayNightToggle.setAttribute('title', '밤 이미지 보기');
                            if (targetImage._magnifierData && targetImage._magnifierData.lens && targetImage._magnifierData.lens.classList.contains('active')) {
                                const lens = targetImage._magnifierData.lens;
                                lens.style.backgroundImage = `url('${item.imageDay}')`;
                                console.log(`[토글 클릭 ${itemIndex}] 돋보기 배경 낮 이미지로 업데이트`);
                            }
                        }
                        // src 변경 후 opacity를 다시 1로 설정하는 것은 onload 핸들러에 위임
                    }, 200); // opacity transition 시간과 유사하게 (CSS 트랜지션과 일치시킬 필요)
                });
            }
        });
        
        // 프로젝트 설명 설정
        projectDescription.innerHTML = '';
        project.fullDescription.forEach(paragraph => {
            const p = document.createElement('p');
            // 인라인 참조 파싱 및 변환
            p.innerHTML = parseInlineReferences(paragraph);
            projectDescription.appendChild(p);
        });
        
        // 참고문헌 목록 표시
        displayReferences(project);
        
        // 재료 설정
        materialsGrid.innerHTML = '';
        
        // 모든 재질 이미지들을 수집하여 프리로딩
        const allMaterialImages = [];
        project.materials.forEach(material => {
            if (material.usageImages && material.usageImages.length > 0) {
                material.usageImages.forEach(usage => {
                    allMaterialImages.push(usage.image);
                });
            }
        });
        
        // 이미지 프리로딩 시작 (비동기적으로)
        if (allMaterialImages.length > 0) {
            console.log(`${allMaterialImages.length}개의 재질 이미지 프리로딩 시작...`);
            preloadImages(allMaterialImages).then(results => {
                const successCount = results.filter(result => result.status === 'fulfilled').length;
                console.log(`${successCount}/${allMaterialImages.length}개 이미지 프리로딩 완료`);
            });
        }
        
        project.materials.forEach(material => {
            const materialItem = document.createElement('div');
            materialItem.className = 'material-item';
            
            // usageImages가 있는 경우 클릭 가능하게 표시
            if (material.usageImages && material.usageImages.length > 0) {
                materialItem.classList.add('clickable');
            }
            
            materialItem.innerHTML = `
                <div class="material-swatch" style="background-color: ${material.color};"></div>
                <div class="material-info">
                    <h3 class="material-name">${material.name}</h3>
                    <p class="material-description">${material.description}</p>
                </div>
            `;
            
            // 클릭 이벤트 추가 (usageImages가 있는 경우만)
            if (material.usageImages && material.usageImages.length > 0) {
                materialItem.addEventListener('click', function() {
                    showMaterialUsage(material);
                });
            }
            
            materialsGrid.appendChild(materialItem);
        });
        
        // 섹션 전환
        projectListSection.style.display = 'none';
        projectDetailSection.style.display = 'block';
        
        // 스크롤을 맨 위로 이동
        window.scrollTo(0, 0);
        
        // 재질 사용 위치 모달 설정
        setupMaterialUsageModal();
        
        // 이미지 모달 이벤트 설정
        setupImageModal();
    }
    
    // 인라인 참조 파싱 함수
    function parseInlineReferences(text) {
        // [1], [2], [3] 등의 패턴을 찾아서 클릭 가능한 링크로 변환
        return text.replace(/\[(\d+)\]/g, function(match, number) {
            return `<span class="reference-link reference-tooltip" data-ref="${number}" onclick="scrollToReference(${number})">
                ${number}
                <div class="tooltip-content" id="tooltip-${number}">Loading...</div>
            </span>`;
        });
    }
    
    // 참고문헌 목록 표시
    function displayReferences(project) {
        const referencesSection = document.getElementById('project-references');
        const referencesList = document.getElementById('references-list');
        
        if (!project.references || project.references.length === 0) {
            referencesSection.style.display = 'none';
            return;
        }
        
        referencesSection.style.display = 'block';
        referencesList.innerHTML = '';
        
        project.references.forEach((reference, index) => {
            const referenceItem = document.createElement('div');
            referenceItem.className = 'reference-item-display';
            referenceItem.id = `reference-${index + 1}`;
            
            referenceItem.innerHTML = `
                <div class="reference-header-compact" onclick="toggleReferenceDetails(${index + 1})">
                    <span class="reference-number">${index + 1}</span>
                    <div class="reference-title-compact">${reference.title}</div>
                    <span class="reference-toggle-icon">
                        <i class="toggle-icon">▼</i>
                    </span>
                </div>
                <div class="reference-details" id="reference-details-${index + 1}">
                    <div class="reference-content">
                        <div class="reference-authors">${reference.authors}</div>
                        <div class="reference-publication">${reference.journal}, ${reference.year}</div>
                        ${reference.url ? `<div class="reference-url"><a href="${reference.url}" target="_blank">${reference.url}</a></div>` : ''}
                        ${reference.note ? `<div class="reference-note" style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--secondary-color); font-style: italic;">${reference.note}</div>` : ''}
                    </div>
                </div>
            `;
            
            referencesList.appendChild(referenceItem);
            
            // 툴팁 내용 업데이트
            const tooltip = document.getElementById(`tooltip-${index + 1}`);
            if (tooltip) {
                tooltip.innerHTML = `
                    <strong>${reference.title}</strong><br>
                    ${reference.authors}<br>
                    <em>${reference.journal}, ${reference.year}</em>
                `;
            }
        });
        
        // 툴팁 내용을 지연 로드로 업데이트
        setTimeout(() => {
            project.references.forEach((reference, index) => {
                const tooltip = document.getElementById(`tooltip-${index + 1}`);
                if (tooltip) {
                    tooltip.innerHTML = `
                        <strong>${reference.title}</strong><br>
                        ${reference.authors}<br>
                        <em>${reference.journal}, ${reference.year}</em>
                    `;
                }
            });
        }, 100);
    }
    
    // 참고문헌 상세내용 토글 함수
    window.toggleReferenceDetails = function(number) {
        const details = document.getElementById(`reference-details-${number}`);
        const toggleIcon = document.querySelector(`#reference-${number} .toggle-icon`);
        
        if (details.classList.contains('expanded')) {
            details.classList.remove('expanded');
            toggleIcon.textContent = '▼';
        } else {
            details.classList.add('expanded');
            toggleIcon.textContent = '▲';
        }
    };

    // 참고문헌으로 스크롤하는 함수
    window.scrollToReference = function(number) {
        const referenceElement = document.getElementById(`reference-${number}`);
        if (referenceElement) {
            // 참고문헌 상세내용 자동으로 펼치기
            const details = document.getElementById(`reference-details-${number}`);
            const toggleIcon = document.querySelector(`#reference-${number} .toggle-icon`);
            if (!details.classList.contains('expanded')) {
                details.classList.add('expanded');
                toggleIcon.textContent = '▲';
            }
            
            referenceElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // 잠시 하이라이트 효과
            referenceElement.style.backgroundColor = '#fffbf0';
            referenceElement.style.borderLeftColor = '#ffc107';
            setTimeout(() => {
                referenceElement.style.backgroundColor = 'white';
                referenceElement.style.borderLeftColor = 'var(--accent-color)';
            }, 2000);
        }
    };
    
    // 이미지 프리로딩 함수 (더 효율적인 버전)
    function preloadImages(images) {
        const preloadPromises = images.map(src => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(src);
                img.onerror = () => reject(src);
                img.src = src;
            });
        });
        
        return Promise.allSettled(preloadPromises);
    }
    
    // 이미지 캐시 관리
    const imageCache = new Map();
    
    // 재질 사용 위치 보기
    function showMaterialUsage(material) {
        const modal = document.getElementById('materialUsageModal');
        const title = document.getElementById('materialUsageTitle');
        const subtitle = document.getElementById('materialUsageSubtitle');
        const usageGrid = document.getElementById('usageGrid');
        
        // 모달 제목 설정
        title.textContent = `${material.name} - 사용 위치`;
        subtitle.textContent = '이미지를 클릭하면 확대할 수 있습니다';
        
        // 사용 위치 이미지 렌더링 (이미지만)
        usageGrid.innerHTML = '';
        material.usageImages.forEach((usage, index) => {
            const usageItem = document.createElement('div');
            usageItem.className = 'usage-item-image-only';
            
            // 로딩 인디케이터와 함께 이미지 생성
            usageItem.innerHTML = `
                <div class="image-container">
                    <div class="loading-spinner"></div>
                    <img src="${usage.image}" alt="${usage.caption}" class="usage-image-only" style="opacity: 0;">
                </div>
            `;
            
            // 이미지 로딩 완료 처리
            const img = usageItem.querySelector('.usage-image-only');
            const spinner = usageItem.querySelector('.loading-spinner');
            
            img.onload = function() {
                spinner.style.display = 'none';
                this.style.opacity = '1';
                this.style.transition = 'opacity 0.3s ease';
            };
            
            img.onerror = function() {
                spinner.style.display = 'none';
                this.style.opacity = '0.5';
                console.error('이미지 로딩 실패:', usage.image);
            };
            
            // 이미지 클릭 시 확대 보기
            img.addEventListener('click', function(e) {
                e.stopPropagation(); // 이벤트 버블링 방지
                const imageModal = document.querySelector('.image-modal');
                const modalImg = document.getElementById('expandedImg');
                
                // 로딩 상태 표시
                modalImg.style.opacity = '0';
                imageModal.style.display = 'flex';
                
                // 이미지 로드 완료 후 표시
                modalImg.onload = function() {
                    // 화면 크기 대비 적절한 크기로 조정
                    const windowWidth = window.innerWidth;
                    const windowHeight = window.innerHeight;
                    const imgAspectRatio = this.naturalWidth / this.naturalHeight;
                    const windowAspectRatio = windowWidth / windowHeight;
                    
                    if (imgAspectRatio > windowAspectRatio) {
                        // 이미지가 가로로 더 긴 경우
                        this.style.width = '95vw';
                        this.style.height = 'auto';
                    } else {
                        // 이미지가 세로로 더 긴 경우
                        this.style.height = '95vh';
                        this.style.width = 'auto';
                    }
                    
                    // 고품질 렌더링 설정
                    this.style.imageRendering = 'high-quality';
                    this.style.imageRendering = '-webkit-optimize-contrast';
                    
                    // 페이드 인 효과
                    this.style.opacity = '1';
                    this.style.transition = 'opacity 0.3s ease';
                };
                
                modalImg.src = this.src;
                // material usage modal은 그대로 두고 image modal만 표시
            });
            
            usageGrid.appendChild(usageItem);
        });
        
        // 모달 표시
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // 재질 사용 위치 모달 설정
    function setupMaterialUsageModal() {
        const modal = document.getElementById('materialUsageModal');
        const closeBtn = document.getElementById('closeMaterialModal');
        
        // 닫기 버튼 클릭
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // 모달 배경 클릭 시 닫기
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // ESC 키로 닫기
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                // 이미지 모달이 열려있으면 먼저 닫기
                const imageModal = document.querySelector('.image-modal');
                if (imageModal && imageModal.style.display === 'flex') {
                    imageModal.style.display = 'none';
                    return;
                }
                
                // material usage modal 닫기
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            }
        });
    }
    
    // 이미지 모달 설정
    function setupImageModal() {
        console.log('=== setupImageModal 시작 ===');
        
        const galleryItems = document.querySelectorAll('.gallery-item'); 
        const modal = document.querySelector('.image-modal');
        const modalImg = document.getElementById('expandedImg');
        const closeModal = document.querySelector('.close-modal');
        let magnifierToggleButton = null;
        let isMagnifierOn = false; 

        console.log('🔍 갤러리 아이템 개수:', galleryItems.length);
        console.log('🔍 모달 요소 존재:', !!modal);
        console.log('🔍 모달 이미지 요소 존재:', !!modalImg);
        console.log('🔍 닫기 버튼 존재:', !!closeModal);
            
        if (galleryItems.length === 0) {
            console.error('❌ gallery-item 요소를 찾을 수 없습니다!');
            return;
        }
        
        if (!modal || !modalImg || !closeModal) {
            console.error('❌ 모달 관련 요소를 찾을 수 없습니다!');
                return;
            }
            
        galleryItems.forEach((item, index) => {
            const old_element = item;
            const new_element = old_element.cloneNode(true);
            old_element.parentNode.replaceChild(new_element, old_element);
        });
        
        const newGalleryItems = document.querySelectorAll('.gallery-item');
        newGalleryItems.forEach((item, index) => {
            const imgClickableArea = item.querySelector('img'); 
            if (!imgClickableArea) {
                console.warn(`[모달 설정 ${index}] 이미지 클릭 영역(img) 없음`);
                return;
            }
            console.log(`✅ 갤러리 아이템 ${index}의 이미지에 모달용 클릭 리스너 등록`);

            imgClickableArea.addEventListener('click', function(e) {
                const currentImgSrc = this.src; 
                console.log(`[모달 열기 ${index}] 클릭된 이미지 src:`, currentImgSrc);

                modal.classList.add('visible');
                document.body.style.overflow = 'hidden';

                if (magnifierToggleButton && magnifierToggleButton.parentElement) {
                    magnifierToggleButton.parentElement.removeChild(magnifierToggleButton);
                    magnifierToggleButton = null;
                }
                isMagnifierOn = false;
                disableMagnifier(modalImg); // 이전 돋보기 상태 정리

                modalImg.onload = () => {
                    console.log('🖼️ 모달 이미지 로드 완료:', modalImg.src);
                    modalImg.style.imageRendering = 'high-quality';
                    
                    if (modalImg.src.includes('images/portfolio/exam.jpg') || modalImg.src.includes('images/portfolio/exam_night.jpg')) {
                        if (!magnifierToggleButton) {
                            magnifierToggleButton = document.createElement('button');
                            magnifierToggleButton.className = 'magnifier-toggle-btn';
                            magnifierToggleButton.innerHTML = '<i class="fas fa-search"></i>';
                            magnifierToggleButton.style.position = 'absolute';
                            magnifierToggleButton.style.top = '20px';
                            magnifierToggleButton.style.left = '20px';
                            magnifierToggleButton.style.zIndex = '1051';
                            magnifierToggleButton.style.background = 'rgba(0,0,0,0.5)';
                            magnifierToggleButton.style.color = 'white';
                            magnifierToggleButton.style.border = 'none';
                            magnifierToggleButton.style.padding = '10px';
                            magnifierToggleButton.style.fontSize = '20px';
                            magnifierToggleButton.style.cursor = 'pointer';
                            magnifierToggleButton.style.borderRadius = '5px';
                            modal.appendChild(magnifierToggleButton);

                            magnifierToggleButton.addEventListener('click', () => {
                                isMagnifierOn = !isMagnifierOn;
                                if (isMagnifierOn) {
                                    enableMagnifier(modalImg);
                                    magnifierToggleButton.innerHTML = '<i class="fas fa-search-minus"></i>';
                                } else {
                                    disableMagnifier(modalImg);
                                    magnifierToggleButton.innerHTML = '<i class="fas fa-search"></i>';
                                }
                            });
                        }
                    } else {
                        // 돋보기 버튼이 필요 없는 다른 이미지의 경우, 이전 돋보기 상태를 확실히 정리
                        disableMagnifier(modalImg);
                        if (magnifierToggleButton && magnifierToggleButton.parentElement) {
                            magnifierToggleButton.parentElement.removeChild(magnifierToggleButton);
                            magnifierToggleButton = null;
                        }
                    }
                };
                modalImg.onerror = () => {
                    console.error('❌ 모달 이미지 로드 실패:', modalImg.src);
                    disableMagnifier(modalImg);
                };
                modalImg.src = currentImgSrc;
            });
            
            // gallery-item 전체에 커서 포인터 (토글 버튼 등 자식 요소는 자체 커서 유지)
            // item.style.cursor = 'pointer'; // 이 줄은 이미지 자체에 클릭 리스너를 달았으므로, 이미지에만 커서를 두거나, gallery-item 전체 유지 가능
        });
        
        const closeImageModal = () => {
            modal.classList.remove('visible');
            document.body.style.overflow = 'auto';
            disableMagnifier(modalImg);
            isMagnifierOn = false;
            if (magnifierToggleButton && magnifierToggleButton.parentElement) {
                magnifierToggleButton.parentElement.removeChild(magnifierToggleButton);
                magnifierToggleButton = null;
            }
            console.log('🎯 모달 닫힘, 돋보기 관련 정리 완료');
        };

        closeModal.addEventListener('click', closeImageModal);
        modal.addEventListener('click', (event) => {
            if (event.target === modal) closeImageModal();
            });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('visible')) closeImageModal();
        });
        
        console.log('=== setupImageModal 완료 ===');
    }
    
    // 프로젝트 목록으로 돌아가기
    backButton.addEventListener('click', function() {
        console.log('🔙 프로젝트 목록으로 돌아가기');
        projectDetailSection.style.display = 'none';
        projectListSection.style.display = 'block';
        
        // 스크롤 복구
        document.body.style.overflow = 'auto';
        
        // URL 파라미터 제거
        const url = new URL(window.location);
        url.searchParams.delete('project');
        window.history.pushState({}, '', url);
        
        console.log('✅ 프로젝트 목록 복귀 완료');
    });
    
    // 뒤로가기/앞으로가기 이벤트 처리
    window.addEventListener('popstate', function() {
        const projectId = getUrlParameter('project');
        
        document.body.style.overflow = 'auto';
        
        if (projectId) {
            showProjectDetail(projectId);
        } else {
            projectDetailSection.style.display = 'none';
            projectListSection.style.display = 'block';
        }
    });
    
    // 초기화
    function initialize() {
        console.log("🚀 프로젝트 페이지 초기화 시작");
        
        console.log("📊 프로젝트 데이터:", projectsData);
        console.log("🎯 프로젝트 그리드 요소:", projectGrid);
        console.log("🔘 필터 버튼들:", document.querySelectorAll('.filter-btn'));
        
        initializeProjectList();
        setupProjectFilters();
        
        const projectId = getUrlParameter('project');
        if (projectId) {
            console.log("🔗 URL에서 프로젝트 ID 발견:", projectId);
            showProjectDetail(projectId);
        }
        
        console.log("✅ 프로젝트 페이지 초기화 완료");
    }
    
    initialize();

    // 돋보기 렌즈 기능
    function enableMagnifier(img) {
        console.log('✨ enableMagnifier 호출 (토글 ON)');
        // 렌즈 설정 및 활성화 (데이터가 이미 있으면 internalActivate 호출, 없으면 새로 설정 후 활성화)
        if (img._magnifierData && img._magnifierData.internalActivate) {
            console.log('기존 돋보기 데이터 사용하여 internalActivate 호출');
            img._magnifierData.internalActivate();
        } else {
            console.log('새 돋보기 설정 시작 (setupLensIfNeeded 호출, 즉시 활성화)');
            setupLensIfNeeded(img, true); // true는 즉시 활성화 (activateNow)
        }
    }

    // disableMagnifier는 돋보기 기능을 끌 때 또는 모달이 닫힐 때 호출
    function disableMagnifier(img) {
        console.log('🧹 disableMagnifier 호출 (토글 OFF 또는 모달 닫힘)');
        if (img._magnifierData && img._magnifierData.internalDeactivate) {
            console.log('기존 돋보기 데이터 사용하여 internalDeactivate 호출');
            img._magnifierData.internalDeactivate();
        } else {
            // 데이터가 없어도 혹시 모를 잔여 렌즈 처리
            const existingLens = img.parentElement && img.parentElement.querySelector('.magnifier-lens');
            if (existingLens) {
                existingLens.classList.remove('active'); // CSS로 숨김
                // DOM에서 제거는 모달 닫힐 때 주로 처리, 여기선 숨기기만 해도 충분할 수 있음
            }
        }
    }

    function setupLensIfNeeded(img, activateNow) {
        console.log(`🛠️ setupLensIfNeeded 호출 - activateNow: ${activateNow}`);
        let lens = img.parentElement && img.parentElement.querySelector('.magnifier-lens');
        if (!lens) {
            console.log('렌즈 DOM 요소 새로 생성 (setupLensIfNeeded)');
            lens = document.createElement('div');
            lens.className = 'magnifier-lens';
            if(img.parentElement) img.parentElement.appendChild(lens);
            else {
                console.error('이미지 부모 요소가 없어 렌즈를 추가할 수 없습니다.');
                return;
            }
        }

        let magnifierActive = false; 
        const zoom = 2;

        const setupActualLens = () => {
            if (!img.complete || !img.naturalWidth || img.naturalWidth === 0) {
                console.warn('이미지 로드 미완료 또는 원본 크기 정보 없음 (setupActualLens).');
                img.onload = () => { 
                    console.log('이미지 onload 발생 (setupActualLens), 재시도');
                    setupActualLens(); 
                }
                return;
            }

            let dynamicLensSize = Math.max(100, Math.min(img.width * 0.15, 180));
            lens.style.width = dynamicLensSize + 'px';
            lens.style.height = dynamicLensSize + 'px';
            const currentLensSize = dynamicLensSize;
            console.log(`🔬 렌즈 실제 설정 - 표시:${img.width}x${img.height}, 원본:${img.naturalWidth}x${img.naturalHeight}, 렌즈크기:${currentLensSize}`);
            
            const ratioX = img.naturalWidth / img.width;
            const ratioY = img.naturalHeight / img.height;
            lens.style.backgroundImage = `url('${img.src}')`;
            lens.style.backgroundRepeat = 'no-repeat';
            const backgroundWidth = img.naturalWidth * zoom;
            const backgroundHeight = img.naturalHeight * zoom;
            lens.style.backgroundSize = `${backgroundWidth}px ${backgroundHeight}px`;

            let animationFrameId = null;
            let currentEventX = 0;
            let currentEventY = 0;
            let scheduledFrame = false;

            function updateLensPosition() {
                scheduledFrame = false; 
                if (!magnifierActive || !img.parentElement || !lens.parentElement || !lens.classList.contains('active')) {
                    if (animationFrameId) cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                    return;
                }

                const rect = img.getBoundingClientRect();
                let x = currentEventX - rect.left;
                let y = currentEventY - rect.top;

                // 이 조건은 마우스가 이미지를 벗어났을 때 handleMouseLeave에서 처리되므로,
                // updateLensPosition에서는 이미 렌즈가 active 상태이고 마우스가 이미지 위에 있다고 가정해도 무방합니다.
                // 다만, 미세한 타이밍 이슈로 x, y가 범위를 살짝 벗어나는 경우를 대비해 방어 코드를 둘 수는 있습니다.
                // if (x < 0 || x > img.width || y < 0 || y > img.height) return;

                let lensX = x - currentLensSize / 2;
                let lensY = y - currentLensSize / 2;
                lensX = Math.max(0, Math.min(lensX, img.width - currentLensSize));
                lensY = Math.max(0, Math.min(lensY, img.height - currentLensSize));

                lens.style.left = lensX + 'px';
                lens.style.top = lensY + 'px';

                let bgPosX_ideal = -((x * ratioX * zoom) - (currentLensSize / 2));
                let bgPosY_ideal = -((y * ratioY * zoom) - (currentLensSize / 2));

                const minBgX = -(backgroundWidth - currentLensSize);
                const minBgY = -(backgroundHeight - currentLensSize);
                
                const finalBgPosX = Math.max(minBgX, Math.min(0, bgPosX_ideal));
                const finalBgPosY = Math.max(minBgY, Math.min(0, bgPosY_ideal));
                
                lens.style.backgroundPosition = `${finalBgPosX}px ${finalBgPosY}px`;
            }

            function moveLens(e) {
                if (!magnifierActive) return;
                e.preventDefault();

                currentEventX = e.touches ? e.touches[0].clientX : e.clientX;
                currentEventY = e.touches ? e.touches[0].clientY : e.clientY;

                // 마우스가 이미지 영역을 벗어나는지 여기서 한 번 더 체크하여, 벗어났다면 업데이트 요청 안함
                const rect = img.getBoundingClientRect();
                const relativeX = currentEventX - rect.left;
                const relativeY = currentEventY - rect.top;

                if (relativeX < 0 || relativeX > img.width || relativeY < 0 || relativeY > img.height) {
                     // handleMouseLeave가 호출되어 렌즈를 비활성화할 것이므로 여기서는 프레임 요청을 하지 않음.
                    if (scheduledFrame && animationFrameId) {
                        cancelAnimationFrame(animationFrameId);
                        scheduledFrame = false;
                        animationFrameId = null;
                    }
                    // 렌즈를 즉시 숨기고 싶다면 lens.classList.remove('active') 호출
                    // 하지만 handleMouseLeave와 동작이 겹칠 수 있으므로 주의.
                    // handleMouseLeave가 이미 렌즈를 숨겼을 수 있으므로, 여기서는 추가적인 숨김 처리를 하지 않는 것이 안전할 수 있음.
                    return;
                }
                
                if (!lens.classList.contains('active')) {
                    lens.classList.add('active');
                }

                if (!scheduledFrame) {
                    animationFrameId = requestAnimationFrame(updateLensPosition);
                    scheduledFrame = true;
                }
            }

            const handleMouseLeave = () => {
                if (scheduledFrame && animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    scheduledFrame = false;
                    animationFrameId = null;
                }
                if (magnifierActive) { 
                    console.log('🖱️ 마우스 이미지 벗어남, 렌즈 숨김 (토글 상태 유지)');
                    if (lens && lens.parentElement) { 
                       lens.classList.remove('active');
                    }
                }
            };

            const internalActivate = (e) => {
                if (!img.complete || !img.naturalWidth || img.naturalWidth === 0) {
                    console.warn('🚫 돋보기 활성화 불가: 이미지 원본 크기 정보 없음 (internalActivate).');
                    if(!img.complete) img.onload = setupActualLens; 
                    return;
                }
                console.log('🟢 internalActivate: 돋보기 ON, 리스너 연결');
                magnifierActive = true;
                // internalActivate 시점에서는 렌즈를 바로 active로 만들지 않고,
                // 첫 mousemove 이벤트 발생 시 moveLens 함수 내에서 active로 만듭니다.
                // lens.classList.add('active'); // 이 줄은 moveLens 내부로 이동 또는 삭제 고려

                img.removeEventListener('mousemove', moveLens);
                img.removeEventListener('touchmove', moveLens);
                img.removeEventListener('mouseleave', handleMouseLeave);
                img.addEventListener('mousemove', moveLens);
                img.addEventListener('touchmove', moveLens, { passive: false });
                img.addEventListener('mouseleave', handleMouseLeave);
                
                // 초기 마우스 위치가 이미지 위에 있다면 즉시 렌즈 표시 (선택적)
                // if (e) moveLens(e); // 이 부분은 사용자가 원할 경우 추가
            };

            const internalDeactivate = () => {
                if (scheduledFrame && animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    scheduledFrame = false;
                    animationFrameId = null;
                }
                console.log('🔴 internalDeactivate: 돋보기 OFF, 리스너 제거 및 렌즈 숨김');
                magnifierActive = false;
                if (lens && lens.parentElement) {
                    lens.classList.remove('active');
                }

                img.removeEventListener('mousemove', moveLens);
                img.removeEventListener('touchmove', moveLens);
                img.removeEventListener('mouseleave', handleMouseLeave);
            };

            img._magnifierData = { lens, internalActivate, internalDeactivate, moveLens }; 
            console.log('🔬 _magnifierData 설정 완료');
            
            if (activateNow) {
                internalActivate(); // e 인자 없이 호출
            }
        };
        
        if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
            setupActualLens();
        } else {
            console.log('이미지 로드/원본크기 확보 대기 (setupLensIfNeeded), onload 핸들러 설정');
            const existingOnload = img.onload;
            img.onload = () => {
                if (existingOnload) existingOnload();
                console.log('🖼️ setupLensIfNeeded 내 이미지 로드 완료 -> setupActualLens 호출');
                setupActualLens();
            };
            if (img.complete && (!img.naturalWidth || img.naturalWidth === 0)) {
                 console.warn('이미지는 complete 상태지만 naturalWidth가 0입니다. (setupLensIfNeeded). 이미지 로딩에 문제가 있을 수 있습니다.');
            }
        }
    }
}); 