export async function getData(type: string, input: string, wookie: boolean) {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        type: type,
        input: input,
        wookie: wookie
      });

      const url = "http://localhost:8080/api/getSWData";
      const response = await fetch(url, {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        mode: "cors",
      });
      const data = await response.json(); // parse JSON
      return(data.results);
    } catch (error) {
      console.log(error.message);
    }
  }

//   let result = Object.keys(res).map((key) => {
//     return { pseudo: key, score: scores[key] };
//   });