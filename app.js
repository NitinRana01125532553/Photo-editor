window.onload = function() {
//variables
const fileinput = document.getElementById("file-input"),        
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

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, fliphorizontal = 1, flipvertical = 1;

//functions 
//functions to load image
const loadimage = () => {
    let file = fileinput.files[0]; //get user selected file
    if(!file) {return}; //return if no file is selected
    console.log(file);
    preview_img.src = URL.createObjectURL(file); //passing file url as img src
    preview_img.addEventListener("load", () => {
        reset_filter.click()
        document.getElementById("container").classList.remove("disable");
    })
}

//apply the filters to image and transform it
const apply_filter = () => {
    preview_img_div.style.transform = `rotate(${rotate}deg) scale(${fliphorizontal}, ${flipvertical})`;
    preview_img_div.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

// changing color of the button clicked
filter_options.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".filter .active").classList.remove("active"); //remove color from all buttons
        option.classList.add("active"); //adding colors to selected button
        //changing the filter name
        filter_name.innerText = option.innerText; //change the text of slider to selected button

        if (option.id === "brightness") {
            document.querySelector('.slider input').max = "200"; //giving each slider a max value
            document.querySelector('.slider input').value = brightness;
            slider_value.innerText = `${brightness}%`;
        }
        else if (option.id === "saturation") {
            document.querySelector('.slider input').max = "200";
            document.querySelector('.slider input').value = saturation;
            slider_value.innerText = `${saturation}%`;
        }
        else if (option.id === "inversion") {
            document.querySelector('.slider input').max = "100";
            document.querySelector('.slider input').value = inversion;
            slider_value.innerText = `${inversion}%`;
        }
        else {
            document.querySelector('.slider input').max = "100";
            document.querySelector('.slider input').value = grayscale;
            slider_value.innerText = `${grayscale}%`;
        }
    });
});

//updating values with changing slider
const update_filter = () => {
    slider_value.innerText = `${document.querySelector('.slider input').value}%`;
    const selected_filter = document.querySelector('.active');
    if (selected_filter.id === "brightness") {
        brightness = document.querySelector('.slider input').value;
    }
    else if (selected_filter.id === "saturation") {
        saturation = document.querySelector('.slider input').value;
    }
    else if (selected_filter.id === "inversion") {
        inversion = document.querySelector('.slider input').value;
    }
    else {
        grayscale = document.querySelector('.slider input').value;
    }

    apply_filter();
};

//changing transform variablevalues to transform image
rotate_options.forEach(option => {
    option.addEventListener("click", () => {
        if (option.id === 'left') {
            rotate -= 90;
        }
        else if (option.id === 'right') {
            rotate += 90;
        }
        else if (option.id === 'horizontal') {
            fliphorizontal = fliphorizontal === 1 ? -1 : 1;
        }
        else if (option.id === 'vertical') {
            flipvertical = flipvertical === 1 ? -1 : 1;
        }

        apply_filter();
    });
});

//resetting all filters to default values
const reset = () => {
    brightness = 100; saturation = 100; inversion = 0; grayscale = 0;
    rotate = 0; fliphorizontal = 1; flipvertical = 1;
    filter_options[0].click();
    apply_filter();
}

//save the edited image
const save = () => {
    const canvas = document.createElement("canvas"); //creating cnavas element
    const ctx = canvas.getContext("2d");
    canvas.width = preview_img.naturalWidth;
    canvas.height = preview_img.naturalHeight;
    //applying user selected filters
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (rotate !== 0) {
        ctx.rotate(rotate * Math.PI/180);
    }
    ctx.scale(fliphorizontal, flipvertical);
    ctx.drawImage(preview_img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click()
}

//executing the functions
choose_img_btn.addEventListener("click", () => fileinput.click());
fileinput.addEventListener("change", loadimage);
reset_filter.addEventListener("click", reset);
document.querySelector('.slider input').addEventListener("input", update_filter);
save_image.addEventListener("click", save);
}
