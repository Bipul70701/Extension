window.addEventListener("load", () => {
    async function sendData() {
        const XHR = new XMLHttpRequest();
        let name=document.getElementById("floatingInputName").value;
        let email=document.getElementById("floatingInput").value;
        let code=document.getElementById("floatingPassword").value;

        console.log(name, email, code);

        try {
            const data = await fetch("http://localhost:3000/new", {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                code
            }),
            headers: {
              'Content-Type': 'application/json'
            },
            })

            const res = await data.json()

            window.location.href = `./camera.html?email=${res.data.Email}`
            
        } catch (err) {
            console.log("err: ", err);
        }
      }
  document.getElementById("sbmt").addEventListener("click", helper);
    function helper(){
        sendData();
    };
});