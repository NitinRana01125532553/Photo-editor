"use strict";

window.onload = function () {
  //variables
  var fileinput = document.getElementById("file-input"),
      choose_img_btn = document.getElementById("choose-img"),
      preview_img = document.getElementById("preview-img"),
      preview_img_div = document.getElementById("preview-img-div"),
      filter_options = document.querySelectorAll(".filter button"),
      filter_name = document.getElementById("slider-name"),
      slider = document.querySelector('.slider input'),
      rotate_options = document.querySelectorAll('.rotate button'),
      slider_value = document.getElementById("slider-value"),
      reset_filter = document.querySelector('.controls .reset-filter'),
      save_image = document.querySelector('.save-img');
  var brightness = 100,
      saturation = 100,
      inversion = 0,
      grayscale = 0;
  var rotate = 0,
      fliphorizontal = 1,
      flipvertical = 1; //functions 
  //functions to load image

  var loadimage = function loadimage() {
    var file = fileinput.files[0]; //get user selected file

    if (!file) {
      return;
    }

    ; //return if no file is selected

    console.log(file);
    preview_img.src = URL.createObjectURL(file); //passing file url as img src

    preview_img.addEventListener("load", function () {
      reset_filter.click();
      document.getElementById("container").classList.remove("disable");
    });
  }; //apply the filters to image and transform it


  var apply_filter = function apply_filter() {
    preview_img_div.style.transform = "rotate(".concat(rotate, "deg) scale(").concat(fliphorizontal, ", ").concat(flipvertical, ")");
    preview_img_div.style.filter = "brightness(".concat(brightness, "%) saturate(").concat(saturation, "%) invert(").concat(inversion, "%) grayscale(").concat(grayscale, "%)");
  }; // changing color of the button clicked


  filter_options.forEach(function (option) {
    option.addEventListener("click", function () {
      document.querySelector(".filter .active").classList.remove("active"); //remove color from all buttons

      option.classList.add("active"); //adding colors to selected button
      //changing the filter name

      filter_name.innerText = option.innerText; //change the text of slider to selected button

      if (option.id === "brightness") {
        document.querySelector('.slider input').max = "200"; //giving each slider a max value

        document.querySelector('.slider input').value = brightness;
        slider_value.innerText = "".concat(brightness, "%");
      } else if (option.id === "saturation") {
        document.querySelector('.slider input').max = "200";
        document.querySelector('.slider input').value = saturation;
        slider_value.innerText = "".concat(saturation, "%");
      } else if (option.id === "inversion") {
        document.querySelector('.slider input').max = "100";
        document.querySelector('.slider input').value = inversion;
        slider_value.innerText = "".concat(inversion, "%");
      } else {
        document.querySelector('.slider input').max = "100";
        document.querySelector('.slider input').value = grayscale;
        slider_value.innerText = "".concat(grayscale, "%");
      }
    });
  }); //updating values with changing slider

  var update_filter = function update_filter() {
    slider_value.innerText = "".concat(document.querySelector('.slider input').value, "%");
    var selected_filter = document.querySelector('.active');

    if (selected_filter.id === "brightness") {
      brightness = document.querySelector('.slider input').value;
    } else if (selected_filter.id === "saturation") {
      saturation = document.querySelector('.slider input').value;
    } else if (selected_filter.id === "inversion") {
      inversion = document.querySelector('.slider input').value;
    } else {
      grayscale = document.querySelector('.slider input').value;
    }

    apply_filter();
  }; //changing transform variablevalues to transform image


  rotate_options.forEach(function (option) {
    option.addEventListener("click", function () {
      if (option.id === 'left') {
        rotate -= 90;
      } else if (option.id === 'right') {
        rotate += 90;
      } else if (option.id === 'horizontal') {
        fliphorizontal = fliphorizontal === 1 ? -1 : 1;
      } else if (option.id === 'vertical') {
        flipvertical = flipvertical === 1 ? -1 : 1;
      }

      apply_filter();
    });
  }); //resetting all filters to default values

  var reset = function reset() {
    brightness = 100;
    saturation = 100;
    inversion = 0;
    grayscale = 0;
    rotate = 0;
    fliphorizontal = 1;
    flipvertical = 1;
    filter_options[0].click();
    apply_filter();
  }; //save the edited image


  var save = function save() {
    var canvas = document.createElement("canvas"); //creating cnavas element

    var ctx = canvas.getContext("2d");
    canvas.width = preview_img.naturalWidth;
    canvas.height = preview_img.naturalHeight; //applying user selected filters

    ctx.filter = "brightness(".concat(brightness, "%) saturate(").concat(saturation, "%) invert(").concat(inversion, "%) grayscale(").concat(grayscale, "%)");
    ctx.translate(canvas.width / 2, canvas.height / 2);

    if (rotate !== 0) {
      ctx.rotate(rotate * Math.PI / 180);
    }

    ctx.scale(fliphorizontal, flipvertical);
    ctx.drawImage(preview_img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    var link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
  }; //executing the functions


  choose_img_btn.addEventListener("click", function () {
    return fileinput.click();
  });
  fileinput.addEventListener("change", loadimage);
  reset_filter.addEventListener("click", reset);
  document.querySelector('.slider input').addEventListener("input", update_filter);
  save_image.addEventListener("click", save);
};