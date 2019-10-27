var appointText = "";
var appointTime = "";
var currentDate;
var currentTime;
var currentContainer;
var tempArray = [];
var storedAppointments;
var returnedAppointments;



$(window).on("load", function () {
    currentDate = moment().format("dddd MMM Do YYYY, h:mm a");
    $("#currentDay").append(currentDate);
    currentTime = moment().format("H");

    function renderAppointments() {
        storedAppointments = JSON.parse(localStorage.getItem("appointments"));
        if (storedAppointments !== null) {
            for (i = 0; i < storedAppointments.length; i++) {
                returnedAppointments = storedAppointments[i];
                details = returnedAppointments.details;
                timeIndex = returnedAppointments.time;
                timeIndex = timeIndex.replace(":00", '');
                if (details !== null) {
                    $("#" + timeIndex).children('div').children('div').children('textarea').val(details);
                }
            }
        }
    }

    renderAppointments();

    for (i = 0; i <= 23; i++) {
        CurrentContainer = i;
        if (currentTime == i) {
            $('#' + CurrentContainer).css("background-color", "red");
        }
        else if (currentTime > i) {
            $('#' + CurrentContainer).css("background-color", "grey");
        }
        else {
            $('#' + CurrentContainer).css("background-color", "green");
        }
    }
})



$(".submitButton").click(function () {
    appointText = $(this).parent('div').children('div').children('textarea').val();
    appointTime = $(this).parent('div').parent().attr("id");
    appointment = {
        time: appointTime,
        details: appointText
    }
    tempArray = JSON.parse(localStorage.getItem("appointments"));
    if (tempArray === null) {
        localStorage.setItem('appointments', JSON.stringify([{ time: appointTime, details: appointText }]));
    }
    else {
        tempArray.push(appointment);
        localStorage.setItem("appointments", JSON.stringify(tempArray));

    }
    $(this).parent('div').children('div').children('textarea').replaceWith($('<p>' + appointText + '</p>'));
})