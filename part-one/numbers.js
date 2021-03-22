$("#lucky-form").on("submit", async (e) => {
  e.preventDefault();
  let formValues = [];
  let count = $("#lucky-form").children("div").length;

  for (let i = 1; i <= count; i++) {
    formValues.push($(`#num${i}`).val());
  }

  let results = await getFacts(formValues);

  $("#lucky-results").empty();
  for (let result of results) {
    $("#lucky-results").append($(`<p>${result.data.text}</p>`));
  }
});


$("#multiple-form").on("submit", async (e) => {
  e.preventDefault();
  
  let values = new Array(4).fill($("#lucky-num").val());
  
  let results = await getFacts(values);
  
  $("#multiple-facts").empty();
  for (let result of results) {
    $("#multiple-facts").append($(`<p>${result.data.text}</p>`));
  }
});


async function getFacts(nums) {
  return await Promise.all(nums.map( num => axios.get(`http://numbersapi.com/${num}?json` )));
}