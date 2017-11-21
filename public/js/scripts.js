document.addEventListener("DOMContentLoaded", function (event) {
    console.log("ready")
    var crop = document.getElementById('btncrop')
    crop.addEventListener('click', function (event) {
        console.log('crop clicked')
    });
    var resize = document.getElementById('btnresize')
    resize.addEventListener('click', function (event) {
        console.log('resize clicked');
//         return fetch("/api/resize?x=200&y=200", 
//             {method: 'POST'}
//         ).then(function (response) {
//             console.log(response)
//             if (response.status !== 200) {
//                 return Promise.reject(new Error(response.statusText))
//             }
//             //console.log(response.redirectUrl);
            
//         })
    });
    var rotate = document.getElementById('btnrotate')
    rotate.addEventListener('click', function (event) {
        console.log('rotate clicked')
    });
});
