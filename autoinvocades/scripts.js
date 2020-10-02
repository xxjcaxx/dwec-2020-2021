function a(){
    this.n = 2;
};

a.prototype.b = function(){
    this.n = 4;
};


(function(){
    aa = new a();
    console.log(aa);
})();