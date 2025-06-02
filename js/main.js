// 공통 UI 기능 및 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 네비게이션 및 모바일 메뉴 관련 기능
    initializeNavigation();
    
    // 슬라이더 기능 (있는 경우에만 초기화)
    if (document.querySelector('.slide')) {
        initializeSlider();
    }
    
    // 이미지 로딩 최적화
    setupImageLoading();
});

// 네비게이션 관련 기능
function initializeNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPath = window.location.pathname;
    const header = document.querySelector('header');
    
    // 현재 페이지에 맞는 메뉴 항목 활성화
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        // projects 폴더 내의 페이지인 경우 처리
        if (currentPath.includes('projects/') && linkPath === 'projects.html') {
            link.classList.add('active');
        } 
        // URL에 project 쿼리 파라미터가 있으면 프로젝트 메뉴 활성화
        else if (window.location.search.includes('project=') && linkPath === 'projects.html') {
            link.classList.add('active');
        }
        // 일반 페이지 처리
        else if (linkPath === currentPath.split('/').pop()) {
            link.classList.add('active');
        }
    });

    // 모바일 메뉴 토글
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            document.body.classList.toggle('menu-open');
            nav.classList.toggle('active');
            this.classList.toggle('active');
            
            // 메뉴가 열려있을 때 스크롤 방지
            if (document.body.classList.contains('menu-open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // 스크롤 이벤트 처리 - 헤더 스타일 변경
    window.addEventListener('scroll', function() {
        if (window.scrollY >= 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// 슬라이더 기능 초기화
function initializeSlider() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;
    let slideInterval;

    // 초기 상태 설정 - 첫 번째 슬라이드와 도트 활성화
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }
    
    if (dots.length > 0) {
        dots[0].classList.add('active');
    }

    // 슬라이드 변경 함수
    function goToSlide(index) {
        if (index < 0) {
            index = totalSlides - 1;
        } else if (index >= totalSlides) {
            index = 0;
        }

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (slides[index]) slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        
        currentSlide = index;
    }

    // 도트 클릭 이벤트
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            goToSlide(index);
            clearInterval(slideInterval);
            startSlideInterval();
        });
    });

    // 자동 슬라이드 시작 함수
    function startSlideInterval() {
        slideInterval = setInterval(function() {
            goToSlide(currentSlide + 1);
        }, 5000);
    }

    // 자동 슬라이드 시작
    startSlideInterval();

    // 사용자가 슬라이더와 상호작용할 때 자동 슬라이드 일시 중지
    const sliderDots = document.querySelector('.slider-dots');
    if (sliderDots) {
        sliderDots.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        sliderDots.addEventListener('mouseleave', function() {
            startSlideInterval();
        });
    }
}

// 이미지 로딩 관련 함수
function setupImageLoading() {
    // data-src 속성이 있는 이미지 로드
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src;
            img.onload = () => {
                img.classList.add('loaded');
                img.removeAttribute('data-src');
            };
        }
    });
    
    // 일반 이미지에 로딩 클래스 추가
    const allImages = document.querySelectorAll('img:not([data-src])');
    allImages.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });
}

// 이미지 모달창 기능 (프로젝트 상세 페이지용)
/*
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.project-gallery')) {
        const galleryImages = document.querySelectorAll('.gallery-item img');
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const closeModal = document.querySelector('.close-modal');
        
        if (galleryImages && modal && modalImg && closeModal) {
            galleryImages.forEach(img => {
                img.addEventListener('click', function() {
                    modal.style.display = 'flex';
                    modalImg.src = this.src;
                    document.body.style.overflow = 'hidden';
                });
            });
            
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    }
});
*/ 