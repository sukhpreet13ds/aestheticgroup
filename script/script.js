/**
 * Aesthetics Group - Main JavaScript
 * Handles navigation, interactive sliders, video fallbacks, filters, and luxury animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Drawer Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close menu if clicked outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // 2. Sticky Header on Scroll
    const siteHeader = document.getElementById('header');
    const handleScroll = () => {
        if (!siteHeader) return;
        if (window.scrollY > 40) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 3. Featured Projects Slider Controls (Desktop & Tablet)
    const projectsTrack = document.getElementById('projectsSliderTrack');
    const prevBtn = document.getElementById('projPrevBtn');
    const nextBtn = document.getElementById('projNextBtn');

    if (projectsTrack && prevBtn && nextBtn) {
        const getScrollStep = () => {
            const firstSlide = projectsTrack.querySelector('.project-slide');
            if (firstSlide) {
                const slideWidth = firstSlide.offsetWidth;
                const gap = 24;
                return slideWidth + gap;
            }
            return 320;
        };

        nextBtn.addEventListener('click', () => {
            const step = getScrollStep();
            projectsTrack.scrollBy({ left: step, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            const step = getScrollStep();
            projectsTrack.scrollBy({ left: -step, behavior: 'smooth' });
        });

        // Drag to scroll functionality on desktop for extra luxury feel
        let isDown = false;
        let startX;
        let scrollLeft;

        projectsTrack.addEventListener('mousedown', (e) => {
            isDown = true;
            projectsTrack.style.cursor = 'grabbing';
            startX = e.pageX - projectsTrack.offsetLeft;
            scrollLeft = projectsTrack.scrollLeft;
        });

        projectsTrack.addEventListener('mouseleave', () => {
            isDown = false;
            projectsTrack.style.cursor = 'default';
        });

        projectsTrack.addEventListener('mouseup', () => {
            isDown = false;
            projectsTrack.style.cursor = 'default';
        });

        projectsTrack.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - projectsTrack.offsetLeft;
            const walk = (x - startX) * 1.5;
            projectsTrack.scrollLeft = scrollLeft - walk;
        });
    }

    // 4. Hero Video Optimization & Fallback
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        const playPromise = heroVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                console.log('Video autoplay prevented; poster thumbnail active.');
            });
        }
    }

    // 5. Active Navbar Item Management (Fixed for Projects and all pages)
    const navItems = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split('/').pop().toLowerCase();
    const isHomePage = currentPath === '' || currentPath === 'index.html';

    // Highlight the exact current page link
    navItems.forEach(item => {
        const href = (item.getAttribute('href') || '').toLowerCase();
        if (
            (isHomePage && (href === 'index.html' || href === '#home')) ||
            (!isHomePage && href.includes(currentPath) && currentPath !== '')
        ) {
            item.classList.add('active');
        } else if (!href.startsWith('#')) {
            item.classList.remove('active');
        }
    });

    // Run in-page ScrollSpy ONLY on index.html where hash sections reside
    if (isHomePage) {
        const sections = document.querySelectorAll('section[id]');
        const hashNavItems = Array.from(navItems).filter(item => (item.getAttribute('href') || '').startsWith('#'));

        if (sections.length > 0 && hashNavItems.length > 0) {
            const highlightNavOnScroll = () => {
                const scrollY = window.pageYOffset;
                sections.forEach(current => {
                    const sectionHeight = current.offsetHeight;
                    const sectionTop = current.offsetTop - 120;
                    const sectionId = current.getAttribute('id');

                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        hashNavItems.forEach(item => {
                            item.classList.remove('active');
                            if (item.getAttribute('href') === `#${sectionId}`) {
                                item.classList.add('active');
                            }
                        });
                    }
                });
            };
            window.addEventListener('scroll', highlightNavOnScroll, { passive: true });
        }
    }

    // 6. Smooth scroll for hash anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 7. Interactive Journey Timeline (About Us Page)
    const timelineButtons = document.querySelectorAll('.timeline-btn');
    const milestoneYear = document.getElementById('milestoneYear');
    const milestoneTitle = document.getElementById('milestoneTitle');
    const milestoneDesc = document.getElementById('milestoneDesc');
    const milestoneStats = document.getElementById('milestoneStats');

    const timelineData = {
        '1998': {
            year: '1998',
            title: 'Company Founded - 1998',
            desc: 'Mr. Sushant Muttreja embarked on a visionary journey to build a transparent, customer-first real estate consultancy, setting initial benchmarks of trust and integrity in Delhi NCR.',
            stats: [
                { num: '1', label: 'Office' },
                { num: '5', label: 'Team Members' },
                { num: '100+', label: 'Properties Listed' }
            ]
        },
        '2005': {
            year: '2005',
            title: 'First 1000+ Clients - 2005',
            desc: 'Surpassed the coveted milestone of 1,000 happy families, strengthening direct partnerships with leading real estate developers and expanding our advisory network.',
            stats: [
                { num: '1000+', label: 'Happy Clients' },
                { num: '15', label: 'Team Members' },
                { num: '500+', label: 'Transactions' }
            ]
        },
        '2012': {
            year: '2012',
            title: 'Expansion to New Regions - 2012',
            desc: 'Expanded strategic operations into Greater Noida, Noida Extension, and Yamuna Expressway corridors to capture early-stage capital appreciation for investors.',
            stats: [
                { num: '3', label: 'Regions' },
                { num: '2500+', label: 'Properties' },
                { num: '25', label: 'Team Members' }
            ]
        },
        '2018': {
            year: '2018',
            title: 'Digital Transformation - 2018',
            desc: 'Modernized client interaction with 24/7 digital advisory, virtual site walkthroughs, and seamless paperless documentation workflows.',
            stats: [
                { num: '24/7', label: 'Online Support' },
                { num: '100%', label: 'Digital Process' },
                { num: '40', label: 'Team Members' }
            ]
        },
        '2023': {
            year: '2023',
            title: '5000+ Clients Milestone - 2023',
            desc: 'Crossed over 5,000 successful transactions and facilitated prime luxury acquisitions across the region with an expanded team of industry specialists.',
            stats: [
                { num: '5000+', label: 'Happy Clients' },
                { num: '50+', label: 'Team Members' },
                { num: '10000+', label: 'Properties' }
            ]
        }
    };

    if (timelineButtons.length > 0 && milestoneTitle && milestoneDesc && milestoneStats) {
        timelineButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const year = btn.getAttribute('data-year');
                const data = timelineData[year];
                if (!data) return;

                // Update active state
                timelineButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Smoothly update content
                if (milestoneYear) milestoneYear.textContent = data.year;
                milestoneTitle.textContent = data.title;
                milestoneDesc.textContent = data.desc;

                milestoneStats.innerHTML = data.stats.map(s => `
                    <div class="stat-box">
                        <span class="stat-number">${s.num}</span>
                        <span class="stat-label">${s.label}</span>
                    </div>
                `).join('');
            });
        });
    }

    // 8. Properties Filtering & Sorting with Range Progress Slider (Buy Properties Page)
    const propertyCards = document.querySelectorAll('.filterable-property-card');
    const filterType = document.getElementById('filterType');
    const filterState = document.getElementById('filterState');
    const filterStatus = document.getElementById('filterStatus');
    const priceSlider = document.getElementById('filterPriceRange');
    const priceDisplay = document.getElementById('priceRangeDisplay');
    const sortSelect = document.getElementById('sortPriceSelect');
    const applyBtn = document.getElementById('applyFilterBtn');
    const clearBtn = document.getElementById('clearFilterBtn');
    const propertiesGrid = document.getElementById('propertiesGrid');

    if (propertyCards.length > 0) {
        // Update slider track gradient fill dynamically
        const updateSliderProgress = () => {
            if (!priceSlider) return;
            const min = parseFloat(priceSlider.min) || 0;
            const max = parseFloat(priceSlider.max) || 10;
            const val = parseFloat(priceSlider.value) || 10;
            const percentage = ((val - min) / (max - min)) * 100;
            priceSlider.style.background = `linear-gradient(to right, #c5a880 0%, #c5a880 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`;
            
            if (priceDisplay) {
                if (val >= max) {
                    priceDisplay.textContent = 'Up to ₹ 10.0+ Cr';
                } else if (val <= 0) {
                    priceDisplay.textContent = '₹ 0 Cr';
                } else {
                    priceDisplay.textContent = `Up to ₹ ${val.toFixed(2)} Cr`;
                }
            }
        };

        const applyFilters = () => {
            const selectedType = filterType ? filterType.value.toLowerCase() : 'all';
            const selectedState = filterState ? filterState.value.toLowerCase() : 'all';
            const selectedStatus = filterStatus ? filterStatus.value.toLowerCase() : 'all';
            const maxPrice = priceSlider ? parseFloat(priceSlider.value) : 10;

            let visibleCount = 0;
            propertyCards.forEach(card => {
                const cardType = (card.getAttribute('data-type') || '').toLowerCase();
                const cardState = (card.getAttribute('data-state') || '').toLowerCase();
                const cardStatus = (card.getAttribute('data-status') || '').toLowerCase();
                const cardPrice = parseFloat(card.getAttribute('data-price') || '0');

                const matchesType = selectedType === 'all' || cardType === selectedType;
                const matchesState = selectedState === 'all' || cardState.includes(selectedState);
                const matchesStatus = selectedStatus === 'all' || cardStatus === selectedStatus;
                const matchesPrice = cardPrice <= maxPrice;

                if (matchesType && matchesState && matchesStatus && matchesPrice) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
        };

        const sortCards = () => {
            if (!sortSelect || !propertiesGrid) return;
            const sortVal = sortSelect.value;
            const cardsArray = Array.from(propertyCards);

            cardsArray.sort((a, b) => {
                const priceA = parseFloat(a.getAttribute('data-price') || '0');
                const priceB = parseFloat(b.getAttribute('data-price') || '0');

                if (sortVal === 'low-to-high') {
                    return priceA - priceB;
                } else if (sortVal === 'high-to-low') {
                    return priceB - priceA;
                }
                return 0; // Default order
            });

            cardsArray.forEach(card => propertiesGrid.appendChild(card));
        };

        // Real-time range slider input
        if (priceSlider) {
            priceSlider.addEventListener('input', () => {
                updateSliderProgress();
                applyFilters();
            });
            updateSliderProgress();
        }

        if (applyBtn) {
            applyBtn.addEventListener('click', () => {
                applyFilters();
                sortCards();
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (filterType) filterType.value = 'all';
                if (filterState) filterState.value = 'all';
                if (filterStatus) filterStatus.value = 'all';
                if (priceSlider) {
                    priceSlider.value = priceSlider.max || 10;
                    updateSliderProgress();
                }
                if (sortSelect) sortSelect.value = 'default';
                propertyCards.forEach(card => card.style.display = '');
                sortCards();
            });
        }

        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                sortCards();
                applyFilters();
            });
        }
    }
});
