(function() {
    const minuteStrings = [
        "",
        "fem över ",
        "tio över ",
        "kvart över ",
        "tjugo över ",
        "fem i halv ",
        "halv ",
        "fem över halv ",
        "tjugo i ",
        "kvart i ",
        "tio i ",
        "fem i ",
    ];

    const hourStrings = [
        "tolv",
        "ett",
        "två",
        "tre",
        "fyra",
        "fem",
        "sex",
        "sju",
        "åtta",
        "nio",
        "tio",
        "elva",
    ];

    function timeOfDay(hour) {
        if(hour == 12) {
            return ", lunch!"
        }
        if(hour < 3 || hour > 22) {
            return " på natten.";
        }
        if(hour < 11) {
            return " på morgonen.";
        }
        if(hour < 18) {
            return " på dagen.";
        }
        return " på kvällen.";
    }

    function fuzzTime(prefixString, now) {
        if(hourStrings.length != 12 && hourStrings.length != 24) {
            throw new RangeError("hourStrings must be of length 12 or 24");
        }

        var hours = now.getHours();
        var minutes = now.getMinutes();

        const minuteIncrementCount = minuteStrings.length;
        const minuteIncrementSize = 60 / minuteIncrementCount;

        // Add the minute increment to the time so our fuzzy output
        // is never behind
        minutes += minuteIncrementSize;
        if(minutes > 59) {
            // Deal with overflow around the hour switch
            minutes -= 60;
            hours += 1;
        }

        // Split the time into 5-minute increments
        const minuteIndex = Math.floor(minutes / minuteIncrementSize);

        if(minuteIndex > 4) {
            // We refer to the coming hour when we speak times
            // after 20 past
            hours += 1;
        }

        var hourIndex = hours;

        if(hourStrings.length == 12 && hours >= 12) {
            hourIndex -= 12;
        } else if(hourStrings.length == 24 && hours >= 24) {
            hourIndex -= 24
        }

        const hourString = hourStrings[hourIndex];
        const minuteString = minuteStrings[minuteIndex];
        const timeOfDayString = timeOfDay(hours);

        return `${prefixString} ${minuteString}${hourString}`
            + timeOfDayString;
    }

    function getMsToUpdate(now) {
        const nextMinute = new Date();
        nextMinute.setSeconds(60, 0);
        return nextMinute - now;
    }

    document.addEventListener('DOMContentLoaded', (event) => {
        const prefix = "Klockan är";
        const targetElement = document.getElementById('time');

        function updateAndSetTimer(now) {
            targetElement.textContent = fuzzTime(prefix, now);
            const timeout = getMsToUpdate(now);

            window.setTimeout(() => {
                updateAndSetTimer(new Date());
            }, timeout);
        }

        updateAndSetTimer(new Date());
    });
})();
