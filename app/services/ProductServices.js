function ProductsServices() {
    this.tabArray = [];

    this.getProductList = function () {
        return axios({
            method: 'get',
            url: 'http://localhost:3000/data',
        })
    }
    this.addProduct = function (products){
        return axios({
            method: 'POST',
            url: 'http://localhost:3000/data',
            data: products,
        });
    }
    this.deleteProduct = function(id){
        return axios({
            method: 'DELETE',
            url: `http://localhost:3000/data/${id}`,
        });
    }
    this.getProduct = function(id){
        return axios({
            method: 'GET',
            url: `http://localhost:3000/data/${id}`,
        });
    }
    this.updateProduct = function(id,product){
        return axios({
            method: 'PUT',
            url: `http://localhost:3000/data/${id}`,
            data: product
        });
    }
}