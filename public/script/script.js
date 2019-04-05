
if (document.getElementsByClassName("mySlides").length > 0 ){
  var slideIndex = 0;
  showSlides();

  function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    

    slides[slideIndex-1].style.display = "block";  
    
    setTimeout(showSlides, 2000); // Change image every 2 seconds
    
  }
}


// // ---
var counter = 1;
showSlidesNext(counter);

function plusSlides(n) {
  showSlidesNext(counter += n);
}

function currentSlide(n) {
  showSlidesNext(counter = n);
}

function showSlidesNext(n) {
  var i;
  var slides = document.getElementsByClassName("myImageSlides");
  if (n > slides.length) {counter = 1}    
  if (n < 1) {counter = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  console.log("run hre");
  slides[counter-1].style.display = "block";  

}