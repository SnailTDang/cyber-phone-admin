var services = new ProductsServices();

let arrayProduct = [];

function layDS() {
    services
        .getProductList()
        .then(function (result) {
            hienThiTable(result.data);
            arrayProduct = [...result.data];
        })
        .catch(function (error) {
            console.log(error);
        });
}

layDS();

function hienThiTable(mangSP) {
    let count = 1;
    let content = mangSP.map((e) => {
        return `
      <tr>
        <td>${count++}</td>
        <td>${e.name}</td>
        <td>${Number(e.cost).toLocaleString()}₫</td>
        <td style="text-align: center;"><img src="${
            e.image
        }" style="width: 70px; height: 70px; object-fit: contain;" alt=""></td>
        <td>${e.amount}</td>
        <td style="text-align: center;">
          <button class="btn btn-danger" onclick="delProduct('${
              e.id
          }')" >Xóa</button>
          <button class="btn btn-info" onclick="showDetails('${
              e.id
          }')" data-toggle="modal" data-target="#myModal">Xem</button>
        </td>
      </tr>
    `;
    });
    document.querySelector("#tblDanhSachSP").innerHTML = content.join("");
}

function addProducts() {
    var ten = document.getElementById("TenSP").value;
    var gia = Number(document.getElementById("GiaSP").value);
    var hinhAnh = document.getElementById("hinhSP").value;
    var soLuong = document.getElementById("khoSP").value;
    var rateELE = document.querySelectorAll(".rate-input");
    var khuyenMai = document.getElementById("kmSP").value;
    var freeship = Boolean(Number(document.getElementById("freeShip").value));
    var hang = document.getElementById("hangSP").value;
    var loai = document.getElementById("loaiSP").value;
    let danhGia = {};
    console.log(freeship);

    for (let rate of rateELE) {
        let idName = rate.id;
        let value = Number(rate.value);
        danhGia = { ...danhGia, [idName]: value };
    }

    var product = new Products(
        ten,
        hang,
        loai,
        gia,
        hinhAnh,
        soLuong,
        danhGia,
        khuyenMai,
        freeship
    );
    console.log(product);
    services
        .addProduct(product)
        .then(function (result) {
            layDS();
            document.querySelector("#myModal .close").click();
            console.log(result.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function delProduct(id) {
    services
        .deleteProduct(id)
        .then(function (result) {
            layDS();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function showDetails(id) {
    services
        .getProduct(id)
        .then(function (result) {
            let {
                name,
                brand,
                type,
                cost,
                image,
                amount,
                rate,
                discount,
                freeship,
            } = result.data;
            console.log(freeship);
            freeship = freeship === true ? 1 : 0;
            showForm(
                name,
                cost,
                image,
                amount,
                rate.star,
                rate.comments,
                discount,
                freeship,
                brand,
                type
            );
            document.querySelector("#myModal .modal-footer").innerHTML = `
        <button onclick="updateProduct('${result.data.id}')" type="button" class="btn btn-success" id="capnhatSP">
        Cập nhật sản phẩm
        </button>
  `;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function updateProduct(id) {
    var ten = document.getElementById("TenSP").value;
    var gia = Number(document.getElementById("GiaSP").value);
    var hinhAnh = document.getElementById("hinhSP").value;
    var soLuong = document.getElementById("khoSP").value;
    var rateELE = document.querySelectorAll(".rate-input");
    var khuyenMai = document.getElementById("kmSP").value;
    var freeship = Boolean(Number(document.getElementById("freeShip").value));
    var hang = document.getElementById("hangSP").value;
    var loai = document.getElementById("loaiSP").value;
    let danhGia = {};

    for (let rate of rateELE) {
        let idName = rate.id;
        let value = Number(rate.value);
        danhGia = { ...danhGia, [idName]: value };
    }

    var product = new Products(
        ten,
        hang,
        loai,
        gia,
        hinhAnh,
        soLuong,
        danhGia,
        khuyenMai,
        freeship
    );
    console.log(product);

    services
        .updateProduct(id, product)
        .then(function (result) {
            layDS();
            document.querySelector("#myModal .close").click();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function showForm(
    tenSP,
    giaSP,
    hinhSP,
    khoSP,
    star,
    comments,
    kmSP,
    freeShip,
    hangSP,
    loaiSP
) {
    document.getElementById("TenSP").value = tenSP;
    document.getElementById("GiaSP").value = giaSP;
    document.getElementById("hinhSP").value = hinhSP;
    document.getElementById("khoSP").value = khoSP;
    document.getElementById("star").value = star;
    document.getElementById("comments").value = comments;
    document.getElementById("kmSP").value = kmSP;
    document.getElementById("freeShip").value = freeShip;
    document.getElementById("hangSP").value = hangSP;
    document.getElementById("loaiSP").value = loaiSP;
}

document.getElementById("btnThemSP").addEventListener("click", function () {
    document.querySelector("#myModal .modal-footer").innerHTML = `
  <button onclick="addProducts();" type="button" class="btn btn-success" id="themSP">
        Thêm sản phẩm
        </button>
  `;
    document.querySelector("#myForm").reset();
});

let inputSearch = document.querySelector("#searchInput");

let searchMember = () => {
    let textInput = inputSearch.value;
    if (textInput) {
        let findArr = [];
        let findLower = textInput.toLowerCase();
        arrayProduct.map((e) => {
            let name = e.name.toLowerCase();
            let indexFind = name.indexOf(findLower);
            if (indexFind > -1) {
                findArr.push(e);
            }
        });
        if (findArr.length > 1) {
            hienThiTable(findArr);
        } else {
            document.querySelector("#tblDanhSachSP").innerHTML =
                "KHÔNG TÌM ĐƯỢC SẢN PHẨM";
        }
    } else {
        hienThiTable(arrayProduct);
    }
};

inputSearch.addEventListener("keyup", () => {
    searchMember();
});
