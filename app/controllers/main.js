var services = new ProductsServices();

function layDS() {
  services.getProductList()
    .then(function (result) {
      hienThiTable(result.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

layDS();

function hienThiTable(mangSP) {
  let count = 1;
  let content = mangSP.map((e) => {
    return `
      <tr>
        <td>${count++}</td>
        <td>${e.name}</td>
        <td>${e.cost}</td>
        <td style="text-align: center;"><img src="${e.image}" style="width: 70px; height: 70px" alt=""></td>
        <td>${e.amount}</td>
        <td style="text-align: center;">
          <button class="btn btn-danger" onclick="delProduct('${e.id}')" >Xóa</button>
          <button class="btn btn-info" onclick="showDetails('${e.id}')" data-toggle="modal" data-target="#myModal">Xem</button>
        </td>
      </tr>
    `
  });
  document.querySelector("#tblDanhSachSP").innerHTML = content.join("")
}

function addProducts () {
  var ten = document.getElementById("TenSP").value;
  var gia = Number(document.getElementById("GiaSP").value);
  var hinhAnh = document.getElementById("hinhSP").value;
  var soLuong = document.getElementById("khoSP").value;
  var danhGia = document.getElementById("rateSP").value;
  var khuyenMai = document.getElementById("kmSP").value;
  var freesShip = Boolean(Number(document.getElementById("freeShip").value));
  var hang = document.getElementById("hangSP").value;
  var loai = document.getElementById("loaiSP").value;
  
  var product = new Products(ten, hang, loai, gia, hinhAnh, soLuong, danhGia, khuyenMai, freesShip);
  console.log(product)
  services.addProduct(product)
  .then(function(result){
    layDS();
    document.querySelector("#myModal .close").click();
    console.log(result.data)
  })
  .catch(function(error){
    console.log(error)
  })
}

function delProduct(id) {
  services.deleteProduct(id)
  .then(function(result){
    layDS();
  })
  .catch(function(error){
    console.log(error);
  })
}

function showDetails(id){
  services.getProduct(id)
  .then(function(result){
    let {id, name,brand, type, cost, image, amount, rate, discount, freeShip} = result.data;
    console.log({id, name,brand, type, cost, image, amount, rate, discount, freeShip})
    // freeShip = freeShip.toString();
    showForm(name, cost, image, amount, rate, discount, freeShip, brand, type);
    document.querySelector("#myModal .modal-footer").innerHTML = `
        <button onclick="updateProduct(${result.data.id})" type="button" class="btn btn-success" id="capnhatSP">
        Cập nhật sản phẩm
        </button>
  `;
  })
  .catch(function(error){
    console.log(error)
  })
  
}

function updateProduct(id){
  var ten = document.getElementById("TenSP").value;
  var gia = Number(document.getElementById("GiaSP").value);
  var hinhAnh = document.getElementById("hinhSP").value;
  var soLuong = document.getElementById("khoSP").value;
  var danhGia = document.getElementById("rateSP").value;
  var khuyenMai = document.getElementById("kmSP").value;
  var freesShip = document.getElementById("freeShip").value;
  var hang = document.getElementById("hangSP").value;
  var product = new Products(ten, gia, hinhAnh, soLuong,danhGia,khuyenMai,freesShip,hang)
  
  services.updateProduct(id,product)
  .then(function(result){
    layDS();
    document.querySelector("#myModal .close").click();
  })
  .catch(function(error){
    console.log(error)
  })
}


function showForm(tenSP,giaSP,hinhSP,khoSP,rateSP,kmSP,freeShip,hangSP,loaiSP){
  document.getElementById("TenSP").value = tenSP;
  document.getElementById("GiaSP").value = giaSP;
  document.getElementById("hinhSP").value = hinhSP;
  document.getElementById("khoSP").value = khoSP;
  document.getElementById("rateSP").value = rateSP;
  document.getElementById("kmSP").value = kmSP;
  document.getElementById("freeShip").value = freeShip.toString();
  document.getElementById("hangSP").value = hangSP;
  document.getElementById("loaiSP").value = loaiSP;
}

document.getElementById("btnThemSP").addEventListener("click", function (){
  document.querySelector("#myModal .modal-footer").innerHTML = `
  <button onclick="addProducts();" type="button" class="btn btn-success" id="themSP">
        Thêm sản phẩm
        </button>
  `;
  let none = "";
  showForm(none,none,none,none,none,none,none,none,none);
})
