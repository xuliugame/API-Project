let proxy =`proxy.php`

//handle user submit contact info
function handleSubmit(){
    //jquery plugin to validate form
    let valid = $('form').valid();
    if (!valid){
        // invalid alert
        $.alert({
            title: 'Warning!',
            theme: 'light',
            type:'warning',
            content: 'Invalid Input!',
        });
    }else {
        // submit
        $.ajax({
            method:'post',
            url: `${proxy}`,
            dataType:'json',
            data:{
                path:'/contactForm/',
                message:$('#message').val(),
                phone:$('#phone').val(),
                name:$('#name').val(),
                email:$('#email').val(),
                success:function (resp) {
                    $.alert({
                        title: 'Success!',
                        theme: 'light',
                        type:'success',
                        content: 'Successfully Submit!',
                    });
                }
            },
            async: true,
        })
    }

}

// Check for click events on the navbar burger icon
$(".navbar-burger").click(function() {

    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");

});