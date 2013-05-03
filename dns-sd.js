var mdns = require('mdns');
var browser = mdns.createBrowser(mdns.tcp('daap'));

var printInvocation = function() { 
    console.log(["Timestamp", "Up/Down", "Flags", "Address", "Service Name"].join("\t"));
};

var i = 0;
var once = function(callable) {
  for(;i<1; ++i) {
    callable();
  }
};

var printRow = function(service, event) {
  console.log([new Date().toTimeString(),event,service.flags,service.addresses ? service.addresses[0] : "\t",service.name].join("\t"));
};

browser.on('serviceUp', function(service) {
  once(printInvocation);
  printRow(service, "Up");
});

browser.on('serviceDown', function(service) {
  once(printInvocation);
  printRow(service, "Down");
});

browser.start();
