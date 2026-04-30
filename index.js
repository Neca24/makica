$(function () {
  /* ── CURSOR ── */
  const $cur = $("#cursor"),
    $trail = $("#cursor-trail");
  $(document).on("mousemove", function (e) {
    $cur.css({ left: e.clientX, top: e.clientY });
    setTimeout(() => $trail.css({ left: e.clientX, top: e.clientY }), 80);
  });

  /* ── NAVBAR SCROLL ── */
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 60) $(".navbar").addClass("scrolled");
    else $(".navbar").removeClass("scrolled");
  });

  /* ── PARTICLE CANVAS ── */
  const canvas = document.getElementById("particles-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const hearts = Array.from({ length: 24 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 10 + 5,
    speed: Math.random() * 0.4 + 0.1,
    opacity: Math.random() * 0.25 + 0.05,
    drift: (Math.random() - 0.5) * 0.4,
  }));

  function drawHeart(x, y, size, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = "#c9506a";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
      x,
      y - size * 0.3,
      x - size * 0.5,
      y - size * 0.7,
      x - size * 0.5,
      y - size * 0.3,
    );
    ctx.bezierCurveTo(
      x - size * 0.5,
      y + size * 0.3,
      x,
      y + size * 0.6,
      x,
      y + size * 0.6,
    );
    ctx.bezierCurveTo(
      x,
      y + size * 0.6,
      x + size * 0.5,
      y + size * 0.3,
      x + size * 0.5,
      y - size * 0.3,
    );
    ctx.bezierCurveTo(x + size * 0.5, y - size * 0.7, x, y - size * 0.3, x, y);
    ctx.fill();
    ctx.restore();
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((h) => {
      h.y -= h.speed;
      h.x += h.drift;
      if (h.y + h.size < 0) {
        h.y = canvas.height + h.size;
        h.x = Math.random() * canvas.width;
      }
      drawHeart(h.x, h.y, h.size, h.opacity);
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  $(window).on("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  /* ── FALLING PETALS (hero) ── */
  const petals = ["🌸", "🌺", "🌹", "💐", "✿", "❀"];
  for (let i = 0; i < 14; i++) {
    const $p = $('<span class="petal">').text(
      petals[Math.floor(Math.random() * petals.length)],
    );
    const dur = (Math.random() * 10 + 8).toFixed(1);
    const delay = (Math.random() * 12).toFixed(1);
    $p.css({
      left: Math.random() * 100 + "%",
      top: "-60px",
      animationDuration: dur + "s",
      animationDelay: delay + "s",
      fontSize: Math.random() * 14 + 12 + "px",
    });
    $("#hero").append($p);
  }

  /* ── SCROLL REVEAL ── */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => $(e.target).addClass("visible"), i * 80);
        }
      });
    },
    { threshold: 0.15 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  /* ── GALLERY LIGHTBOX ── */
  $("#gallery-grid").on("click", ".gallery-item", function () {
    const $img = $(this).find("img");
    if ($img.length) {
      $("#lb-img").attr("src", $img.attr("src"));
      $("#lightbox").addClass("active");
    }
  });
  $("#lb-close, #lightbox").on("click", function (e) {
    if (e.target === this) $("#lightbox").removeClass("active");
  });

  /* ── TYPED LETTER ── */

  const letterText = `Neverovatno je koliko brzo vreme prolazi. Čini mi se, kao da smo juče proslavili tvoj prvi rođendan od kako je počela ova naša najlepša bajka. Da bismo nastavili da je pišemo, potrebno je pre svega da budeš zdrava, kao i do sada to mi je prva i osnovna želja koju ti posvećujem. Kao što rekoh u pismu za Novu godinu, ovo je naša godina i vidim i osećam kako se to zaista i ostvaruje. Do pre godinu dana smo maštali i pričali o zajedničkom životu, kao ne baš toliko dalekoj, ali ne ni mnogo bliskoj budućnosti. Dok evo danas već odbrojavamo mesece koji nas dele od početka novog poglavlja ove bajke. Želim da znaš, da možda i ne činim baš maksimalno sve što mogu da bih to ubrazao, to nije do motivacije, već možda malo lenjosti u meni. Naravno, to nije ni za kakvu pohvalu, ali čovekova najveća borba je zapravo izlazak i zone komfora, odnosno borba sa samim sobom (prosto rečeno). Šta god radio u životu, to će te pratiti kroz različite oblike, samo je treba uvideti i maksimalno se posvetiti da je savladaš, odnosno pobediš samoga sebe. E pa ja sam odlučio da od ovog dana, dam taj maksimum i ostvarim želju koju verovatno zamišljaš, kao i ja. U suštini to je moj poklon za tebe, ovo što si dobila je zapravo sitnica, jer ljubav koju mi pružaš ne može da se zameni ni sa čim. To ne bi mogao da "otplati" ni jedan skupoceni poklon na svetu. Često pomišljaš da se ja ne pomolim pred spavanje i pitaš koji je sadržaj moje molitve, sada ću ti je otkriti delimično. Ono za šta se molim jeste da ti kao i svi ostali iz mog okruženja budete zdravi i srećni, a za sebe uvek kažem neka bude volja tvoja. Uglavnom ne tražim od Boga da mi ispunjava nešto što ima veze sa mnom, jer mi je dao SVE(T), tj. tebe. Eto možda nije nešto sadržajna molitva ali mislim da je dovoljna. Sasvim. 

Rečenica kojom ću završiti sve ovo, a izgovorio je, za mene već Sveti čovek, otac Tadej:

Ljubav je najjače oružje koje postoji, nema te sile i tog oružja koje će moći protiv ljubavi da se bori, sve se tu ruši.

Srećan Rođendan, ljubavi moja. VOLIM TE NAJVIŠE NA SVETU!`;

  const $lt = $("#letter-text");
  let idx = 0;
  function typeWriter() {
    if (idx < letterText.length) {
      const ch = letterText.charAt(idx);
      const display = letterText.substring(0, idx + 1).replace(/\n/g, "<br>");
      $lt.html(display + '<span class="typed-cursor">|</span>');
      idx++;
      setTimeout(typeWriter, ch === "\n" ? 120 : 28);
    } else {
      $lt.html(letterText.replace(/\n/g, "<br>"));
    }
  }

  // Start typing when section is visible
  const letterObs = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && idx === 0) typeWriter();
    },
    { threshold: 0.3 },
  );
  letterObs.observe(document.getElementById("pismo"));

  /* ── COUNTDOWN ── */
  // ✏️ Podesite datum rođendana: new Date('YYYY-MM-DD')
  const birthday = new Date("2026-05-04");

  function updateCountdown() {
    const now = new Date();
    const next = new Date(birthday);
    next.setFullYear(now.getFullYear());
    if (next < now) next.setFullYear(now.getFullYear() + 1);

    const diff = next - now;
    if (diff <= 0) {
      $("#countdown").hide();
      $("#happy-msg").show();
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    $("#cd-d").text(String(d).padStart(2, "0"));
    $("#cd-h").text(String(h).padStart(2, "0"));
    $("#cd-m").text(String(m).padStart(2, "0"));
    $("#cd-s").text(String(s).padStart(2, "0"));
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ── MUSIC TOGGLE ── */
  $("#music-btn").on("click", function () {
    const audio = document.getElementById("bg-audio");
    if (audio.paused) {
      audio.play().catch(() => {});
      $(this).addClass("playing").text("♬");
    } else {
      audio.pause();
      $(this).removeClass("playing").text("♪");
    }
  });
});
