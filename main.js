var $buyInput = document.querySelector("#buy");
var $sellInput = document.querySelector("#sell");
var $amountInput = document.querySelector("#amount");
var $coinSelect = document.querySelector("#coin-select");
var $methodSelect = document.querySelector("#method-select");
var $result = document.querySelector("#result");

function updateResult(suffix) {
  $result.textContext = "Result: " + suffix;
}

function isBuy() {
  return $buyInput.value === "buy";
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
    (isBuy() ? exchangeInfo.withdrawFee[coin()] || 0 : 0)
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
  // TODO: keep focus on prev elem
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
  console.log(acceptableMethods);
  Object.keys(acceptableMethods).forEach((acceptableMethod) => {
    var elem = document.createElement("option");
    elem.value = acceptableMethod;
    elem.text = acceptableMethod;
    $methodSelect.add(elem);
  });
}

function displayResults() {
  // TODO: keep focus on prev elem
  var last;
  while ((last = $result.lastChild)) $result.removeChild(last);
  var results = [];
  Object.keys(DATA).forEach((exchangeName) => {
    var exchangeInfo = DATA[exchangeName];
    if (isBuy()) {
      exchangeInfo.depositMethods
        .filter((method) => amount() >= method.min && amount() <= method.max)
        .filter((method) => transferMethod() === method.type)
        .forEach((method) => {
          return results.push([
            exchangeName,
            method.type,
            calculateFee(exchangeInfo, method),
          ]);
        });
    } else {
      exchangeInfo.withdrawMethods
        .filter((method) => amount() >= method.min && amount() <= method.max)
        .filter((method) => transferMethod() === method.type)
        .forEach((method) => {
          return results.push([
            exchangeName,
            method.type,
            calculateFee(exchangeInfo, method),
          ]);
        });
    }
  });
  console.log(results);
  // Object.keys(acceptableMethods).forEach((acceptableMethod) => {
  //   var elem = document.createElement("option");
  //   elem.value = acceptableMethod;
  //   elem.text = acceptableMethod;
  //   $result.add(elem);
  // });
}

function sync() {
  if (!amount) return;
  syncCoinOptionElements();
  syncMethodOptionElements();
  displayResults();
}

$buyInput.onclick = function (e) {};

$sellInput.onclick = function (e) {};

$amountInput.onchange = function (e) {
  sync();
};

$coinSelect.onblur = function (e) {};

$methodSelect.onblur = function (e) {};

sync();
