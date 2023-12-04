console.log("hii");
const url = document.querySelectorAll(".url")
const content = document.querySelector(".toysContent")
console.log(url[0].innerText);
const getData = async (myUrl) =>{
    const url = `http://localhost:8000/api/v1${myUrl}`;
    console.log(url);
const data = await fetch(url).then(res=>res.json()).then(data=>data).catch(err=>err)
console.log(JSON.stringify(data));
const jsonData = JSON.stringify(data)
jsonData.replace(",","/n")
content.innerText =jsonData;
}
// url.map(u=> u.addEvent)
for(let i=0; i <url.length;i++){
  console.log(url[i].innerText);
  url[i].addEventListener("click",()=>{getData(url[i].innerText)})
}