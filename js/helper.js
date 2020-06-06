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

const get_natricon = function(address) {
    // https://natricon.com/documentation

    let path = 'https://natricon.com/api/v1/nano?address='+address;
    path += '&format=png';
    path += '&size=128';
    path += '&outline=true';
    path += '&outline_color=black';

    return path;
}