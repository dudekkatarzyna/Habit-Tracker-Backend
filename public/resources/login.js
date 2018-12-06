
$(function () {

    $('#sign-up').on('click', function (event) {
        event.preventDefault();

        window.location = "/register";
    });


    $("#login-form").submit(event => {
        event.preventDefault();
        const username = $("#username").val();
        const password = $("#password").val();

        console.log(username, password);
        axios.post('/login', {username, password})
            .then(function (response) {

                console.log(response);
                window.location = "/";

            }).catch(function (error) {


                $('.login-error').removeClass('hide');

                $('#username').val('');
                $('#username').removeClass('valid');
                $('#password').val('');
                $('#password').removeClass('valid');

                console.log(error);

            }
        );

    });


});