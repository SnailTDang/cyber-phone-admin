function ProductsServices() {
    this.tabArray = [];

    this.getProductList = function () {
        return axios({
            method: 'get',
            url: 'https://6214ccb089fad53b1f1f676b.mockapi.io/Products',
        })
    }
    this.addProduct = function (products){
        return axios({
            method: 'POST',
            url: 'https://6214ccb089fad53b1f1f676b.mockapi.io/Products',
            data: products,
          });
    }
    this.deleteProduct = function(id){
        return axios({
            method: 'DELETE',
            url: `https://6214ccb089fad53b1f1f676b.mockapi.io/Products/${id}`,
        });
    }
    this.getProduct = function(id){
        return axios({
            method: 'GET',
            url: `https://6214ccb089fad53b1f1f676b.mockapi.io/Products/${id}`,
        });
    }
    this.updateProduct = function(id,product){
        return axios({
            method: 'PUT',
            url: `https://6214ccb089fad53b1f1f676b.mockapi.io/Products/${id}`,
            data: product
        });
    }
}