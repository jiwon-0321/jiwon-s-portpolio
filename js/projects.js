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
        project.gallery.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = item.isMain ? 'gallery-item main' : 'gallery-item sub';
            
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.caption}" loading="${item.isMain ? 'eager' : 'lazy'}">
                <div class="gallery-caption">${item.caption}</div>
            `;
            
            projectGallery.appendChild(galleryItem);
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
    
    // 모달 스크롤 상태 관리
    let openModalCount = 0;
    let originalBodyOverflow = '';
    
    function disableBodyScroll() {
        if (openModalCount === 0) {
            originalBodyOverflow = document.body.style.overflow || '';
            document.body.style.overflow = 'hidden';
            console.log('스크롤 비활성화됨, 모달 수:', openModalCount + 1);
        }
        openModalCount++;
    }
    
    function enableBodyScroll() {
        openModalCount = Math.max(0, openModalCount - 1);
        console.log('스크롤 복구 시도, 남은 모달 수:', openModalCount);
        if (openModalCount === 0) {
            document.body.style.overflow = originalBodyOverflow;
            console.log('스크롤 완전 복구됨');
        }
    }
    
    function forceEnableBodyScroll() {
        openModalCount = 0;
        document.body.style.overflow = originalBodyOverflow || 'auto';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.documentElement.style.overflow = '';
        console.log('강제 스크롤 복구 실행됨');
    }

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
        disableBodyScroll();
    }
    
    // 재질 사용 위치 모달 설정
    function setupMaterialUsageModal() {
        const modal = document.getElementById('materialUsageModal');
        const closeBtn = document.getElementById('closeMaterialModal');
        
        // 닫기 버튼 클릭
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            enableBodyScroll();
        });
        
        // 모달 배경 클릭 시 닫기
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                enableBodyScroll();
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
                    enableBodyScroll();
                }
            }
        });
    }
    
    // 이미지 모달 설정
    function setupImageModal() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const modal = document.querySelector('.image-modal');
        const modalImg = document.getElementById('expandedImg');
        const closeModal = document.querySelector('.close-modal');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                
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
                };
                
                modalImg.src = img.src;
                modal.style.display = 'flex';
                disableBodyScroll();
            });
        });
        
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            enableBodyScroll();
            
            // 추가 안전장치: 잠시 후 스크롤 상태 재확인
            setTimeout(() => {
                const materialModal = document.getElementById('materialUsageModal');
                if (!materialModal || materialModal.style.display !== 'block') {
                    forceEnableBodyScroll();
                }
            }, 100);
        });
        
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                enableBodyScroll();
                
                // 추가 안전장치: 잠시 후 스크롤 상태 재확인
                setTimeout(() => {
                    const materialModal = document.getElementById('materialUsageModal');
                    if (!materialModal || materialModal.style.display !== 'block') {
                        forceEnableBodyScroll();
                    }
                }, 100);
            }
        });
        
        // 이미지 모달 ESC 키 처리
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
                enableBodyScroll();
        
                // 추가 안전장치: 잠시 후 스크롤 상태 재확인
                setTimeout(() => {
                    const materialModal = document.getElementById('materialUsageModal');
                    if (!materialModal || materialModal.style.display !== 'block') {
                        forceEnableBodyScroll();
                    }
                }, 100);
            }
        });
    }
    
    // 프로젝트 목록으로 돌아가기
    backButton.addEventListener('click', function() {
        projectDetailSection.style.display = 'none';
        projectListSection.style.display = 'block';
        
        // 모든 모달이 닫혔는지 확인하고 스크롤 강제 복구
        forceEnableBodyScroll();
        
        // URL 파라미터 제거
        const url = new URL(window.location);
        url.searchParams.delete('project');
        window.history.pushState({}, '', url);
    });
    
    // 뒤로가기/앞으로가기 이벤트 처리
    window.addEventListener('popstate', function() {
        const projectId = getUrlParameter('project');
        
        // 페이지 전환 시 스크롤 강제 복구
        forceEnableBodyScroll();
        
        if (projectId) {
            showProjectDetail(projectId);
        } else {
            projectDetailSection.style.display = 'none';
            projectListSection.style.display = 'block';
        }
    });
    
    // 초기화
    function initialize() {
        console.log("프로젝트 페이지 초기화 시작");
        
        console.log("프로젝트 데이터:", projectsData);
        console.log("프로젝트 그리드 요소:", projectGrid);
        console.log("필터 버튼들:", document.querySelectorAll('.filter-btn'));
        
        // 프로젝트 목록 초기화
        initializeProjectList();
        
        // 프로젝트 필터링 설정
        setupProjectFilters();
        
        // URL에 project 파라미터가 있으면 해당 프로젝트 상세 표시
        const projectId = getUrlParameter('project');
        if (projectId) {
            console.log("URL에서 프로젝트 ID 발견:", projectId);
            showProjectDetail(projectId);
        }
        
        console.log("프로젝트 페이지 초기화 완료");
    }
    
    // 페이지 언로드 시 스크롤 복구 (안전장치)
    window.addEventListener('beforeunload', function() {
        forceEnableBodyScroll();
    });
    
    // 페이지 포커스 시 스크롤 상태 체크
    window.addEventListener('focus', function() {
        // 열린 모달이 없는데 스크롤이 비활성화되어 있으면 강제 복구
        const materialModal = document.getElementById('materialUsageModal');
        const imageModal = document.querySelector('.image-modal');
        
        const materialModalOpen = materialModal && materialModal.style.display === 'block';
        const imageModalOpen = imageModal && imageModal.style.display === 'flex';
        
        if (!materialModalOpen && !imageModalOpen && document.body.style.overflow === 'hidden') {
            console.log('스크롤 상태 불일치 감지 - 강제 복구');
            forceEnableBodyScroll();
        }
    });
    
    // 긴급 스크롤 복구 키보드 단축키 (Ctrl+Shift+S)
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.shiftKey && event.key === 'S') {
            event.preventDefault();
            console.log('긴급 스크롤 복구 단축키 실행');
            forceEnableBodyScroll();
            alert('스크롤이 강제로 복구되었습니다.');
        }
    });
    
    // 페이지 클릭 시 스크롤 상태 자동 체크 (3초마다)
    setInterval(function() {
        const materialModal = document.getElementById('materialUsageModal');
        const imageModal = document.querySelector('.image-modal');
        
        const materialModalOpen = materialModal && materialModal.style.display === 'block';
        const imageModalOpen = imageModal && imageModal.style.display === 'flex';
        
        // 모달이 모두 닫혀있는데 스크롤이 비활성화되어 있으면 복구
        if (!materialModalOpen && !imageModalOpen && document.body.style.overflow === 'hidden') {
            console.log('자동 스크롤 상태 체크 - 불일치 감지, 복구 실행');
            forceEnableBodyScroll();
        }
    }, 3000);
    
    // 초기화 실행
    initialize();
}); 