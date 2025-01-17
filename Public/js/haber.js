let paragraf = document.getElementById("paragraf");
let liste = document.getElementById("liste");
let fotograf = document.getElementById("fotograf");
let inputText = document.getElementById("inputText");
let draggableDiv = document.getElementById("draggableDiv");
let eklemekutu = document.getElementById("eklemekutu");

let kaydet = document.getElementById("kaydet");
let html = document.getElementById("html");

let fotoekle = document.getElementById("fotoekle");

let pBaslik = document.getElementById("pBaslik");

let kapakfoto = document.getElementById("kapakfoto");
let kapaktitle = document.getElementById("kapaktitle");
let fotografkutusu = document.getElementById("fotografkutusu");

let resiminput = document.getElementById("resiminput");
let resimEkle = document.getElementById("resimEkle");
let fotodurum = document.getElementById("fotodurum");

let classeklemeID = document.getElementById("classekleme");

let seceneklerKutusu = document.getElementById("seceneklerKutusu");

resimEkle.addEventListener("click", () => {
  var file = resiminput.files[0];
  var formData = new FormData();
  formData.append("resiminput", file);
  fetch("/haberekle/haberfotograf", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      fotodurum.innerText = data.success;
      setTimeout(() => {
        fotodurum.innerText = "";
      }, 2000);
    })
    .catch((error) => console.error("Error:", error));
});

let fotoeklemekutu = document.getElementById("fotoeklemekutu");
fotoekle.addEventListener("click", () => {
  if (fotoeklemekutu.style.display == "block") {
    fotoeklemekutu.style.display = "none";
  } else {
    fotoeklemekutu.style.display = "block";
  }
});

paragraf.addEventListener("click", () => {
  let p = document.createElement("p");
  p.onclick = function (event) {
    etiket(event);
  };
  p.className = 'genislik-1'
  p.textContent = "Yeni Paragrag Bir şeyler Girin";
  html.appendChild(p);
});
liste.addEventListener("click", () => {
  let li = document.createElement("li");
  li.onclick = function (event) {
    etiket(event);
  };
  li.className = 'genislik-1'
  li.textContent = "Yeni liste Bir şeyler Girin";
  html.appendChild(li);
});
pBaslik.addEventListener("click", () => {
  let h3 = document.createElement("h3");
  h3.onclick = function (event) {
    etiket(event);
  };
  h3.className = "genislik-1";
  h3.textContent = "Yeni Başlık Bir şeyler Girin";
  html.appendChild(h3);
});

fotograf.addEventListener("click", () => {
  let img = document.createElement("img");
  img.onclick = function (event) {
    etiketimg(event);
  };
  img.className = "genislik-1";
  img.src = "/img/Main/default.png";
  html.appendChild(img);
});

kaydet.addEventListener("click", () => {
  fetch("/haberekle/haberekleme", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      html: html.innerHTML,
      kapakfoto: kapakfoto.src,
      kapaktitle: kapaktitle.innerText,
    }),
  })
    .then((response) => response.json())
    .then((data) => (window.location.href = "/haberekle/liste"))
    .catch((error) => console.error("Error:", error));
});

let etiketglobal;
function etiket(event) {
  eklemekutu.style.display = "none";
  fotoeklemekutu.style.display = "none";
  seceneklerKutusu.style.transform = "translateY(0px)";

  classeklemeID.value = event.target.className;
  inputText.value = event.target.textContent;
  etiketglobal = event;
}

function etiketimg(event) {
  seceneklerKutusu.style.transform = "translateY(0px)";
  classeklemeID.value = event.target.className;
  inputText.value = event.target.src;
  etiketglobal = event;

  eklemekutu.style.display = "none";
  fotoeklemekutu.style.display = "none";
}

function inputekleme(event) {
  etiketglobal.target.textContent = event.target.value;

  etiketglobal.target.src = event.target.value;
}

function kapatt(event) {
  seceneklerKutusu.style.transform = "translateY(300px)";
  fotografkutusu.style.transform = "translateY(240px)";
  hazirStilBox.style.display = "none";
  renkler.style.display = "none";
  gnslkBox.style.display = "none";
}
function sill(event) {
  etiketglobal.target.parentNode.removeChild(etiketglobal.target);
  fotografkutusu.style.transform = "translateY(240px)";
  hazirStilBox.style.display = "none";
  renkler.style.display = "none";
  gnslkBox.style.display = "none";

  seceneklerKutusu.style.transform = "translateY(300px)";
}

