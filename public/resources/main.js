$(function () {

    // axios.get('/user/isLogged').then(function (response) {
    //         console.log(response);
    //     }
    // ).catch(error)(
    //     console.log(error)
    // );

    axios.get('/user/userList')
        .then(function (response) {

            const data = response.data;
            for (let prop in data) {
                var userHabits = [];
                for (let habit in data[prop].habitsPerUserId) {
                    //console.log('habit ' + data[prop].habitsPerUserId[habit]);

                    axios.get('habitsPerUser/details/' + data[prop].habitsPerUserId[habit])
                        .then(function (response) {
                            var name = response.data.name;
                            //console.log(name);
                            userHabits.push(name);
                            //console.log(userHabits);

                            $('#users tr:last').after(` <tr>
                                <td>${data[prop]._id}</td>
                            <td>${data[prop].username}</td>
                            <td>${data[prop].name}</td>
                            <td>${data[prop].surname}</td>
                            <td>${name}</td>
                            </tr>`);

                        });
                }
            }

        });

    axios.get('/habitsPerUser/habitsList')
        .then(function (response) {
            //console.log(response);
            const data = response.data;

            // console.log(data);
            date = new Date();
            for (let prop in data) {

                //console.log(data[prop].done);
                var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

                let format = formatDates(data[prop].done);
                for (var i = 0; i < format.length; i++) {
                    format[i] = format[i] + '<br />';

                }

                $('#habits tr:last').after(` <tr>
            <td>${data[prop]._id}</td>
            <td>${data[prop].name}</td>
            <td>${data[prop].categoryId}</td>
            <td id="done-${data[prop]._id}">${format.join("")}</td>
            <td>
             <div class="form-check form-check-inline">
                <input class="form-check-input mark-done" type="checkbox" data-timestamp="${getDate(date, 3).getTime()}" data-habit="${data[prop]._id}" id="inlineCheckbox1-${data[prop]._id}" value="option1" >
                <label class="form-check-label" for="inlineCheckbox1-${data[prop]._id}">${days[getDate(date, 3).getDay()]}</label>
                <input class="form-check-input mark-done" type="checkbox" data-timestamp="${getDate(date, 2).getTime()}" data-habit="${data[prop]._id}" id="inlineCheckbox2-${data[prop]._id}" value="option2" >
                <label class="form-check-label" for="inlineCheckbox2-${data[prop]._id}">${days[getDate(date, 2).getDay()]}</label>
                <input class="form-check-input mark-done" type="checkbox" data-timestamp="${getDate(date, 1).getTime()}" data-habit="${data[prop]._id}" id="inlineCheckbox3-${data[prop]._id}" value="option3" >
                <label class="form-check-label" for="inlineCheckbox3-${data[prop]._id}">${days[getDate(date, 1).getDay()]}</label>
                <input class="form-check-input mark-done" type="checkbox" data-timestamp="${new Date().getTime()}" data-habit="${data[prop]._id}" id="inlineCheckbox4-${data[prop]._id}" value="option4" >
                <label class="form-check-label" for="inlineCheckbox4-${data[prop]._id}">${days[date.getDay()]}</label>
             </div>
            </td>
        </tr>`);

                //  console.log(new Date(data[prop].done[1]).getDay());
                //console.log("NEW ENTRY");
                for (let date2 of data[prop].done) {
                    console.log(date2);
                    for (let i = 1; i <= 4; i++) {
                        //console.log(new Date(date2).getDay());
                        //console.log(getDate(date, (4 - i)).getDay());

                        const checkbox = document.getElementById(`inlineCheckbox${i}-${data[prop]._id}`);

                        if ((new Date(date2).getDate() === getDate(date, (4 - i)).getDate()) && (new Date(date2).getMonth() === getDate(date, (4 - i)).getMonth())) {
                            //console.log("MATCH");

                            checkbox.checked = true;
                            checkbox.disabled = true;
                        }
                    }
                }


            }
        });

    $('#habits').on('click', '.mark-done', function (event) {
        //console.log(event.target.getAttribute('data-habit'));
        //console.log(event.target.getAttribute('data-timestamp'));


        event.target.setAttribute('disabled', 'disabled');

        var habitId = event.target.getAttribute('data-habit');
        axios.put('/habitsperuser/' + habitId + '/update', {
            done: event.target.getAttribute('data-timestamp')
        })
            .then(function (response) {

                //console.log(event.target.getAttribute('data-timestamp'));

                let newDate = formatDate(new Date(parseInt(event.target.getAttribute('data-timestamp'))));
                $(`#done-${habitId}`).append(newDate);


            });

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
