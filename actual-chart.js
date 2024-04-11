const scriptURL = 'https://script.google.com/macros/s/AKfycbxYDZo3tZjFkNM5O96Fjda4dGy9ynHXl4GnQiUMQqXbRdGIf_8MWzznmS1uwTlT_9GFFA/exec'
// to read dropdown values
const roleInitailly = document.getElementById('roles')
const coutryInitially = document.getElementById('countries')
const roleTwo = document.getElementById('roles-2')
const coutryTwo = document.getElementById('countries-2')

const createList = (arr, id) => {
    const fr = document.createDocumentFragment();
    arr.forEach((item) => {
        const option = document.createElement('option');
        option.value = item;
        option.innerText = item;
        fr.appendChild(option);
    })
    const elSelect = document.getElementById(id);
    elSelect.appendChild(fr);

}
const getData = () => {
    fetch(scriptURL, {
        method: 'GET', "Access-Control-Allow-Origin": "*"
    }).then(res => res.json()).then(res => {

        const countries = res.data.countries;
        const roles = res.data.roles;
        createList(countries, 'countries');
        createList(roles, 'roles');
        createList(roles, 'roles-2')
        createList(countries, 'countries-2')
        roleInitailly[0].innerText = 'Role'
        coutryInitially[0].innerText = 'Country'
    });
}

getData();
const graphResult = document.getElementById('graph-result')
const loadingImg = document.getElementById('loading-img')
const initiallyDummyGraph = document.getElementById('initially-dummy-graph')
const dscAvgSal = document.getElementById('not-avg-sal')

let minCtcMonth = []
let maxCtcMonth = []
let minCtcYear = []
let maxCtcYear = []
let medianValue = 0;
// console.log(roleInitailly[0], coutryInitially, 'lll')

const durationChange = document.getElementById('duration')
let duration = 'year'
const yourRole = document.querySelectorAll('.your-role')
const selectedCountry = document.querySelectorAll('.selected-country')

const searchHandler = (event, formId) => {
    event.preventDefault();
    var doneElements = document.querySelectorAll('.w-form-done');
    var failElements = document.querySelectorAll('.w-form-fail');
    var formElements = document.querySelectorAll('form');
    loadingImg.style.display = "flex"
    if (durationChange.checked) {
        duration = 'year'
    } else {
        duration = 'month'
    }
    // Add the 'show' class to each form
    formElements.forEach(function (form) {
        form.classList.add('show');
    });

    // Add the 'hide' class to each element
    doneElements.forEach(function (element) {
        element.classList.add('hide');
    });

    failElements.forEach(function (element) {
        element.classList.add('hide');
    });

    const country = coutryInitially.value;
    const role = roleInitailly.value;


    const formData = new FormData();
    if (formId === 'fForm') {


        graphResult.style.display = 'block';
        dscAvgSal.style.display = 'block';
        initiallyDummyGraph.style.display = 'none'
        document.getElementById('countries-2').value = country;
        document.getElementById('roles-2').value = role;
        formData.append("country", country);
        formData.append("role", role);
        formData.append("time", duration);

        selectedCountry.forEach(item => item.innerText = country)
        yourRole.forEach(item => item.innerHTML = role)
    }
    else {
        formData.append("country", coutryTwo.value);
        formData.append("role", roleTwo.value);
        formData.append("time", duration);

        selectedCountry.forEach(item => item.innerText = coutryTwo.value)
        yourRole.forEach(item => item.innerText = roleTwo.value)
    }


    fetch(scriptURL, { method: 'POST', body: formData, "Access-Control-Allow-Origin": "*" })
        .then(res => res.json())
        .then(res => {
            // console.log(res, 'res')
            const ctc = res.data;
            // console.log(ctc[0].message, 'ttt')
            if (ctc[0].message === 'data not found') {
                document.getElementById('data-not-found').style.display = 'flex';

                //console.log('error')
                return
            }
            else {
                document.getElementById('data-not-found').style.display = 'none';
                minCtcMonth = ctc.map(item => item.minCtcMonth > 0 ? item.minCtcMonth : null);
                // minCtcMonth = ctc.map(item => console.log(item, "minctc"));

                maxCtcMonth = ctc.map(item => item.maxCtcMonth > 0 ? item.maxCtcMonth : null);
                minCtcYear = ctc.map(item => item.minCtcYear > 0 ? item.minCtcYear : null);
                maxCtcYear = ctc.map(item => item.maxCtcYear > 0 ? item.maxCtcYear : null);
                // console.log(maxCtcYear, minCtcYear, ctc, 'ctc');

                if (duration == 'year') {
                    creatChart(minCtcYear, maxCtcYear);
                    getMedian(maxCtcYear)
                    document.getElementById('median-salary').innerText = `$${Number(medianValue.toFixed(2))}`
                }
                else {
                    creatChart(minCtcMonth, maxCtcMonth);
                    getMedian(maxCtcMonth)
                    document.getElementById('median-salary').innerText = `$${Number(medianValue.toFixed(2))}`
                }
            }

        }).catch(err => console.log(err)).finally(() => {
            loadingImg.style.display = "none"
        });
}

