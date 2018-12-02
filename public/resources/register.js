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

        console.log(username, password);

        axios.post('/register', {name, surname, username, password, confirmPassword})
            .then(function (response) {

                console.log(response);
                window.location = "/dashboard";

            }).catch(function (error) {

                console.log(error.response.status);

                // if(error === 401)
                // {
                //     //wyświetlenie info o błędzie
                //     $('.register-error').removeClass('hide')
                //     console.log(error);
                // }
                //

            }
        );

    });


});