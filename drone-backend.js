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

    after(8*1000, function() {
        bot.drone.forward(0.2);
    });

    after(11*1000, function() { //stop
        bot.drone.forward(0);
    });

    after(11.1*1000, function() {
        bot.drone.back(0.2);
    });

    after(15*1000, function() {//stop
        bot.drone.back(0);
    });

    for(var i=0; i<4;i++){
        after((15.1+4*i)*1000, function() {
            bot.drone.right(0.2);
        });

        after((17+4*i)*1000, function() { //stop
            bot.drone.right(0);
        });
        after((17.1+4*i)*1000, function() {
            bot.drone.left(0.2);
        });

        after((19 + 4 * i)*1000, function() {//stop
            bot.drone.left(0);
        });
    }

    after(31.1*1000, function(){
       bot.drone.clockwise(0.2)
    });

    after(34*1000, function(){
       bot.drone.clockwise(0.2)
    });

    after(31.1*1000, function(){
      bot.drone.anticlockwise(0.2)
    });

    after(34*1000, function(){
       bot.drone.anticlockwise(0.2)
     });

            after(34.1*1000, function() {
        bot.drone.land();
    });
    after(21*1000, function() {
        bot.drone.stop();
    });


}

Cylon.start();