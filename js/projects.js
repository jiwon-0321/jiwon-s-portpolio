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
            p.textContent = paragraph;
            projectDescription.appendChild(p);
        });
        
        // 재료 설정
        materialsGrid.innerHTML = '';
        project.materials.forEach(material => {
            const materialItem = document.createElement('div');
            materialItem.className = 'material-item';
            
            materialItem.innerHTML = `
                <div class="material-swatch" style="background-color: ${material.color};"></div>
                <div class="material-info">
                    <h3 class="material-name">${material.name}</h3>
                    <p class="material-description">${material.description}</p>
                </div>
            `;
            
            materialsGrid.appendChild(materialItem);
        });
        
        // 섹션 전환
        projectListSection.style.display = 'none';
        projectDetailSection.style.display = 'block';
        
        // 스크롤을 맨 위로 이동
        window.scrollTo(0, 0);
        
        // 이미지 모달 이벤트 설정
        setupImageModal();
        
        // PDF 업로드 폼 초기화
        setupPdfUploadForm();
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
                modal.style.display = 'flex';
                modalImg.src = img.src;
                document.body.style.overflow = 'hidden';
            });
        });
        
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // PDF 업로드 폼 설정
    function setupPdfUploadForm() {
        const pdfFile = document.getElementById('pdfFile');
        const fileName = document.getElementById('fileName');
        const uploadForm = document.getElementById('pdfUploadForm');
        const uploadStatus = document.getElementById('uploadStatus');
        const filesList = document.getElementById('filesList');
        
        // 파일 선택 시 파일명 표시
        pdfFile.addEventListener('change', function() {
            if (this.files.length > 0) {
                fileName.textContent = this.files[0].name;
            } else {
                fileName.textContent = 'No file chosen';
            }
        });
        
        // 폼 제출(업로드) 이벤트
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (pdfFile.files.length === 0) {
                showUploadStatus('Please select a PDF file first', 'error');
                return;
            }
            
            const file = pdfFile.files[0];
            
            // 파일 유형 확인
            if (file.type !== 'application/pdf') {
                showUploadStatus('Only PDF files are allowed', 'error');
                return;
            }
            
            // 여기서는 시뮬레이션을 위해 실제 업로드 대신 타임아웃 사용
            showUploadStatus('Uploading file...', 'success');
            
            // 실제 서버 연동 시 이 부분을 fetch 또는 XMLHttpRequest로 대체
            setTimeout(function() {
                // 업로드 성공 표시
                showUploadStatus('File uploaded successfully!', 'success');
                
                // 파일 목록에 추가
                addFileToList(file.name);
                
                // 폼 초기화
                uploadForm.reset();
                fileName.textContent = 'No file chosen';
            }, 1500);
        });
        
        // 업로드 상태 표시 함수
        function showUploadStatus(message, type) {
            uploadStatus.textContent = message;
            uploadStatus.className = `upload-status ${type}`;
            uploadStatus.style.display = 'block';
            
            // 3초 후 상태 메시지 숨기기
            setTimeout(function() {
                uploadStatus.style.display = 'none';
            }, 3000);
        }
        
        // 파일 목록에 추가하는 함수
        function addFileToList(filename) {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="file-info">
                    <i class="fas fa-file-pdf file-icon"></i>
                    <span>${filename}</span>
                </div>
                <div class="file-actions">
                    <button class="download-file">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="delete-file">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            
            // 삭제 버튼 이벤트
            const deleteBtn = li.querySelector('.delete-file');
            deleteBtn.addEventListener('click', function() {
                li.remove();
            });
            
            filesList.appendChild(li);
        }
    }
    
    // 프로젝트 목록으로 돌아가기
    backButton.addEventListener('click', function() {
        projectDetailSection.style.display = 'none';
        projectListSection.style.display = 'block';
        
        // URL 파라미터 제거
        const url = new URL(window.location);
        url.searchParams.delete('project');
        window.history.pushState({}, '', url);
    });
    
    // 뒤로가기/앞으로가기 이벤트 처리
    window.addEventListener('popstate', function() {
        const projectId = getUrlParameter('project');
        
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
    
    // 초기화 실행
    initialize();
}); 