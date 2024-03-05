(function() {
    const weekdays = [
        "söndagen",
        "måndagen",
        "tisdagen",
        "onsdagen",
        "torsdagen",
        "fredagen",
        "lördagen",
    ];

    const months = [
        "januari",
        "februari",
        "mars",
        "april",
        "maj",
        "juni",
        "juli",
        "augusti",
        "september",
        "oktober",
        "november",
        "december",
    ];

    const days = [
        "första",
        "andra",
        "tredje",
        "fjärde",
        "femte",
        "sjätte",
        "sjunde",
        "åttonde",
        "nionde",
        "tionde",
        "elfte",
        "tolfte",
        "trettonde",
        "fjortonde",
        "femtonde",
        "sextonde",
        "sjuttonde",
        "artonde",
        "nittonde",
        "tjugonde",
        "tjugoförsta",
        "tjugoandra",
        "tjugotredje",
        "tjugofjärde",
        "tjugofemte",
        "tjugosjätte",
        "tjugosjunde",
        "tjugoåttonde",
        "tjugonionde",
        "trettionde",
        "trettioförsta",
    ];

    function fuzzDate(prefix, now) {
        const weekday = now.getDay();
        const day = now.getDate() - 1; //love the inconsistency
        const month = now.getMonth();

        return `${prefix} ${weekdays[weekday]} den`
            +` ${days[day]} ${months[month]}.`;
    }

    function getMsToMidnight(now) {
        const tomorrow = new Date();
        tomorrow.setHours(24, 0, 0, 0);
        return tomorrow - now;
    }

    document.addEventListener('DOMContentLoaded', (event) => {
        const prefix = "Det är";
        const targetElement = document.getElementById('date');

        function updateAndSetTimer(now) {
            targetElement.textContent = fuzzDate(prefix, now);
            const timeout = getMsToMidnight(now);

            window.setTimeout(() => {
                updateAndSetTimer(new Date());
            }, timeout);
        }

        updateAndSetTimer(new Date());
    });
})();
