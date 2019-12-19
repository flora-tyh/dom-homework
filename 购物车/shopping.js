var carProducts = [
  {
    "id": 1,
    "name": "英雄牌 钢笔",
    "count": 1,
    "price": 69,
    "checked": false
  },
  {
    "id": 2,
    "name": "晨光牌 铅字笔",
    "count": 2,
    "price": 5.5,
    "checked": true
  },
  {
    "id": 3,
    "name": "晨光牌 铅笔",
    "count": 1,
    "price": 2,
    "checked": false
  },
  {
    "id": 4,
    "name": "狗熊牌 橡皮擦",
    "count": 1,
    "price": 1,
    "checked": false
  },
  {
    "id": 5,
    "name": "瑞士牌 双肩书包",
    "count": 1,
    "price": 199,
    "checked": true
  },
  {
    "id": 6,
    "name": "晨光牌 作业本",
    "count": 5,
    "price": 2.5,
    "checked": false
  }
];

var sumRow = document.getElementsByClassName("sum-row")[0];
var tbody = document.getElementsByTagName("tbody")[0];
var tr = document.getElementsByTagName("tr");
var sum = document.getElementsByClassName("sum")[0];
var countList = document.getElementsByClassName("count");

//添加表格
for (var i = 0; i < carProducts.length; i++) {
  var tr = document.createElement("tr");
  tbody.insertBefore(tr, sumRow);
  var checked = document.createElement("td");
  checked.innerHTML = "<input type='checkbox'>";
  tr.appendChild(checked);
  var itemName = document.createElement("td");
  itemName.innerHTML = carProducts[i].name;
  tr.appendChild(itemName);
  var price = document.createElement("td");
  price.className = "price";
  price.innerHTML = carProducts[i].price;
  tr.appendChild(price);
  var count = document.createElement("td");
  count.className = "count";
  var countNumber = carProducts[i].count;
  count.innerHTML = "<button class='cut'>-</button>" + "<span>"+ countNumber +"</span>" + "<button class='plus'>+</button>";
  tr.appendChild(count);
  var itemSum = document.createElement("td");
  itemSum.className = "item-sum"
  itemSum.innerHTML = countNumber * price.innerHTML;
  tr.appendChild(itemSum);
}

//按加号增加数量
function countAdd(e) {
  var rowIndex = e.target.parentElement.parentElement.rowIndex;
  countList[rowIndex - 1].children[1].innerText++;
}

//按减号减少数量
function countCut(e) {
  var rowIndex = e.target.parentElement.parentElement.rowIndex;
  countList[rowIndex - 1].children[1].innerText--;
}

//按全选，没有选中的时候点击全选就全选，再点取消全选
function selectAll(e) {
  if (allSelect.checked) {
    for (var i = 1, len = tbody.rows.length; i < len - 1; i++) {
      tbody.children[i].firstChild.firstChild.checked = true;
    }
  }
  else {
    for (var i = 1, len = tbody.rows.length; i < len - 1; i++) {
      tbody.children[i].firstChild.firstChild.checked = false;
    }
  }
}

//点击表格中的任何按键都会重新刷新总价
function changeSum(e) {
  var rowIndex = e.target.parentElement.parentElement.rowIndex;
  var trCurrnt = tbody.children[rowIndex];  
  if (rowIndex < tbody.rows.length-1) {
    trCurrnt.lastChild.innerText = trCurrnt.children[2].innerText * countList[rowIndex - 1].children[1].innerText;
  };
  var totalPrice = 0;
  var countTotal = 0;
  for (var i = 1, len = tbody.rows.length; i < len - 1; i++) {
    if (tbody.children[i].firstChild.firstChild.checked) {
      totalPrice += parseFloat(tbody.children[i].lastChild.innerText);
      countTotal += parseFloat(countList[i - 1].children[1].innerText);
    }
  };
  sum.innerHTML = "共计" + countTotal + "件商品，" + totalPrice + "￥";
  if (rowIndex < tbody.rows.length-1 
      && countList[rowIndex - 1].children[1].innerText === "0") {
    tbody.deleteRow(rowIndex);
  }; 
}

//给表格绑定点击事件，点击后刷新总价
tbody.addEventListener("click", changeSum);

//给加减号绑定点击事件，点击会改变数量
var btnPlus = [];
var btnCut = [];
for (let id = 0, carProductsLen = carProducts.length; id < carProductsLen; id++) {
  btnPlus[id] = document.getElementsByClassName("count")[id].children[2];
  btnPlus[id].addEventListener("click", countAdd);
  btnCut[id] = document.getElementsByClassName("count")[id].children[0];
  btnCut[id].addEventListener("click", countCut);
}

//给全选键绑定点击事件
var allSelect = document.getElementsByClassName("all-select")[0];
allSelect.addEventListener("click", selectAll);
