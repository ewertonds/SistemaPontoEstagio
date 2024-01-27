const form = document.querySelector("form");
const servico = document.querySelector("#servico");
const troca = document.querySelector("#troca");

servico.addEventListener("change", (event) => {
  if (event.target.value == "Troca") {
    troca.classList.remove("hidden");
  } else {
    troca.classList.add("hidden");
  }
});

const getGeolocation = async () => {
  if (!navigator.geolocation) {
    alert("Geolocalização é necessária");
    return;
  }

  let lat = 0;
  let long = 0;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
    },
    () => {
      alert(
        "Geolocalização é necessária, atualize a página e permita o acesso"
      );
    },
    { timeout: 10000 }
  );

  while (lat == 0 && long == 0) {
    await new Promise((r) => setTimeout(r, 500));
  }

  return { lat, long };
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.querySelector("#email");
  const cpf = document.querySelector("#cpf");
  const cod = document.querySelector("#cod");
  const obs = document.querySelector("#obs");

  const entrada = document.querySelector("#entrada");
  const periodo = entrada.checked == true ? "Entrada" : "Saída";

  const geolocation = await getGeolocation();

  const validations = [
    email.value,
    cpf.value,
    cpf.value.length == 11,
    cod.value,
    obs.value,
  ];

  const result = validations.every((validation) => validation);

  if (!result) {
    alert("Preencha todos os campos corretamente");
  } else {
    console.log({
      email: email.value,
      cpf: cpf.value,
      periodo,
      cod: cod.value,
      obs: obs.value,
      servico: servico.value,
      geolocation,
    });
    form.reset();
    alert("Formulário enviado com sucesso");
  }
});
