const FLOW_STATUS_THRESHOLD = 0.5;

/*
    This segment of code refreshes every 1000ms (1 second)

    It is used to facilitate constant reading of any new data, and correspondingly displaying them on the GUI.
*/
var intervalId = window.setInterval(function(){
  // main get function, for receiving data from data.csv file
  $.get('data.csv', function(data) {
                        // Gets the raw input and converts it into the contents of an html element, which allows us
                        // to manipulate the string
                        var outputText = String(data);
                        $("#serialReadBuffer").html(outputText);

                        // String operations to get the string into a more usable form
                        var html = document.getElementById('serialReadBuffer').innerHTML.split(/\r?\n/);
                        outputText = (html[html.length - 2]);
                        let otString = "" + outputText;

                        var t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,t11,t12,t13,t14,t15,f1,f2,f3,sr1;
                        var p1_status, p2_status, p3_status;

                        // Cutting up the line which contains data for every sensor, into integers representing the
                        // data of every specific sensor.
                        if (otString.length >= 245)
                        {
                            otString = otString.slice(20);
                            var otArray = otString.split(", ");
                            let arLen = otArray.length;
                            for (var i = 0; i < arLen; i++)
                            {
                                let temp = otArray[i].split(":");
                                let a = temp[0];
                                let b = temp[1];
                                switch (a)
                                {
                                    case "T1":
                                        t1 = b;
                                        break;
                                    case "T2":
                                        t2 = b;
                                        break;
                                    case "T3":
                                        t3 = b;
                                        break;
                                    case "T4":
                                        t4 = b;
                                        break;
                                    case "T5":
                                        t5 = b;
                                        break;
                                    case "T6":
                                        t6 = b;
                                        break;
                                    case "T7":
                                        t7 = b;
                                        break;
                                    case "T8":
                                        t8 = b;
                                        break;
                                    case "T9":
                                        t9 = b;
                                        break;
                                    case "T10":
                                        t10 = b;
                                        break;
                                    case "T11":
                                        t11 = b;
                                        break;
                                    case "T12":
                                        t12 = b;
                                        break;
                                    case "T13":
                                        t13 = b;
                                        break;
                                    case "T14":
                                        t14 = b;
                                        break;
                                    case "T15":
                                        t15 = b;
                                        break;
                                    case "F1":
                                        f1 = b;
                                        break;
                                    case "F2":
                                        f2 = b;
                                        break;
                                    case "F3":
                                        f3 = b;
                                        break;
                                    case "SR1":
                                        sr1 = b;
                                        break;
                                    default:
                                }
                            }
                         
                            if (f1 > FLOW_STATUS_THRESHOLD)
                            {
                                p1_status = true;
                            } else
                            {
                                p1_status = false;
                            }

                            if (f2 > FLOW_STATUS_THRESHOLD)
                            {
                                p2_status = true;
                            } else
                            {
                                p2_status = false;
                            }

                            if (f3 > FLOW_STATUS_THRESHOLD)
                            {
                                p3_status = true;
                            } else
                            {
                                p3_status = false;
                            }
                        }

                        document.getElementById('t-1').value = t1;
                        document.getElementById('t-2').value = t2;
                        document.getElementById('t-3').value = t3;
                        document.getElementById('t-4').value = t4;
                        document.getElementById('t-5').value = t5;
                        document.getElementById('t-6').value = t6;
                        document.getElementById('t-7').value = t7;
                        document.getElementById('t-8').value = t8;
                        document.getElementById('t-9').value = t9;
                        document.getElementById('t-10').value = t10;
                        document.getElementById('t-11').value = t11;
                        document.getElementById('t-12').value = t12;
                        document.getElementById('t-13').value = t13;
                        document.getElementById('t-14').value = t14;
                        document.getElementById('t-15').value = t15;

                        document.getElementById('sr-1').value = sr1;

                        document.getElementById('f-1').value = f1;
                        document.getElementById('f-2').value = f2;
                        document.getElementById('f-3').value = f3;

                       if (p1_status == 0)
                       {
                           document.getElementById('p1_status_indicator').innerHTML = "Status: Off";
                           document.getElementById('p1_status_indicator').style.backgroundColor = "RED";
                       } else if (p1_status == 1)
                       {
                           document.getElementById('p1_status_indicator').innerHTML = "Status: On";
                           document.getElementById('p1_status_indicator').style.backgroundColor = "GREEN";
                       }

                       if (p2_status == 0)
                       {
                           document.getElementById('p2_status_indicator').innerHTML = "Status: Off";
                           document.getElementById('p2_status_indicator').style.backgroundColor = "RED";
                       } else if (p2_status == 1)
                       {
                           document.getElementById('p2_status_indicator').innerHTML = "Status: On";
                           document.getElementById('p2_status_indicator').style.backgroundColor = "GREEN";
                       }

                       if (p3_status == 0)
                       {
                           document.getElementById('p3_status_indicator').innerHTML = "Status: Off";
                           document.getElementById('p3_status_indicator').style.backgroundColor = "RED";
                       } else if (p3_status == 1)
                       {
                           document.getElementById('p3_status_indicator').innerHTML = "Status: On";
                           document.getElementById('p3_status_indicator').style.backgroundColor = "GREEN";
                       }

                        document.getElementById('serialReadBuffer').innerHTML = "";

                    }, 'text');

}, 1000);

//document.querySelector("csv_raw_download_button").addEventListener("click", function () {
//
//});

/*
const btn = document.querySelector("button"); //temporary LED button
var LED1Activated = 0; //0 is off, 1 is on

//Event listener for LED button, toggles LED by sending appropriate signal over to Arduino
btn.addEventListener("click", function () {
        var message = '';
        if (LED1Activated == 0)
        {
            message = 'activate LED';
            LED1Activated = 1;
        } else
        {
            message = '';
            LED1Activated = 0;
        }

        //Post command to python webserver
        $.post('http://localhost:8000', { message: message }, function(data) {
            console.log(data);
        });
});
*/