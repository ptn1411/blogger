$("#btnDelete").click(function () {
    const url = document.getElementById("btnDelete").value;
    $.get("/blog/delete/"+url, function(data, status){
        alert("Done !");
        location.reload();
    });
});