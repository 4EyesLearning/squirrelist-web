/**
 * SquirreList App - 2025 Edition
 * Main JavaScript functionality
 */

// DOM Elements
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const pricingToggle = document.getElementById('pricingToggle');
const monthlyLabel = document.getElementById('monthlyLabel');
const yearlyLabel = document.getElementById('yearlyLabel');
const proPrice = document.getElementById('proPrice');
const proDuration = document.getElementById('proDuration');
const teamPrice = document.getElementById('teamPrice');
const teamDuration = document.getElementById('teamDuration');
const faqItems = document.querySelectorAll('.faq-item');
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const taskFilters = document.querySelectorAll('.task-filter');

// Mobile Menu Toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.querySelector('i').classList.toggle('fa-bars');
        mobileMenuToggle.querySelector('i').classList.toggle('fa-times');
    });
}

// Theme Toggle
if (themeToggle) {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
    htmlElement.setAttribute('data-theme', 'dark');
    themeIcon.textContent = 'light_mode'; // Hiện mặt trời
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
    const isDark = htmlElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            htmlElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.textContent = 'dark_mode'; // Hiện mặt trăng
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.textContent = 'light_mode'; // Hiện mặt trời
        }
    });
}


// Pricing Toggle
if (pricingToggle) {
    pricingToggle.addEventListener('click', () => {
        pricingToggle.classList.toggle('yearly');
        monthlyLabel.classList.toggle('active');
        yearlyLabel.classList.toggle('active');

        if (pricingToggle.classList.contains('yearly')) {
            proPrice.textContent = '$57.59';
            proDuration.textContent = 'per year';
            teamPrice.textContent = '$124.99';
            teamDuration.textContent = 'per year';
        } else {
            proPrice.textContent = '$5.99';
            proDuration.textContent = 'per month';
            teamPrice.textContent = '$12.99';
            teamDuration.textContent = 'per month';
        }
    });
}

// FAQ Accordion
if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Demo Task Functionality
if (taskForm) {
    // Add new task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (taskInput.value.trim() === '') return;

        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';

        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = taskInput.value.trim();

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'task-delete';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteBtn);

        taskList.prepend(taskItem);
        taskInput.value = '';

        // Delete task
        deleteBtn.addEventListener('click', () => {
            taskItem.remove();
        });

        // Checkbox functionality
        checkbox.addEventListener('change', () => {
            taskText.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
            taskText.style.opacity = checkbox.checked ? '0.6' : '1';
        });
    });

    // Task filters
    if (taskFilters.length > 0) {
        taskFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Update active filter
                taskFilters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');

                const filterType = filter.getAttribute('data-filter');
                const tasks = taskList.querySelectorAll('.task-item');

                tasks.forEach(task => {
                    const checkbox = task.querySelector('.task-checkbox');

                    switch (filterType) {
                        case 'all':
                            task.style.display = 'flex';
                            break;
                        case 'active':
                            task.style.display = !checkbox.checked ? 'flex' : 'none';
                            break;
                        case 'completed':
                            task.style.display = checkbox.checked ? 'flex' : 'none';
                            break;
                    }
                });
            });
        });
    }
}

// Scroll Reveal
document.addEventListener('DOMContentLoaded', () => {
    function revealElements() {
        const reveals = document.querySelectorAll('.reveal');

        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }

    window.addEventListener('scroll', revealElements);
    revealElements(); // Run once on load

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });
});

// 3D Hero Effect with Three.js
function initThreeJS() {
    // Only initialize if device has enough power
    if (window.innerWidth < 768) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);

    const heroSection = document.querySelector('.hero');
    const canvas = renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.zIndex = '-1';
    heroSection.appendChild(canvas);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;

    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.01,
        color: 0xFF7F50,
        transparent: true,
        opacity: 0.4
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        particlesMesh.rotation.x += 0.0002;
        particlesMesh.rotation.y += 0.0003;

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize Three.js if available
if (typeof THREE !== 'undefined') {
    try {
        initThreeJS();
    } catch (error) {
        console.log('Three.js initialization failed:', error);
    }
}