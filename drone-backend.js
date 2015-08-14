var Cylon = require('cylon');
var bot;

// Initialise the robot
Cylon.robot()
    .connection("ardrone", {
        adaptor: 'ardrone',
        port: '192.168.1.1'
    })
    .device("drone", {
        driver: "ardrone",
        connection: "ardrone"
    })
    .on("ready", fly);
    
// Fly the bot
function fly(robot) {
    bot = robot;
    bot.drone.config('general:navdata_demo', 'TRUE');

    /*bot.nav.on("navdata", function(data) {
        // console.log(data);
    });

    bot.nav.on("altitudeChange", function(data) {
        console.log("Altitude:", data);
        if (altitude > 1.5) {
            bot.drone.land();
        }
    });

    bot.nav.on("batteryChange", function(data) {
        console.log("Battery level:", data);
    });*/

    bot.drone.disableEmergency();
    bot.drone.ftrim();

    bot.drone.takeoff();

    after(2*1000, function() {
        bot.drone.forward(0.2);
    });

    after(5*1000, function() {
        bot.drone.forward(0);
    });

    after(6*1000, function() {
        bot.drone.back(0.2);
    });

    after(9*1000, function() {
        bot.drone.back(0);
    });

    after(10*1000, function() {
        bot.drone.land();
    });
    after(15*1000, function() {
        bot.drone.stop();
    });
}

Cylon.start();