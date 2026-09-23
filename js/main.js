(function () {
  "use strict";

  /* ---------- Translations ---------- */
  var translations = {
    en: {
      title: "Joe & Jone | We Deal in Water Conservation",
      menu: "Menu",
      searchPlaceholder: "Search products...",
      navHome: "Home",
      navAbout: "About Us",
      navProducts: "Products",
      navSolutions: "Solutions",
      navProjects: "Projects",
      navContact: "Contact"
    },
    ar: {
      title: "Joe & Jone | نحن نعمل في مجال ترشيد المياه",
      menu: "القائمة",
      searchPlaceholder: "ابحث عن المنتجات...",
      navHome: "الرئيسية",
      navAbout: "من نحن",
      navProducts: "المنتجات",
      navSolutions: "الحلول",
      navProjects: "المشاريع",
      navContact: "اتصل بنا"
    }
  };

  var STORAGE_KEY = "site-lang";
  var html = document.documentElement;
  var langButtons = document.querySelectorAll(".lang-btn");

  function setLanguage(lang) {
    var dict = translations[lang] || translations.en;

    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = dict.title;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (dict[key]) el.placeholder = dict[key];
    });

    langButtons.forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* storage unavailable */
    }
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLanguage(btn.getAttribute("data-lang"));
    });
  });

  var savedLang = null;
  try {
    savedLang = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    /* storage unavailable */
  }
  if (savedLang && translations[savedLang]) setLanguage(savedLang);

  /* ---------- Side menu ---------- */
  var menuToggle = document.getElementById("menuToggle");
  var menuClose = document.getElementById("menuClose");
  var sideMenu = document.getElementById("sideMenu");
  var menuOverlay = document.getElementById("menuOverlay");

  function openMenu() {
    menuOverlay.hidden = false;
    // Force reflow so the fade-in transition runs
    void menuOverlay.offsetWidth;
    menuOverlay.classList.add("is-visible");
    sideMenu.classList.add("is-open");
    sideMenu.setAttribute("aria-hidden", "false");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
    menuClose.focus();
  }

  function closeMenu() {
    menuOverlay.classList.remove("is-visible");
    sideMenu.classList.remove("is-open");
    sideMenu.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
    setTimeout(function () {
      if (!sideMenu.classList.contains("is-open")) menuOverlay.hidden = true;
    }, 300);
    menuToggle.focus();
  }

  menuToggle.addEventListener("click", openMenu);
  menuClose.addEventListener("click", closeMenu);
  menuOverlay.addEventListener("click", closeMenu);
  sideMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sideMenu.classList.contains("is-open")) closeMenu();
  });

  /* ---------- Search ---------- */
  var searchForm = document.getElementById("searchForm");
  var searchInput = document.getElementById("searchInput");
  var mobileQuery = window.matchMedia("(max-width: 767px)");

  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // On small screens the first tap expands the collapsed search field
    if (mobileQuery.matches && !searchForm.classList.contains("is-expanded")) {
      searchForm.classList.add("is-expanded");
      searchInput.focus();
      return;
    }

    var query = searchInput.value.trim();
    if (!query) {
      searchInput.focus();
      return;
    }
    // Hook up to the real search page / API here
    document.dispatchEvent(new CustomEvent("site:search", { detail: { query: query } }));
  });

  document.addEventListener("click", function (e) {
    if (!searchForm.contains(e.target)) searchForm.classList.remove("is-expanded");
  });
})();
