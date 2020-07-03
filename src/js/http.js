/*!
 * HTTP Communications
 * Standardised HTTP communications functions
 * (c) 2020 Joshua Adams
 */

/* ============================== Import Modules ============================ */

// N/A

/* ================================ Variables =============================== */

// N/A

/* ============================= Private Methods ============================ */

function _appendRequestHeaders(xhr, headers) {
  for (const key in headers) {
    if (headers.hasOwnProperty(key)) {
      if (typeof headers[key] === 'object') {
        xhr.setRequestHeader(key, JSON.stringify(headers[key]));
      } else {
        xhr.setRequestHeader(key, headers[key]);
      }
    }
  }
}

/* ============================== Public Methods ============================ */

function sendRequest(options) {
  // define AJAX request configuration
  const cnf = {
    method: options.method || 'GET',
    url: options.url,
    payload: options.payload,
    headers: options.headers
  };
  // send request
  return new Promise(function (resolve) {
    const xhr = new XMLHttpRequest();
    xhr.open(cnf.method, cnf.url, true);
    // add additional headers to payload
    _appendRequestHeaders(xhr, cnf.headers);
    // send request
    xhr.send(cnf.payload);
    // handle request reponse
    xhr.onreadystatechange = function () {
      // 4 = done
      if (xhr.readyState === 4) {
        resolve(xhr.response);
      } else {
        // reject(xhr.response);
      }
    };
  });
}

/* =========================== Export Public APIs =========================== */

module.exports = {
  sendRequest
};