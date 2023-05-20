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

    const currentCard = [...cards].find((card) =>
        Object.keys(card.dataset).includes(selectedItem)
    );
    currentCard.classList.add("active");
    highLightSelectedLink(currentIndex);

    if (jQuery('aside').hasClass('opened')) {
        toggleSidebar();
    }
};

const highLightSelectedLink = (currentIndex) => {
    links.forEach((link) => {
        link.classList.remove("selectedLink");
    });
    links[currentIndex].classList.add("selectedLink");
};

/**
 * Welcome slide images
 */

const welcome_section = jQuery('.welcome');
if (welcome_section.length) {
    const images = jQuery(welcome_section[0]).find('.image');
    let activeImage = 0;
    jQuery(images[activeImage]).fadeIn(500);
    setInterval(() => {
        const previousImage = images[activeImage];
        activeImage = (activeImage === (images.length - 1)) ? 0 : activeImage + 1;
        slideImage(images[activeImage], previousImage);
    }, 2000);
}

function slideImage(imageIn, imageOut) {
    jQuery(imageOut).fadeOut(500, () => {
        jQuery(imageIn).fadeIn(500);
    });
}

/**
 * RSVP
 */
jQuery('#rsvpForm input').keyup(function () {
    var empty = false;
    jQuery('form input').each(function () {
        if (jQuery(this).val() === '') {
            empty = true;
        }
    });

    if (empty) {
        jQuery('#rsvpButton').attr('disabled', 'disabled');
    } else {
        jQuery('#rsvpButton').removeAttr('disabled');
    }
});
jQuery("#rsvpForm").submit(function (e) {
    e.preventDefault();
});

function sendConfirmation(form) {
    fields = form.elements;
    const data = {};
    jQuery("#rsvpForm :input").each(function () {
        var input = $(this); // This is the jquery object of the input, do what you will

        if (input[0].type === 'checkbox') {
            data[input[0].name] = input[0].checked;
        }
        else{
            data[input[0].name] = input[0].value;
            
        }
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
            (response) => {
                console.log(response);
                // TODO: back to the welcome page
                jQuery('#rsvpForm').hide();
                jQuery('#rsvp-feedback').show();

                setTimeout(() => {
                    jQuery("#rsvpForm :input").each(function () {
                        var input = $(this); // This is the jquery object of the input, do what you will
                        if (input[0].type === 'checkbox') {
                            jQuery(input).prop('checked', false);
                        }
                        else{
                            jQuery(input).val(null);
                        }
                    });

                    jQuery('#rsvp-feedback').fadeOut();
                    jQuery('#rsvpForm').fadeIn();
                }, 1000);
            }
        );
}

/**
 * MOBILE SIDEBAR
 */

function toggleSidebar() {
    if (jQuery('aside').hasClass('opened')) {
        jQuery('#closeSidebarButton').hide();
        jQuery('#sidebarToggleButton').show();
        jQuery('aside').slideUp(200, () => {
            jQuery('aside').removeClass('opened');
        });
    } else {
        jQuery('#closeSidebarButton').show();
        jQuery('#sidebarToggleButton').hide();

        jQuery('aside').slideDown(200, () => {
            jQuery('aside').addClass('opened');
        });
    }
}
