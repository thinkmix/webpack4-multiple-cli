const optimist = require('optimist');

exports.getLocalIP = () => {
  var os = require('os'),
    iptable = {},
    ifaces = os.networkInterfaces();
  for (var dev in ifaces) {
    ifaces[dev].forEach(function (details, alias) {
      if (details.family == 'IPv4') {
        iptable[dev + (alias ? ':' + alias : '')] = details.address;
      }
    });
  }
  let valueArr = Object.values(iptable);
  return valueArr.filter((val) => {
    return val.indexOf('192.168.10') > -1 || val.indexOf('10.168.10') > -1;
  })[0];
}
