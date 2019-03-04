$(async function () {


    await axios.get('/habitsPerUser/topCategories')
        .then(function (response) {
            var i = 0;
            console.log('response.data:', response.data);
            for (i = 0; i < 3; i++) {
                $('#top-categories tr:last').after(` <tr>
           
             <td> <span style="font-size: x-large">${i + 1}.</span> <span style="font-size: large">${response.data[i][0]}</span></td>
            
            
        </tr>`);
            }
        })
        .catch(error => {
            console.log(error);
        });


    await axios.get('/database/userCount')
        .then(function (response) {

            console.log(response.data.count);

            $('#community-stat p:last').after(`
          <p>  We have <span style="font-size: xx-large">${response.data.count-1}</span> users</p>`);
        })
        .catch(error => {
            console.log(error);
        });

    await axios.get('/database/habitCount')
        .then(function (response) {

            console.log(response.data.count);

            $('#community-stat p:last').after(`
          <p style="padding-left: 640px"> achieving <span style="font-size: xx-large"> ${response.data.count}</span> incredible goals</p>`);

        })
        .catch(error => {
            console.log(error);
        });

    await axios.get('/database/categoryCount')
        .then(function (response) {

            console.log(response.data.count);

            $('#community-stat p:last').after(`
          <p  style="padding-left: 720px"> in <span style="font-size: xx-large">${response.data.count}</span> different categories!</p>`);
        })
        .catch(error => {
            console.log(error);
        });


});
