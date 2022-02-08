let proxy =`proxy.php`
$('#postCont').loading();

$(document).ready(function () {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });

    // pull news from backend api
    $.ajax({
        url: `${proxy}`,
        dataType:'json',
        data:{path:'/news/'},
        async: true,
        success:(resp)=>{
            let postTemplate = resp.older.map(value => `   <div class="post">
                                                                <h1>
                                                                    ${value.title}
                                                                </h1>
                                                                <span>${value.date}</span>
                                                                <p>${value.description}</p>
                                                            </div>`).join("");
            $('#postCont').html(postTemplate)
            $('#postCont').loading('stop');

        }
    });
});