const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
};


function create_calandar(dateObj) {
    let calandar = $('.calandar-table');
    let month_year = $('#month_year');
    let month = dateObj.getMonth();
    let year = dateObj.getFullYear()
    let todayDate = new Date().getDate();
    let todayMonth = new Date().getMonth();
    let firstDay = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1).getDay();
    let lastDate = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0).getDate();

    $('#current_month').val(month);
    $('#current_year').val(year);

    month_year.text('');
    month_year.append(String(months[month]) + '<br><span style="font-size:18px">' + String(year) + '</span>');

    let day = 1;
    let foundMatchingDay = false;

    for(let i = 0; i < 6; i++) {
        let row = "<tr>"
        for(let j = 0; j < 7; j++) {
            if(foundMatchingDay) {
                day++;
                if(day <= lastDate) {
                    let td = ''
                    if(day === todayDate & todayMonth === month) {
                        td = '<td class = "today">'
                    } else {
                        td = '<td>'
                    }
                    row += td + String(day) + '</td>';
                } else {
                    row += '<td></td>';
                }
            } else {
                if(j === firstDay) {
                    foundMatchingDay = true;
                    let td = ''
                    if(day === todayDate & todayMonth === month) {
                        td = '<td class = "today">'
                    } else {
                        td = '<td>'
                    }
                    row += td + String(day) + '</td>';
                } else {
                    row += '<td></td>';
                }
            }
        }
        calandar.append(row);
    }
}


$( document ).ready(function() {
    let dateObj = new Date();
    create_calandar(dateObj);

    $('.next').on('click', function() {
        let next_month = parseInt($('#current_month').val()) + 1;
        let next_year = parseInt($('#current_year').val());

        if(next_month > 11) {
            next_month = 0;
            next_year++;
        } 

        $(".calandar-table").find("tr:gt(0)").remove();
        create_calandar(new Date(next_year, next_month, 1));
    });

    $('.prev').on('click', function() {
        let next_month = parseInt($('#current_month').val()) - 1;
        let next_year = parseInt($('#current_year').val());

        if(next_month < 0) {
            next_month = 11;
            next_year--;
        } 

        $(".calandar-table").find("tr:gt(0)").remove();
        create_calandar(new Date(next_year, next_month, 1));
    })
});
