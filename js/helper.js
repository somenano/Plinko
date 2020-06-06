const get_request = function(path, cb) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cb(this);
    }
  };
  xhttp.open("GET", path, true);
  xhttp.send();
}

const get_natricon = function(address, format) {
    // https://natricon.com/documentation

    let path = 'https://natricon.com/api/v1/nano?address='+address;
    path += '&format='+format;
    path += '&size=128';
    path += '&outline=true';
    path += '&outline_color=black';
    path += '&svc=plinko.somenano.com';

    return path;
}

const load_natricon = function(address, cb) {
  const path = get_natricon(address);
  get_request(path, function(data) {
    if (data.response) {
      cb(data.response);
    }
  });
}