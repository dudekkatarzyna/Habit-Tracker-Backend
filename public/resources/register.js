$(function () {

    $('#sign-in').on('click', function (event) {
        event.preventDefault();

        window.location = "/login";
    });


    $("#register-form").submit(event => {
        event.preventDefault();
        const name = $("#name").val();
        const surname = $("#surname").val();
        const username = $("#username").val();
        const password = $("#password").val();
        const confirmPassword = $("#confirmPassword").val();

       // console.log(username, password);

        axios.post('/register', {name, surname, username, password, confirmPassword})
            .then(function (response) {

               // console.log(response);
                window.location = "/dashboard";

            }).catch(function (error) {

               // console.log(error.response.status);
                switch (error.response.status) {
                    case 416: //password dont match
                        $('.password-error').removeClass('hide');
                        $('#password').val('');
                        $('#password').removeClass('valid');
                        $('#confirmPassword').val('');
                        $('#confirmPassword').removeClass('valid');

                        break;


                    case 406: //user already exists
                        $('#username').val('');
                        $('#username').removeClass('valid');
                        $('#password').val('');
                        $('#password').removeClass('valid');
                        $('#confirmPassword').val('');
                        $('#confirmPassword').removeClass('valid');
                        $('.username-error').removeClass('hide');
                        break;
                }

            }
        );

    });


});