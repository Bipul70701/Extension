var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (error) {
      console.log("Something went wrong!");
    });
}
setInterval(help,3000);
async function help(){
canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
   	let image_data_url = canvas.toDataURL('image/jpeg');
   	console.log(image_data_url);
    console.log(Date.now());
     let file = null;
     let blob = document.querySelector("#canvas").toBlob(function(blob) {
             file = new File([blob], 'test.png', { type: 'image/png' });
           }, 'image/png');

          const urlSearchParams = new URLSearchParams(window.location.search);
          const params = Object.fromEntries(urlSearchParams.entries());

          console.log("params: ", params);

           try {
            const data = await fetch("http://localhost:3000/photo", {
            method: 'POST',
            body: JSON.stringify({
              blob: image_data_url,
              email: params.email,
              timestamp: Date.now()
            }),
            headers: {
              'Content-Type': 'application/json'
            },
            })

            const res = await data.json()
            
        } catch (err) {
            console.log("err: ", err);
        }     
}