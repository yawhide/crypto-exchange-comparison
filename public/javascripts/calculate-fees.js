var $buyInput = document.querySelector("#buy");
var $sellInput = document.querySelector("#sell");
var $amountInput = document.querySelector("#amount");
var $coinSelect = document.querySelector("#coin-select");
var $methodSelect = document.querySelector("#method-select");
var $result = document.querySelector("#table-tbody");
var $coingeckoLastUpdated = document.querySelector("#coin-gecko-last-updated");
var $resultTable = document.querySelector("#result-table");

var coinGeckoCache = {};
var state = {};

function isBuy() {
  return document.querySelector('input[name="type"]:checked').value === "buy";
}

function amount() {
  return parseInt($amountInput.value);
}

function coin() {
  return $coinSelect.value;
}

function transferMethod() {
  return $methodSelect.value;
}

function calculateFee(exchangeInfo, method) {
  return (
    method.fee(amount()) +
    exchangeInfo.tradingFee(amount()) +
    exchangeInfo.realSpread(amount()) +
    (isBuy()
      ? exchangeInfo.withdrawFee[coin()] * coinGeckoCache[coin()] || 0
      : 0)
  );
}

function syncCoinOptionElements() {
  // TODO: keep focus on prev elem if exists
  var last;
  while ((last = $coinSelect.lastChild)) $coinSelect.removeChild(last);
  ["BTC", "ETH"].forEach((coin) => {
    var elem = document.createElement("option");
    elem.value = coin;
    elem.text = coin;
    $coinSelect.add(elem);
  });
}

function syncMethodOptionElements() {
  var last;
  while ((last = $methodSelect.lastChild)) $methodSelect.removeChild(last);
  var acceptableMethods = {};
  Object.keys(DATA).forEach((exchangeName) => {
    var exchangeInfo = DATA[exchangeName];
    if (isBuy()) {
      exchangeInfo.depositMethods
        .filter((method) => amount() >= method.min && amount() <= method.max)
        .forEach((method) => (acceptableMethods[method.type] = true));
    } else {
      exchangeInfo.withdrawMethods
        .filter((method) => amount() >= method.min && amount() <= method.max)
        .forEach((method) => (acceptableMethods[method.type] = true));
    }
  });
  Object.keys(acceptableMethods).forEach((acceptableMethod) => {
    var elem = document.createElement("option");
    if (acceptableMethod === state.methodType) {
      elem.selected = true;
    }
    elem.value = acceptableMethod;
    elem.text = acceptableMethod;
    $methodSelect.add(elem);
  });
}

function displayResults() {
  var last;
  while ((last = $result.lastChild)) $result.removeChild(last);
  var results = [];
  Object.keys(DATA).forEach((exchangeName) => {
    var exchangeInfo = DATA[exchangeName];
    methods = isBuy()
      ? exchangeInfo.depositMethods
      : exchangeInfo.withdrawMethods;
    methods
      .filter((method) => amount() >= method.min && amount() <= method.max)
      .filter((method) => transferMethod() === method.type)
      .forEach((method) => {
        return results.push([
          exchangeName,
          method.type,
          calculateFee(exchangeInfo, method),
        ]);
      });
  });
  results
    .sort((a, b) => a[2] - b[2])
    .forEach((result) => {
      var elem = document.createElement("tr");
      elem.class = "active";
      elem.innerHTML +=
        '<td class="text-capitalize"><a href="' +
        DATA[result[0]].url +
        '" target="_blank">' +
        result[0] +
        "</a></td><td>" +
        result[1] +
        "</td><td>" +
        +result[2].toFixed(2) +
        "</td><td>" +
        (DATA[result[0]].referral.url
          ? '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="external-link-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="external-link-alt"><path fill="currentColor" d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z" class=""></path></svg>' +
            '<a href="' +
            DATA[result[0]].referral.url +
            '" style="padding-left: 0.25em;">' +
            DATA[result[0]].referral.text +
            "</a>"
          : DATA[result[0]].referral.text) +
        "</td>";
      $result.append(elem);
    });
}

function sync() {
  if (!amount) return;
  displayResults();
  if (coin() && transferMethod()) {
    $resultTable.classList.remove("d-invisible");
    $resultTable.classList.add("d-visible");
  }
}

$buyInput.onclick = function (e) {
  state.buy = true;
  syncMethodOptionElements();
  sync();
};

$sellInput.onclick = function (e) {
  state.buy = false;
  syncMethodOptionElements();
  sync();
};

$amountInput.oninput = function (e) {
  state.amount = e.target.value;
  syncMethodOptionElements();
  sync();
};

$coinSelect.onchange = function (e) {
  state.coin = e.target.value;
  sync();
};

$methodSelect.onchange = function (e) {
  state.methodType = e.target.value;
  sync();
};

syncCoinOptionElements();
syncMethodOptionElements();

fetch("/coingecko-cache.json")
  .then((response) => response.json())
  .then((data) => {
    coinGeckoCache = data;
    $coingeckoLastUpdated.innerHTML =
      "Crypto prices last updated " +
      '<span class="mark">' +
      new Date() +
      "</span>.";
    sync();
  });
