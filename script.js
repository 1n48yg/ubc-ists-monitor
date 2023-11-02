const FLOW_STATUS_THRESHOLD = 0.5;
const CELSIUS_SYMBOL = String.fromCharCode(176) + "C";
const FAHRENHEIT_SYMBOL = String.fromCharCode(176) + "F";

var current_temperature_mode = "celsius";
var temperature_suffix = '';

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

                        var tsensor = new Array(15).fill(0);;
                        var f1,f2,f3,sr1;
                        var p1_status, p2_status, p3_status, heat_pump_status, chiller_status;

                        // Cutting up the line which contains data for every sensor, into integers representing the
                        // data of every specific sensor.
                        if (otString.length >= 220)
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
                                        tsensor[0] = b;
                                        break;
                                    case "T2":
                                        tsensor[1] = b;
                                        break;
                                    case "T3":
                                        tsensor[2] = b;
                                        break;
                                    case "T4":
                                        tsensor[3] = b;
                                        break;
                                    case "T5":
                                        tsensor[4] = b;
                                        break;
                                    case "T6":
                                        tsensor[5] = b;
                                        break;
                                    case "T7":
                                        tsensor[6] = b;
                                        break;
                                    case "T8":
                                        tsensor[7] = b;
                                        break;
                                    case "T9":
                                        tsensor[8] = b;
                                        break;
                                    case "T10":
                                        tsensor[9] = b;
                                        break;
                                    case "T11":
                                        tsensor[10] = b;
                                        break;
                                    case "T12":
                                        tsensor[11] = b;
                                        break;
                                    case "T13":
                                        tsensor[12] = b;
                                        break;
                                    case "T14":
                                        tsensor[13] = b;
                                        break;
                                    case "T15":
                                        tsensor[14] = b;
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

                            // // Heat pump status checking
                            // if (heat pump condition)
                            // {
                                heat_pump_status = true;
                            // } else
                            // {
                            //     heat_pump_status = false;
                            // }
                            //
                            // // Chiller status checking
                            // if (chiller condition)
                            // {
                                chiller_status = true;
                            // } else
                            // {
                            //     chiller_status = false;
                            // }
                        }

                        if (current_temperature_mode == "celsius")
                        {
                            temperature_suffix = CELSIUS_SYMBOL;
                        }

                        for (let i = 0; i < 13; i++)
                        {
                            let htmlID = 't-' + (i + 1);
                            document.getElementById(htmlID).value = tsensor[i] + temperature_suffix;
                        }
                        document.getElementById('t-internal').value = tsensor[13] + temperature_suffix;
                        document.getElementById('t-external').value = tsensor[14] + temperature_suffix;

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

                      if (heat_pump_status == 0)
                      {
                          document.getElementById('heat_pump_status_indicator').innerHTML = "Status: Off";
                          document.getElementById('heat_pump_status_indicator').style.backgroundColor = "RED";
                      } else if (heat_pump_status == 1)
                      {
                          document.getElementById('heat_pump_status_indicator').innerHTML = "Status: On";
                          document.getElementById('heat_pump_status_indicator').style.backgroundColor = "GREEN";
                      }

                      if (chiller_status == 0)
                      {
                          document.getElementById('chiller_status_indicator').innerHTML = "Status: Off";
                          document.getElementById('chiller_status_indicator').style.backgroundColor = "RED";
                      } else if (chiller_status == 1)
                      {
                          document.getElementById('chiller_status_indicator').innerHTML = "Status: On";
                          document.getElementById('chiller_status_indicator').style.backgroundColor = "GREEN";
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