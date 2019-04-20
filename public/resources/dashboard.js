
$(function () {


    $('#completed').on('click', function () {

        $("#habits tr").addClass("hide");

        $(`#habits tr.never-hide`).removeClass("hide");
        $('#habits [type="checkbox"]').each(function (i, chk) {

            if ($(chk).hasClass('latest')) {
                if ($(chk).attr('disabled')) {
                    const habitId = $(chk).attr('data-habit');
                    $(`#habits tr#tr-${habitId}`).removeClass("hide");
                }

            }
        });
    });


    $('#to-comlete').on('click', function () {
        console.log("completed");

        $("#habits tr").addClass("hide");
        $(`#habits tr.never-hide`).removeClass("hide");

        $('#habits [type="checkbox"]').each(function (i, chk) {
            if ($(chk).hasClass('latest')) {
                if (!($(chk).attr('disabled'))) {
                    const habitId = $(chk).attr('data-habit');
                    $(`#habits tr#tr-${habitId}`).removeClass("hide");
                }
            }

        });
    });

    $('#newHabitFrom').submit(sendNewHabit);

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

    axios.get('')
        .then(async function (response) {
            //console.log(response);
            const data = response.data;

            const date = new Date();
            for (let prop in data) {


                //console.log(data[prop].done);
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

                let format = formatDates(data[prop].done);
                for (let i = 0; i < format.length; i++) {
                    format[i] = format[i] + '<br />';

                }

                const response = await axios.get(`/category/details/${data[prop].categoryId}`);
              //  console.log('response:', response);

                // class="${data[prop].categoryId}
                $('#habits tr:last').after(` <tr id="tr-${data[prop]._id}" class="${data[prop].categoryId}">
            <td>${data[prop].name}</td>
            <td>${response.data.name}</td>
            <td id="done-${data[prop]._id}">${format.join("")}</td>
            <td>
             <div class="form-check form-check-inline">
                <input class="form-check-input mark-done" type="checkbox" data-timestamp="${getDate(date, 3).getTime()}" data-habit="${data[prop]._id}" id="inlineCheckbox1-${data[prop]._id}" value="option1" >
                <label class="form-check-label" for="inlineCheckbox1-${data[prop]._id}">${days[getDate(date, 3).getDay()]}</label>
                <input class="form-check-input mark-done" type="checkbox" data-timestamp="${getDate(date, 2).getTime()}" data-habit="${data[prop]._id}" id="inlineCheckbox2-${data[prop]._id}" value="option2" >
                <label class="form-check-label" for="inlineCheckbox2-${data[prop]._id}">${days[getDate(date, 2).getDay()]}</label>
                <input class="form-check-input mark-done" type="checkbox" data-timestamp="${getDate(date, 1).getTime()}" data-habit="${data[prop]._id}" id="inlineCheckbox3-${data[prop]._id}" value="option3" >
                <label class="form-check-label" for="inlineCheckbox3-${data[prop]._id}">${days[getDate(date, 1).getDay()]}</label>
                <input class="form-check-input mark-done latest" type="checkbox" data-timestamp="${new Date().getTime()}" data-habit="${data[prop]._id}" id="inlineCheckbox4-${data[prop]._id}" value="option4" >
                <label class="form-check-label" for="inlineCheckbox4-${data[prop]._id}">${days[date.getDay()]}</label>
             </div>
            </td>
            <td>
                <button type="button" class="btn btn-secondary deleteButton" habitId="${data[prop]._id}">delete</button>
            </td>
        </tr>`);

                //  console.log(new Date(data[prop].done[1]).getDay());
                //console.log("NEW ENTRY");
                for (let date2 of data[prop].done) {
                    //console.log(date2);
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

    $('#habits').on('click', '.deleteButton', event => {

       // console.log("clicked");
        const habitId = event.target.getAttribute('habitId');
      //  console.log(event.target.getAttribute('habitId'));
        event.preventDefault();

        $('#tr-' + habitId).remove();

        axios.delete('/habitsPerUser/' + habitId + '/delete')
            .then(function (response) {

             //   console.log(response);
                // window.location = "/dashboard";

            }).catch(function (error) {
                console.log(error);

            }
        );

        axios.delete('user/deleteHabit/' + habitId)
            .then(function (response) {
            //    console.log(response);
                window.location = "/dashboard";
            })
            .catch(function (error) {
                console.log(error);

            });

    });


    $('#habits').on('click', '.mark-done', function (event) {

       // console.log("habits");
        event.target.setAttribute('disabled', 'disabled');

        const habitId = event.target.getAttribute('data-habit');
        axios.put('/habitsperuser/' + habitId + '/update', {
            done: event.target.getAttribute('data-timestamp')
        })
            .then(function (response) {

                //console.log(event.target.getAttribute('data-timestamp'));

                let newDate = formatDate(new Date(parseInt(event.target.getAttribute('data-timestamp'))));
                $(`#done-${habitId}`).append(newDate+'<br/>');


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

async function sendNewHabit(event) {

    event.preventDefault();
   // console.log("submitted");

    const habitName = $("#habitName").val();
    const category = $("#category").val();

   // console.log('log:', habitName, category);

    axios.post('/habitsPerUser/create', {habitName, category})
        .then(function (response) {
           // console.log("saved");
           // console.log(response);
            window.location = "/dashboard";

        }).catch(function (error) {
            console.log(error);

        }
    );
}
