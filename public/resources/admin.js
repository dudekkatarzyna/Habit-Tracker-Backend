$(function () {

    $('#newHabitForm').submit(sendNewHabit);

    $('#submitNewHabitForm').click(sendNewHabit);


    $('#food').on('click', function () {
        $("#habits tr.hide").removeClass("hide");
        $("#habits tr").not(".5c054ec40ad31d10dcf96675, .never-hide").addClass("hide");
    });

    $('#skill').on('click', function () {
        $("#habits tr.hide").removeClass("hide");
        $("#habits tr").not(".5c054edb0ad31d10dcf96677, .never-hide").addClass("hide");
    });

    $('#excercise').on('click', function () {
        $("#habits tr.hide").removeClass("hide");
        $("#habits tr").not(".5c054ea146238108a4770b1d, .never-hide").addClass("hide");
    });


    $('#self-care').on('click', function () {
        $("#habits tr.hide").removeClass("hide");
        $("#habits tr").not(".5c054ecf0ad31d10dcf96676, .never-hide").addClass("hide");
    });

    $('#clearFilter').on('click', function () {
        $("#habits tr.hide").removeClass("hide");
    });


    axios.get('/user/userList')
        .then(async function (response) {

            const data = response.data;
            for (let prop in data) {
                const userHabits = [];
                for (let habit in data[prop].habitsPerUserId) {

                    const response = await axios.get('/habitsPerUser/details/' + data[prop].habitsPerUserId[habit]);
                    const name = response.data.name;
                    userHabits.push(name);
                }
                $('#users tr:last').after(` <tr>
                                <td>${data[prop]._id}</td>
                            <td>${data[prop].username}</td>
                            <td>${data[prop].name}</td>
                            <td>${data[prop].surname}</td>
                            <td>${userHabits.join('<br/>')}</td>
                            </tr>`);
            }

        })
        .catch(error => {
            console.log(error);
        });

    axios.get('/habitsPerUser/habitsList')
        .then(async function (response) {
            const data = response.data;
            for (let prop in data) {

                let format = formatDates(data[prop].done);
                for (let i = 0; i < format.length; i++) {
                    format[i] = format[i] + '<br />';

                }

                const response = await axios.get(`/category/details/${data[prop].categoryId}`);

                $('#habits tr:last').after(` <tr id="tr-${data[prop]._id}" class="${data[prop].categoryId}">
            <td>${data[prop].userId}</td>
            <td>${data[prop]._id}</td>
            <td>${data[prop].name}</td>
            <td>${response.data.name}</td>
            <td id="done-${data[prop]._id}">${format.join("")}</td>
        
             <td>
                <button type="button" class="btn btn-secondary deleteButton" habitId="${data[prop]._id}">delete</button>
            </td>
        </tr>`);


            }
        });

    $('#habits').on('click', '.deleteButton', event => {

        console.log("clicked");
        const habitId = event.target.getAttribute('habitId');
        console.log(event.target.getAttribute('habitId'));
        event.preventDefault();

        $('#tr-' + habitId).remove();

        axios.delete('/habitsPerUser/'+habitId+'/delete')
            .then(function (response) {

                console.log(response);
                window.location = "/admin";

            }).catch(function (error) {
                console.log(error);

            }
        );


        axios.delete('user/deleteHabit/'+habitId)
            .then(function (response) {
                console.log(response);
                window.location = "/dashboard";
            })
            .catch(function (error) {
                console.log(error);

            })

    });

});

function getDate(date, daysBefore) {
    return new Date(new Date(date).getTime() - daysBefore * 1000 * 60 * 60 * 24);
}

function formatDate(date) {
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

function formatDates(dates) {
    let newDates = [];
    for (const date of dates) {
        newDates.push(formatDate(new Date(date)));
    }
    return newDates;
}


async function sendNewHabit(event) {

    event.preventDefault();
    console.log("submitted");

    const habitName = $("#habitName").val();
    const category = $("#category").val();

    console.log('log:', habitName, category);

    axios.post('/habitsPerUser/create', {habitName, category})
        .then(function (response) {
            console.log("saved");
            console.log(response);
            window.location = "/admin";

        }).catch(function (error) {
            console.log(error);

        }
    );
}