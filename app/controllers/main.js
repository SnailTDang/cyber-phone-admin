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
        <td>${e.tenSP}</td>
        <td>${e.gia}</td>
        <td style="text-align: center;"><img src="${e.hinhAnh}" style="width: 70px; height: 70px" alt=""></td>
        <td>${e.moTa}</td>
        <td style="text-align: center;">
          <button class="btn btn-danger" onclick="delProduct(${e.id})" >Xóa</button>
          <button class="btn btn-info" onclick="showDetails(${e.id})" data-toggle="modal" data-target="#myModal">Xem</button>
        </td>
      </tr>
    `
  });
  document.querySelector("#tblDanhSachSP").innerHTML = content.join("")
}

function addProducts () {
  var ten = document.getElementById("TenSP").value;
  var gia = document.getElementById("GiaSP").value;
  var hinhAnh = document.getElementById("HinhSP").value;
  var moTa = document.getElementById("MotaSP").value;
  
  var product = new Products(ten, gia, hinhAnh, moTa)
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
    showForm(result.data.tenSP,result.data.gia,result.data.hinhAnh,result.data.moTa);
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
    var gia = document.getElementById("GiaSP").value;
    var hinhAnh = document.getElementById("HinhSP").value;
    var moTa = document.getElementById("MotaSP").value;
    var product = new Products(ten, gia, hinhAnh, moTa);
  services.updateProduct(id,product)
  .then(function(result){
    layDS();
    document.querySelector("#myModal .close").click();
  })
  .catch(function(error){
    console.log(error)
  })
}


function showForm(tenSP,giaSP,HinhSP,MotaSP){
  document.getElementById("TenSP").value = tenSP;
  document.getElementById("GiaSP").value = giaSP;
  document.getElementById("HinhSP").value = HinhSP;
  document.getElementById("MotaSP").value = MotaSP;
}

document.getElementById("btnThemSP").addEventListener("click", function (){
  document.querySelector("#myModal .modal-footer").innerHTML = `
  <button onclick="addProducts();" type="button" class="btn btn-success" id="themSP">
        Thêm sản phẩm
        </button>
  `;
  showForm("","","","");
})
