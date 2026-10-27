/**
 * Ch. Hema Durga - Personal Portfolio Website
 * Interactive Frontend JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================
  // PROJECT DATA STORE
  // ==========================================
  const projectsData = {
    'phoneshop': {
      title: 'PhoneShop – Phone Shopping UI',
      category: 'E-Commerce Frontend UI',
      image: 'assets/images/project-phoneshop.png',
      description: 'A modern responsive phone shopping interface designed to display phones with categories, brands, search functionality, product cards, favorites, cart UI, and product details.',
      features: [
        'Sidebar category navigation & filters',
        'Interactive real-time search bar',
        'Brand selector (Apple, Samsung, OnePlus, etc.)',
        'Dynamic phone product cards with pricing',
        'Wishlist / favorites counter and toggle',
        'Cart preview modal and responsive layouts'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript'],
      demoUrl: 'https://hemach838-byte.github.io/phone1/',
      githubUrl: 'https://github.com/hemach838-byte/phone1'
    },
    'student-mgmt': {
      title: 'Student Management System',
      category: 'Data Search & Filtering UI',
      image: 'assets/images/project-student-mgmt.png',
      description: 'A frontend project for displaying and filtering student information. It provides a simple interface where users can search students and view details such as name, roll number, and branch.',
      features: [
        'Dynamic student search by keyword',
        'Interactive student info cards',
        'Structured student metadata (Roll No, Branch)',
        'Clean, accessible responsive card grid',
        'Instant client-side filter updates',
        'Clear empty-state & no-result handling'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript'],
      demoUrl: 'https://hemach838-byte.github.io/fil-stu/',
      githubUrl: 'https://github.com/hemach838-byte/fil-stu'
    },
    'youtube-clone': {
      title: 'YouTube Clone',
      category: 'Video Browsing Frontend',
      image: 'assets/images/project-youtube.png',
      description: 'A frontend recreation of a YouTube-style video browsing interface with navigation, search, video cards, thumbnails, categories, and a responsive layout.',
      features: [
        'Header with YouTube logo, search bar, & voice search',
        'Collapsible navigation sidebar with icons',
        'Responsive video grid with custom video thumbnails',
        'Channel avatar, title, view count, and upload time',
        'Tooltip hover effects across action buttons',
        'Clean mobile-friendly layout and CSS Flexbox'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript'],
      demoUrl: 'https://hemach838-byte.github.io/pro-4/',
      githubUrl: 'https://github.com/hemach838-byte/pro-4'
    },
    'image-gallery': {
      title: 'Image Gallery',
      category: 'Interactive Media Gallery',
      image: 'assets/images/project-gallery.png',
      description: 'An interactive image gallery project created during my web development internship/project work. It focuses on presenting images in a clean and interactive gallery interface.',
      features: [
        'Polished PhotoGallery branding & top navigation',
        'Interactive category filter tabs',
        'Responsive masonry-style photo grid',
        'Smooth image hover zoom & caption reveals',
        'Light & dark theme visual adaptability',
        'Optimized responsive layouts for mobile and desktop'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript'],
      demoUrl: 'https://hemach838-byte.github.io/codealpha_tasks/',
      githubUrl: 'https://github.com/hemach838-byte/codealpha_tasks'
    }
  };

  // ==========================================
  // ELEMENT REFERENCES
  // ==========================================
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');
  const backToTopBtn = document.getElementById('btn-back-to-top');
  const btnCopyEmail = document.getElementById('btn-copy-email');
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const toast = document.getElementById('toast');
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalContent = document.getElementById('modal-dynamic-content');
  const expandModalButtons = document.querySelectorAll('.btn-expand-modal');

  let lastActiveTrigger = null;

  // ==========================================
  // NAVBAR SCROLL EFFECT
  // ==========================================
  function handleNavbarScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // ==========================================
  // SCROLLSPY / ACTIVE NAV HIGHLIGHT
  // ==========================================
  function highlightActiveNav() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });
  highlightActiveNav();

  // ==========================================
  // MOBILE HAMBURGER MENU
  // ==========================================
  function openMobileMenu() {
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = hamburgerBtn.classList.contains('active');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close mobile menu if clicked outside
  document.addEventListener('click', (e) => {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburgerBtn.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  // Close mobile menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // ==========================================
  // PROJECT DETAILS MODAL
  // ==========================================
  function openProjectModal(projectId, triggerBtn) {
    const data = projectsData[projectId];
    if (!data) return;

    lastActiveTrigger = triggerBtn || document.activeElement;

    // Render Modal Dynamic Content
    modalContent.innerHTML = `
      <div class="modal-img-wrap">
        <img src="${data.image}" alt="${data.title} preview screenshot" loading="eager">
      </div>
      <div class="modal-body">
        <span class="modal-category">${data.category}</span>
        <h3 class="modal-title" id="modal-title">${data.title}</h3>
        <p class="modal-desc">${data.description}</p>
        
        <h4 class="modal-features-header">Key Highlights &amp; Features:</h4>
        <ul class="modal-feature-list">
          ${data.features.map(f => `<li class="modal-feature-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>${f}</span></li>`).join('')}
        </ul>

        <h4 class="modal-tech-header">Technologies Used</h4>
        <div class="modal-tech-stack">
          ${data.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>

        <div class="modal-actions">
          <a href="${data.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            <span>Open Live Demo</span>
          </a>
          <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            <span>View GitHub Repository</span>
          </a>
        </div>
      </div>
    `;

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button
    setTimeout(() => {
      modalCloseBtn.focus();
    }, 100);
  }

  function closeProjectModal() {
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastActiveTrigger) {
      lastActiveTrigger.focus();
    }
  }

  expandModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute('data-target');
      openProjectModal(targetId, btn);
    });
  });

  // Clicking anywhere on card (except direct link clicks) opens modal
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger modal if user clicked a link
      if (e.target.closest('a')) return;
      const projectId = card.getAttribute('data-project-id');
      if (projectId) {
        openProjectModal(projectId, card.querySelector('.btn-expand-modal'));
      }
    });
  });

  modalCloseBtn.addEventListener('click', closeProjectModal);

  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeProjectModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('open')) {
      closeProjectModal();
    }
  });

  // ==========================================
  // TOAST NOTIFICATION UTILITY
  // ==========================================
  let toastTimer = null;
  function showToast(message, type = 'success') {
    if (toastTimer) clearTimeout(toastTimer);

    toast.className = `toast show ${type}`;
    toast.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'circle-check' : 'circle-info'}"></i> <span>${message}</span>`;

    toastTimer = setTimeout(() => {
      toast.className = 'toast';
    }, 3500);
  }

  // ==========================================
  // ONE-CLICK EMAIL COPY
  // ==========================================
  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', async () => {
      const email = 'hemach838@gmail.com';
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback for older environments
          const tempInput = document.createElement('input');
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }
        showToast('Email address copied to clipboard!');
      } catch (err) {
        showToast('Email: hemach838@gmail.com', 'info');
      }
    });
  }

  // ==========================================
  // BACK TO TOP BUTTON
  // ==========================================
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // CONTACT FORM VALIDATION & INTERACTION
  // ==========================================
  if (contactForm) {
    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');
    const messageInput = document.getElementById('user-message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    function validateEmail(val) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(val);
    }

    function clearErrors() {
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
      nameInput.classList.remove('input-error');
      emailInput.classList.remove('input-error');
      messageInput.classList.remove('input-error');
      formFeedback.className = 'form-feedback';
      formFeedback.textContent = '';
    }

    // Clear error on input
    [nameInput, emailInput, messageInput].forEach(inp => {
      inp.addEventListener('input', () => {
        inp.classList.remove('input-error');
        const errSpan = inp.parentElement.nextElementSibling;
        if (errSpan && errSpan.classList.contains('field-error')) {
          errSpan.textContent = '';
        }
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      let isValid = true;
      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const messageVal = messageInput.value.trim();

      if (!nameVal) {
        nameError.textContent = 'Please enter your name.';
        nameInput.classList.add('input-error');
        isValid = false;
      }

      if (!emailVal) {
        emailError.textContent = 'Please enter your email address.';
        emailInput.classList.add('input-error');
        isValid = false;
      } else if (!validateEmail(emailVal)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailInput.classList.add('input-error');
        isValid = false;
      }

      if (!messageVal) {
        messageError.textContent = 'Please write a message.';
        messageInput.classList.add('input-error');
        isValid = false;
      } else if (messageVal.length < 5) {
        messageError.textContent = 'Message should be at least 5 characters long.';
        messageInput.classList.add('input-error');
        isValid = false;
      }

      if (!isValid) return;

      // Clean frontend interaction without pretending to have an artificial backend:
      // Prepares mailto link with encoded subject & body, and provides feedback
      const subject = encodeURIComponent(`Portfolio Inquiry from ${nameVal}`);
      const body = encodeURIComponent(`Hello Hema,\n\n${messageVal}\n\nFrom: ${nameVal}\nEmail: ${emailVal}`);
      const mailtoUrl = `mailto:hemach838@gmail.com?subject=${subject}&body=${body}`;

      formFeedback.className = 'form-feedback success';
      formFeedback.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        <span>Thank you, <strong>${nameVal}</strong>! Launching your email client to send your message directly to <strong>hemach838@gmail.com</strong>.</span>
      `;

      showToast('Opening your default mail client...');

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);
    });
  }
});