// to show popup based on value
let counter = false;

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('fForm').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        const isFormSubmitted = localStorage.getItem("isDemoFormSubmitted")
        if (counter && !isFormSubmitted) {
            onChange()
            return
        }
        searchHandler(event, 'fForm');
        counter = true
    });

    document.getElementById('get-final-data').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        const isFormSubmitted = localStorage.getItem("isDemoFormSubmitted")
        if (counter && !isFormSubmitted) {
            onChange()

            return
        }
        searchHandler(event, 'get-final-data');

    });
});

function creatChart(minCtc, maxCtc) {
    let maxCtcValue = maxCtc.reduce((a, b) => Math.max(a, b), -Infinity);
    var existingChart = Chart.getChart('salaryChart');

    // Destroy the existing chart if it exists
    if (existingChart) {
        existingChart.destroy();
    }

    var data = {
        labels: ['1-4 years', '4-7 years', '7-10 years'],
        datasets: [
            {
                label: 'Min Salary',
                backgroundColor: 'rgba(28, 131, 252, 0.2)',
                borderColor: 'rgba(28, 131, 252, 0.2)',
                borderWidth: 1,
                data: minCtc,

            },
            {
                label: 'Max Salary',
                backgroundColor: 'rgba(28, 131, 252, 1)',
                borderColor: 'rgba(28, 131, 252, 1)',
                borderWidth: 1,
                data: maxCtc
            }
        ]
    };
    // Chart Configuration

    var options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: {
                stacked: false, // Set stacked to false for separate bars
                grid: {
                    drawOnChartArea: true,
                    drawBorder: false,
                },
                border: {
                    dash: [6, 6]
                },
            },
            y: {
                beginAtZero: false,
                display: false,
                min: 0,
                max: maxCtcValue,
                ticks: {
                    // forces step size to be 50 units
                    stepSize: 0 + maxCtcValue / 2
                }
            },
        },
        layout: {
            padding: {
                top: 40,
            }
        },
        plugins: {
            datalabels: {
                color: "#1a204a",
                anchor: 'end',
                align: 'top',

                // formatter: (n) => `$${n.toString().substr(0, 2)}K`,
                formatter: (num) => num ? '$' + (Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'K' : Math.sign(num) * Math.abs(num)) : "",
                font: function (context) {

                    var avgSize = Math.round((context.chart.height + context.chart.width) / 2);
                    var size = Math.round(avgSize / 32);

                    size = size > 12 ? 16 : size; // setting max limit to 12
                    // console.log(size, 's')
                    return {
                        size: size,
                        family: 'Inter, sans-serif',
                    };

                },

            },
            legend: false,
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `$${tooltipItem.formattedValue}`;
                    }
                }
            }
        },
        elements: {
            bar: {
                borderRadius: {
                    topLeft: 10,
                    topRight: 10,
                },
            },
        },
    };
    // Create Chart

    Chart.register(ChartDataLabels);
    var ctx = document.getElementById('salaryChart').getContext('2d');
    var salaryChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options,
    });

}
const time = document.getElementsByClassName('time');

// yearly montly radio button on change
durationChange.addEventListener('change', (e) => {
    // const isFormSubmitted = localStorage.getItem("isDemoFormSubmitted")


    // prevent toggle radio button yearly monthly for toggle form
    // if (!isFormSubmitted) {
    //     onChange()
    //     e.target.checked = !e.target.checked
    //     return
    // }


    // reset active class on radio
    time[0].classList.remove('active')
    time[1].classList.remove('active')

    // if radio is checked then show year value
    if (e.target.checked) {
        document.getElementById('current-duration').innerText ='annual'
        creatChart(minCtcYear, maxCtcYear);
        time[1].classList.add('active')
        getMedian(maxCtcYear);
        document.getElementById('median-salary').innerText = `$${Number(medianValue.toFixed(2))}`;

    } else { // else show monthly value
        console.log('month')
        document.getElementById('current-duration').innerText = 'monthly'
        creatChart(minCtcMonth, maxCtcMonth);
        time[0].classList.add('active')
        getMedian(maxCtcMonth);
        document.getElementById('median-salary').innerText = `$${Number(medianValue.toFixed(2))}`
    }
})

const closePopup = document.getElementById('exitPopup')
const popupClose = document.getElementById('cross-pattern')
const popupForm = document.querySelector('.popup-form')

function onChange() {
    const getSubmittedValue = localStorage.getItem("isDemoFormSubmitted")

    if (!counter || getSubmittedValue) return;
    closePopup.classList.add('visible')

}


// pop close
if (popupClose) {
    popupClose.addEventListener('click', () => {
        closePopup.classList.remove('visible')
    })
}


function getMedian(totalCTC) {
    medianValue = totalCTC.reduce((prev, curr) => prev + curr) / totalCTC.length;

    // console.log(medianValue(list), 'medianValue1')
    // console.log(medianValue, 'medianValue2')
}

function responsiveFonts() {
    if (window.outerWidth > 999) {
        Chart.defaults.font.size = 16;
    };
    if (window.outerWidth < 999 && window.outerWidth > 500) {
        Chart.defaults.font.size = 12;
    };
    if (window.outerWidth < 500) {
        Chart.defaults.font.size = 10;
    };
}
responsiveFonts()
