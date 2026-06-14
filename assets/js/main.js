/* =================================================================
   MA DOUCE VIE — interactions
   ================================================================= */

/* -----------------------------------------------------------------
   ▶ LIEN AMAZON
   Pour changer la page produit, modifie UNIQUEMENT cette ligne.
   ----------------------------------------------------------------- */
const AMAZON_URL = "https://amzn.eu/d/0axtAiyB";

/* -----------------------------------------------------------------
   ▶ NEWSLETTER (optionnel)
   Colle ici l'URL de ton service d'emailing (Formspree, Brevo,
   Mailchimp, Beehiiv…). Tant que la valeur reste vide, le formulaire
   affiche un message de remerciement sans rien envoyer.
   Exemple Formspree : "https://formspree.io/f/xxxxxx"
   ----------------------------------------------------------------- */
const NEWSLETTER_ENDPOINT = "";

(function () {
  "use strict";

  /* --- 1. Brancher tous les boutons d'achat sur Amazon --- */
  document.querySelectorAll("[data-buy], .js-buy").forEach(function (el) {
    el.setAttribute("href", AMAZON_URL);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  /* --- 2. Année automatique dans le footer --- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- 3. Navigation : ombre + bouton flottant au scroll --- */
  var nav = document.getElementById("nav");
  var floating = document.querySelector(".floating-buy");
  var progress = document.getElementById("readingProgress");

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;

    if (nav) nav.classList.toggle("scrolled", y > 30);
    if (floating) floating.classList.toggle("show", y > 640);

    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --- 4. Révélations au scroll (IntersectionObserver) --- */
  var reveals = document.querySelectorAll(".reveal");

  function revealAll() {
    reveals.forEach(function (el) {
      el.classList.add("in");
    });
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    reveals.forEach(function (el, i) {
      // petit décalage en cascade pour les éléments voisins
      el.style.transitionDelay = (i % 3) * 0.08 + "s";
      io.observe(el);
    });

    // Filet de sécurité : si une section n'a pas été révélée (quirk mobile,
    // observer qui ne se déclenche pas…), on l'affiche quoi qu'il arrive.
    setTimeout(revealAll, 2600);
  } else {
    revealAll();
  }

  /* --- 5. Compteurs animés --- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var dur = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll(".stat__num[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var co = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            co.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (c) {
      co.observe(c);
    });
  } else {
    counters.forEach(function (c) {
      c.textContent = c.getAttribute("data-count");
    });
  }

  /* --- 6. Newsletter --- */
  var nlForm = document.getElementById("newsletterForm");
  if (nlForm) {
    var nlInput = document.getElementById("newsletterEmail");
    var nlMsg = document.getElementById("newsletterMsg");
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    nlForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = (nlInput.value || "").trim();

      if (!emailRe.test(email)) {
        nlMsg.textContent = "Oups, vérifie ton adresse email 🙈";
        nlInput.focus();
        return;
      }

      function success() {
        nlForm.reset();
        nlMsg.textContent = "Merci ✦ Ta page douceur arrive dans ta boîte mail 💛";
      }

      if (NEWSLETTER_ENDPOINT) {
        nlMsg.textContent = "Un instant…";
        fetch(NEWSLETTER_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email: email }),
        })
          .then(function (r) {
            if (r.ok) success();
            else nlMsg.textContent = "Petit souci d'envoi, réessaie dans un instant 🙏";
          })
          .catch(function () {
            nlMsg.textContent = "Connexion impossible, réessaie dans un instant 🙏";
          });
      } else {
        success();
      }
    });
  }

  /* --- 7. Parallax léger des stickers du hero --- */
  var stickers = document.querySelectorAll(".sticker");
  if (stickers.length && window.matchMedia("(min-width:900px)").matches) {
    window.addEventListener(
      "mousemove",
      function (e) {
        var dx = (e.clientX / window.innerWidth - 0.5) * 2;
        var dy = (e.clientY / window.innerHeight - 0.5) * 2;
        stickers.forEach(function (s, i) {
          var depth = (i + 1) * 6;
          s.style.transform =
            "translate(" + dx * depth + "px," + dy * depth + "px)";
        });
      },
      { passive: true }
    );
  }
})();
