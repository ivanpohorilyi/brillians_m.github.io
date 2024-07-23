
window.addEventListener('load', function() {
  preloader.style.display = 'none';
})

const TELEGRAM_BOT_TOKEN = '7337894339:AAEI2VfdrTDV8kv_IZy87nhoJF7_nP8m1BE';
const TELEGRAM_CHAT_ID = '@brilliansmleads';
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;



async function sendEmailTelegram(event) {
  event.preventDefault();

  const form = event.target;
  const formButton = document.querySelector('.leadform_btn');
  const formSendResult = document.querySelector('.form__send-result');  
  
  formSendResult.textContent = '';
  const { name, phone } = Object.fromEntries(new FormData(form).entries());
  const lead_text = `Заявка от ${name}!\nТелефон: ${phone}`;

  try {
    formSendResult.textContent = `Відправлення...`;
    formSendResult.style.display = 'block';
    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: lead_text,
      }),
    });

    if (response.ok) {
      formSendResult.textContent = `${name}, повідомлення успішно відправлено. Очікуйте дзвінка від менеджера`;
      formSendResult.style.display = 'block';
      form.reset();
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    formSendResult.textContent = `${name}, щось пішло не так... спробуйте ще раз чи зателефонуйте нам.`;
    formSendResult.style.backgroundColor = '#F8D7DB';
    formSendResult.style.display = 'block';
  } finally {
    formButton.textContent = 'Надіслати';
  }
}

const preloader = document.getElementById('preloader');



$(document).ready(function () {

  $(".filter-button").click(function () {
    var value = $(this).attr('data-filter');

    if (value == "all") {
      //$('.filter').removeClass('hidden');
      $('.filter').show('1000');
    }
    else {
      $('.filter[filter-item="' + value + '"]').removeClass('hidden');
      $(".filter").not('.filter[filter-item="' + value + '"]').addClass('hidden');
      $(".filter").not('.' + value).hide('3000');
      $('.filter').filter('.' + value).show('3000');

    }
  });

  if ($(".filter-button").removeClass("active")) {
    $(this).removeClass("active");
  }
  $(this).addClass("active");

});

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  // autoplay: {
  //   delay: 3000
  // },
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 0,
    slideShadows: true
  },
  spaceBetween: 50,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});


let currentIndex = 0;
let startX, endX;
let autoSlideInterval;

function showSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;

    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }

    slides.style.transform = `translateX(-${currentIndex * 100}%)`;

    updateNavigationDots();
    resetAutoSlide();
}

function updateNavigationDots() {
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function currentSlide(index) {
    showSlide(index);
}

function autoSlide() {
    showSlide(currentIndex + 1);
}

// function resetAutoSlide() {
//     clearInterval(autoSlideInterval);
//   //autoSlideInterval = setInterval(autoSlide, 9000);
// }

// Обработчики событий для свайпа
function touchStart(event) {
    startX = event.touches[0].clientX;
}

function touchMove(event) {
    endX = event.touches[0].clientX;
}

function touchEnd() {
    if (startX > endX + 50) {
        showSlide(currentIndex + 1);
    } else if (startX < endX - 50) {
        showSlide(currentIndex - 1);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex);

    const slider = document.querySelector('.slider');
    slider.addEventListener('touchstart', touchStart);
    slider.addEventListener('touchmove', touchMove);
    slider.addEventListener('touchend', touchEnd);

    // autoSlideInterval = setInterval(autoSlide, 3000);
});