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
        bot.drone.forward(0.1);
    });

    after(10*1000, function() { //stop
        bot.drone.forward(0);
        bot.drone.hover();
    });

    after(11.1*1000, function() {
        bot.drone.back(0.1);
    });

    after(13*1000, function() {//stop
        bot.drone.back(0);
        bot.drone.hover();
    });

    var timeForLeft = 3;
    for(var i=0; i<4;i++){
        after((15+4*i)*1000, function() {
            bot.drone.left(0);
            bot.drone.right(0.2);
        });

        after((16.5+4*i)*1000, function() { //stop
            bot.drone.right(0);
            bot.drone.left(0.2);
            //bot.drone.hover();
        });
    }

    after(30.1*1000, function(){

        bot.drone.left(0);
       bot.drone.clockwise(0.2);
    });

    after(31*1000, function(){
       bot.drone.clockwise(0.1);
    });

    /*after(32*1000, function(){
      bot.drone.anticlockwise(0.1)
    });

    after(33*1000, function(){
       bot.drone.anticlockwise(0.1)
     });*/

    after(32*1000, function() {
        bot.drone.land();
    });
    after(36*1000, function() {
        bot.drone.stop();
    });


}

Cylon.start();