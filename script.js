const links = document.querySelectorAll(".navbar > nav > ul > li");
const cards = document.querySelectorAll(".card");

[...links].map((link, index) => {
  link.addEventListener("click", () => onLinkClick(link, index), false);
});

const onLinkClick = (link, currentIndex) => {
  const selectedItem = link.getAttribute("name");
  cards.forEach((card) => {
    card.classList.remove("active");
  });
  // const currentCard = [...cards].find((card) =>
  //   card.classList.contains(selectedItem)
  // );

  const currentCard = [...cards].find((card) =>
    Object.keys(card.dataset).includes(selectedItem)
  );
  currentCard.classList.add("active");
  highLightSelectedLink(currentIndex);
};

const highLightSelectedLink = (currentIndex) => {
  links.forEach((link) => {
    link.classList.remove("selectedLink");
  });
  links[currentIndex].classList.add("selectedLink");
};
/*Submit*/
jQuery("#rsvpForm").submit(function(e){
  e.preventDefault();
});

function sendConfirmation(form) {
  fields = form.elements;
  const data = {};
  jQuery("#rsvpForm :input").each(function(){
    var input = $(this); // This is the jquery object of the input, do what you will
       data[input[0].name] = input[0].value;
   });

  jQuery.post(
    {
      url: 'https://jessicaeroberto.it/administration/ag-wedding/confirmation',
      headers: {
        Authorization: 'Bearer cbb116f8b9708269d7e6339c13101d00d0caec84442e1e46e0861b2d61fef2b2'
      },
      contentType: "application/json",
      dataType: 'json',
      data: JSON.stringify(data)
  })
    .done(
      (response)=>{console.log(response)}
    );
}