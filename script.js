var json = {};
var data1 = {};
var data2 = {};
var data3 = {};
var data4 = {};

async function load() {
    let url = 'data.json';
    json = await (await fetch(url)).json();
    console.log(json);

    receivedData = json.newCases;
    let cases = 0;
    for (let i = 0; i < json.newCases.length; i++) {
        cases = cases + json.newCases[i];
    };
    cases = cases + 1;
    document.getElementById('cases').innerHTML = cases;
    document.getElementById('deaths').innerHTML = json.deaths;
    document.getElementById('recoveries').innerHTML = json.recoveries;
    document.getElementById('daily').innerHTML = "+" + json.newCases[json.newCases.length - 1];
    document.getElementById('refresh').innerHTML = json.refresh;

    // document.getElementById(1).innerHTML = json.woj.dolnośląskie;
    // document.getElementById(2).innerHTML = json.woj.kujawskopomorskie;
    // document.getElementById(3).innerHTML = json.woj.lubelskie;
    // document.getElementById(4).innerHTML = json.woj.lubuskie;
    // document.getElementById(5).innerHTML = json.woj.łódzkie;
    // document.getElementById(6).innerHTML = json.woj.małopolskie;
    // document.getElementById(7).innerHTML = json.woj.mazowieckie;
    // document.getElementById(8).innerHTML = json.woj.opolskie;
    // document.getElementById(9).innerHTML = json.woj.podkarpackie;
    // document.getElementById(10).innerHTML = json.woj.podlaskie;
    // document.getElementById(11).innerHTML = json.woj.pomorskie;
    // document.getElementById(12).innerHTML = json.woj.śląskie;
    // document.getElementById(13).innerHTML = json.woj.świętokrzyskie;
    // document.getElementById(14).innerHTML = json.woj.warmińskomazurskie;
    // document.getElementById(15).innerHTML = json.woj.wielkopolskie;
    // document.getElementById(16).innerHTML = json.woj.zachodniopomorskie;

    let ctx1 = document.getElementById('trajektoria');
    data1 = {
        datasets: [{
                backgroundColor: '#ff4081',
                borderColor: '#ff4081',
                borderWidth: 3,
                fill: false,
                pointRadius: 4,
                pointRadiusHover: 4,
                pointBorderWidth: 0,
                data: [],
            }, {
                backgroundColor: '#ffc300',
                borderColor: '#ffc300',
                borderWidth: 2,
                fill: false,
                pointRadius: 0,
                pointRadiusHover: 4,
                pointBorderWidth: 0,
                data: [],
            },
            {
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 3,
                fill: false
            }
        ],
        labels: []
    };
    let options = {
        responsive: true,
        legend: {
            display: false
        },
        tooltips: {
            mode: 'index',
            intersect: true,
        },
        scales: {
            xAxes: [{
                type: 'logarithmic',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Wszystkie potwierdzone przypadki'
                },
                ticks: {
                    callback: function (value, index, values) {
                        if (value == 10) return 10;
                        else if (value == 100) return 100;
                        else if (value == 1000) return "1K";
                        else if (value == 10000) return "10K";
                        else if (value == 100000) return "100K";
                        else if (value == 1000000) return "1M";
                    }
                }
            }],
            yAxes: [{
                display: true,
                type: 'logarithmic',
                scaleLabel: {
                    display: true,
                    labelString: 'Nowe potwierdzone przypadki'
                },
                ticks: {
                    callback: function (value, index, values) {
                        return value;
                    }
                }
            }]
        }
    };

    function renderChart1() {
        data1.datasets[0].data[0] = {
            x: receivedData[0],
            y: receivedData[0]
        }

        for (let i = 1; i < receivedData["length"]; i++) {
            data1.datasets[0].data[i] = {
                x: receivedData[i] + data1.datasets[0].data[i - 1].x,
                y: receivedData[i]
            }
        }

        // linia trendu
        for (let i = 0; i < receivedData["length"]; i++) {
            data1.datasets[1].data[i] = {
                x: data1.datasets[0].data[i].x,
                y: 0.8683 * Math.pow(data1.datasets[0].data[i].x, 0.7418)
            };
        }

        let myChart = new Chart(ctx1, {
            type: 'line',
            data: data1,
            options: options
        });
    }
    renderChart1();

    let ctx2 = document.getElementById('wzrost');
    data2 = {
        datasets: [{
                backgroundColor: '#ff4081',
                borderColor: '#ff4081',
                borderWidth: 3,
                fill: false,
                pointRadius: 4,
                pointRadiusHover: 4,
                pointBorderWidth: 0,
                data: [],
            }, {
                backgroundColor: '#ffc300',
                borderColor: '#ffc300',
                borderWidth: 2,
                fill: false,
                pointRadius: 0,
                pointRadiusHover: 4,
                pointBorderWidth: 0,
                data: [],
            },
            {
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 3,
                fill: false
            }
        ],
        labels: []
    };
    let options2 = {
        responsive: true,
        legend: {
            display: false
        },
        tooltips: {
            mode: 'index',
            intersect: true,
        },
        scales: {
            xAxes: [{
                display: true,
                type: 'linear',
                scaleLabel: {
                    display: true,
                    labelString: 'Liczba dni'
                }
            }],
            yAxes: [{
                display: true,
                type: 'linear',
                scaleLabel: {
                    display: true,
                    labelString: 'Ilość potwierdzonych przypadków'
                }
            }]
        }
    };

    function renderChart2() {

        for (let i = 0; i < receivedData.length; i++) {
            data2.datasets[0].data[i] = {
                x: i + 1,
                y: data1.datasets[0].data[i]["x"]
            }
        }

        let myChart = new Chart(ctx2, {
            type: 'line',
            data: data2,
            options: options2
        });
    }
    renderChart2();


    let ctx3 = document.getElementById('nowe');
    data3 = {
        datasets: [{
                backgroundColor: '#ff4081',
                borderColor: '#ff4081',
                borderWidth: 3,
                fill: false,
                pointRadius: 4,
                pointRadiusHover: 4,
                pointBorderWidth: 0,
                data: [],
            }, {
                backgroundColor: '#ffc300',
                borderColor: '#ffc300',
                borderWidth: 2,
                fill: false,
                pointRadius: 0,
                pointRadiusHover: 4,
                pointBorderWidth: 0,
                data: [],
            },
            {
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 3,
                fill: false
            }
        ],
        labels: []
    };
    let options3 = {
        responsive: true,
        legend: {
            display: false
        },
        tooltips: {
            mode: 'index',
            intersect: true,
        },
        scales: {
            xAxes: [{
                display: true,
                type: 'linear',
                scaleLabel: {
                    display: true,
                    labelString: 'Liczba dni'
                }
            }],
            yAxes: [{
                display: true,
                type: 'linear',
                scaleLabel: {
                    display: true,
                    labelString: 'Ilość nowych potwierdzonych przypadków'
                }
            }]
        }
    };

    function renderChart3() {

        for (let i = 0; i < receivedData.length; i++) {
            data3.datasets[0].data[i] = {
                x: i + 1,
                y: receivedData[i]
            }
        }

        for (let i = 0; i < receivedData.length; i++) {
            data3.datasets[1].data[i] = {
                x: i + 1,
                y: 0.4534 * Math.pow(data3.datasets[0].data[i].x, 2) - 1.6261 * data3.datasets[0].data[
                    i].x + 4.4917
            }
        }

        let myChart = new Chart(ctx3, {
            type: 'line',
            data: data3,
            options: options3
        });
    }
    renderChart3();

}
load();