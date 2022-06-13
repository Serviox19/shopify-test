$(document).ready(function(){
  $('.product-media__gallery').slick({
    rows: 0,
    dots: true,
    arrows: false,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          arrows: true,
        },
      },
    ],
  });

  let selectedSize = '';

  document.querySelectorAll('.product-form__option').forEach(item => {
    item.addEventListener('click', event => {
      //console.log(event.target.value);
      removePreviousSelected()
      event.target.classList.toggle("selected");
      selectedSize = event.target.value;
    })
  })

  function removePreviousSelected() {
    document.querySelectorAll('.product-form__option').forEach(item => {
      item.classList.remove("selected");
    })
  }

  function addItem() {
    const qty = document.querySelector("#quantity").value;
    const variant = selectedSize;

    const data = {
      id: variant,
      qty
    }

    console.log(data);

    if (!variant) {
      alert("Please select a variant")
    } else {
      $.ajax({
        url: '/cart/add.js',
        type: "POST",
        data,
        success: function (data) {
          var x = JSON.stringify(data);
          console.log(x);
          alertUser();
        },
        error: function (error) {
          console.log(`Error ${error}`);
        }
      });
    }
  }

  function alertUser() {
    document.querySelector(".atc-success").classList.toggle('active');
    setTimeout(() => {
      document.querySelector(".atc-success").classList.remove('active');
    }, 4000)
  }

  document.querySelector(".product-form__btn").addEventListener('click', () => {
    addItem();
  })
});