fotografkutusu.style.transform = "translateY(240px)";
function fotoboxac() {
  fotografkutusu.innerHTML = "";

  if (fotografkutusu.style.transform == "translateY(240px)") {
    fotografkutusu.style.transform = "translateY(0px)";
    hazirStilBox.style.display = "none";
  renkler.style.display = "none";
  gnslkBox.style.display = "none";
  } else {
    fotografkutusu.style.transform = "translateY(240px)";
  }

  fetch("/haberekle/haberfotograf")
    .then((response) => response.json())
    .then((data) => {
      for (let item of data) {
        let img = document.createElement("img");
        img.onclick = function (event) {
          resimgoster(event);
        };
        img.src = item.img;
        fotografkutusu.appendChild(img);
      }
    })
    .catch((error) => console.error("Hata:", error));
}

function resimgoster(event) {
  etiketglobal.target.src = event.target.src;
  inputText.value = event.target.src;
}

function classekleme(event) {
  etiketglobal.target.className = event.target.value;
}

eklemekutu.style.display = "none";

draggableDiv.addEventListener("click", () => {
  if (eklemekutu.style.display == "none") {
    eklemekutu.style.display = "block";
    eklemekutu.style.opacity = "1";
    kapatt();
 
  } else {
    eklemekutu.style.display = "none";
    eklemekutu.style.opacity = "0";
    fotoeklemekutu.style.display = "none";
  }
});

let renkler = document.getElementById("renkler");
let yazirenk = document.getElementById("yazirenk");

yazirenk.addEventListener("click", () => {
  if (renkler.style.display == "flex") {
    renkler.style.display = "none";
  } else {
    renkler.style.display = "flex";
    hazirStilBox.style.display = "none";
    gnslkBox.style.display = "none";
    fotografkutusu.style.transform = "translateY(240px)";
   

  }
});

function renkBoxF(event) {
  var metin = etiketglobal.target.className;
  var kelimeler = metin.split(" ");

  // Başında "text" kelimesi olanı sil
  for (var i = 0; i < kelimeler.length; i++) {
    if (kelimeler[i].startsWith("text")) {
      kelimeler.splice(i, 1);
      i--; // Dizide bir eleman silindiği için indeksi bir azalt
    }
  }

  var yeniMetin = kelimeler.join(" ") + " " + event.target.textContent;

  etiketglobal.target.className = yeniMetin;
  classeklemeID.value = yeniMetin;
  console.log(yeniMetin);
}
function gnslkF(event) {
  var metin = etiketglobal.target.className;
  var kelimeler = metin.split(" ");

  // Başında "text" kelimesi olanı sil
  for (var i = 0; i < kelimeler.length; i++) {
    if (kelimeler[i].startsWith("genislik")) {
      kelimeler.splice(i, 1);
      i--; // Dizide bir eleman silindiği için indeksi bir azalt
    }
  }

  var yeniMetin = kelimeler.join(" ") + " " + event.target.textContent;

  etiketglobal.target.className = yeniMetin;
  classeklemeID.value = yeniMetin;
  console.log(yeniMetin);
}

let gnslkBox = document.getElementById("gnslkBox");
let genislik = document.getElementById("genislik");

genislik.addEventListener("click", () => {
  if (gnslkBox.style.display == "block") {
    gnslkBox.style.display = "none";
  } else {
    gnslkBox.style.display = "block";
    hazirStilBox.style.display = "none";
    renkler.style.display = "none";
    fotografkutusu.style.transform = "translateY(240px)";


  }
});
let varsayilan = document.getElementById('varsayilan')

varsayilan.addEventListener('click',()=>{
  etiketglobal.target.className = 'genislik-1'
  classeklemeID.value = 'genislik-1';
  hazirStilBox.style.display = "none";
  renkler.style.display = "none";
  gnslkBox.style.display = "none";
  fotografkutusu.style.transform = "translateY(240px)";

})

let hazircss = document.getElementById('hazircss')
let hazirStilBox = document.getElementById('hazirStilBox')


hazircss.addEventListener('click',()=>{
  if (hazirStilBox.style.display == "block") {
    hazirStilBox.style.display = "none";
  } else {
    hazirStilBox.style.display = "block";
    renkler.style.display = "none";
    gnslkBox.style.display = "none";
    fotografkutusu.style.transform = "translateY(240px)";




  }
})